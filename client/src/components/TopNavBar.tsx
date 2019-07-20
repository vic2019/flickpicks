import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Slide, useScrollTrigger } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { NavLink } from 'react-router-dom';


export default function TopNavBar() {
  return (
    <>
      <Slide appear={true} direction="down" in ={!useScrollTrigger()}>
        <AppBar className='TopNavBar'>
          <Toolbar disableGutters>
            <IconButton aria-label='Open drawer'>
              <MenuIcon />
            </IconButton>
            <Typography>
              <NavLink to='/mymovies' activeClassName='active-link'>
                MyMovies
              </NavLink>
              <span className='breadcrumb-divider'>/</span>
              <NavLink to='/discover' activeClassName='active-link'>
                Discover
              </NavLink>
              <span className='breadcrumb-divider'>/</span>
              <NavLink to='/friends' activeClassName='active-link'>
                Friends
              </NavLink>
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}