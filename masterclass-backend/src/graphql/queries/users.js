import { gql } from 'apollo-server-express';
import User from '../../models/user';

// Get rid of includePosts/includeComments once dataloader is implemented
export const typeDefs = gql`
  enum ContentType {
    POSTS
    COMMENTS
  }

  type Query {
    getUser(userID: ID, includePosts: Boolean!, includeComments: Boolean!): User
    me: User
  }
`

export const resolvers = {
  Query: {
    getUser: async (_root, { userID, includePosts, includeComments }, { currentUser }) => {
      let id = userID;
      if (!id) {
        id = currentUser ? currentUser._id : null;
      }
      if (includePosts) {
        const user = await User.findById(id)
          .populate({
            path: 'posts',
            select: '-user -description -audioFileUris -comments',
            populate: { path: 'tags' }
          });
        return user;
      } else if (includeComments) {
        const user = await User.findById(id)
          .populate({
            path: 'comments',
            select: '-user',
            populate: [
              {
                path: 'post',
                select: '-description -audioFileUris -comments -tags -dateCreatedAt',
                populate: {
                  path: 'user',
                  select: 'username'
                }
              },
              {
                path: 'tags'
              }
            ]
          });
        return user;
      } else {
        // const user = await User.findById(id)
        //   .populate({
        //     path: 'posts',
        //     select: '-user -description -audioFileUris -comments',
        //     populate: { path: 'tags' }
        //   })
        //   .populate({
        //     path: 'comments',
        //     select: '-user',
        //     populate: {
        //       path: 'tags post',
        //       select: '-description -audioFileUris -comments -tags -dateCreatedAt',
        //       populate: {
        //         path: 'user',
        //         select: 'username'
        //       }
        //     }
        //   });

        const user = await User.findById(id);

        return user;
      }
    },
    me: (_root, _args, context) => {
      const user = context.currentUser;
      delete user.passwordHash;
      return user;
    }
  }
};

export default { typeDefs, resolvers };