import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';

const usePosts = (setError) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_POSTS, {
    fetchPolicy: 'cache-and-network',
    onError: e => setError(e.message)
  });

  const posts = data ? data.posts : [];
  
  return { posts, loading, fetchMore, ...result };
}

export default usePosts;