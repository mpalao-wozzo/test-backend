import { GraphQLSchema } from 'graphql';
import mutation from './mutations';
import query from './queries';
import subscription from './subscriptions';

export default new GraphQLSchema({
  mutation,
  query,
  subscription,
});
