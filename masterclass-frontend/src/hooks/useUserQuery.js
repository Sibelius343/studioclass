import { useQuery } from '@apollo/client';
import { SIGNED_IN_USER } from '../graphql/queries';

const useUserQuery = (setError, vars) => {
  const { data, loading, refetch, result } = useQuery(SIGNED_IN_USER, {
      variables: { ...vars },
      fetchPolicy: 'cache-and-network',
      onError: e => setError(e.message)
    }
  );

  return { userData: data, loading, refetch, result };
}

export default useUserQuery;