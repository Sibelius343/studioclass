import { Formik, Form } from 'formik';
import { FormikTextInput } from './FormikComponents';
import useCreateUser from "../hooks/useCreateUser";
import useLogin from '../hooks/useLogin';
import { useHistory } from 'react-router-dom';
import useErrorContext from '../hooks/useErrorContext';
import * as Yup from 'yup';
import { Card, CardContent, Button, Typography } from '@mui/material';
import theme from '../theme';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formContainer: {
    maxWidth: 800,
    flexBasis: '100%',
    borderRadius: 5,
    backgroundColor: theme.colors.card
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    ":hover": { backgroundColor: theme.colors.primaryAlt },
    color: theme.colors.card,
    alignSelf: 'start'
  },
  header: {
    marginBottom: 1.5
  }
}

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .required('Username is required')
    .min(2, 'Username must be at least 2 characters long')
    .max(30, 'Username cannot be longer than 30 characters'),
  password: Yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password cannot be longer than 50 characters'),
  confirmPassword: Yup
    .string()
    .required('Please confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const CreateUser = () => {
  const [createUser] = useCreateUser();
  const [login] = useLogin();
  const history = useHistory();
  const { setError } = useErrorContext();

  const onSubmit = async ({ username, password }) => {
    try {
      await createUser(username, password);
      await login(username, password);
      history.push('/');
    }
    catch (e) {
      setError(e.message);
    }
  }

  return (
    <div style={styles.container}>
      <Card variant='outlined' sx={styles.formContainer}>
        <CardContent>
          <Typography variant='h5' sx={styles.header}>Sign up:</Typography>
          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form style={styles.form}>
              <FormikTextInput
                label='Username'
                name='username'
                type='text'
              />
              <FormikTextInput
                label='Password'
                name='password'
                type='password'
              />
              <FormikTextInput
                label='Confirm Password'
                name='confirmPassword'
                type='password'
              />
              <Button
                variant='contained'
                type='submit'
                sx={styles.submitButton}
              >
                Sign up
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateUser;