import { gql } from 'apollo-server-express';
import comments from '../../../assets/comments';

export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!,
    username: String!,
    comments: [Comment!]!,
    posts: [Post!]!,
    dateJoined: Date!
  }

  type Token {
    value: String!
  }
`

// export const resolvers = {
//   User: {
//     comments: ({ id }) => {
//       const userComments = comments.reduce((found, curr) => {
//         if (curr.userID === id) found.push(curr);
//       }, []);
//       return userComments;
//     }
//   }
// }

export default {
  typeDefs,
  
}