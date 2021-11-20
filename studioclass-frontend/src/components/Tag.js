import { Chip } from '@mui/material';

const Tag = ({ tag: { content, color }, ...props }) => {
  return (
    <Chip
      {...props}
      label={content}
      variant='outlined'
      size='small'
      sx={{
        fontSize: 12,
        color,
        borderColor: color
      }}
    />
  )
}

export default Tag;