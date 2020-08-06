import { GraphQLNonNull, GraphQLID } from 'graphql';
import { genreActions } from '../actions';
import { GenreModel, GenreInputModel } from '../types';
import { isAdminOrMore, unauthorized } from '../context';

const createGenre = {
  type: new GraphQLNonNull(GenreModel),
  args: {
    genre: { type: new GraphQLNonNull(GenreInputModel) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      genreActions.createGenre(args.genre) :
      unauthorized();
  },
};

const deleteGenre = {
  type: new GraphQLNonNull(GenreModel),
  args: {
    genreId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      genreActions.update(args.genreId, { deleted: true }) :
      unauthorized();
  },
};

const disableGenre = {
  type: new GraphQLNonNull(GenreModel),
  args: {
    genreId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      genreActions.update(args.genreId, { active: false }) :
      unauthorized();
  },
};

const enableGenre = {
  type: new GraphQLNonNull(GenreModel),
  args: {
    genreId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      genreActions.update(args.genreId, { active: true }) :
      unauthorized();
  },
};

const restoreGenre = {
  type: new GraphQLNonNull(GenreModel),
  args: {
    genreId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      genreActions.update(args.genreId, { deleted: false }) :
      unauthorized();
  },
};

const updateGenre = {
  type: new GraphQLNonNull(GenreModel),
  args: {
    genre: { type: new GraphQLNonNull(GenreInputModel) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      genreActions.updateGenre(args.genre) :
      unauthorized();
  },
};

export default {
  createGenre,
  deleteGenre,
  disableGenre,
  enableGenre,
  restoreGenre,
  updateGenre,
};
