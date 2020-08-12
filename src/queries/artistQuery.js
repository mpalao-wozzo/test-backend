import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { artistActions } from '../actions';
import { ArtistModel } from '../types';
import { cleanSearchText } from '../utils/helpers';
import { isAdminOrMore, unauthorized } from '../context';

const artists = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ArtistModel))),
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    deleted: { type: GraphQLBoolean },
    active: { type: GraphQLBoolean },
  },
  resolve(parent, args, { userRole }) {
    return (isAdminOrMore(userRole)) ?
      artistActions.findManyArtistsByFilter(args) :
      unauthorized();
  },
};

const searchArtists = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ArtistModel))),
  args: {
    filter: { type: GraphQLString },
  },
  resolve(parent, args, { userRole }) {
    return (isAdminOrMore(userRole)) ?
      artistActions.findByQuery({ name: { $regex: cleanSearchText(args.filter), $options: 'i' } }) :
      unauthorized();
  },
};

export default {
  artists,
  searchArtists,
};
