import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLBoolean } from 'graphql';
import { UserModel } from '../types';
import { userActions } from '../actions';
import { isSuperadmin, unauthorized, isAdmin } from '../context';

const users = {
  type: new GraphQLList(UserModel),
  args: {
    _id: { type: GraphQLString },
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },
    telephone: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    deleted: { type: GraphQLBoolean },
  },
  resolve(parent, args, { user, userRole }) {
    if (isSuperadmin(userRole)) {
      return userActions.findFiltered({ ...args });
    }
    if (isAdmin(userRole)) {
      return userActions.findForAdmin({ ...args, deleted: false });
    }
    return unauthorized();
  },
};

const me = {
  type: UserModel,
  args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve(parent, { _id }, { user }) {
    if (user && user._id && _id === user._id.toString()) {
      return userActions.autologin(user);
    }
    return unauthorized();
  },
};

const login = {
  type: new GraphQLObjectType({
    name: 'LoginResponse',
    fields: () => ({
      token: { type: new GraphQLNonNull(GraphQLString) },
      refreshToken: { type: new GraphQLNonNull(GraphQLString) },
      expiryDate: { type: new GraphQLNonNull(GraphQLString) },
      user: { type: new GraphQLNonNull(UserModel) },
    }),
  }),
  args: { email: { type: new GraphQLNonNull(GraphQLString) }, password: { type: new GraphQLNonNull(GraphQLString) } },
  resolve(parent, { email, password }) {
    return userActions.login(email, password);
  },
};

export default {
  users,
  me,
  login,
};
