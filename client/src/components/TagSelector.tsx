import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Checkbox, Drawer, Divider, List, ListItem, 
  ListItemIcon, ListItemText } from '@material-ui/core';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags } from '../store/my-movies/actions';
import { Movie, ByTag, TagSetter } from '../store/my-movies/types'


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
  
  const toggleCheckbox = (tagName: string) => () => {
    setChecks(Object.assign({}, checks, { [tagName]: !checks[tagName]}));
  }
      
  const save = async () => {
    try {
      await setTags(movie, checks);
    } catch(err) {
      alert(err);
    }

    toggleDrawer(false)();
  };

  const options = Object.keys(byTag).map(tagName => (
    <ListItem button onClick={toggleCheckbox(tagName)}>
      <ListItemIcon>
        <Checkbox
          checked={checks[tagName]}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={tagName} />
    </ListItem> 
  ));
  
  useEffect(() => {
    if (isVisible) return;

    setChecks(initializeChecks());
  }, [isVisible]);
  
  return(
    <div className='TagSelector'>
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
      >
        {options}
        {/* <Divider /> */}
        <ButtonGroup fullWidth size='large' variant='outlined'>
          <Button onClick={toggleDrawer(false)}>Cancel</Button> 
          <Button onClick={save}>Save</Button>
        </ButtonGroup>
      </Drawer>
    </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag
});

export default connect(
  mapStateToProps,
  { setTags }
)(TagSelector);