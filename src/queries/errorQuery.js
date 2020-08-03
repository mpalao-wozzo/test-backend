import { GraphQLList } from 'graphql';

import { ErrorModel } from '../types';
import { errorActions } from '../actions';
import { isSuperadmin, unauthorized } from '../context';

const errors = {
  type: new GraphQLList(ErrorModel),
  resolve(parent, args, { user, userRole }) {
    if (user && isSuperadmin(userRole)) {
      return errorActions.findAll().sort({ createdAt: -1 });
    }
    return unauthorized();
  },
};

export default {
  errors,
};
