import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

import { Link } from 'react-router-dom';

import { Movie } from '../store/search/types';
import { ById } from '../store/my-movies/types';

import Divider from './Divider';
import shrug from '../images/shrug.png';
import { img500BaseUrl } from '../config';

const checkboxStyle = { padding: '0 0 3px 2px' };

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
            <Link to={`/movie/${movie.id}`} >
              {movie.image ?
                <img
                  className='discover-movie-card-thumb'
                  src={img500BaseUrl + movie.image}
                  alt=''
                /> :
                movie.poster ?
                  <img
                    className='discover-movie-card-thumb'
                    src={img500BaseUrl + movie.poster}
                    alt=''
                  /> :
                  <img
                    className='discover-movie-card-thumb'
                    src={shrug}
                    alt=''
                  />
              }
            </Link>
            <div>
              <Link to={`/movie/${movie.id}`} >
                <span className='discover-movie-card-title'>
                  {movie.title}
                  <span className='discover-movie-card-release-year'>
                    ({movie.releaseDate ? movie.releaseDate.split('-')[0] : '?'})
                </span>
                </span>
              </Link>
              <Checkbox
                icon={<StarBorder fontSize='small' />}
                checkedIcon={<Star fontSize='small' />}
                checked={Boolean(byId[movie.id])}
                color='secondary'
                onClick={toggleAddMovie(movie)}
                style={checkboxStyle}
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