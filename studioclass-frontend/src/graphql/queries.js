import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query getPosts(
    $orderBy: OrderEnum = DATE,
    $orderDirection: Direction = ASC,
    $cursor: String,
    $limit: Int = 10
  ) {
    posts(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      cursor: $cursor,
      limit: $limit
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
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
  }
`

export const GET_SINGLE_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      audioFiles {
        title
        audioFileUri
      }
      description
      dateCreatedAt
      tags {
        id
        content
        color
      }
      user {
        id
        username
      }
      comments {
        id
        content
        tags {
          id
          content
          color
        }
        user {
          id
          username
        }
        commentDate
      }
    }
  }
`

export const GET_TAGS = gql`
  query($postID: ID) {
    getTags(postID: $postID) {
      id
      content
      color
    }
  }
`

export const SIGNED_IN_USER = gql`
  query getUser($userID: ID, $includePosts: Boolean = false, $includeComments: Boolean = false) {
    getUser(userID: $userID, includePosts: $includePosts, includeComments: $includeComments) {
      id
      username
      posts @include(if: $includePosts) {
        id
        title
        tags {
          id
          content
          color
        }
        dateCreatedAt
      }
      comments @include(if: $includeComments) {
        id
        content
        post {
          id
          title
          user {
            username
          }
        }
        commentDate
        tags {
          id
          content
          color
        }
      }
      dateJoined
    }
  }
`