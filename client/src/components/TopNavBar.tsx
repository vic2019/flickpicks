import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';


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
              <Link to='/MyMovies'>MyMovies</Link>
              /
              <Link to='/Discover'>Discover</Link>
              /
              <Link to='/'>Friends</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}