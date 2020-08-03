import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { ArtistModel, ArtistInputModel } from '../types';
import { isAdminOrMore, unauthorized } from '../context';
import { artistActions } from '../actions';

const createArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artist: { type: new GraphQLNonNull(ArtistInputModel) },
  },
  resolve(parent, args, { user, userRole }) {
    if (user && isAdminOrMore(userRole)) {
      return artistActions.createArtist(args.artist);
    }
    return unauthorized();
  },
};

export default {
  createArtist,
};
