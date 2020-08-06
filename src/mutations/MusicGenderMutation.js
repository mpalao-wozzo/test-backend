import { GraphQLNonNull, GraphQLID } from 'graphql';
import { musicGenderActions } from '../actions';
import { MusicGenderModel, MusicGenderInputModel } from '../types';
import { isAdminOrMore, unauthorized } from '../context';

const createMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGender: { type: new GraphQLNonNull(MusicGenderInputModel) },
  },
  resolve(parent, args, { userRole }) {
    if (isAdminOrMore(userRole)) {
      return musicGenderActions.createMusicGender(args.musicGender);
    }
    return unauthorized();
  },
};

const deleteMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGenderId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    if (args.musicGenderId && isAdminOrMore(userRole)) {
      return musicGenderActions.update(args.musicGenderId, { deleted: true });
    }
    return unauthorized();
  },
};

const disableMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGenderId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    if (args.musicGenderId && isAdminOrMore(userRole)) {
      return musicGenderActions.update(args.musicGenderId, { active: false });
    }
    return unauthorized();
  },
};

const enableMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGenderId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args, { userRole }) {
    if (args.musicGenderId && isAdminOrMore(userRole)) {
      return musicGenderActions.update(args.musicGenderId, { active: true });
    }
    return unauthorized();
  },
};

const updateMusicGender = {
  type: new GraphQLNonNull(MusicGenderModel),
  args: {
    musicGender: { type: new GraphQLNonNull(MusicGenderInputModel) },
  },
  resolve(parent, args, { userRole }) {
    if (isAdminOrMore(userRole)) {
      return musicGenderActions.updateMusicGender(args.musicGender);
    }
    return unauthorized();
  },
};

export default {
  createMusicGender,
  deleteMusicGender,
  disableMusicGender,
  enableMusicGender,
  updateMusicGender,
};
