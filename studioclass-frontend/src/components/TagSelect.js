import { useQuery } from '@apollo/client';
import { Autocomplete, TextField } from '@mui/material'
import { GET_TAGS } from '../graphql/queries';
import useErrorContext from '../hooks/useErrorContext';
import Tag from './Tag';

const TagSelect = ({ postID, ...props }) => {
  const { setError } = useErrorContext();
  const { data } = useQuery(GET_TAGS, {
    variables: { postID },
    onError: e => setError(e.message)
  });

  const options = data
    ? data.getTags
    : [];

  return (
    <Autocomplete
      {...props}
      multiple
      id="tags-select"
      options={options}
      getOptionLabel={(option) => option.content}
      filterSelectedOptions
      renderTags={(value, getTagProps) => 
        value.map((tag, index) => (
          <Tag key={index} tag={tag} {...getTagProps({ index })} />
        ))}
      renderInput={(params) => (
        <TextField
          {...params}
          label="What is your comment about?"
        />
      )}
    />
  )
}

export default TagSelect;