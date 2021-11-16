import { Card, CardContent, Typography, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Tag from './Tag';
import theme from '../theme';
import AudioPlayer from './AudioPlayer';

const styles = {
  card: {
    flexWrap: 'wrap',
    borderRadius: '20px 20px 5px 5px'
  },
  listCard: {
    flexWrap: 'wrap',
    cursor: 'pointer',
    borderRadius: 5
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start'
  },
  postInfo: {
    marginTop: 10
  },
  description: {
    marginTop: 1.5,
    marginBottom: 1
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
}

const PostCard = ({ item, onCardClick, expanded }) => {
  const history = useHistory();

  const clickUser = (e) => {
    // Stop the click from going through to the card's click handler,
    // which goes to the single post page
    e.stopPropagation();

    history.push(`/user/${item.user.id}`);
  }

  return (
    <Card
      variant='outlined'
      sx={expanded ? styles.card : styles.listCard}
      onClick={onCardClick ? () => onCardClick(item) : null}
    >
      <CardContent sx={styles.cardContent}>
        <Typography variant='h5' sx={{ wordBreak: 'break-word' }}>
          {item.title}
        </Typography>
        <Box sx={styles.tagContainer}>
          {item.tags.map(t => (
            <Tag key={t.id} tag={t} />
          ))}
        </Box>
        {expanded && <Typography
          variant='body1'
          color={theme.colors.textPrimary}
          sx={styles.description}
        >
          {item.description}
        </Typography>}
        {expanded && item.audioFiles.map((a, i) => (
          <AudioPlayer key={i} audioFile={a} />
        ))}
        <div style={styles.postInfo}>
          <Typography
            variant='body2'
            color={theme.colors.textSecondary}
            sx={{ display: 'inline' }}
          >
            posted by
          </Typography>
          <Typography
            variant='body2'
            color={theme.colors.textUserPrimary}
            onClick={clickUser}
            sx={{ ":hover": { color: theme.colors.textUserSecondary }, display: 'inline'}}
          >
            {` ${item.user.username} `}
          </Typography>
          <Typography
            variant='body2'
            color={theme.colors.textSecondary}
            sx={{display: 'inline'}}
          >
            on {item.dateCreatedAt}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard;