import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Tag {
    id: ID!,
    color: String!,
    content: String!
  }
`

export default { typeDefs };