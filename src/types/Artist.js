import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

export const ArtistInput = new GraphQLInputObjectType({
  name: 'ArtistInput',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    deleted: { type: GraphQLBoolean },
  }),
});

export default new GraphQLObjectType({
  name: 'Artist',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
    deleted: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});
