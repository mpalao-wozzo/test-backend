import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

export const MusicGenderInput = new GraphQLInputObjectType({
  name: 'MusicGenderInput',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    active: { type: GraphQLBoolean },
    deleted: { type: GraphQLBoolean },
  }),
});

export default new GraphQLObjectType({
  name: 'MusicGender',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
    deleted: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});
