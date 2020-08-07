import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { songActions } from '../actions';
import { SongModel } from '../types';
import { isAdminOrMore, unauthorized } from '../context';

const songs = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SongModel))),
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    artistId: { type: GraphQLID },
    genretId: { type: GraphQLID },
    releaseDate: { type: GraphQLString },
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

export default {
  songs,
};
