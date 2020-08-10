import { GraphQLNonNull, GraphQLID } from 'graphql';
import { GraphQLUpload } from 'apollo-server';
import { isAdminOrMore, unauthorized } from '../context';
import { songActions } from '../actions';
import { SongModel, SongInputModel } from '../types';

const createSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    song: { type: new GraphQLNonNull(SongInputModel) },
    imgUrl: { type: GraphQLUpload },
    songUrl: { type: GraphQLUpload },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.createSong(args.imgUrl, args.songUrl, args.song) :
      unauthorized();
  },
};

const deleteSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    songId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.update(args.songId, { deleted: true }) :
      unauthorized();
  },
};

const disableSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    songId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.update(args.songId, { active: false }) :
      unauthorized();
  },
};

const enableSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    songId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.update(args.songId, { active: true }) :
      unauthorized();
  },
};

const restoreSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    songId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.update(args.songId, { deleted: false }) :
      unauthorized();
  },
};

const updateSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    song: { type: new GraphQLNonNull(SongInputModel) },
    imgUrl: { type: GraphQLUpload },
    songUrl: { type: GraphQLUpload },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.updateSong(args.imgUrl, args.songUrl, args.song) :
      unauthorized();
  },
};

export default {
  createSong,
  deleteSong,
  disableSong,
  enableSong,
  restoreSong,
  updateSong,
};
