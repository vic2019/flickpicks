import React from 'react';

import TagSelector from './TagSelector';
import DeleteMovie from './DeleteMovie';
import Divider from './Divider';

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

  // const deleteMovie

  return (
    <>
      <div className='MovieItem'>
        <img
          className='movie-item-thumb'
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt='movie poster'
        />
        <div>
          <div className='movie-item-title'>{title}</div>
          <div>{`Date Added: ${dateAdded}`}</div>
          <TagSelector movie={movie} />
          <DeleteMovie movie={movie} />
        </div>
      </div>
      <Divider />
    </>
  );
}

export default MovieItem;