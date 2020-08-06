import { GraphQLObjectType } from 'graphql';
import artistQuery from './artistQuery';
import errorQuery from './errorQuery';
import genreQuery from './genreQuery';
import refreshTokenQuery from './refreshTokenQuery';
import userQuery from './userQuery';
import userRoleQuery from './userRoleQuery';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...artistQuery,
    ...errorQuery,
    ...genreQuery,
    ...refreshTokenQuery,
    ...userQuery,
    ...userRoleQuery,
  },
});
