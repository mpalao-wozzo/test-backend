import { GraphQLNonNull, GraphQLID } from 'graphql';
import { isAdminOrMore, unauthorized } from '../context';
import { musicGenderActions } from '../actions';
import { MusicGenderModel, MusicGenderInputModel } from '../types';

const createMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGender: { type: new GraphQLNonNull(MusicGenderInputModel) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      musicGenderActions.createMusicGender(args.musicGender) :
      unauthorized();
  },
};

const deleteMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGenderId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      musicGenderActions.update(args.musicGenderId, { deleted: true }) :
      unauthorized();
  },
};

const disableMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGenderId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      musicGenderActions.update(args.musicGenderId, { active: false }) :
      unauthorized();
  },
};

const enableMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGenderId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      musicGenderActions.update(args.musicGenderId, { active: true }) :
      unauthorized();
  },
};

const restoreMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGenderId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      musicGenderActions.update(args.musicGenderId, { deleted: false }) :
      unauthorized();
  },
};

const updateMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGender: { type: new GraphQLNonNull(MusicGenderInputModel) },
  },
  resolve(parent, args, { userRole }) {
    return isAdminOrMore(userRole) ?
      musicGenderActions.updateMusicGender(args.musicGender) :
      unauthorized();
  },
};

export default {
  createMusicGender,
  deleteMusicGender,
  disableMusicGender,
  enableMusicGender,
  restoreMusicGender,
  updateMusicGender,
};
