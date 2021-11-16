import { useQuery } from '@apollo/client';
import { GET_SINGLE_POST } from '../graphql/queries';

const useSinglePost = (setError, id) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_SINGLE_POST, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    onError: e => setError(e.message)
  });

  return { post: data?.post, loading, fetchMore, result };
};

export default useSinglePost;