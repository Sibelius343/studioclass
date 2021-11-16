import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Card, Typography } from '@mui/material';
import UserPost from './UserPost';
import theme from '../theme';

const styles = {
  commentList: {
    borderRadius: '5px 5px 20px 20px',
    maxWidth: 798,
    backgroundColor: theme.colors.card
  }
}

const UserPosts = ({ posts, username }) => {
  return (
    <TableContainer component={Card} variant='outlined' sx={styles.commentList}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>{username}'s posts:</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts?.map((p, i) => (
            <TableRow key={i}>
              <TableCell sx={{ wordBreak: 'break-word'}}>
                <UserPost key={i} post={p} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserPosts;