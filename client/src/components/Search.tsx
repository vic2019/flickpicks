import React from 'react';

import SearchMovieList from './SearchMovieList';
import Pagination from './Pagination';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { updateSearch } from '../store/search/actions';

interface Props {
  page: number
  totalPages: number
  updateSearch: any
}

const Search = ({ page, totalPages, updateSearch}: Props) => {
  return (
    <div className='Discover'>
      <SearchMovieList />
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        navToPage={updateSearch}
      />
    </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  page: state.search.page,
  totalPages: state.search.totalPages
});

export default connect(
  mapStateToProps,
  { updateSearch }
)(Search);