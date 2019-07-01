import React from 'react';

import FilterSelector from './FilterSelector';
import MovieList from './MovieList';
import LoadButton from './LoadButton';


const MyMovies = () => {
  return (
    <>
      <FilterSelector />
      <MovieList />
      <LoadButton />
    </>
  );
};

export default MyMovies;