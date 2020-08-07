import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

export const SongInput = new GraphQLInputObjectType({
  name: 'SongInput',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    imgUrl: { type: GraphQLString },
    songUrl: { type: GraphQLString },
    artistId: { type: new GraphQLNonNull(GraphQLID) },
    genreId: { type: new GraphQLNonNull(GraphQLID) },
    releaseDate: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    deleted: { type: GraphQLBoolean },
  }),
});

export default new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    imgUrl: { type: GraphQLString },
    songUrl: { type: GraphQLString },
    artistId: { type: new GraphQLNonNull(GraphQLID) },
    genreId: { type: new GraphQLNonNull(GraphQLID) },
    releaseDate: { type: new GraphQLNonNull(GraphQLString) },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
    deleted: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});
