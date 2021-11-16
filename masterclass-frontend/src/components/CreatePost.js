import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, NEW_TAG } from '../graphql/mutations';
import UploadFile from './UploadFile';
import { Formik, Form } from 'formik';
import { FormikTextInput, FormikTagSelectOrCreate } from './FormikComponents';
import useErrorContext from '../hooks/useErrorContext';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
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
    color: 'white',
    alignSelf: 'start'
  },
  header: {
    marginBottom: 1.5
  }
}

const validationSchema = Yup.object().shape({
  title: Yup
    .string()
    .required('Must have title')
    .min(3, 'Must be longer than 3 characters'),
  description: Yup
    .string()
})

const CreatePost = () => {
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState();
  const [uploadFiles] = useMutation(CREATE_POST);
  const { setError } = useErrorContext();
  const [createTag] = useMutation(NEW_TAG, {
    onError: e => setError(e.message)
  })

  const history = useHistory();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))]);
  }, [files]);

  const onSubmit = async (values) => {
    if (files.length !== 0) {
      try {
        const tags = await Promise.all(values.tags.map(async (t) => {
          if (!t.id) {
            const { data } = await createTag({ variables: { content: t.content }});
            return data.newTag.id;
          } else {
            return t.id;
          }
        }))
        uploadFiles({ variables: {
          title: values.title,
          description: values.description,
          tags,
          files: files
        }});
        history.push('/');
      } catch (e) {
        setError(e.message);
      }
    } else {
      setUploadError('Need at least one file');
    }
  }

  const onRemove = (filename) => {
    setFiles(files.filter(f => f.name !== filename));
  }

  return (
    <div style={styles.container}>
      <Card variant='outlined' sx={styles.formContainer}>
        <CardContent>
          <Typography variant='h5' sx={styles.header}>Create new post:</Typography>
          <Formik
            initialValues={{
              title: '',
              description: '',
              tags: []
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form style={styles.form}>
              <FormikTextInput
                label='Post title'
                name='title'
                type='text'
                fullWidth
              />
              <FormikTextInput
                label='Description'
                name='description'
                type='text'
                multiline
                rows={4}
                fullWidth
              />
              <FormikTagSelectOrCreate
                name='tags'
              />
              <UploadFile
                onDrop={onDrop}
                files={files}
                uploadError={uploadError}
                setUploadError={setUploadError}
                onDelete={onRemove}
              />
              <Button
                variant='contained'
                type='submit'
                sx={styles.submitButton}
              >
                Create Post
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreatePost;