import { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLBoolean } from 'graphql';
import DateScalar from './scalars/Date';

export default new GraphQLObjectType({
  name: 'UserRole',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdAt: { type: DateScalar },
    updatedAt: { type: DateScalar },
  }),
});
