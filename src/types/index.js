import ErrorStr from './Error';
import User, { UserInput } from './User';
import UserRole from './UserRole';
import RefreshToken from './RefreshToken';

export const ErrorModel = ErrorStr;
export const UserModel = User;
export const UserInputModel = UserInput;
export const UserRoleModel = UserRole;
export const RefreshTokenModel = RefreshToken;

export default {
  ErrorModel,
  UserModel,
  UserInputModel,
  UserRoleModel,
  RefreshTokenModel,
};
