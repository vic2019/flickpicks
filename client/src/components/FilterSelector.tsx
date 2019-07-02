import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } 
  from '@material-ui/core';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setFilter, setFilterToAll, deleteTag } 
  from '../store/my-movies/actions'
import { ByTag, TagSetter } from '../store/my-movies/types';

interface Props {
  byTag: ByTag
  filters: TagSetter
  setFilter: any
  setFilterToAll: any
  deleteTag: any
}

const FilterSelector = ({
  byTag,
  filters,
  setFilter, 
  setFilterToAll,
  deleteTag 
}: Props)  => {
  const [checks, setChecks] = useState(filters);

  const options = () => Object.keys(filters).map((tag: string) => (
    <MenuItem key={tag} value={tag} onClick={() => {alert('hi'); toggleCheckbox(tag)}}>
      <Checkbox checked={checks[tag]} />
      <ListItemText primary={tag} />
    </MenuItem>
  ));

  const toggleCheckbox = (tag: string) => () => {
    setChecks(Object.assign({}, checks, { [tag]: !checks[tag]}));
  }

  return (
    <FormControl>
        <InputLabel>Filter</InputLabel>
        <Select multiple value={options()}> 
          {options()}
        </Select>
    </FormControl>
  );
}

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag,
  filters: state.myMovies.filters
});

export default connect(
  mapStateToProps,
  { setFilter, setFilterToAll, deleteTag }
)(FilterSelector);