import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { updateSearch } from '../store/search/actions';

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

interface Props {
  query: string,
  updateSearch: any
}

const SearchBar = ({ query, updateSearch }: Props) => {
  const classes = useStyles();
  const [text, set] = useState(query);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set(e.target.value as string);
  }

  const handleClick = () => {
    updateSearch({ query: text.trim(), page: 1 });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleClick();

    const inputElem = document.getElementById('searchbar-input-base');
    if (inputElem) inputElem.blur();

    const linkToResults = document.getElementById('searchbar-submit-link');
    if (linkToResults) linkToResults.click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          id='searchbar-input-base'
          placeholder='Search Movie Title'
          value={text}
          onChange={handleChange}
        />
        <Link to={'/search/1'} id='searchbar-submit-link'>
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={handleClick}
          >
            <SearchIcon />
          </IconButton>
        </Link>
      </Paper>
    </form>
  );
}

const mapStateToProps = (state: AppState) => ({
  query: state.search.query
});

export default connect(
  mapStateToProps,
  { updateSearch }
)(SearchBar);