import ErrorStr from './Error';
import User, { UserInput } from './User';
import UserRole from './UserRole';
import RefreshToken from './RefreshToken';
import Artist, { ArtistInput } from './Artist';

export const ErrorModel = ErrorStr;
export const UserModel = User;
export const UserInputModel = UserInput;
export const UserRoleModel = UserRole;
export const RefreshTokenModel = RefreshToken;
export const ArtistModel = Artist;
export const ArtistInputModel = ArtistInput;

export default {
  ErrorModel,
  UserModel,
  UserInputModel,
  UserRoleModel,
  RefreshTokenModel,
  ArtistModel,
  ArtistInputModel,
};
