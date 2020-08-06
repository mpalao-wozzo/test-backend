import Artist, { ArtistInput } from './Artist';
import ErrorStr from './Error';
import Genre, { GenreInput } from './Genre';
import RefreshToken from './RefreshToken';
import User, { UserInput } from './User';
import UserRole from './UserRole';

export const ArtistInputModel = ArtistInput;
export const ArtistModel = Artist;
export const ErrorModel = ErrorStr;
export const GenreInputModel = GenreInput;
export const GenreModel = Genre;
export const RefreshTokenModel = RefreshToken;
export const UserModel = User;
export const UserInputModel = UserInput;
export const UserRoleModel = UserRole;

export default {
  ArtistInputModel,
  ArtistModel,
  ErrorModel,
  GenreInputModel,
  GenreModel,
  RefreshTokenModel,
  UserModel,
  UserInputModel,
  UserRoleModel,
};
