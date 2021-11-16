import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CommentList from "./CommentList";
import UserPosts from "./UserPosts";
import { Card, CardContent, Typography, RadioGroup, Radio, FormControl, FormControlLabel } from '@mui/material';
import useUserQuery from "../hooks/useUserQuery";
import useErrorContext from "../hooks/useErrorContext";
import theme from "../theme";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  userInfoContainer: {
    maxWidth: 800,
    flexBasis: '100%',
  },
  header: {
    marginBottom: 1.5
  },
  card: {
    borderRadius: '20px 20px 5px 5px'
  },
  divider: {
    height: 10
  }
}


const tabs = {
  posts: 'POSTS',
  comments: 'COMMENTS'
}

const UserInfo = () => {
  const [tab, setTab] = useState(tabs.posts);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const { setError } = useErrorContext();
  const { userData } = useUserQuery(setError, {
    userID: id,
    includePosts: tab === tabs.posts,
    includeComments: tab === tabs.comments
  });

  useEffect(() => {
    if (userData) {
      setUser(userData.getUser);
    }
  }, [userData])

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.userInfoContainer}>
        <Card variant='outlined' sx={styles.card}>
          <CardContent>
            <Typography variant='h5' style={styles.header}>Details for {user.username}:</Typography>
            <Typography variant='body1'>Joined on {user.dateJoined}</Typography>
            <FormControl component='fieldset'>
              <Typography variant='body1' sx={{ color: theme.colors.textSecondary }}>Select:</Typography>
              <RadioGroup
                name='user-details-radio-group'
                value={tab}
                onChange={({ target }) => setTab(target.value)}
              >
                <FormControlLabel value={tabs.posts} control={<Radio />} label='Posts' />
                <FormControlLabel value={tabs.comments} control={<Radio />} label='Comments' />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
        <div style={styles.divider} /> 
        {tab === tabs.posts && <UserPosts posts={userData.getUser.posts} username={user.username} />}
        {tab === tabs.comments && <CommentList comments={user.comments} username={user.username} />}
      </div>
    </div>
  )
}

export default UserInfo;