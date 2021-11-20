import { useField } from 'formik';
import TextInput from './TextInput';
import TagSelect from './TagSelect';
import TagSelectOrCreate from './TagSelectOrCreate';
import { Typography } from '@mui/material';
import theme from '../theme';

export const FormikTextInput = (props) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  
  return (
    <div>
      <TextInput {...field} {...props} />
      {showError && <Typography variant='body2' sx={{ color: theme.colors.error}}>{meta.error}</Typography>}
    </div>
  );
};

export const FormikTagSelectOrCreate = (props) => {
  const [field, meta, { setValue }] = useField(props);
  const showError = meta.touched && meta.error;
  
  const onChange = (_event, value) => {
    setValue(value);
  }

  return (
    <div>
      <TagSelectOrCreate {...field} {...props} onChange={onChange} />
      {showError && <Typography variant='body2' sx={{ color: theme.colors.error}}>{meta.error}</Typography>}
    </div>
  )
}

export const FormikTagSelect = (props) => {
  const [field, meta, { setValue }] = useField(props);
  const showError = meta.touched && meta.error;

  const onChange = (_event, value) => {
    setValue(value);
  }
  
  return (
    <div>
      <TagSelect {...field} {...props} onChange={onChange} />
      {showError && <Typography variant='body2' sx={{ color: theme.colors.error}}>{meta.error}</Typography>}
    </div>
  )
}