import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { addMovie } from '../store/my-movies/actions';
import { Movie } from '../store/search/types';
import { AppState } from '../store';

import Divider from './Divider';
import ScrollToTop from './ScrollToTop';

interface Props {
  movies: Movie[]
  addMovie: any
}

const SearchMovieList = ({
  movies,
  addMovie
}: Props) => {
  return (
    <ScrollToTop>     
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
            <Link
              to={`/movie/${movie.id}-${movie.title
                .split(/[,:]/).join('').split(' ').join('-')}`}
            >
              <div className='discover-movie-card-title'>
                {movie.title}
                <span className='discover-movie-card-release-year'>
                  ({movie.releaseDate.split('-')[0]})
                </span>
              </div>
            </Link>
          </div>
          <div
            className='add-movie-button'
            onClick={() => addMovie({
              id: movie.id,
              tMDb_id: movie.id,
              title: movie.title,
              image: movie.poster,
              dateAdded: new Date().toString()
            })}
          >
            {'\u21AA'}Add to my movies
          </div>
          <Divider />
        </div>
      ))}
    </ScrollToTop>
  )
};

export default connect(
  (state: AppState) => ({ movies: state.search.movies }),
  { addMovie }
)(SearchMovieList);