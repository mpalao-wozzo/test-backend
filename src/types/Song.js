import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';
import { ArtistModel, GenreModel } from '.';
import artistActions from '../actions/artistActions';
import genreActions from '../actions/genreActions';

export const SongInput = new GraphQLInputObjectType({
  name: 'SongInput',
  fields: () => ({
    _id: { type: GraphQLID },
    active: { type: GraphQLBoolean },
    album: { type: new GraphQLNonNull(GraphQLString) },
    artistId: { type: new GraphQLNonNull(GraphQLID) },
    deleted: { type: GraphQLBoolean },
    genreId: { type: new GraphQLNonNull(GraphQLID) },
    imgUrl: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    releaseDate: { type: GraphQLString },
    songUrl: { type: GraphQLString },
  }),
});

export default new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
    album: { type: new GraphQLNonNull(GraphQLString) },
    artist: {
      type: new GraphQLNonNull(ArtistModel),
      resolve: (parent) => artistActions.findById(parent.artistId),
    },
    deleted: { type: new GraphQLNonNull(GraphQLBoolean) },
    genre: {
      type: new GraphQLNonNull(GenreModel),
      resolve: (parent) => genreActions.findById(parent.genreId),
    },
    imgUrl: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    releaseDate: { type: new GraphQLNonNull(GraphQLString) },
    songUrl: { type: GraphQLString },
  }),
});
