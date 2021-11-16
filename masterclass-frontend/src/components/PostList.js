import { useHistory } from 'react-router-dom';
import { Stack, Box } from '@mui/material';
import PostCard from './PostCard';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  stack: {
    maxWidth: 800,
    flexBasis: '100%'
  }
}

const PostList = ({ posts }) => {
  const history = useHistory();

  const clickCard = (item) => {
    history.push(`/post/${item.id}`);
  }

  return (
    <Box style={styles.container}>
      <Stack spacing={1} style={styles.stack}>
        {posts.map(p => (
          <PostCard key={p.id} item={p} onCardClick={clickCard} />
        ))}
      </Stack>
    </Box>
  )
}

export default PostList;