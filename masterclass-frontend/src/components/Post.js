import { useParams } from 'react-router-dom';
import useSinglePost from "../hooks/useSinglePost"
import useErrorContext from '../hooks/useErrorContext';
import PostCard from './PostCard';
import CommentList from './CommentList';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  postContainer: {
    maxWidth: 800,
    flexBasis: '100%'
  },
  divider: {
    height: 10
  }
}

const Post = () => {
  const { setError } = useErrorContext();
  const { id } = useParams();
  const { post } = useSinglePost(setError, id);

  if (!post) return null;

  return (
    <div style={styles.container}>
      <div style={styles.postContainer}>
        <PostCard
          item={post}
          expanded
        />
        <div style={styles.divider} />
        <CommentList comments={post.comments} postID={post.id} />
      </div>
    </div>
  )
}

export default Post;