import React from 'react';
import TagSelector from './TagSelector';

import { Movie } from '../store/my-movies/types';

interface Props {
  movie: Movie
}

const MovieItem = ({ movie }: Props)  => {
  const {
    id,   
    tMDb_id,
    title,
    image,
    dateAdded
  } = movie;

  return (
    <div className='MovieItem'>
      <img
        src={`https://image.tmdb.org/t/p/w500${image}`}
        alt='movie poster'
      />
      <div className='text-container'>
        <p>{title}</p>
        <p>{`Date Added: ${dateAdded}`}</p>
        <TagSelector movie={movie}/> 
      </div>
    </div>
  );
}

export default MovieItem;