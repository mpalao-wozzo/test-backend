import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { errorActions } from '../actions';
import { isSuperadmin, unauthorized } from '../context';

const deleteError = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    errorId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { errorId }, { user, userRole }) {
    // check the user he wants to edit is himself
    if (user && isSuperadmin(userRole)) {
      return new Promise((resolve, reject) => {
        errorActions
          .remove(errorId)
          .then(() => {
            resolve('Error deleted.');
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    return unauthorized();
  },
};

const deleteErrors = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    errorIds: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
  },
  resolve(parent, { errorIds }, { user, userRole }) {
    // check the user he wants to edit is himself
    if (user && isSuperadmin(userRole)) {
      return new Promise((resolve, reject) => {
        errorActions
          .deleteMany({ _id: { $in: errorIds } })
          .then(() => {
            resolve('Errors deleted.');
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    return unauthorized();
  },
};

export default {
  deleteError,
  deleteErrors,
};
