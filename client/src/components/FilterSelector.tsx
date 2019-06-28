import React from 'react';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setFilter, setFilterToAll, deleteTag } 
  from '../store/my-movies/actions'
import { Filter } from '../store/my-movies/types';

interface Props {
  appliedFilter: Filter['appliedFilter'];
  filterSet: Filter['filterSet']
  setFilter: any;
  setFilterToAll: any;
  deleteTag: any;
}

const FilterSelector = ({
  appliedFilter,
  filterSet,
  setFilter, 
  setFilterToAll,
  deleteTag 
}: Props)  => {
  return (
    <div className='FilterSelector'>
      {filterSet}
      <br/>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  appliedFilter: state.filter.appliedFilter,
  filterSet: state.filter.filterSet
});

export default connect(
  mapStateToProps,
  { setFilter, setFilterToAll, deleteTag }
)(FilterSelector);