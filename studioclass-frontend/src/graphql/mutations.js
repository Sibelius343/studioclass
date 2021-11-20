import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!,
    $description: String,
    $tags: [String!]!,
    $files: [Upload!]!,
  ) {
    createPost(
      title: $title,
      description: $description,
      tags: $tags,
      files: $files
    ) {
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment($postID: ID!, $content: String!, $tags: [String!]!) {
    createComment(
      postID: $postID,
      content: $content,
      tags: $tags
    ) {
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
    }
  }
`

export const NEW_TAG = gql`
  mutation newTag($content: String!) {
    newTag(content: $content) {
      id
      content
      color
    }
  }
`