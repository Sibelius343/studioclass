import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../graphql/mutations';

const useCreateComment = () => {
  const [mutate, ...result] = useMutation(CREATE_COMMENT);

  const createComment = async (postID, content, tags) => {
    const mutateResult = await mutate({ variables: {
      postID,
      content,
      tags
    }})
    return mutateResult;
  }

  return [createComment, result];
}

export default useCreateComment;