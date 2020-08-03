import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { UserModel, UserInputModel } from '../types';
import { userActions } from '../actions';
import { isSuperadmin, unauthorized, isAdminOrMore } from '../context';

const createUser = {
  type: new GraphQLNonNull(UserModel),
  args: {
    user: { type: new GraphQLNonNull(UserInputModel) },
  },
  resolve(parent, args, { user, userRole }) {
    if (user && isAdminOrMore(userRole)) {
      return userActions.createUser(args.user);
    }
    return unauthorized();
  },
};

const updateUser = {
  type: new GraphQLNonNull(UserModel),
  args: {
    user: { type: new GraphQLNonNull(UserInputModel) },
  },
  resolve(parent, args, { user, userRole }) {
    if (user && isSuperadmin(userRole)) {
      return new Promise((resolve, reject) => {
        userActions.updateUser(args.user)
          .then((updatedUser) => {
            resolve(updatedUser);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    return unauthorized();
  },
};

const changePassword = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    oldPassword: { type: new GraphQLNonNull(GraphQLString) },
    newPassword: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, { oldPassword, newPassword }, { user }) {
    // check the user is the same
    if (user && user._id) {
      return userActions.changePassword(user._id, oldPassword, newPassword);
    }
    return unauthorized();
  },
};

const generatePassword = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, { userId, password }, { user, userRole }) {
    // check the user he wants to edit is himself
    if (user && isSuperadmin(userRole) && user._id !== userId) {
      return userActions.generatePassword(userId, password);
    }
    return unauthorized();
  },
};

const activateUser = {
  type: UserModel,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { _id }, { user, userRole }) {
    // check the user he wants to edit is himself
    if (user && isAdminOrMore(userRole) && user._id !== _id) {
      return userActions.findByQueryAndUpdate({ _id }, { active: true });
    }
    return unauthorized();
  },
};

const disableUser = {
  type: UserModel,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { _id }, { user, userRole }) {
    // check the user he wants to edit is himself
    if (user && isAdminOrMore(userRole) && user._id !== _id) {
      return userActions.findByQueryAndUpdate({ _id }, { active: false });
    }
    return unauthorized();
  },
};

const restoreUser = {
  type: UserModel,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { _id }, { user, userRole }) {
    // check the user he wants to edit is himself
    if (user && isSuperadmin(userRole) && user._id !== _id) {
      return userActions.findByQueryAndUpdate({ _id }, { deleted: false });
    }
    return unauthorized();
  },
};

const deleteUser = {
  type: UserModel,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { _id }, { user, userRole }) {
    // check the user he wants to edit is himself
    if (user && isAdminOrMore(userRole) && user._id !== _id) {
      return userActions.findByQueryAndUpdate({ _id }, { deleted: true });
    }
    return unauthorized();
  },
};

export default {
  activateUser,
  changePassword,
  createUser,
  deleteUser,
  disableUser,
  generatePassword,
  restoreUser,
  updateUser,
};
