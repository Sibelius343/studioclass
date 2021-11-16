import posts from "./queries/posts";
import tags from "./queries/tags";
import users from './queries/users';
import userMutations from './mutations/users';
import postMutations from './mutations/posts';
import commentMutations from './mutations/comments';
import tagMutations from './mutations/tags';
import Comment from "./types/Comment";
import Post from './types/Post';
import User from './types/User';
import Tag from "./types/Tag";
import AudioTrack from "./types/AudioTrack";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';
import dateScalar from "./scalars/Date";

const typeDefs = [
  userMutations.typeDefs,
  posts.typeDefs,
  tags.typeDefs,
  users.typeDefs,
  postMutations.typeDefs,
  commentMutations.typeDefs,
  tagMutations.typeDefs,
  Comment.typeDefs,
  Post.typeDefs,
  User.typeDefs,
  Tag.typeDefs,
  AudioTrack.typeDefs
];

const resolvers = merge(
  { Date: dateScalar },
  posts.resolvers,
  tags.resolvers,
  users.resolvers,
  userMutations.resolvers,
  postMutations.resolvers,
  commentMutations.resolvers,
  tagMutations.resolvers
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;