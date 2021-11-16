import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import theme from '../theme';

const styles = {
  user: {
    cursor: 'pointer',
    mt: 1,
    mr: 2,
  },
  appBar: {
    backgroundColor: theme.colors.primary
  },
  appBarHeader: {
    cursor: 'pointer',
    mr: 3
  },
  navButtonsContainer: {
    display: 'flex',
    flex: 1
  },
  navDivider: {
    display: 'flex',
    alignSelf: 'stretch',
    width: 1.5,
    backgroundColor: theme.colors.primaryDark
  }
}

const NavBar = ({ user, handleLogout }) => {
  const history = useHistory();

  return (
    <Box>
      <AppBar position="fixed" sx={styles.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={styles.appBarHeader}
            onClick={() => history.push('/')}
          >
            Masterclass
          </Typography>
          <div style={styles.navDivider} />
          {user ? <div style={styles.navButtonsContainer}>
            <Button
              color='inherit'
              component={Link}
              to='/createPost'
              sx={{ ml: 2 }}
              >
                Create Post
              </Button>
            <span style={{ flexGrow: 1 }}></span>
            <Typography
              variant='body2'
              sx={styles.user}
              component='div'
              onClick={() => history.push('/user')}
            >
              {user.username}
            </Typography>
            <Button
              size='small'
              variant='outlined'
              color='inherit'
              type='button'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
          : <div style={styles.navButtonsContainer}>
              <span style={{ flexGrow: 1 }}></span>
              <Button color='inherit' component={Link} to='/login'>Login</Button>
              <Button color='inherit' component={Link} to='/createUser'>Sign up</Button>
          </div>}
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ mb: 1 }} />
    </Box>
  )
}

export default NavBar;