import React from 'react';

import FilterSelector from './FilterSelector';
import ShowAll from './ShowAll';
import CreateCustomTag from './CreateCustomTag';
import MovieList from './MovieList';
import LoadButton from './LoadButton';


const MyMovies = () => {
  return (
    <>
      <div className='my-movies-controls'>
        <span className='my-movies-filter-controls'>
          <FilterSelector />
          /
          <ShowAll />
          /
        </span>
        <CreateCustomTag />
      </div>
      <br />
      <MovieList />
      <LoadButton />
    </>
  );
};

export default MyMovies;