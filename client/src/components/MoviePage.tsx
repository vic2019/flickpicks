import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { loadMovie, movieNotFound } from '../store/movie-page/actions';
import { MoviePage as MoviePageType } from '../store/movie-page/types';

import { addMovie, deleteMovie } from '../store/my-movies/actions';
import { ById } from '../store/my-movies/types';

const checkboxStyles = makeStyles({
  root: {
    padding: '0 2px 4px 0'
  }
});

interface Props {
  byId: ById
  moviePage: MoviePageType
  loadMovie: any
  movieNotFound: any
  addMovie: any
  deleteMovie: any
}

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

  const checkboxClasses = checkboxStyles();

  const smlBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const respBaseUrl = useMediaQuery('(max-width: 520px)')?
    'https://image.tmdb.org/t/p/w500': 'https://image.tmdb.org/t/p/w1280'

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

  return notFound ? null:
    <div className='MoviePage'>
      <img
        className='movie-page-backdrop'
        src={respBaseUrl + backdrop}
      />
      <header className='movie-page-header'>
        <img
          className='movie-page-poster'
          src={smlBaseUrl + poster}
        />
        <div>
          <h3 className='movie-page-title'>
            <Checkbox
              icon={<StarBorder fontSize='small' />}
              checkedIcon={<Star fontSize='small' />}
              checked={Boolean(byId[id])}
              onClick={toggleAddMovie}
              color='secondary'
              classes={{ root: checkboxClasses.root }}
              title='Add to my movies'
            />
            {title}
            <span className='movie-page-release-year'>
              ({releaseDate.slice(0, 4)})
            </span>
          </h3>
        </div>
      </header>

      <div className='movie-page-details' >
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
            CastCard(name, character, smlBaseUrl + image)
          ))}
        </div>
      </div>

      <div className='movie-page-recommendations'>
        <h4>Recommendations</h4>
        <div className='movie-page-recommendation-list'>
          {recommendations.map(({ id, title, image }) => (
            RecommendationCard(id, title, smlBaseUrl + image)
          ))}
        </div>
      </div>
    </div>
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
      <img src={image} />
      <span style={{ height: '6em', overflow: 'scroll' }}>
        <div><strong>{name}</strong></div>
        <div>{character}</div>
      </span>
    </span>
  );
};

const RecommendationCard = (id: number, title: string, image: string) => {
  return (
    <Link to={`/movie/${id}`} >
      <span className='movie-page-recommendation-card'>
        <img src={image} />
        <span style={{ minHeight: '3em' }}>{title}</span>
      </span>
    </Link>
  );
};

const ColoredDivider = ({ top }: { top: boolean }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: useMediaQuery('(max-width: 520px)')? 
      `${top? '0': '35px'} 0 ${top? '30px': '0'} 0`:
      `${top? '0': '58px'} 0 ${top? '50px': '0'} 0`
  }
  const style = { 
    border: '2px solid #26c6da',
    width: useMediaQuery('(max-width: 520px)')? '40vw': '28vw'
  };

  return <div style={containerStyle} ><div style={style} /></div>
}


const mapStateToProps = (state: AppState) => ({
  moviePage: state.moviePage,
  byId: state.myMovies.byId
});

export default connect(
  mapStateToProps,
  { loadMovie, movieNotFound, addMovie, deleteMovie }
)(MoviePage);