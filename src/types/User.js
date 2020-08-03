import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';
import { UserRoleModel } from './index';
import { userRoleActions } from '../actions';
import DateScalar from './scalars/Date';
import Gender from './enums/Gender';
import Location, { LocationInput } from './others/Location';
import Language from './enums/Language';

export const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    _id: { type: GraphQLID },
    userRoleId: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    birthDate: { type: GraphQLString },
    gender: { type: Gender },
    location: { type: LocationInput },
    addressStreet: { type: GraphQLString },
    addressNumber: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    fullAddress: { type: GraphQLString },
    image: { type: GraphQLString },
    language: { type: Language },
    telephone: { type: GraphQLString },
    acceptedTerms: { type: DateScalar },
  }),
});

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    userRole: {
      type: new GraphQLNonNull(UserRoleModel),
      resolve: (parent) => userRoleActions.findById(parent.userRoleId),
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    birthDate: { type: GraphQLString },
    gender: { type: Gender },
    location: { type: Location },
    addressStreet: { type: GraphQLString },
    addressNumber: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    fullAddress: { type: GraphQLString },
    image: { type: GraphQLString },
    language: { type: Language },
    telephone: { type: GraphQLString },
    acceptedTerms: { type: DateScalar },
    lastLogin: { type: DateScalar },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
    deleted: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdAt: { type: DateScalar },
    updatedAt: { type: DateScalar },
  }),
});
