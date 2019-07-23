import React from 'react';

import DiscoverInput from './DiscoverInput';
import DiscoverMovieList from './DiscoverMovieList';
import Pagination from './Pagination';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { updateDiscover } from '../store/discover/actions';

interface Props {
  page: number
  totalPages: number
  updateDiscover: any
}

const Discover = ({ page, totalPages, updateDiscover}: Props) => {
  return (
    <div className='Discover'>
      <DiscoverInput />
      <DiscoverMovieList />
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        navToPage={updateDiscover}
      />
    </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  page: state.discover.page,
  totalPages: state.discover.totalPages
});

export default connect(
  mapStateToProps,
  { updateDiscover }
)(Discover);