import { Form, Formik } from 'formik';
import { FormikTextInput } from './FormikComponents';
import { useHistory } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
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
    borderRadius: 5
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    ":hover": { backgroundColor: theme.colors.primaryDark },
    color: 'white',
    alignSelf: 'start'
  },
  header: {
    marginBottom: 1.5
  }
}

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .required('Username is required'),
  password: Yup
    .string()
    .required('Password is required')
})

const Login = () => {
  const [login] = useLogin();
  const history = useHistory();
  const { setError } = useErrorContext();

  const onSubmit = async ({ username, password }) => {
    try {
      await login(username, password);
      history.push('/');
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div style={styles.container}>
      <Card variant='outlined' sx={styles.formContainer}>
        <CardContent>
        <Typography variant='h5' sx={styles.header}>Login:</Typography>
        <Formik
          initialValues={{
            username: '',
            password: ''
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
            <Button
              variant='contained'
              type='submit'
              sx={styles.submitButton}
            >
              Login
            </Button>
          </Form>
        </Formik>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login;