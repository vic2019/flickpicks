import React from 'react';

import FilterSelector from './FilterSelector';
import ShowAllButton from './ShowAllButton';
import CustomTagInput from './CustomTagInput';
import MyMovieList from './MyMovieList';
import LoadButton from './LoadButton';
import ScrollToTop from './ScrollToTop';


const MyMovies = () => {
  return (
    <ScrollToTop>
      <div className='MyMovies'>
        <div className='my-movies-toggles'>
          <FilterSelector />
          <span className='breadcrumb-divider'>/</span>
          <ShowAllButton />
        </div>
        <CustomTagInput />
        <MyMovieList />
        <LoadButton />
      </div>
    </ScrollToTop>
  );
};

export default MyMovies;