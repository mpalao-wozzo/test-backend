import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { format } from 'date-fns';
import RateLimit from 'express-rate-limit';
import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';

import conf from './config';
import schema from './schema';
import context from './context';
import { DATE_AND_HOUR_FORMAT } from './utils/constants';
import { errorActions } from './actions';
import { setAmazonConfig } from './utils/amazon';

const app = express();
env.config({ path: path.join(__dirname, '../.env') });
const cfg = conf(process.env.NODE_ENV || 'development');
const port = process.env.PORT || 5000;
setAmazonConfig();

// Conexion a BBDD
const DbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
let maxCalls = 1000;

if ('production' === cfg.env) {
  DbOptions.user = process.env.MONGO_USER;
  DbOptions.pass = process.env.MONGO_PWD;
  DbOptions.auth = { authdb: 'admin' };
} else {
  maxCalls = 10000;
}

mongoose.connect(`mongodb://${cfg.mongo.uri}/${cfg.mongo.db}`, DbOptions, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Connecting to Database at: ${cfg.mongo.uri}/${cfg.mongo.db}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Could not connect to mongo server!');
  console.warn(err);
});

mongoose.connection.on('open', () => {
  console.log('Connected to mongo server.');
});

// Middlewares
app.use(
  cors({
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
  }),
);
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 10 minutes
  max: maxCalls, // limit each IP to 10000 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  headers: true,
});
app.use(limiter); // limit Api requests
app.use(helmet()); // protection
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));
morgan.token('graphql-query', (req) => {
  const { ip, headers } = req;
  const { 'user-agent': agent } = headers;
  const { query, operationName, variables } = req.body;
  const date = format(new Date(), DATE_AND_HOUR_FORMAT);

  console.log(`${ip} - ${date} - Operation: ${operationName}. Query: ${JSON.stringify(query)} - ${agent}. Variables: ${JSON.stringify(variables)}`);
});
app.use(
  morgan(':graphql-query', {
    skip(req) {
      const { 'apollo-query-plan-experimental': healthCheck } = req.headers;
      return '1' === healthCheck;
    },
  }),
);

const server = new ApolloServer({
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
  schema,
  context,
  plugins: [ {
    requestDidStart() {
      return {
        didEncounterErrors(error) {
          if ('production' !== process.env.NODE_ENV && error.errors && error.errors.length) {
            // eslint-disable-next-line no-console
            error.errors.forEach((err) => {
              if (err.originalError && err.originalError._message) {
                console.warn(`Error: ${err.originalError._message}`);
              } else if (err.originalError && err.originalError.message) {
                console.warn(`Error: ${err.originalError.message}`);
              } else {
                console.warn(`Error: ${err.message}`);
              }
              if (err.stack) {
                console.warn(err.stack);
              }
            });
          }
          errorActions.handleError(error)
            .then(() => error)
            .catch(() => error);
        },
      };
    },
  } ],
  subscriptions: {
    onConnect: (connectionParams) => context({ connectionParams }),
  },
});
const httpServer = createServer(app);

server.applyMiddleware({ app, path: '/graphql' });
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Subscriptions ready on port ${port}, route: ${server.subscriptionsPath}`);
});
