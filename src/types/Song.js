import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

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
    artistId: { type: new GraphQLNonNull(GraphQLID) },
    deleted: { type: new GraphQLNonNull(GraphQLBoolean) },
    genreId: { type: new GraphQLNonNull(GraphQLID) },
    imgUrl: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    releaseDate: { type: new GraphQLNonNull(GraphQLString) },
    songUrl: { type: GraphQLString },
  }),
});
