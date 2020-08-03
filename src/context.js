import { ForbiddenError, PubSub } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { ROLE_SUPERADMIN, ROLE_ADMIN, ROLE_USER } from './utils/constants';

export const getRequestUser = (authorization) => {
  // si no es options y tiene authorization
  if (authorization && 'Bearer' === authorization.split(' ')[0]) {
    const token = authorization.split(' ')[1];
    return jwt.decode(token);
  }
  return null;
};

export const pubsub = new PubSub();

export const isSuperadmin = (userRole) => userRole === ROLE_SUPERADMIN;
export const isAdmin = (userRole) => userRole === ROLE_ADMIN;
export const isAdminOrMore = (userRole) => isAdmin(userRole) || isSuperadmin(userRole);

// User
export const isUser = (userRole) => userRole === ROLE_USER;
export const isUserOrMore = (userRole) => isUser(userRole) || isAdminOrMore(userRole);

export const unauthorized = (message) => new ForbiddenError(message || 'Unauthorized');

export default (elem) => {
  const headers = (elem.req && elem.req.headers) || elem.connectionParams;
  if (headers) {
    const method = elem.req && elem.req.method;
    const { authorization, 'apollo-query-plan-experimental': experimental } = headers;

    const context = {
      pubsub,
    };

    if (('OPTIONS' !== method || !method) && authorization && '1' !== experimental) {
      // try to retrieve a user with the token
      const user = getRequestUser(authorization);

      // add the user to the context
      return {
        ...context,
        user,
        userRole: user && user.userRoleId && user.userRoleId.name,
      };
    }
    return context;
  }
  return elem && elem.connection && elem.connection.context;
};
