import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }
`;

export default { typeDefs };