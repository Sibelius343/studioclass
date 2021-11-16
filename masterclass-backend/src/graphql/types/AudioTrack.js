import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type AudioTrack {
    title: String!
    audioFileUri: String!
  }
`

export default { typeDefs }