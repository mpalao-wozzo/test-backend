import mongoose from 'mongoose';
import env from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';
import conf from '../config';
import userRoles from './db_structure/userRoles.json';
import { userActions, userRoleActions } from '../actions';
import { ROLE_ADMIN, ROLE_SUPERADMIN, EN } from '../utils/constants';

env.config({ path: path.join(__dirname, '../../.env') });

const saltRounds = 10;

mongoose.Promise = global.Promise;
const cfg = conf(process.env.NODE_ENV);
const { uri, db } = cfg.mongo;
const DbOptions = {
  useCreateIndex: true,
  useUnifiedTopology: true,
};

if ('production' === cfg.env) {
  DbOptions.user = process.env.MONGO_USER;
  DbOptions.pass = process.env.MONGO_PWD;
  DbOptions.authSource = 'admin';
}

mongoose.connect(`mongodb://${uri}/${db}`, DbOptions, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Connecting to Database at: ${uri}/${db}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Could not connect to mongo server!');
  console.warn(err);
});

const createSuperadmin = () =>
  new Promise((resolve, reject) => {
    userRoleActions.findOneByQuery({ name: ROLE_SUPERADMIN }).then((superadminUserRole) => {
      bcrypt.hash('Test12', saltRounds, (err, hash) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const password = hash;
          const superadmin = {
            name: 'Superadmin',
            lastName: 'Superadmin',
            fullName: 'Superadmin',
            email: 'superadmin@boilerplate.com',
            password,
            userRoleId: superadminUserRole,
            language: EN,
            active: true,
            deleted: false,
          };
          userActions
            .create(superadmin)
            .then((res) => {
              console.log('SUPERADMIN CREATED SUCCESSFULLY');
              resolve(res);
            })
            .catch((error) => {
              console.warn(error);
              reject(err);
            });
        }
      });
    });
  });

const createAdmin = () =>
  new Promise((resolve, reject) => {
    userRoleActions.findOneByQuery({ name: ROLE_ADMIN }).then((adminUserRole) => {
      bcrypt.hash('Test12', saltRounds, (err, hash) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const password = hash;
          const admin = {
            name: 'Admin',
            lastName: 'Admin',
            fullName: 'Admin',
            email: 'admin@boilerplate.com',
            password,
            userRoleId: adminUserRole,
            language: EN,
            active: true,
            deleted: false,
          };
          userActions
            .create(admin)
            .then((res) => {
              console.log('ADMIN CREATED SUCCESSFULLY');
              resolve(res);
            })
            .catch((error) => {
              console.warn(error);
              reject(err);
            });
        }
      });
    });
  });

const dataToInsert = [ { action: userRoleActions, elems: userRoles, name: 'userRoles' } ];

const insertData = ({ action, elems, name }) =>
  new Promise((resolve, reject) => {
    action
      .insertMany(elems)
      .then((dbElems) => {
        console.log(`${dbElems.length} ${name} created`);
        resolve(dbElems);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
        throw err;
      });
  });

const dropDatabase = () =>
  new Promise((resolve, reject) =>
    mongoose.connection.db.dropDatabase((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Database Dropped');
        resolve();
      }
    }),
  );

const createInitialData = () =>
  Promise.all(dataToInsert.map(({ action, elems, name }) => insertData({ action, elems, name }))).then(() => {
    Promise.all([ createSuperadmin(), createAdmin() ])
      .then(() => {
        console.log('************************');
        console.log('******* FINISHED *******');
        console.log('************************');
        // eslint-disable-next-line no-process-exit
        process.exit(0);
      })
      .catch((error) => {
        console.error(error);
      });
  });

mongoose.connection.on('open', () => {
  console.log('Connected to mongo server.');
  console.log('***************** STARTING TO DELETE THE DATABASE *****************');
  dropDatabase()
    .then(() => {
      console.log('***************** STARTING TO INSERT THE DEFAULT DATA IN THE DATABASE *****************');
      console.log('This could take a long time, take a coffee ☕️');
      createInitialData();
    })
    .catch((error) => {
      console.error('ERROR DELETING DB');
      console.error(error);
    });
});
