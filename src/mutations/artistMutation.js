import { GraphQLNonNull, GraphQLID } from 'graphql';
import { artistActions } from '../actions';
import { ArtistModel, ArtistInputModel } from '../types';
import { isAdminOrMore, unauthorized } from '../context';

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

const deleteArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artistId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { user, userRole }) {
    if (user && isAdminOrMore(userRole)) {
      return artistActions.deleteArtist(args.artistId);
    }
    return unauthorized();
  },

};

const updateArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artist: { type: new GraphQLNonNull(ArtistInputModel) },
  },
  resolve(parent, args, { user, userRole }) {
    if (user && isAdminOrMore(userRole)) {
      return artistActions.updateArtist(args.artist);
    }
    return unauthorized();
  },
};

export default {
  createArtist,
  deleteArtist,
  updateArtist,
};
