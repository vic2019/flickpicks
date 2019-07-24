import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { updateDiscover } from '../store/discover/actions';
import { Movie } from '../store/discover/types';

import Divider from './Divider';

interface Props {
  movies: Movie[]
  updateDiscover: any
}

const DiscoverMovieList = ({
  movies,
  updateDiscover
}: Props) => {
  return (
    <>
      {movies.map(movie => (
        <div key={movie.id}>
          <Link 
            to={`/movie/${movie.id}-${movie.title
              .split(/[,:]/).join('').split(' ').join('-')}`}
          >
            <div className='discover-movie-card'>
              {movie.image? 
                <img
                  className='discover-movie-card-thumb'
                  src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                  alt=''
                />: null
              }
              <div className='discover-movie-card-title'>
                {movie.title}
                <span className='discover-movie-card-release-year'>
                  ({movie.releaseDate.split('-')[0]})
                </span>
              </div>
            </div>
          </Link>
          <Divider />
        </div>
      ))}
    </>
  )
};

const mapStateToProps = (state: AppState) => ({
  movies: state.discover.movies
});

export default connect(
  mapStateToProps,
  { updateDiscover }
)(DiscoverMovieList);