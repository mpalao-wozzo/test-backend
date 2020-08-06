import { GraphQLNonNull, GraphQLID } from 'graphql';
import { artistActions } from '../actions';
import { ArtistModel, ArtistInputModel } from '../types';
import { isAdminOrMore, unauthorized } from '../context';

const createArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artist: { type: new GraphQLNonNull(ArtistInputModel) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      artistActions.createArtist(args.artist) :
      unauthorized();
  },
};

const deleteArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artistId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      artistActions.update(args.artistId, { deleted: true }) :
      unauthorized();
  },
};

const disableArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artistId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      artistActions.update(args.artistId, { active: false }) :
      unauthorized();
  },
};

const enableArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artistId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      artistActions.update(args.artistId, { active: true }) :
      unauthorized();
  },
};

const restoreArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artistId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      artistActions.update(args.artistId, { deleted: false }) :
      unauthorized();
  },
};

const updateArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artist: { type: new GraphQLNonNull(ArtistInputModel) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      artistActions.updateArtist(args.artist) :
      unauthorized();
  },
};

export default {
  createArtist,
  deleteArtist,
  disableArtist,
  enableArtist,
  restoreArtist,
  updateArtist,
};
