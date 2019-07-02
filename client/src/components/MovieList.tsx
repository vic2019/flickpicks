import React from 'react';

import MovieItem from './MovieItem';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { ById, ByTag, Filters } from '../store/my-movies/types';

interface Props {
  byId: ById
  byTag: ByTag
  allIds: string[]
  filters: Filters
  showAll: boolean
}

const MovieList = ({
  byId,
  byTag,
  allIds,
  filters,
  showAll
}: Props)  => {
  return (
    <div>
      {showAll?
      allIds.map(id => (
        <MovieItem key={id} movie={byId[id]} />
      )):
      allIds.filter(id => {
        for (let tag of Object.keys(filters)) {
          if (!filters[tag]) continue;
          if (byTag[tag][id]) return true;
        }

        return false
      }).map(id => (
        <MovieItem key={id} movie={byId[id]} />
      ))}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  byId: state.myMovies.byId,
  byTag: state.myMovies.byTag,
  allIds: state.myMovies.allIds,
  filters: state.myMovies.filters,
  showAll: state.myMovies.showAll
});

export default connect(
  mapStateToProps,
)(MovieList);