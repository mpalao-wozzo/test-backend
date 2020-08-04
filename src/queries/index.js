import { GraphQLObjectType } from 'graphql';
import artistQuery from './artistQuery';
import errorQuery from './errorQuery';
import refreshTokenQuery from './refreshTokenQuery';
import userQuery from './userQuery';
import userRoleQuery from './userRoleQuery';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...artistQuery,
    ...errorQuery,
    ...refreshTokenQuery,
    ...userQuery,
    ...userRoleQuery,
  },
});
