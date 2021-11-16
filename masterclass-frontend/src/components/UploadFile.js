import { useDropzone } from 'react-dropzone';
import { Paper, Typography, Chip } from '@mui/material';
import theme from '../theme';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    height: 100,
    cursor: 'pointer',
    borderStyle: 'dashed',
    borderWidth: 2
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 8
  },
  preview: {
    borderColor: theme.colors.primary,
    color: theme.colors.primary
  }
}

const DropFile = ({ fileName, onDelete }) => {
  return (
    <Chip
      variant='outlined'
      onDelete={() => onDelete(fileName)}
      label={fileName}
      sx={styles.preview}
    />
  )
}

const duplicateValidator = (file, files) => {
  if (files.find(f => f.name === file.name)) {
    return {
      code: 'duplicate-file',
      message: 'No duplicate files'
    }
  }
}

const UploadFile = ({ onDrop, files, uploadError, onDelete }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 50000000,
    accept: 'audio/mp3, audio/flac',
    validator: (file) => duplicateValidator(file, files)
  });

  const previews = files.map((file, i) => (
    <DropFile key={i} fileName={file.name} onDelete={onDelete} />
  ));

  return (
    <section>
      <Paper variant='outlined' {...getRootProps()} sx={styles.container}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <Typography
              variant='body1'
              sx={{ color: theme.colors.textSecondary }}
            >
              Drop the files here ...
            </Typography> :
            <Typography
              variant='body1'
              sx={{ color: theme.colors.textSecondary }}
            >
              Drag files here, or click to select files
            </Typography>
        }
      </Paper>
      <aside style={styles.previewContainer}>
        {previews}
      </aside>
      {uploadError && <Typography variant='body2'>{uploadError}</Typography>}
    </section>
  );
};

export default UploadFile;