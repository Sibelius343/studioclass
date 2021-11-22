import { Formik, Form } from 'formik';
import { FormikTextInput, FormikTagSelect } from './FormikComponents';
import useCreateComment from '../hooks/useCreateComment';
import useErrorContext from '../hooks/useErrorContext';
import * as Yup from 'yup';
import { Button, Typography } from '@mui/material';
import theme from '../theme';

const styles = {
  submitButton: {
    backgroundColor: theme.colors.primary,
    ":hover": { backgroundColor: theme.colors.primaryAlt },
    color: 'white',
    alignSelf: 'start'
  },
  commentFormContainer: {
    
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
}

const validationSchema = Yup.object().shape({
  content: Yup
    .string()
    .required('Field can\'t be empty')
})

const CreateComment = ({ postID }) => {
  const [createComment] = useCreateComment();
  const { setError } = useErrorContext();

  const onSubmit = async ({ content, tags }, actions) => {
    try {
      const tagIDs = tags.map(t => t.id);
      await createComment(postID, content, tagIDs);
      actions.setSubmitting(false);
      actions.resetForm({
        values: {
          content: '',
          tags: []
        }
      })
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div style={styles.commentFormContainer}>
      <Typography variant='body1' sx={{ marginBottom: 1 }}>
        Write a comment:
      </Typography>
      <Formik
        initialValues={{
          content: '',
          tags: []
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form style={styles.commentForm}>
          <FormikTagSelect
            name='tags'
            postID={postID}
          />
          <FormikTextInput
            name='content'
            type='text'
            multiline
            rows={4}
            fullWidth
            label='Write comment here...'
          />
          <Button variant='contained' type='submit' sx={styles.submitButton}>Comment</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateComment;