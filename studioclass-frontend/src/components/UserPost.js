import { Typography } from '@mui/material';
import Tag from './Tag';
import theme from '../theme';
import { useHistory } from 'react-router-dom';

const styles = {
  userInfo: {
    display: 'inline',
    fontSize: 13
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
    marginBottom: 3
  },
  container: {
    cursor: 'pointer'
  }
}

const UserPost = ({ post }) => {
  const history = useHistory();

  const clickPost = () => {
    history.push(`/post/${post.id}`);
  }

  return (
    <div onClick={clickPost} style={styles.container}>
      <Typography variant='h5' sx={{ wordWrap: 'break-word' }}>
        {post.title}
      </Typography>
      <div style={styles.tagContainer}>
        {post.tags.map((t, i) => (
          <Tag key={i} tag={t} />
        ))}
      </div>
      <Typography
        variant='body2'
        color={theme.colors.textSecondary}
        sx={styles.userInfo}
      >
        Posted on {post.dateCreatedAt}
      </Typography>
    </div>
  )
}

export default UserPost;