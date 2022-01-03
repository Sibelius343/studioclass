import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Box } from '@mui/material';
import PostCard from './PostCard';
import useErrorContext from '../hooks/useErrorContext';
import usePosts from '../hooks/usePosts';

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

const sortPostsOn = {
  date: 'DATE'
}

const sortDirection = {
  ascending: 'ASC',
  descending: 'DESC'
}

const observerOptions = {
  threshold: 0.9
};

const FETCH_THRESHOLD = 3;

const PostList = () => {
  const { setError } = useErrorContext();
  const { posts, fetchMore, loading } = usePosts(setError, {
    orderBy: sortPostsOn.date,
    orderDirection: sortDirection.descending
  });
  const history = useHistory();
  const observer = useRef();

  const observerRef = useCallback(element => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMore()
        }
      }, observerOptions);

      if (element) {
        observer.current.observe(element)
      }  
  }, [loading, fetchMore])
  

  const clickCard = useCallback((item) => {
    history.push(`/post/${item.id}`);
  }, [history])

  console.log('postlist posts', posts);
  const postNodes = posts
    ? posts.edges.map(e => e.node)
    : [];

  return (
    <Box style={styles.container}>
      <Stack spacing={1} style={styles.stack}>
        {postNodes.map((p, i)  => {
          if (i === postNodes.length - FETCH_THRESHOLD) {
            return (
              <div key={i} ref={observerRef}>
                <PostCard key={p.id} item={p} onCardClick={clickCard} />
              </div>
            )
          } else {
            return (
              <div key={i}>
                <PostCard key={p.id} item={p} onCardClick={clickCard} />
              </div>
            )
          }
        })}
      </Stack>
    </Box>
  )
}

export default PostList;