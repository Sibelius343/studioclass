import { gql } from '@apollo/client';

export const POST_ADDED = gql`
  subscription {
    postAdded {
      cursor
      node {
        id
        title
        user {
          id
          username
        }
        dateCreatedAt
        tags {
          id
          content
          color
        }
      }
    }
  }
`

export const COMMENT_ADDED = gql`
  subscription {
    commentAdded {
      id
      content 
      user {
        id
        username
      }
      tags {
        id
        content
        color
      }
      post {
        id
      }
      commentDate
    }
  }
`