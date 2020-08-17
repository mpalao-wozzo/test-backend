import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { isAdminOrMore, unauthorized } from '../context';
import { songActions } from '../actions';
import { SongModel } from '../types';

const songs = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SongModel))),
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    artistId: { type: GraphQLID },
    genreId: { type: GraphQLID },
    album: { type: GraphQLString },
    deleted: { type: GraphQLBoolean },
    active: { type: GraphQLBoolean },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.findManySongsByFilter(args) :
      unauthorized();
  },
};

const findSongsBySearch = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SongModel))),
  args: {
    search: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, { search }) {
    return songActions.findSongsBySearch(search);
  },
};

export default {
  findSongsBySearch,
  songs,
};
