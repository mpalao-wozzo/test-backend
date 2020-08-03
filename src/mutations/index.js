import { GraphQLObjectType } from 'graphql';
import errorMutation from './errorMutation';
import userMutation from './userMutation';
import userRoleMutation from './userRoleMutation';
import artistMutation from './artistMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...errorMutation,
    ...userMutation,
    ...userRoleMutation,
    ...artistMutation,
  },
});
