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
      return artistActions.update(args.artistId, { deleted: true });
    }
    return unauthorized();
  },
};

const disableArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artistId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    if (args.artistId && isAdminOrMore(userRole)) {
      return artistActions.update(args.artistId, { active: false });
    }
    return unauthorized();
  },
};

const enableArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artistId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    if (args.artistId && isAdminOrMore(userRole)) {
      return artistActions.update(args.artistId, { active: true });
    }
    return unauthorized();
  },
};

const restoreArtist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    artistId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    if (args.artistId && isAdminOrMore(userRole)) {
      return artistActions.update(args.artistId, { deleted: false });
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
  disableArtist,
  enableArtist,
  restoreArtist,
  updateArtist,
};
