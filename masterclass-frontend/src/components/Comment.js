import { Typography } from '@mui/material';
import Tag from './Tag';
import theme from '../theme';
import { useHistory } from 'react-router-dom';

const styles = {
  userInfo: {
    display: 'inline',
    fontSize: 13
  },
  userInfoLink: {
    display: 'inline',
    fontSize: 13,
    ":hover": { color: theme.colors.textUserSecondary },
    cursor: 'pointer'
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
    marginBottom: 3
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  userComment: {
    cursor: 'pointer'
  }
}

const Comment = ({ comment }) => {
  const history = useHistory();

  const clickUser = (e) => {
    // Stop the click from going through to the card's click handler,
    // which goes to the single post page
    e.stopPropagation();

    history.push(`/user/${comment.user.id}`);
  }

  /*This will only be used when viewing a user's comments on their user
  page. The gql query for user comments includes post info (which normal
  comments don't need, as you're already on the relevant post page in that
  case). The presence of post info is used to conditionally change how a
  comment is rendered. */
  const clickForPost = () => {
    history.push(`/post/${comment.post.id}`);
  }

  return (
    <div onClick={comment.post && clickForPost} style={comment.post && styles.userComment}>
      {!comment.post ? <div>
        <Typography
          variant='body2'
          color={theme.colors.textSecondary}
          sx={styles.userInfo}
        >
          commented by
        </Typography>
        <Typography
          variant='body2'
          color={theme.colors.textUserPrimary}
          onClick={clickUser}
          sx={styles.userInfoLink}
        >
          {` ${comment.user.username} `}
        </Typography>
        <Typography
          variant='body2'
          color={theme.colors.textSecondary}
          sx={styles.userInfo}
        >
          on {comment.commentDate}
        </Typography>
      </div>
      : <Typography
          variant='body2'
          color={theme.colors.textSecondary}
          sx={styles.userInfo}
        >
          comment for <b>{comment.post.title}</b> on {comment.commentDate}
        </Typography>}
      <div style={styles.tagContainer}>
        {comment.tags.map((t, i) => (
          <Tag key={i} tag={t} />
        ))}
      </div>
      <Typography variant='body1' sx={{ wordWrap: 'break-word' }}>
        {comment.content}
      </Typography>
    </div>
  )
}

export default Comment;