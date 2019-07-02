import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Checkbox, Drawer, ListItem, ListItemIcon, 
  ListItemText } from '@material-ui/core';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags } from '../store/my-movies/actions';
import { Movie, ByTag } from '../store/my-movies/types';


interface Props {
  setTags: any
  byTag: ByTag
  movie: Movie
}

const TagSelector = ({
  setTags,
  byTag,
  movie
}: Props) => {
  const initializeChecks = () => {
    return Object.assign({}, ...Object.keys(byTag).map(tag => ({
      [tag]: Boolean(byTag[tag][movie.id])
    })));   
  };

  const [checks, setChecks] = useState(initializeChecks());
  const [ isVisible, setVisible ] = useState(false);
  
  const toggleDrawer = (toOpen: boolean) => () => void setVisible(toOpen);
  
  const toggleCheckbox = (tag: string) => () => {
    setChecks(Object.assign({}, checks, { [tag]: !checks[tag]}));
  }
      
  const save = async () => {
    try {
      await setTags(movie, checks);
    } catch(err) {
      alert(err);
    }

    toggleDrawer(false)();
  };

  // Does it make a different whether options is an array or function?
  const options = () => Object.keys(byTag).map(tag => (
    <ListItem button onClick={toggleCheckbox(tag)}>
      <ListItemIcon>
        <Checkbox
          checked={checks[tag]}
        />
      </ListItemIcon>
      <ListItemText primary={tag} />
    </ListItem> 
  ));
  
  useEffect(() => {
    if (!isVisible) return;

    setChecks(initializeChecks());
  }, [isVisible]); // Should byTag be in the array?
  
  return(
    <span className='TagSelector'>
      <Button 
        className='tag-selector-toggle'
        size='small'
        color='primary'
        variant='outlined'
        onClick={toggleDrawer(true)}
      >
        Edit Tags
      </Button>
      <Drawer 
        className='tag-selector-dropdown' 
        anchor='bottom'
        open={isVisible} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            maxHeight: '87vh',
          }
        }}
      >
        {options()}
        <ButtonGroup fullWidth size='large' variant='outlined'>
          <Button onClick={toggleDrawer(false)}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </ButtonGroup>
      </Drawer>
    </span>
  )
};

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag
});

export default connect(
  mapStateToProps,
  { setTags }
)(TagSelector);