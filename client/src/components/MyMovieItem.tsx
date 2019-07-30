import React, { useState } from 'react';
import { Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';

import TagSelector from './TagSelector';
import DeleteMovie from './DeleteMovie';
import Divider from './Divider';

import { Movie } from '../store/my-movies/types';

import shrug from '../images/shrug.png';

const onError = (e: any) => {
  e.target.onerror = null; 
  e.target.src = shrug;
};

interface Props {
  movie: Movie
}

const MyMovieItem = ({ movie }: Props)  => {
  const [isVisible, setVisible] = useState(true);

  const {
    id,   
    // tMDb_id,
    title,
    image,
    dateAdded
  } = movie;

  const dateString = dateAdded.split(' ').slice(1, 4).join(' ');

  return (
    <Fade in={isVisible} timeout={{ enter: 0, exit: 180 }}>
      {/* Fade must only contain a single child element, and 
      it can't be a React.Fragment */}
      <div>
        <div className='MovieItem'>
        <Link
              to={`/movie/${id}-${title
                .split(/[,:]/).join('').split(' ').join('-')}`}
            >
          <img
            className='movie-item-thumb'
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt='movie poster'
            onError={onError}
          />
          </Link>
          <div>
          <Link
              to={`/movie/${movie.id}-${movie.title
                .split(/[,:]/).join('').split(' ').join('-')}`}
            >
            <div className='movie-item-title'>{title}</div>
          </Link>
            <div>{`Date Added: ${dateString}`}</div>
            <TagSelector movie={movie} />
            <DeleteMovie movie={movie} transitionOut={setVisible}/>
          </div>
        </div>
      <Divider />
      </div>
    </Fade>
  );
}

export default MyMovieItem;