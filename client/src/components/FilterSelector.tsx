import React, { useReducer, useState, useEffect } from 'react';
import { Button, ButtonGroup, Checkbox, Drawer, ListItem, ListItemIcon,
  ListItemText, Typography, ListItemSecondaryAction, IconButton } 
  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setFilters, deleteTag } from '../store/my-movies/actions';
import { Set, ByTag } from '../store/my-movies/types';


interface Props {
  byTag: ByTag
  filters: Set
  setFilters: any
  deleteTag: any
}

interface CheckAction {
  type: string
  tag?: string
}

const FilterSelector = ({
  byTag,
  filters,
  setFilters,
  deleteTag 
}: Props)  => {
  const init = () => Object.assign({}, ...Object.keys(byTag).map(tag => ({
    [tag]: Boolean(filters[tag])? tag: ''
  })));

  const reducer = (checks: Set, action: CheckAction ): Set => {
    switch (action.type) {
      case 'toggle':
        return action.tag !== undefined? {
          ...checks,
          [action.tag]: checks[action.tag]? '': action.tag
        }: checks;
      case 'toAll':
        return Object.assign({}, ...Object.keys(checks).map(tag => ({ 
          [tag]: true
        })));
      case 'toNone':
        return Object.assign({}, ...Object.keys(checks).map(tag => ({ 
          [tag]: false
        })));
      case 'reset':
        return init();
      default:
        return checks;
    }
  }

  const [checks, dispatch] = useReducer(reducer, init());
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => setOpen(isOpen);

  const toggleCheckbox = (tag: string) => () => {
    dispatch({ type: 'toggle', tag: tag });
  };
  
  const modifyAll = (toCheck: boolean) => () => {
    dispatch({ type: toCheck? 'toAll': 'toNone'});
  }

  const applyFilters = () => {
    setFilters(checks);
    toggleDrawer(false)();
  }

  const wrappedDeleteTag = (tag: string) => () => deleteTag(tag);

  useEffect(() => {
    if (!isOpen) return; 

    dispatch({ type: 'reset' });
  }, [isOpen]);

  return (
    <>
      <span 
        onClick={toggleDrawer(true)}
      >Filters</span>
      <Drawer 
        anchor='top'
        open={isOpen} 
        onClose={toggleDrawer(false)}
      >
        <ListItem>
          <ListItemText primary={
            <Typography align='left' variant='h6'>Show me only...</Typography>
          }/>
        </ListItem>
        {Object.keys(byTag).map(tag => (
          <ListItem button onClick={toggleCheckbox(tag)}>
            <ListItemIcon>
              <Checkbox color='primary' checked={Boolean(checks[tag])} />
            </ListItemIcon>
            <ListItemText primary={tag} />
            <ListItemSecondaryAction>
              <IconButton 
                edge='end' 
                aria-label='Delete'
                onClick={wrappedDeleteTag(tag)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}            
        <Button 
          fullWidth 
          size='large' 
          variant='outlined' 
          onClick={modifyAll(true)}
        >Select All</Button>
        <Button 
          fullWidth 
          size='large' 
          variant='outlined' 
          onClick={modifyAll(false)}
        >Unselect All</Button>
        <ButtonGroup fullWidth size='large' variant='contained' color='primary'>
          <Button onClick={toggleDrawer(false)}>Cancel</Button>
          <Button onClick={applyFilters}>Apply</Button>
        </ButtonGroup>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag,
  filters: state.myMovies.filters
});

export default connect(
  mapStateToProps,
  { setFilters, deleteTag }
)(FilterSelector);