import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
  root: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    backgroundColor: '#fbf9f9',
    borderRadius: 0
  },
  input: {
    backgroundColor: '#fbf9f9',
    color: 'black',
    marginLeft: 12,
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: 'black'
  }
});

export default function SearchBar() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Search Movie Title'
        inputProps={{ 'aria-label': 'Search Movie Title' }}
      />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}