import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type PostEdge {
    cursor: String!
    node: Post!
  }

  type PostConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [PostEdge!]!
  }
`

export default { typeDefs }