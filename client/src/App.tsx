import React, { useEffect, Suspense, lazy } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import pink from '@material-ui/core/colors/pink';
import cyan from '@material-ui/core/colors/cyan';
import  createMuiTheme, { ThemeOptions } 
  from '@material-ui/core/styles/createMuiTheme'

import { connect } from 'react-redux';

// import { initMyMovies } from './store/my-movies/actions'; 
import { getSession, checkLoginStatus, logOut } from './store/user/actions'; 
import { User } from './store/user/types'; 
import { AppState } from './store';

import { BrowserRouter as Router, Route, Switch, Redirect } 
  from 'react-router-dom';

import TopNavBar from './components/TopNavBar';
import Notification from './components/Notification';
import ScrollToTop from './components/ScrollToTop';
import Discover from './pages/Discover';

import './App.scss';

const MyMovies = lazy(() => import('./pages/MyMovies'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const Search = lazy(() => import('./pages/Search'));
const NotFound = lazy(() => import('./pages/NotFound'));

const themeOptions: ThemeOptions = {
  palette: {
    primary: pink,
    secondary: cyan,
    type: 'dark'
  }
};

const theme = createMuiTheme(themeOptions);

interface Props {
  user: User
  // initMyMovies: any
  getSession: any
  checkLoginStatus: any
  logOut: any
}

function App({
  user, getSession, checkLoginStatus, logOut
}: Props) {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // useEffect(() => {
  //   initMyMovies();
  // }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {/* CssBaseLine must be inside ThemeProvider to enable 'dark' theme */}
        <CssBaseline />
        <TopNavBar
          userAction={user.token ? logOut : getSession}
          email={user.email}
        />
        <Notification />
        <Suspense fallback={null}>
          <ScrollToTop>
            <Switch>
              <Route
                key="MyMovies"
                path="/mymovies"
                exact={false}
                component={MyMovies}
              />
              <Route
                key="Discover"
                path="/discover/:page"
                exact={false}
                component={Discover}
              />
              <Route
                key="Search"
                path="/search/:page"
                exact={false}
                component={Search}
              />
              <Route key="Friends" path="/friends" exact={false} />
              <Route
                key="Movie"
                path="/movie/:movieId"
                exact={false}
                component={MoviePage}
              />
              <Route key="Home" path="/" exact >
                <Redirect to="/discover/1" />
              </Route>
              <Route key="NotFound" path="/*" exact component={NotFound} />
            </Switch>
          </ScrollToTop>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}

export default connect(
  (state: AppState) => ({ user: state.user }),
  { getSession, checkLoginStatus, logOut }
)(App);