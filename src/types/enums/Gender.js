import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'Gender',
  values: {
    MALE: { value: 'M' },
    FEMALE: { value: 'F' },
    MIXT: { value: 'X' },
  },
});
