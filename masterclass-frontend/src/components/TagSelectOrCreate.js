import { useQuery } from '@apollo/client';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material'
import { GET_TAGS } from '../graphql/queries';
import useErrorContext from '../hooks/useErrorContext';

const TagSelectOrCreate = (props) => {
  const { setError } = useErrorContext();
  const { data } = useQuery(GET_TAGS, {
    onError: e => setError(e.message)
  });

  const filter = createFilterOptions();

  const options = data
    ? data.getTags
    : [];

  return (
    <Autocomplete
      {...props}
      multiple
      freeSolo
      id="tags-select-create"
      options={options}
      getOptionLabel={(option) => option.content}
      filterSelectedOptions
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.content);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            content: inputValue
          });
        }

        return filtered;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="What are you playing?"
        />
      )}
    />
  )
}

export default TagSelectOrCreate;