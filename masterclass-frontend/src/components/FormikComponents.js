import { useField } from 'formik';
import Text from './Text';
import TextInput from './TextInput';
import TagSelect from './TagSelect';
import TagSelectOrCreate from './TagSelectOrCreate';

export const FormikTextInput = (props) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  
  return (
    <div>
      <TextInput {...field} {...props} />
      {showError && <Text>{meta.error}</Text>}
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
      {showError && <Text>{meta.error}</Text>}
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
      {showError && <Text>{meta.error}</Text>}
    </div>
  )
}