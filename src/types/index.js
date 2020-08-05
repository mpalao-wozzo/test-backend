import Artist, { ArtistInput } from './Artist';
import ErrorStr from './Error';
import Gender, { GenderInput } from './Gender';
import RefreshToken from './RefreshToken';
import User, { UserInput } from './User';
import UserRole from './UserRole';

export const ArtistInputModel = ArtistInput;
export const ArtistModel = Artist;
export const ErrorModel = ErrorStr;
export const GenderInputModel = GenderInput;
export const GenderModel = Gender;
export const RefreshTokenModel = RefreshToken;
export const UserModel = User;
export const UserInputModel = UserInput;
export const UserRoleModel = UserRole;

export default {
  ArtistInputModel,
  ArtistModel,
  ErrorModel,
  GenderInputModel,
  GenderModel,
  RefreshTokenModel,
  UserModel,
  UserInputModel,
  UserRoleModel,
};
