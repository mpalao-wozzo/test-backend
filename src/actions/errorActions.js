import errorModel from '../models/error';
import baseFunctionsGenerator from './base/baseFunctions';
import { publishNewError } from '../subscriptions/errorSubscription';

const errorFunctions = baseFunctionsGenerator(errorModel);

const handleError = (incommingErr) =>
  new Promise((resolve, reject) => {
    if (!incommingErr) {
      const error = new Error('Wrong data sent');
      reject(error);
    }
    const cleanErr = {
      user: incommingErr.context && incommingErr.context.user,
      errors: incommingErr.errors ? incommingErr.errors : '',
      query: incommingErr.request && incommingErr.request.query,
      mutation: incommingErr.request && incommingErr.request.mutation,
      subscription: incommingErr.request && incommingErr.request.subscription,
      operationName: incommingErr.request && incommingErr.request.operationName,
      variables: incommingErr.request && incommingErr.request.variables,
      source: incommingErr.source ? incommingErr.source : '',
    };
    if (cleanErr.user && cleanErr.user.password) {
      delete cleanErr.user.password;
    }
    if (cleanErr.variables && cleanErr.variables.password) {
      delete cleanErr.variables.password;
    }
    errorActions.create({ info: cleanErr })
      .then((createdErr) => {
        publishNewError(createdErr);
        resolve(createdErr);
      })
      .catch((err) => {
        reject(err);
      });
  });

const errorActions = {
  ...errorFunctions,
};

export default {
  ...errorActions,
  handleError,
};
