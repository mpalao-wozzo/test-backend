import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { artistActions } from '../actions';
import { ArtistModel } from '../types';

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
    return artistActions.findManyArtistsByFilter(args);
  },
};

export default {
  artists,
};
