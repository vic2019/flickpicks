import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Checkbox, Drawer, ListItem, ListItemIcon, 
  ListItemText, Typography } from '@material-ui/core';

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
  setFilterToAll,
  deleteTag 
}: Props)  => {
  const [checks, setChecks] = useState(filters);
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => void setOpen(isOpen);

  const toggleCheckbox = (tag: string) => () => {
    setChecks(Object.assign({}, checks, { [tag]: !checks[tag]}));
  };

  const selectAll = () => {
    setChecks(Object.assign({}, ...Object.keys(filters).map(tag => ({ 
      [tag]: true
    }))));
  }

  const applyFilters = () => {
    setFilter(checks);
    toggleDrawer(false)();
  }

  useEffect(() => {
    if (!isOpen) return;

    setChecks(filters);
  }, [isOpen]); // Should byTag be in the array?

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Filters</Button>
      <Drawer 
        className='filter-selector-dropdown' 
        anchor='top'
        open={isOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            maxHeight: '87vh',
          }
        }}
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
          </ListItem>
        ))}               
        <Button 
          fullWidth 
          size='large' 
          variant='outlined' 
          onClick={selectAll}
        >Select All</Button>
        <ButtonGroup fullWidth size='large' variant='contained' color='primary'>
          <Button onClick={toggleDrawer(false)}>Cancel</Button>
          <Button onClick={applyFilters}>Apply</Button>
        </ButtonGroup>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  filters: state.myMovies.filters
});

export default connect(
  mapStateToProps,
  { setFilter, setFilterToAll, deleteTag }
)(FilterSelector);