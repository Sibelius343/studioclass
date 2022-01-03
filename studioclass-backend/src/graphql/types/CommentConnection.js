import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type CommentEdge {
    cursor: String!
    node: Comment!
  }

  type CommentConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [CommentEdge!]!
  }
`;

export default { typeDefs };