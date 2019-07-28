import React from 'react';

import MovieList from './MovieList';
import Pagination from './Pagination';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { Movie } from '../store/search/types';
import { updateSearch } from '../store/search/actions';

interface Props {
  movies: Movie[]
  page: number
  totalPages: number
  updateSearch: any
}

const Search = ({ movies, page, totalPages, updateSearch}: Props) => {
  return (
    <div className='Discover'>
      <MovieList movies={movies}/>
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        navToPage={updateSearch}
      />
    </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  movies: state.search.movies,
  page: state.search.page,
  totalPages: state.search.totalPages
});

export default connect(
  mapStateToProps,
  { updateSearch }
)(Search);