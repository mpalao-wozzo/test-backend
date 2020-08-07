import { GraphQLNonNull, GraphQLString } from 'graphql';
import { songActions } from '../actions';
import { SongModel, SongInputModel } from '../types';
import { isAdminOrMore, unauthorized } from '../context';

const createSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    song: { type: new GraphQLNonNull(SongInputModel) },
    imgUrl: { type: GraphQLString },
    songUrl: { type: GraphQLString },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.createArtist(args.imgUrl, args.songUrl, args.song) :
      unauthorized();
  },
};

export default {
  createSong,
};
