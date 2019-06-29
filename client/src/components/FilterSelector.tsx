import React from 'react';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setFilter, setFilterToAll, deleteTag } 
  from '../store/my-movies/actions'
import { ByTag } from '../store/my-movies/types';

interface Props {
  byTag: ByTag
  setFilter: any
  setFilterToAll: any
  deleteTag: any
}

const FilterSelector = ({
  byTag,
  setFilter, 
  setFilterToAll,
  deleteTag 
}: Props)  => {
  return (
    <div className='FilterSelector'>
      {Object.keys(byTag)}
      <br/>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag
});

export default connect(
  mapStateToProps,
  { setFilter, setFilterToAll, deleteTag }
)(FilterSelector);