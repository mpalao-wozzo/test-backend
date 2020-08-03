import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import DateScalar from './scalars/Date';

export default new GraphQLObjectType({
  name: 'Error',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    info: { type: new GraphQLNonNull(GraphQLJSONObject) },
    createdAt: { type: DateScalar },
    updatedAt: { type: DateScalar },
  }),
});
