import { GraphQLNonNull } from 'graphql';
import ErrorModel from '../types/Error';
import { SUB_NEW_ERROR } from '../utils/subscriptionsChannels';
import { unauthorized, isSuperadmin, pubsub } from '../context';

export const publishNewError = (error) => {
  pubsub.publish(SUB_NEW_ERROR, { newError: error });
};

const newError = {
  type: new GraphQLNonNull(ErrorModel),
  subscribe: (parent, args, { user, userRole }) => {
    if (user && isSuperadmin(userRole)) {
      return pubsub.asyncIterator(SUB_NEW_ERROR);
    }
    return unauthorized();
  },
};

export default {
  newError,
};
