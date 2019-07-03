import React from 'react';

import FilterSelector from './FilterSelector';
import ShowAllButton from './ShowAllButton';
import CustomTagInput from './CustomTagInput';
import MovieList from './MovieList';
import LoadButton from './LoadButton';


const MyMovies = () => {
  return (
    <>
      <div className='my-movies-controls'>
        <span className='my-movies-filter-controls'>
          <FilterSelector />
          /
          <ShowAllButton />
          /
        </span>
        <CustomTagInput />
      </div>
      <br />
      <MovieList />
      <LoadButton />
    </>
  );
};

export default MyMovies;