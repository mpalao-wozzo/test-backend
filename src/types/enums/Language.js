import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'Language',
  values: {
    SPANISH: { value: 'es' },
    ENGLISH: { value: 'en' },
  },
});
