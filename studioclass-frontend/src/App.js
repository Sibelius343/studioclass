import PostList from "./components/PostList";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import useUserQuery from "./hooks/useUserQuery";
import { useApolloClient } from '@apollo/client';

import { Switch, Route, useHistory } from 'react-router-dom';
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import CreateUser from "./components/CreateUser";
import Error from "./components/Error";
import useMySubscriptions from "./hooks/useMySubscriptions";
import ErrorContext from "./contexts/ErrorContext";
import UserContext from "./contexts/UserContext";
import useError from "./hooks/useError";
import NavBar from "./components/NavBar";
import theme from "./theme";

// minHeight of 100vh eliminates white space at bottom of page for pages
// that don't fill all the vertical space by themselves
const styles = {
  appContainer: {
    backgroundColor: theme.colors.background,
    minHeight: '100vh'
  },
  divider: {
    height: 9
  }
}

const App = () => {
  const [error, setError] = useError();
  const { userData } = useUserQuery(setError);
  const client = useApolloClient();
  const history = useHistory();

  useMySubscriptions(setError);

  if (!userData) return null;
  
  const user = userData.getUser;

  const logout = () => {
    localStorage.removeItem('masterclass-user-token');
    client.resetStore();
    history.push('/');
  }

  return (
    <div style={styles.appContainer}>
      <NavBar user={user} handleLogout={logout} />
      <Error error={error} />
      <div style={styles.divider} />
      <ErrorContext.Provider value={{ error, setError }}>
        <UserContext.Provider value={{ user }}>
          <Switch>
            <Route exact path='/'>
              <PostList />
            </Route>
            <Route path='/post/:id'>
              <Post />
            </Route>
            <Route path='/createPost'>
              <CreatePost />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route exact path='/user'>
              <UserInfo />
            </Route>
            <Route path='/user/:id'>
              <UserInfo />
            </Route>  
            <Route path='/createUser'>
              <CreateUser />
            </Route>
          </Switch>
        </UserContext.Provider>
      </ErrorContext.Provider>
    </div>
  )
}

export default App;