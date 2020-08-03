import { GraphQLList } from 'graphql';

import { UserRoleModel } from '../types';
import { userRoleActions } from '../actions';

export default {
  userRoles: {
    type: new GraphQLList(UserRoleModel),
    resolve() {
      return userRoleActions.findAll();
    },
  },
};
