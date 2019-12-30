import React from 'react';

import FilterSelector from '../components/FilterSelector';
import ShowAllButton from '../components/ShowAllButton';
import CustomTagInput from '../components/CustomTagInput';
import MyMovieList from '../components/MyMovieList';
// import LoadButton from './LoadButton';

const MyMovies = () => {
  return (
      <div className='MyMovies'>
        <div className='my-movies-toggles'>
          <FilterSelector />
          <span className='breadcrumb-divider'>/</span>
          <ShowAllButton />
        </div>
        <CustomTagInput />
        <MyMovieList />
        {/* <LoadButton /> */}
      </div>
  );
};

export default MyMovies;