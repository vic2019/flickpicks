import React from 'react';

import MovieItem from './MovieItem';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags, createTag, deleteMovie } from '../store/my-movies/actions';
import { ById, ByTag } from '../store/my-movies/types';

interface Props {
  byId: ById
  byTag: ByTag
  allIds: string[]
  setTags: any
  createTag: any
  deleteMovie: any
}

const MovieList = ({
  byId,
  byTag,
  allIds,
  setTags, 
  createTag, 
  deleteMovie 
}: Props)  => {
  return (
    <div>
      {allIds.map(id => (
        <MovieItem key={id} movie={byId[id]} />
      ))}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  byId: state.myMovies.byId,
  byTag: state.myMovies.byTag,
  allIds: state.myMovies.allIds
});

export default connect(
  mapStateToProps,
  { setTags, createTag, deleteMovie }
)(MovieList);