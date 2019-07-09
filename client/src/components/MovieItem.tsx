import React, { useState } from 'react';
import { Fade } from '@material-ui/core';

import TagSelector from './TagSelector';
import DeleteMovie from './DeleteMovie';
import Divider from './Divider';

import { Movie } from '../store/my-movies/types';


interface Props {
  movie: Movie
}

const MovieItem = ({ movie }: Props)  => {
  const [isVisible, setVisible] = useState(true);

  const {
    id,   
    tMDb_id,
    title,
    image,
    dateAdded
  } = movie;

  // const deleteMovie

  return (
    <Fade in={isVisible} timeout={{ enter: 0, exit: 180 }}>
      {/* Fade must only contain a single child element, and 
      it can't be a React.Fragment */}
      <div>
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
            <DeleteMovie movie={movie} transitionOut={setVisible}/>
          </div>
        </div>
      <Divider />
      </div>
    </Fade>
  );
}

export default MovieItem;