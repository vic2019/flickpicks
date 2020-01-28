import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { loadMovie } from '../store/movie-page/actions';
import { MoviePage as MoviePageType } from '../store/movie-page/types';

import { addMovie, deleteMovie } from '../store/my-movies/actions';
import { ById } from '../store/my-movies/types';

import shrug from '../images/shrug.png';
import NotFound from './NotFound';
import Video from '../components/Video';
import { img500BaseUrl, imgOriginalBaseUrl } from '../config';

const onError = (e: any) => {
  e.target.onerror = null; 
  e.target.src = shrug;
};

const hideOnError = (e: any) => {
  e.target.onerror = null; 
  e.target.style.display = 'none';
};

interface Props {
  byId: ById
  waiting: boolean
  loadMovie: any
  addMovie: any
  deleteMovie: any
  moviePage: MoviePageType
  match: any
}

const MoviePage = ({ 
  byId, waiting, loadMovie, addMovie, deleteMovie, match,
  moviePage: {
    notFound,
    id,
    backdrop,
    poster,
    title,
    releaseDate,
    overview,
    crew,
    cast,
    recommendations,
    videos 
  }
}: Props) => {
  const smlBaseUrl = img500BaseUrl;
  const respBaseUrl = useMediaQuery('(max-width: 500px)')?
    img500BaseUrl: imgOriginalBaseUrl;

  const iconSize = useMediaQuery('(max-width: 800px)')?
    'small': 'large';

  let { movieId } = match.params;
  movieId = movieId !== undefined? movieId.split('-')[0]: '';

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

  const crewList = crew.map(({ name, job }) => (
    <CrewCard name={name} job={job} key={name} />)
  );

  const castList = cast.map(({ name, character, image }) => (
    <CastCard 
      name={name} 
      character={character} 
      image={smlBaseUrl + image} 
      key={name} 
    />
  ));

  const recommendationList = recommendations.map(({ id, title, image }) => (
    <RecommendationCard 
      id={id} 
      title={title} 
      image={smlBaseUrl + image} 
      key={id} 
    />
  ));

  useEffect(() => {
    loadMovie(movieId);
  }, [movieId]); 
  //^ The dependency cannot be an object 
  // (window.location won't work; has to be a string)

  return waiting? null: notFound? <NotFound />:
    <div className='MoviePage'>
      <Helmet>
        <meta name="description" content="Movie details page" />
      </Helmet>
      <img
        className='movie-page-backdrop'
        src={respBaseUrl + backdrop}
        alt=''
        onError={hideOnError}
      />
      <header className='movie-page-header'>
        <img
          className='movie-page-poster'
          src={smlBaseUrl + poster}
          alt=''
          onError={onError}
        />
        <div className='movie-page-header-column'>
          <h3 className='movie-page-title'>
            {title}
            {releaseDate?
              <span className='movie-page-release-year'>
                ({releaseDate.slice(0, 4)})
              </span>:
              null
            }
          </h3>
          <div className='movie-page-header-row'>
            {videos[0]? <Video id={videos[0].key} />: null}
            <Button 
              variant='text'
              onClick={toggleAddMovie} 
              size='small'
              style={{ textTransform: 'none' }}
              title='Add to my movies'
            >
              {Boolean(byId[id])? 
                <Star 
                  fontSize={iconSize} 
                  color='secondary'
                  style={{ marginRight: '6px' }} 
                />:
                <StarBorder 
                  fontSize={iconSize} 
                  style={{ marginRight: '6px' }} 
                />
              }
              <span style={{ fontSize: '17px' }}>My Movies</span>
            </Button>
          </div>
        </div>
      </header>

      <div className='movie-page-details' >
        <ColoredDivider top={true} />
        <h4>Overview</h4>
        <p>{overview}</p>
        <ColoredDivider top={false} />
      </div>

      {Boolean(crew.length)?
        <div className='movie-page-crew'>
          <h4>Featured Crew</h4>
          <div className='movie-page-crew-list'>
            {crewList}
          </div>
        </div>:
        null
      }

      {Boolean(cast.length)?
        <div className='movie-page-cast'>
          <h4>Featured Cast</h4>
          <div className='movie-page-cast-list'>
            {castList}
          </div>
        </div>:
        null
      }

      {Boolean(recommendations.length)?
        <div className='movie-page-recommendations'>
          <h4>Recommendations</h4>
          <div className='movie-page-recommendation-list'>
            {recommendationList}
          </div>
        </div>: 
        null
      }
    </div>
};

const CrewCard = ({ name, job }: { name: string, job: string }) => {
  return (
    <span className='movie-page-crew-card'>
      <span><strong>{name}</strong></span>
      <span>{job}</span>
    </span>
  );
};

const CastCard = (
  { name, character, image }: { name: string, character: string, image: string }
) => {
  const style = { height: '6em', overflow: 'scroll' };

  return (
    <span className='movie-page-cast-card'>
      <img src={image} alt='' onError={onError}/>
      <span style={style}>
        <div><strong>{name}</strong></div>
        <div>{character}</div>
      </span>
    </span>
  );
};

const RecommendationCard = (
  { id, title, image }: { id: number, title: string, image: string }
) => {
  const style = { minHeight: '3em' };

  return (
    <Link to={`/movie/${id}`} >
      <span className='movie-page-recommendation-card'>
        <img src={image} alt='' onError={onError}/>
        <span style={style}>{title}</span>
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
  byId: state.myMovies.byId,
  waiting: state.appLevel.waiting
});

export default connect(
  mapStateToProps,
  { loadMovie, addMovie, deleteMovie }
)(MoviePage);