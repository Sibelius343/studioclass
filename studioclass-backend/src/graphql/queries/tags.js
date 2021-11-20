import { gql } from 'apollo-server-express';
import Tag from '../../models/tag';
import Post from '../../models/post';

export const typeDefs = gql`
  type Query {
    getTags(postID: ID): [Tag!]!
  }
`;

export const resolvers = {
  Query: {
    getTags: async (_root, { postID }) => {
      if (postID) {
        const { tags } = await Post.findById(postID)
          .select('tags')
          .populate('tags')
        return tags;
      } else {
        const tags = await Tag.find({});
        return tags;
      }
    }
  }
};

export default { typeDefs, resolvers };