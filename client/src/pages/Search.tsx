import React from 'react';
import { Helmet } from 'react-helmet';

import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { Movie } from '../store/search/types';
import { updateSearch } from '../store/search/actions';

interface Props {
  movies: Movie[]
  // page: number
  totalPages: number
  updateSearch: any
  match: any
}

const Search = ({ 
  movies, totalPages, updateSearch, match
}: Props) => {
  const { page } = match.params;

  return (
    <div className='Discover'>
      <Helmet>
        <meta name="description" content="Search movies by key word" />
      </Helmet>
      <MovieList movies={movies} />
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
  // page: state.search.page,
  totalPages: state.search.totalPages
});

export default connect(
  mapStateToProps,
  { updateSearch }
)(Search);