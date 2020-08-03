import ErrorStr from './Error';
import User, { UserInput } from './User';
import UserRole from './UserRole';
import RefreshToken from './RefreshToken';
import Artist from './Artist';

export const ErrorModel = ErrorStr;
export const UserModel = User;
export const UserInputModel = UserInput;
export const UserRoleModel = UserRole;
export const RefreshTokenModel = RefreshToken;
export const ArtistModel = Artist;

export default {
  ErrorModel,
  UserModel,
  UserInputModel,
  UserRoleModel,
  RefreshTokenModel,
  ArtistModel,
};
