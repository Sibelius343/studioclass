import { gql } from 'apollo-server-express';
// import Post from '../../models/post';
// import Tag from '../../models/tag';
// import User from '../../models/user';

export const typeDefs = gql`
  scalar Date

  type Comment {
    id: ID!,
    tags: [Tag!]!,
    user: User!,
    post: Post!,
    content: String!,
    commentDate: Date!
  }
`

// export const resolvers = {
//   Comment: {
//     user: async ({ user }) => {
//       const foundUser = await User.findById({ user });
//       return foundUser;
//     },
//     post: async ({ post }) => {
//       const foundPost = await Post.findById({ post });
//       return foundPost;
//     },
//     tags: ({ tags }) => {
//       const foundTags = tags.map(async (t) => {
//         const foundTag = await Tag.findById(t);
//         if (foundTag) return foundTag;
//       });
//       console.log(foundTags);
//       return foundTags;
//     }
//   }
// }

export default {
  typeDefs,

}