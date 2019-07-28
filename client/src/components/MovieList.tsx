import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

import { Movie } from '../store/search/types';
import { ById } from '../store/my-movies/types';

import Divider from './Divider';

interface Props {
  byId: ById
  movies: Movie[]
  addMovie: any
  deleteMovie: any
}

const MovieList = ({
  byId,
  movies,
  addMovie,
  deleteMovie
}: Props) => {
  const toggleAddMovie = (movie: any) => () => {
    if(Boolean(byId[movie.id])) {
      deleteMovie(byId[movie.id]);
      return;
    }

    addMovie({
      id: movie.id,
      tMDb_id: movie.id,
      title: movie.title,
      image: movie.poster,
      dateAdded: new Date().toString()
    });
  };

  return (
    <>
      {movies.map(movie => (
        <div className='discover-movie-card'>
          <div key={movie.id}>
            <Link
              to={`/movie/${movie.id}-${movie.title
                .split(/[,:]/).join('').split(' ').join('-')}`}
            >
              {movie.image ?
                <img
                  className='discover-movie-card-thumb'
                  src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                  alt=''
                /> : null
              }
            </Link>
            <div>
            <Link
              to={`/movie/${movie.id}-${movie.title
                .split(/[,:]/).join('').split(' ').join('-')}`}
            >
              <span className='discover-movie-card-title'>
                {movie.title}
                <span className='discover-movie-card-release-year'>
                  ({movie.releaseDate.split('-')[0]})
                </span>
              </span>
            </Link>
            <Checkbox
              icon={<StarBorder />} 
              checkedIcon={<Star />} 
              checked={Boolean(byId[movie.id])}
              color='secondary'
              onClick={toggleAddMovie(movie)}
              title='Add to my movies'
            />
          </div>
          </div>
          <Divider />
        </div>
      ))}
    </>
  )
};

export default MovieList;