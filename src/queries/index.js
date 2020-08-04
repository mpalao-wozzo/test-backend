import { GraphQLObjectType } from 'graphql';
import errorQuery from './errorQuery';
import refreshTokenQuery from './refreshTokenQuery';
import userQuery from './userQuery';
import userRoleQuery from './userRoleQuery';
import artistQuery from './artistQuery';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...errorQuery,
    ...refreshTokenQuery,
    ...userQuery,
    ...userRoleQuery,
    ...artistQuery,
  },
});
