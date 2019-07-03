import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Checkbox, Drawer, ListItem, ListItemIcon,
  ListItemText, Typography, ListItemSecondaryAction, IconButton } 
  from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setFilters, deleteTag } 
  from '../store/my-movies/actions'
import { Set, ByTag } from '../store/my-movies/types';
import { booleanLiteral } from '@babel/types';

interface Props {
  byTag: ByTag
  filters: Set
  setFilters: any
  deleteTag: any
}

const FilterSelector = ({
  byTag,
  filters,
  setFilters,
  deleteTag 
}: Props)  => {
  const initChecks = () => Object.assign({}, ...Object.keys(byTag).map(tag => {
    return { 
      [tag]: Boolean(filters[tag]) 
    };
  }));

  const [checks, setChecks] = useState(initChecks());
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => setOpen(isOpen);

  const toggleCheckbox = (tag: string) => () => {
    setChecks(Object.assign({}, checks, { [tag]: !checks[tag] }));
  };

  const modifyAll = (isChecked: boolean) => () => {
    setChecks(Object.assign({}, ...Object.keys(checks).map(tag => ({ 
      [tag]: isChecked
    }))));
  }

  const applyFilters = () => {
    setFilters(checks);
    toggleDrawer(false)();
  }

  const wrappedDeleteTag = (tag: string) => () => deleteTag(tag);

  useEffect(() => {
    if (!isOpen) return; 

    setChecks(initChecks());
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
        {Object.keys(byTag).map(tag => (
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
  byTag: state.myMovies.byTag,
  filters: state.myMovies.filters
});

export default connect(
  mapStateToProps,
  { setFilters, deleteTag }
)(FilterSelector);