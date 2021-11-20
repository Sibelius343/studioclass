import { gql } from 'apollo-server-express';
import Comment from '../../models/comment';
import Tag from '../../models/tag';
import Post from '../../models/post';
import pubsub from '../../utils/pubsub';

export const typeDefs = gql`
  type Mutation {
    createComment(postID: ID!, content: String!, tags: [String!]!): Comment
  }

  type Subscription {
    commentAdded: Comment!
  }
`

export const resolvers = {
  Mutation: {
    createComment: async (_root, { postID, content, tags }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated');

      const newComment = new Comment({
        post: postID,
        content,
        user: currentUser._id,
        tags,
        commentDate: new Date()
      })

      const { _id: id } = await newComment.save();

      const post = await Post.findById(postID);
      post.comments = [...post.comments, id];
      await post.save();

      currentUser.comments = [...currentUser.comments, id];
      await currentUser.save();

      await newComment.populate(
        [
          { path: 'user tags', select: '-comments -passwordHash' },
          { path: 'post', select: 'id' }
        ]
      );

      pubsub.publish('COMMENT_ADDED', { commentAdded: newComment });

      return newComment;
    }
  },
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator(['COMMENT_ADDED'])
    }
  }
}

export default { typeDefs, resolvers };