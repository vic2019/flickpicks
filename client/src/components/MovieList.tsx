import React from 'react';

import MovieItem from './MovieItem';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { ById, ByTag, Set } from '../store/my-movies/types';

interface Props {
  byId: ById
  byTag: ByTag
  allIds: string[]
  filters: Set
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
        Object.entries(byId).map(([id, movie]) => (
          <MovieItem key={id} movie={movie} />
        )):
        Object.keys(
          Object.assign({}, ...Object.keys(filters).map(tag => (byTag[tag])))
        ).map(id => (<MovieItem key={id} movie={byId[id]} />))
      }
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