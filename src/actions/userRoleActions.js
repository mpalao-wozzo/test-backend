import userRoleModel from '../models/userRole';
import baseFunctionsGenerator from './base/baseFunctions';

const userRoleFunctions = baseFunctionsGenerator(userRoleModel);

const userRoleActions = {
  ...userRoleFunctions,
};

export default userRoleActions;
