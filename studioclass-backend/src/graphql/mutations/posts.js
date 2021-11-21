import { gql, AuthenticationError } from 'apollo-server-express';
import { GraphQLUpload } from 'graphql-upload';
import audioBucket from '../../utils/gCloud';
import Post from '../../models/post';
import config from '../../utils/config';
import pubsub from '../../utils/pubsub';

export const typeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type Mutation {
    createPost(
      title: String!,
      description: String,
      tags: [String!]!
      files: [Upload!]!
    ): Post
  }

  type Subscription {
    postAdded: Post!
  }
`

export const resolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    createPost: async (_root, { title, description, tags, files }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated');
      
      const uploadedFiles = await Promise.all(files.map(async (file) => {
        const { createReadStream, filename } = await file;
        const cloudFile = audioBucket.file(filename);

        await new Promise(resolve => 
          createReadStream()
            .pipe(
              cloudFile.createWriteStream({
                gzip: false
              })
            )
            .on('finish', resolve)
        );

        const url = `audio/${filename}`;
        return { title: filename, audioFileUri: url };
      }));

      const newPost = new Post({
        title,
        description,
        tags,
        audioFiles: uploadedFiles,
        dateCreatedAt: new Date(),
        user: currentUser._id
      });
      const { _id: id } = await newPost.save();

      currentUser.posts = [...currentUser.posts, id];
      await currentUser.save();

      await newPost
        .populate([{ path: 'user', select: 'id username'}, { path: 'tags' }]);

      pubsub.publish('POST_ADDED', { postAdded: newPost });

      return newPost;
    }
  },
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator(['POST_ADDED'])
    }
  }
}

export default { typeDefs, resolvers };