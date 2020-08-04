import { GraphQLObjectType } from 'graphql';
import artistMutation from './artistMutation';
import errorMutation from './errorMutation';
import userMutation from './userMutation';
import userRoleMutation from './userRoleMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...artistMutation,
    ...errorMutation,
    ...userMutation,
    ...userRoleMutation,
  },
});
