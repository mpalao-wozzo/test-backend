import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import User from '../User';

export default new GraphQLObjectType({
  name: 'LoginResponse',
  fields: () => ({
    token: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: new GraphQLNonNull(GraphQLString) },
    expiryDate: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(User) },
  }),
});
