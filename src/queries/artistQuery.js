import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { ArtistModel } from '../types';
import { artistActions } from '../actions';
// import { isAdmin } from '../context';

const artists = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ArtistModel))),
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    delete: { type: GraphQLBoolean },
    active: { type: GraphQLBoolean },
  },
  resolve(parent, args, { user, userRole }) {
    return artistActions.findManyArtistsByFilter({ ...args });
  },
};

const artist = {
  type: new GraphQLNonNull(ArtistModel),
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    delete: { type: GraphQLBoolean },
    active: { type: GraphQLBoolean },
  },
  resolve(parent, args, { user, userRole }) {
    return artistActions.findOneArtistByFilter({ ...args });
  },
};

export default {
  artist,
  artists,
};
