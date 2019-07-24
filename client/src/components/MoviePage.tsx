import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { loadMovie, movieNotFound } from '../store/movie-page/actions';
import { addMovie } from '../store/my-movies/actions';
import { MoviePage as MoviePageType } from '../store/movie-page/types';

import ScrollToTop from './ScrollToTop';

interface Props {
  moviePage: MoviePageType,
  loadMovie: any,
  movieNotFound: any,
  addMovie: any
}

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

const MoviePage = ({ 
  moviePage, loadMovie, movieNotFound, addMovie 
}: Props) => {
  const {
    notFound,
    id,
    backdrop,
    poster,
    title,
    releaseDate,
    overview,
    crew,
    cast,
    recommendations
  } = moviePage;

  const addToMyMovies = () => {
    addMovie({
      id,
      tMDb_id: id,
      title,
      image: poster,
      dateAdded: new Date().toString()
    });
  }

  useEffect(() => {
    const regexMatch = window.location.pathname.match(/(\d+)/);
    if (!regexMatch) {
      movieNotFound();
      return;
    }
    
    loadMovie(Number(regexMatch[0]));
  }, [window.location.pathname]); 
  //^ The dependency cannot be an object 
  // (window.location won't work; has to be a string)

  return (
    notFound? null:
    <ScrollToTop>
    <div className='MoviePage'>
      <img 
        className='movie-page-backdrop'
        src={imageBaseUrl + backdrop}
      />
      <div className='movie-page-header'>
        <img 
          className='movie-page-poster' 
          src={imageBaseUrl + poster}
        />
        <h3 className='movie-page-title'>{title}
          <span className='movie-page-release-year'>
            (
            {releaseDate.slice(0, 4)}
            )
          </span>
          <br />
          <span 
            className='add-movie-button'
            onClick={addToMyMovies}
          >{'\u21AA'}Add to my movies</span>
        </h3>
      </div>
      <div className='movie-page-details'>
        <h4>Overview</h4>
        <p>{overview}</p> 
      </div>              
      <div className='movie-page-crew'>
        <h4>Featured Crew</h4>
        <div className='movie-page-crew-list'>
          {crew.map(({ name, job }) => CrewCard(name, job))}
        </div>
      </div>
      <div className='movie-page-cast'>
        <h4>Featured Cast</h4>
        <div className='movie-page-cast-list'>
          {cast.map(({ name, character, image }) => (
            CastCard(name, character, image)
          ))}
        </div>
      </div>
      <div className='movie-page-recommendations'>
        <h4>Recommendations</h4>
        <div className='movie-page-recommendation-list'>
          {recommendations.map(({ id, title, image }) => (
            RecommendationCard(id, title, image)
          ))}
        </div>
      </div>
    </div>
    </ScrollToTop>
  );
};

const CrewCard = (name: string, job: string) => {
  return (
    <span className='movie-page-crew-card'>
      <span><strong>{name}</strong></span>
      <span>{job}</span>
    </span>
  );
};

const CastCard = (name: string, character: string, image: string) => {
  return (
    <span className='movie-page-cast-card'>
      <img
        src={imageBaseUrl + image}
      />
      <span><strong>{name}</strong></span>
      <span style={{ minHeight: '4em' }}>{character}</span>
    </span>
  );
};

const RecommendationCard = (id: number, title: string, image: string) => {
  return (
    <Link to={`/movie/${id}-${title
      .split(/[,:]/).join('').split(' ').join('-')}`}
    >
      <span className='movie-page-recommendation-card'>
        <img
          src={`https://image.tmdb.org/t/p/w500${image}`}
        />
        <span style={{ minHeight: '3em' }}>{title}</span>
      </span>
    </Link>
  );
};


const mapStateToProps = (state: AppState) => ({
  moviePage: state.moviePage
});

export default connect(
  mapStateToProps,
  { loadMovie, movieNotFound, addMovie }
)(MoviePage);