import React from 'react';
import FilterSelector from './FilterSelector';
import MovieList from './MovieList';
import LoadButton from './LoadButton';


const MyMovies = () => {
  return (
    <div className="MyMovies">
      <FilterSelector />
      <MovieList />
      <LoadButton />
    </div>
  );
};

export default MyMovies;