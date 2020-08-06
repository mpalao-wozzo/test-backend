import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { musicGenderActions } from '../actions';
import { MusicGenderModel } from '../types';

const musicGenders = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MusicGenderModel))),
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    deleted: { type: GraphQLBoolean },
    active: { type: GraphQLBoolean },
  },
  resolve(parent, args) {
    return musicGenderActions.findManyMusicGendersByFilter(args);
  },
};

export default {
  musicGenders,
};
