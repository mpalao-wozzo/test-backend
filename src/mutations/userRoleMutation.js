import { GraphQLNonNull, GraphQLID } from 'graphql';
import { UserRoleModel } from '../types';
import { userRoleActions } from '../actions';
import { unauthorized, isSuperadmin } from '../context';

const activateUserRole = {
  type: new GraphQLNonNull(UserRoleModel),
  args: {
    userRoleId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { userRoleId }, { userRole }) {
    if (userRoleId && isSuperadmin(userRole)) {
      return userRoleActions.update(userRoleId, { active: true });
    }
    return unauthorized();
  },
};

const disableUserRole = {
  type: new GraphQLNonNull(UserRoleModel),
  args: {
    userRoleId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { userRoleId }, { userRole }) {
    if (userRoleId && isSuperadmin(userRole)) {
      return userRoleActions.update(userRoleId, { active: false });
    }
    return unauthorized();
  },
};

export default {
  activateUserRole,
  disableUserRole,
};
