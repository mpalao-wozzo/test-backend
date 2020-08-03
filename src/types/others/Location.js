import { GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLFloat, GraphQLList, GraphQLInputObjectType } from 'graphql';

export const LocationInput = new GraphQLInputObjectType({
  name: 'LocationInput',
  fields: () => ({
    type: { type: new GraphQLNonNull(GraphQLString) },
    coordinates: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) },
  }),
});

export default new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    type: { type: new GraphQLNonNull(GraphQLString) },
    coordinates: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLFloat))) },
  }),
});
