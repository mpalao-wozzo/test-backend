import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { genreActions } from '../actions';
import { GenreModel } from '../types';
import { isAdminOrMore, unauthorized } from '../context';

const genres = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GenreModel))),
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    deleted: { type: GraphQLBoolean },
    active: { type: GraphQLBoolean },
  },
  resolve(parent, args, { userRole }) {
    return (isAdminOrMore(userRole)) ?
      genreActions.findManyGenresByFilter(args) :
      unauthorized;
  },
};

export default {
  genres,
};
