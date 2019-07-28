import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { loadMovie, movieNotFound } from '../store/movie-page/actions';
import { addMovie, deleteMovie } from '../store/my-movies/actions';
import { MoviePage as MoviePageType } from '../store/movie-page/types';
import { ById } from '../store/my-movies/types';

import ScrollToTop from './ScrollToTop';

interface Props {
  byId: ById
  moviePage: MoviePageType
  loadMovie: any
  movieNotFound: any
  addMovie: any
  deleteMovie: any
}

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

const MoviePage = ({ 
  byId, moviePage, loadMovie, movieNotFound, addMovie, deleteMovie
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

  const toggleAddMovie = () => {
    if(Boolean(byId[id])) {
      deleteMovie(byId[id]);
      return;
    }

    addMovie({
      id,
      tMDb_id: id,
      title,
      image: poster,
      dateAdded: new Date().toString()
    });
  };

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
        <h3 className='movie-page-title'>
        {title}
          <span className='movie-page-release-year'>
            (
            {releaseDate.slice(0, 4)}
            )
          </span>
          <Checkbox
            icon={<StarBorder />} 
            checkedIcon={<Star />} 
            checked={Boolean(byId[id])}
            onClick={toggleAddMovie}
            color='secondary'
            title='Add to my movies'
          />
        </h3>
      </div>
      <div className='movie-page-details'>
        <ColoredDivider top={true} />
        <h4>Overview</h4>
        <p>{overview}</p> 
        <ColoredDivider top={false} />
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

const ColoredDivider = ({ top }: { top: boolean }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: `${top? '0': '35px'} 0 ${top? '35px': '0'} 0`
  }
  const style = { 
    border: '2px solid #26c6da',
    width: '40vw'
  };

  return <div style={containerStyle}><div style={style} /></div>
}


const mapStateToProps = (state: AppState) => ({
  moviePage: state.moviePage,
  byId: state.myMovies.byId
});

export default connect(
  mapStateToProps,
  { loadMovie, movieNotFound, addMovie, deleteMovie }
)(MoviePage);