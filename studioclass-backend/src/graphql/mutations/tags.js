import { gql } from 'apollo-server-express';
import Tag from '../../models/tag';

export const typeDefs = gql`
  type Mutation {
    newTag(content: String!): Tag!
  }
`

export const resolvers = {
  Mutation: {
    newTag: async (_root, { content }) => {
      // Generate random color hex 
      // 16773120 is the number of desired colors (to shift away from
      // white a little), so subtract (16777216 - 16773120 = 4096)
      // |0 (bitwise or 0) converts number to integer
      const color = '#'+(Math.random()*((1<<24) - 4096)|0).toString(16);

      const tag = new Tag({
        content,
        color
      })

      const savedTag = await tag.save();
      return savedTag;
    }
  }
}

export default { typeDefs, resolvers }