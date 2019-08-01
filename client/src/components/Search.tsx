import React from 'react';

import MovieList from './MovieList';
import Pagination from './Pagination';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { Movie } from '../store/search/types';
import { ById } from '../store/my-movies/types';
import { updateSearch } from '../store/search/actions';
import { addMovie, deleteMovie } from '../store/my-movies/actions';

interface Props {
  byId: ById
  movies: Movie[]
  page: number
  totalPages: number
  updateSearch: any
  addMovie: any
  deleteMovie: any
}

const Search = ({ 
  byId, movies, page, totalPages, updateSearch, addMovie, deleteMovie
}: Props) => {
  return (
    <div className='Discover'>
      <MovieList 
        byId={byId} 
        movies={movies} 
        addMovie={addMovie} 
        deleteMovie={deleteMovie} 
      />
      <Pagination
        pathname='/search' 
        page={page} 
        totalPages={totalPages} 
        navToPage={updateSearch}
      />
    </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  byId: state.myMovies.byId,
  movies: state.search.movies,
  page: state.search.page,
  totalPages: state.search.totalPages
});

export default connect(
  mapStateToProps,
  { updateSearch, addMovie, deleteMovie }
)(Search);