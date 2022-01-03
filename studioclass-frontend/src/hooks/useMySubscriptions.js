import { useSubscription, useApolloClient } from '@apollo/client';
import { POST_ADDED, COMMENT_ADDED } from '../graphql/subscriptions';
import { GET_POSTS, GET_SINGLE_POST } from '../graphql/queries';

const useMySubscriptions = (setError) => {
  const client = useApolloClient();

  const updatePostCache = (postAdded) => {
    const included = (store, post) => store.map(p => p?.node.id).includes(post?.node.id);
    
    try {
      const allPostData = client.readQuery({ query: GET_POSTS });
      console.log(allPostData);
      console.log(postAdded);
      if (!included(allPostData.posts?.edges, postAdded)) {
        console.log('here');
        client.writeQuery({
          query: GET_POSTS,
          data: {
            posts: {
              __typename: 'Subscription',
              pageInfo: { ...allPostData.posts.pageInfo },
              edges: [postAdded, ...allPostData.posts.edges],
              totalCount: allPostData.posts.totalCount + 1
            },
           }
        })
      }
    } catch (e) {
      setError(e.message);
    }   
  }

  const updateCommentCache = (commentAdded) => {
    const included = (store, comment) => store.map(c => c.id).includes(comment.id);
    
    try {
      const postData = client.readQuery({
        query: GET_SINGLE_POST,
        variables: { id: commentAdded.post.id }
      });
  
      if (!included(postData.post.comments, commentAdded)) {
        client.writeQuery({
          query: GET_SINGLE_POST,
          variables: { id: commentAdded.post.id },
          data: {
            post: {
              ...postData.post, comments: postData.post.comments.concat(commentAdded)
            }
          }
        })
      }
    } catch (e) {
      setError(e.message);
    }  
  }


  useSubscription(POST_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPost = subscriptionData.data.postAdded;
      updatePostCache(addedPost);
    }
  });

  useSubscription(COMMENT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedComment = subscriptionData.data.commentAdded;
      updateCommentCache(addedComment);
    }
  })
}

export default useMySubscriptions;