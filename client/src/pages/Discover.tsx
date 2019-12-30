import React from 'react';

import DiscoverInput from '../components/DiscoverInput';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { Movie } from '../store/discover/types';
import { updateDiscover } from '../store/discover/actions';

interface Props {
  movies: Movie[]
  page: number
  totalPages: number
  updateDiscover: any
  initMyMovies: any
}

const Discover = ({ 
  movies, page, totalPages, updateDiscover
}: Props) => {
  return (
    <div className='Discover'>
      <DiscoverInput />
      <MovieList movies={movies} />
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
  { updateDiscover }
)(Discover);