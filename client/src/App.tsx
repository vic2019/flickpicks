import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import amber from '@material-ui/core/colors/amber';
import purple from '@material-ui/core/colors/purple';
import  createMuiTheme, { ThemeOptions } 
  from '@material-ui/core/styles/createMuiTheme'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import TopNavBar from './components/TopNavBar';
import MyMovies from './components/MyMovies';
import MoviePage from './components/MoviePage';
import Discover from './components/Discover';
import Search from './components/Search';
import './App.scss';


const themeOptions: ThemeOptions = {
  palette: {
    primary: pink,
    type: 'dark'
  }
};

const theme = createMuiTheme(themeOptions);

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme} >
        {/* CssBaseLine must be inside ThemeProvider to enable 'dark' theme */}
        <CssBaseline />  
        <TopNavBar />
        <Route
          key='MyMovies'
          path='/mymovies'
          exact={true}
          component={MyMovies}
        />
        <Route
          key='Discover'
          path='/discover'
          exact={true}
          component={Discover}
        />
        <Route
          key='Search'
          path='/search'
          exact={true}
          component={Search}
        />
        <Route
          key='Friends'
          path='/friends'
          exact={true}
        />
        <Route
          key='Movie'
          path='/movie/*'
          exact={true}
          component={MoviePage}
        />
      </ThemeProvider>
    </Router>
  );
}