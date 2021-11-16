import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, ...result] = useMutation(CREATE_USER);

  const createUser = async (username, password) => {
    const mutateResult = await mutate({ variables: { username, password }});
    return mutateResult;
  };

  return [createUser, result];
}

export default useCreateUser;