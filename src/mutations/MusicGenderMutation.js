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

export default {
  createMusicGender,
};
