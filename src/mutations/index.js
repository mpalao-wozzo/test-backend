import { GraphQLObjectType } from 'graphql';
import artistMutation from './artistMutation';
import errorMutation from './errorMutation';
import musicGenderMutation from './musicGenderMutation';
import userMutation from './userMutation';
import userRoleMutation from './userRoleMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...artistMutation,
    ...errorMutation,
    ...musicGenderMutation,
    ...userMutation,
    ...userRoleMutation,
  },
});
