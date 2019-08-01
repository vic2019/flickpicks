import React from 'react';

import FilterSelector from './FilterSelector';
import ShowAllButton from './ShowAllButton';
import CustomTagInput from './CustomTagInput';
import MyMovieList from './MyMovieList';
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