import { GraphQLObjectType } from 'graphql';
import errorSubscription from './errorSubscription';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...errorSubscription,
  },
});
