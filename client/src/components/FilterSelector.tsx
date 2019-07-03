import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Checkbox, Drawer, ListItem, ListItemIcon,
  ListItemText, Typography, ListItemSecondaryAction, IconButton } 
  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setFilter, setFilterToAll, deleteTag } 
  from '../store/my-movies/actions'
import { TagSetter } from '../store/my-movies/types';

interface Props {
  filters: TagSetter
  setFilter: any
  setFilterToAll: any
  deleteTag: any
}

const FilterSelector = ({
  filters,
  setFilter, 
  deleteTag 
}: Props)  => {
  const [checks, setChecks] = useState(filters);
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => void setOpen(isOpen);

  const toggleCheckbox = (tag: string) => () => {
    setChecks(Object.assign({}, checks, { [tag]: !checks[tag]}));
  };

  const modifyAll = (toSelect: boolean) => () => {
    setChecks(Object.assign({}, ...Object.keys(filters).map(tag => ({ 
      [tag]: toSelect
    }))));
  }

  const applyFilters = () => {
    setFilter(checks);
    toggleDrawer(false)();
  }

  const wrappedDeleteTag = (tag: string) => () => void deleteTag(tag);

  useEffect(() => {
    if (!isOpen) return; 

    setChecks(filters);
  }, [isOpen]);

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Filters</Button>
      <Drawer 
        className='filter-selector-dropdown' 
        anchor='top'
        open={isOpen} 
        onClose={toggleDrawer(false)}
      >
        <ListItem>
          <ListItemText primary={
            <Typography align='left' variant='h6'>Show me only...</Typography>
          }/>
        </ListItem>
        {Object.keys(filters).map(tag => (
          <ListItem button onClick={toggleCheckbox(tag)}>
            <ListItemIcon>
              <Checkbox checked={checks[tag]} />
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
  filters: state.myMovies.filters
});

export default connect(
  mapStateToProps,
  { setFilter, setFilterToAll, deleteTag }
)(FilterSelector);