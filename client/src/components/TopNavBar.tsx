import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { NavLink } from 'react-router-dom';

import SearchBar from './SearchBar';
import ProgressBar from './ProgressBar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export default function TopNavBar() {
  const classes = useStyles();

  return (
    <>
      <AppBar className='TopNavBar'>
        <Toolbar
          // disableGutters
          classes={{ root: classes.root }}
        >
          {/* <IconButton aria-label='Open drawer'>
            <MenuIcon />
          </IconButton> */}
          <Typography>
            <NavLink to='/mymovies' activeClassName='active-link'>
              MyMovies
              </NavLink>
            <span className='breadcrumb-divider'>/</span>
            <NavLink to='/discover' activeClassName='active-link'>
              Discover
              </NavLink>
            {/* <span className='breadcrumb-divider'>/</span>
            <NavLink to='/friends' activeClassName='active-link'>
              Friends
            </NavLink> */}

            {/* ^^^ This part will be expanded upon in the future */}

          </Typography>
        </Toolbar>
        <SearchBar />
        <ProgressBar />
      </AppBar>
      <InputBase /> // This is here for spacing
      <Toolbar />
    </>
  );
}