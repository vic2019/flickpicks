import React from 'react';

import DiscoverInput from './DiscoverInput';
import MovieList from './MovieList';
import Pagination from './Pagination';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { Movie } from '../store/discover/types';
import { updateDiscover } from '../store/discover/actions';
import { addMovie } from '../store/my-movies/actions';

interface Props {
  movies: Movie[]
  page: number
  totalPages: number
  updateDiscover: any
  addMovie: any
}

const Discover = ({ 
  movies, page, totalPages, updateDiscover, addMovie
}: Props) => {
  return (
    <div className='Discover'>
      <DiscoverInput />
      <MovieList movies={movies} addMovie={addMovie}/>
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        navToPage={updateDiscover}
      />
    </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  movies: state.discover.movies,
  page: state.discover.page,
  totalPages: state.discover.totalPages
});

export default connect(
  mapStateToProps,
  { updateDiscover, addMovie }
)(Discover);