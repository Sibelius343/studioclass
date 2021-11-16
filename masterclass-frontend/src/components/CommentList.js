import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Card, Typography } from '@mui/material';
import Comment from './Comment';
import CreateComment from './CreateComment';

const styles = {
  commentList: {
    borderRadius: '5px 5px 20px 20px',
    maxWidth: 798
  }
}

const CommentList = ({ comments, postID, username }) => {
  return (
    <TableContainer component={Card} variant='outlined' sx={styles.commentList}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {postID ? <CreateComment postID={postID} /> :
              <Typography variant='h6'>{username}'s comments:</Typography>}
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