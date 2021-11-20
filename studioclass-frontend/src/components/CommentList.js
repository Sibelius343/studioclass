import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Card, Typography } from '@mui/material';
import Comment from './Comment';
import CreateComment from './CreateComment';
import useUserContext from '../hooks/useUserContext';
import theme from '../theme';

const styles = {
  commentList: {
    borderRadius: '5px 5px 20px 20px',
    maxWidth: 798,
    backgroundColor: theme.colors.card
  }
}

const CommentList = ({ comments, postID, username }) => {
  const { user } = useUserContext();

  return (
    <TableContainer component={Card} variant='outlined' sx={styles.commentList}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {(postID && user) && <CreateComment postID={postID} /> }
              {(postID && !user) && <Typography
                variant='body1'
                sx={{ color: theme.colors.textSecondary}}
              >Log in to comment</Typography>}
              {!postID && <Typography variant='h6'>{username}'s comments:</Typography>}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments?.map((c, i) => (
            <TableRow key={i}>
              <TableCell sx={{ wordBreak: 'break-word'}}>
                <Comment key={i} comment={c} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CommentList;