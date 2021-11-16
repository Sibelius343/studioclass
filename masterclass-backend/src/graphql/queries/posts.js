import { gql } from 'apollo-server-express';
import Post from '../../models/post';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
`;

export const resolvers = {
  Query: {
    posts: async () => {
      const posts = await Post.find({})
        .populate({ path: 'user', select: 'id username'})
        .populate('tags');
      return posts;
    },
    post: async (_root, args) => {
      const id = args.id;
      const post = await Post.findById(id)
      .populate({
        path: 'comments',
        select: '-post',
        populate: { path: 'user tags', select: '-comments -passwordHash' }
      })
      .populate({
        path: 'user',
        select: '-passwordHash'
      })
      .populate('tags');

      return post;
    }
  }
};

export default {
  typeDefs,
  resolvers
};