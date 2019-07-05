import React, { useReducer, useState, useEffect } from 'react';
import { Button, ButtonGroup, Checkbox, Drawer, ListItem, ListItemIcon, 
  ListItemText } from '@material-ui/core';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags } from '../store/my-movies/actions';
import { Set, Movie, ByTag } from '../store/my-movies/types';


interface Props {
  setTags: any
  byTag: ByTag
  movie: Movie
}

interface CheckAction {
  type: string
  tag?: string
}

const TagSelector = ({
  setTags,
  byTag,
  movie
}: Props) => {
  const init = () => Object.keys(byTag).reduce((acc, tag) => ({
    ...acc, 
    ...{ 
      [tag]: Boolean(byTag[tag][movie.id]) 
    } 
  }), {});

  const reducer = (checks: Set, action: CheckAction ): Set => {
    switch (action.type) {
      case 'toggle':
        return action.tag? 
          { ...checks, ...{ [action.tag] : !checks[action.tag] } }: checks;
      case 'reset':
        return init();
      default:
        return checks;
    }
  }

  const [checks, dispatch] = useReducer(reducer, init());
  const [ isOpen, setOpen ] = useState(false);
  
  const toggleDrawer = (toOpen: boolean) => () => setOpen(toOpen);
  
  const toggleCheckbox = (tag: string) => () => {
    dispatch({ type: 'toggle', tag: tag });
  };
      
  const save = async () => {
    try {
      await setTags(movie, checks);
    } catch(err) {
      alert(err);
    }

    toggleDrawer(false)();
  };
  
  useEffect(() => {
    if (!isOpen) return;

    dispatch({ type: 'reset' });
  }, [isOpen]); 
  
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
        open={isOpen} 
        onClose={toggleDrawer(false)}
      >
        {Object.keys(byTag).map(tag => (
          <ListItem button onClick={toggleCheckbox(tag)}>
            <ListItemIcon>
              <Checkbox checked={checks[tag]} />
            </ListItemIcon>
            <ListItemText primary={tag} />
          </ListItem> 
        ))}
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