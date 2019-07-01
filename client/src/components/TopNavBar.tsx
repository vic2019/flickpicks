import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';


export default function TopNavBar() {
  return (
    <>
      <Slide appear={true} direction="down" in ={!useScrollTrigger()}>
        <AppBar className='TopNavBar'>
          <Toolbar>
            <Typography variant="h6">Some Text</Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}