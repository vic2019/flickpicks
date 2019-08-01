import React from 'react';

import DiscoverInput from './DiscoverInput';
import MovieList from './MovieList';
import Pagination from './Pagination';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { Movie } from '../store/discover/types';
import { updateDiscover } from '../store/discover/actions';

import { ById } from '../store/my-movies/types';
import { addMovie, deleteMovie } from '../store/my-movies/actions';

interface Props {
  byId: ById
  movies: Movie[]
  page: number
  totalPages: number
  updateDiscover: any
  addMovie: any
  deleteMovie: any
}

const Discover = ({ 
  byId, movies, page, totalPages, updateDiscover, addMovie, deleteMovie
}: Props) => {
  return (
    <div className='Discover'>
      <DiscoverInput />
      <MovieList 
        byId={byId} 
        movies={movies} 
        addMovie={addMovie} 
        deleteMovie={deleteMovie} 
      />
      <Pagination 
        pathname='/discover'
        page={page} 
        totalPages={totalPages} 
        navToPage={updateDiscover}
      />
    </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  byId: state.myMovies.byId,
  movies: state.discover.movies,
  page: state.discover.page,
  totalPages: state.discover.totalPages
});

export default connect(
  mapStateToProps,
  { updateDiscover, addMovie, deleteMovie }
)(Discover);