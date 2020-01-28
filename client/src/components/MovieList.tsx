import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { addMovie, deleteMovie } from '../store/my-movies/actions';
import { ById } from '../store/my-movies/types';
import { Movie } from '../store/search/types';

import Divider from './Divider';
import shrug from '../images/shrug.png';
import { img500BaseUrl } from '../config';

const checkboxStyle = { padding: '0 0 3px 2px' };

interface Props {
  movies: Movie[]
  byId: ById
  waiting: boolean
  addMovie: any
  deleteMovie: any
}

const MovieList = ({
  movies,
  byId,
  waiting,
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
      {waiting? null: movies.map(movie => (
        <div className='discover-movie-card' key={movie.id} >
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

export default connect(
  (state: AppState) => ({
    byId: state.myMovies.byId,
    waiting: state.appLevel.waiting
  }),
  { addMovie, deleteMovie }
)(MovieList);