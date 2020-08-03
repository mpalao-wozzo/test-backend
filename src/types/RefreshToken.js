import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserModel } from './index';
import { userActions } from '../actions';
import DateScalar from './scalars/Date';

export default new GraphQLObjectType({
  name: 'RefreshToken',
  fields: () => ({
    _id: { type: GraphQLID },
    user: {
      type: new GraphQLNonNull(UserModel),
      resolve: (parent) => userActions.findById(parent.userId),
    },
    refreshToken: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: DateScalar },
    updatedAt: { type: DateScalar },
  }),
});
