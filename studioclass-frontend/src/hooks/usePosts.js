import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';

const LIMIT = 10;

const usePosts = (setError, { orderBy, orderDirection }) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_POSTS, {
    variables: {
      orderBy,
      orderDirection,
      limit: LIMIT,
    },
    fetchPolicy: 'cache-and-network',
    onError: e => setError(e.message),
  });
  console.log('queried');

  const handleFetchMore = () => {
    console.log(loading);
    console.log(data?.posts.pageInfo.hasNextPage);
    const canFetch = !loading && data?.posts.pageInfo.hasNextPage;

    if (!canFetch) return;
    console.log({
      orderBy,
      orderDirection,
      cursor: data.posts.pageInfo.endCursor,
      limit: LIMIT
    });

    fetchMore({
      variables: {
        orderBy,
        orderDirection,
        cursor: data.posts.pageInfo.endCursor,
        limit: LIMIT
      }
    })
  }
  
  return { posts: data?.posts, loading, fetchMore: handleFetchMore, ...result };
}

export default usePosts;