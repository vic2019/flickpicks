import React from 'react';
import MovieItem from './MovieItem';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags, createTag, deleteMovie } from '../store/my-movies/actions';
import { ById, ByTag } from '../store/my-movies/types';

interface Props {
  byId: ById
  byTag: ByTag
  setTags: any
  createTag: any
  deleteMovie: any
}

const MovieList = ({
  byId,
  byTag,
  setTags, 
  createTag, 
  deleteMovie 
}: Props)  => {
  return (
    <div className='MovieList'>
      {Object.values(byId).map(movie => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  byId: state.myMovies.byId,
  byTag: state.myMovies.byTag
});

export default connect(
  mapStateToProps,
  { setTags, createTag, deleteMovie }
)(MovieList);