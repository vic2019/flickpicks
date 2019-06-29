import React from 'react';
import MovieItem from './MovieItem';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags, createTag, deleteMovie } from '../store/my-movies/actions';
import { MovieSet, Filter } from '../store/my-movies/types';

interface Props {
  appliedFilter: Filter['appliedFilter'];
  filterSet: Filter['filterSet'];
  movieSet: MovieSet;
  setTags: any;
  createTag: any; 
  deleteMovie: any; 
}

const MovieList = ({
  appliedFilter,
  filterSet,
  movieSet,
  setTags, 
  createTag, 
  deleteMovie 
}: Props)  => {
  return (
    <div className='MovieList'>
      {movieSet.order.map(id => (
        <MovieItem key={id} {...movieSet[id]} />
      ))}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  appliedFilter: state.filter.appliedFilter,
  filterSet: state.filter.filterSet,
  movieSet: state.movieSet
});

export default connect(
  mapStateToProps,
  { setTags, createTag, deleteMovie }
)(MovieList);