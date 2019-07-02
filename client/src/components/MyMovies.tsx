import React from 'react';

import FilterSelector from './FilterSelector';
import ShowAll from './ShowAll';
import CreateCustomTag from './CreateCustomTag';
import MovieList from './MovieList';
import LoadButton from './LoadButton';


const MyMovies = () => {
  return (
    <>
      <FilterSelector />
      /
      <ShowAll />
      /
      {/* <CreateCustomTag /> */}
      <MovieList />
      <LoadButton />
    </>
  );
};

export default MyMovies;