import { gql } from 'apollo-server-express';
import Post from '../../models/post';

export const typeDefs = gql`
  enum OrderEnum {
    DATE
  }

  enum Direction {
    ASC
    DESC
  }

  type Query {
    posts(
      orderBy: OrderEnum = DATE,
      orderDirection: Direction = ASC,
      cursor: String,
      limit: Int = 10
    ): PostConnection!
    post(id: ID!): Post
  }
`;

export const resolvers = {
  Query: {
    posts: async (_root, { orderBy, orderDirection, cursor, limit }) => {
      console.log({ orderBy, orderDirection, cursor, limit });
      let orderOn;
      switch (orderBy) {
        case 'DATE':
          orderOn = '_id'; // MongoDB IDs include date/time info
          break;
        default: 
          orderOn = '_id';
      }

      const orderDir = orderDirection === 'DESC' ? '$lt' : '$gt';
      const sortDir = orderDirection === 'DESC' ? -1 : 1;

      let posts = [];
      
      if (cursor) {
        posts = await Post.find({ [orderOn]: { [orderDir]: cursor }})
          .sort({ [orderOn]: sortDir })
          .limit(limit)
          .populate({ path: 'user', select: 'id username'})
          .populate('tags');
      } else {
        posts = await Post.find({})
          .sort({ [orderOn]: sortDir })
          .limit(limit)
          .populate({ path: 'user', select: 'id username'})
          .populate('tags');
      }

      const endCursor = posts[posts.length - 1][orderOn]
      const totalPromise = Post.estimatedDocumentCount();
      const totalRemainingPromise = Post.find({ [orderOn]: { [orderDir]: endCursor }})
        .count();

      const [total, totalRemaining] = await Promise.all([totalPromise, totalRemainingPromise]);
      const hasNextPage = totalRemaining > 0;
      
      return {
        totalCount: total - totalRemaining,
        pageInfo: {
          endCursor,
          hasNextPage
        },
        edges: posts.map(post => ({
          cursor: post[orderOn],
          node: post
        }))
      };
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