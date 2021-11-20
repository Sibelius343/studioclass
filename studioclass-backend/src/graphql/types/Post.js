import User from '../../models/user';
import Comment from '../../models/comment';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Post {
    id: ID!,
    title: String!,
    user: User!,
    audioFiles: [AudioTrack!]!,
    description: String,
    dateCreatedAt: Date!,
    comments: [Comment!]!,
    tags: [Tag!]!
  }
`

// export const resolvers = {
//   Post: {
//     user: async (post) => {
//       await post.populate({ path: 'user', select: 'id username'});
//     },
//     comments: async (post) => {
//       await post.populate({
//         path: 'comments',
//         select: '-post',
//         populate: { path: 'user tags', select: '-comments -passwordHash' }
//       });
//     },
//     tags: async (post) => {
//       await post.populate('tags');
//     }
//   }
// }

export default {
  typeDefs,

};