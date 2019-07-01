import React, { useState } from 'react';
import { Button, Checkbox, Drawer, Divider, List, ListItem, 
  ListItemIcon, ListItemText } from '@material-ui/core';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags } from '../store/my-movies/actions';
import { Movie, ByTag } from '../store/my-movies/types'


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
  const initialState = Object.assign({}, ...Object.keys(byTag).map(tag => ({
    [tag]: Boolean(byTag[tag][movie.id])
  })));
  const [checks, setChecks] = useState(initialState);
  const [ visible, setVisible ] = useState(false);

  const toggleDrawer = (isVisible: boolean) => () => void setVisible(isVisible);

  const toggleCheckbox = (tagName: string) => () => {
    setChecks(Object.assign({}, checks, { [tagName]: !checks[tagName] }));
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
        open={visible} 
        onClose={toggleDrawer(false)}
      >
        <List>
          {options}
        </List>
        <Divider />
        <Button size='large' className='tag-selector-save-button'>Save</Button>
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