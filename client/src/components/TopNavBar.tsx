import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';

import SearchBar from './SearchBar';
import ProgressBar from './ProgressBar';
import tmdbLogo from '../images/tmdb_logo.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  drawerList: {
    width: 250,
  }
});

interface Props {
  userAction: any,
  email: string
}

export default function TopNavBar({ userAction, email }: Props) {
  const classes = useStyles();
  const [drawerOpen, setDrawer] = React.useState(false);

  const handleUserAction = () => {
    userAction();
  };

  const toggleDrawer = (isOpen: boolean) => () => setDrawer(isOpen);

  return (
    <>
      <AppBar className='TopNavBar'>
        <Toolbar
          disableGutters
          classes={{ root: classes.root }}
        >
          <IconButton aria-label='Open drawer'>
            <MenuIcon onClick={toggleDrawer(true)}/>
          </IconButton>
          {/* <img
            className='tmdb-logo'
            src={tmdbLogo} 
            alt='Powered by tMDb' 
            style={{ width: '40px' }}
            title='This app uses the TMDb API but is not endorsed or certified by TMDb.' 
          /> */}
          <Typography>
            <NavLink to='/mymovies' activeClassName='active-link'>
              My Movies
              </NavLink>
            <span className='breadcrumb-divider'>/</span>
            <NavLink to='/discover/1' activeClassName='active-link'>
              Discover
              </NavLink>
            {/* <span className='breadcrumb-divider'>/</span>
            <NavLink to='/friends' activeClassName='active-link'>
              Friends
            </NavLink> */}

            {/* ^ This part will be expanded upon in the future */}

          </Typography>
          <span style={{ width: '42px' }}/>
          {/* ^This is to make the flex-box 'space-between' work */}
        </Toolbar>
        <SearchBar />
        <ProgressBar />
      </AppBar>
      <InputBase /> // This is here for spacing
      <Toolbar />
      <SwipeableDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={classes.drawerList} >
          <List>
            <ListItem>
              <img
                className='tmdb-logo'
                src={tmdbLogo} 
                alt='Powered by tMDb' 
                style={{ width: '140px' }}
                title='This app uses the TMDb API but is not endorsed or certified by TMDb.' 
              />
            </ListItem>
            <ListItem>
              <Button 
                onClick={handleUserAction}
                style={{ textTransform: 'none' }}
                fullWidth
                variant='contained'
                color='primary'
                size='small'
              >
                {email? 'Log out': 'Log in'}
              </Button>
            </ListItem> 
            <ListItem><span style={{ overflow: 'hidden' }}>
                {email? email: 'Log in to save your changes.'}
            </span></ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
}

