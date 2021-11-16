import { Collapse, Alert, Box } from '@mui/material';

const styles = {
  container: {
    width: '100%'
  },
  error: {
    justifyContent: 'center'
  }
}

const Error = ({ error }) => {
  return (
    <Box sx={styles.container}>
      <Collapse in={error}>
        <Alert
          severity='error'
          variant='filled'
          sx={styles.error}
        >
          {error}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default Error;