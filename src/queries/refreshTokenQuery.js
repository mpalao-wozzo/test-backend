import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';
import { RefreshTokenModel, UserModel } from '../types';
import { refreshTokenActions } from '../actions';
import { isSuperadmin, unauthorized, isAdminOrMore } from '../context';

const newToken = {
  type: new GraphQLObjectType({
    name: 'newToken',
    fields: () => ({
      token: { type: new GraphQLNonNull(GraphQLString) },
      refreshToken: { type: new GraphQLNonNull(GraphQLString) },
      expiryDate: { type: new GraphQLNonNull(GraphQLString) },
      user: { type: new GraphQLNonNull(UserModel) },
    }),
  }),
  args: { refreshToken: { type: new GraphQLNonNull(GraphQLString) } },
  resolve(parent, { refreshToken }, { user, userRole }) {
    if (user && isAdminOrMore(userRole)) {
      return refreshTokenActions.refreshAccessToken(refreshToken);
    }
    return unauthorized();
  },
};

const refreshTokens = {
  type: new GraphQLList(RefreshTokenModel),
  resolve(parent, args, { user, userRole }) {
    if (user && isSuperadmin(userRole)) {
      return refreshTokenActions.findAll();
    }
    return unauthorized();
  },
};

export default {
  newToken,
  refreshTokens,
};
