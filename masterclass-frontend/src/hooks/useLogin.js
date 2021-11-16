import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

const useLogin = () => {
  const [mutate, ...result] = useMutation(LOGIN);
  const client = useApolloClient();

  const login = async (username, password) => {
    const mutateResult = await mutate({ variables: { username, password }});
    localStorage.setItem('masterclass-user-token', mutateResult.data.login.value);
    client.resetStore();
  }

  return [login, result];
}

export default useLogin;