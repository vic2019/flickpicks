import React from 'react';
import { Typography } from '@material-ui/core';


const MoviePage = () => {
  return (
    <div className='MoviePage'>
      <img 
        className='movie-backdrop'
        src='https://image.tmdb.org/t/p/w500/dihW2yTsvQlust7mSuAqJDtqW7k.jpg'
      />
      <div className='movie-header'>
        <img 
          className='movie-poster' 
          src='https://image.tmdb.org/t/p/w500/rjbNpRMoVvqHmhmksbokcyCr7wn.jpg'
        />
        <h3 className='movie-title'>{'Spider-Man: Far from Home'}
          <span className='movie-release-year'>2019</span>
        </h3>
      </div>
      <h4>Overview</h4>
      <p>{'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.'}</p>               
      <div className='movie-crew'>
        <h4>Featured Crew</h4>
        <div className='movie-crew-list'>
        </div>
      </div>
      <div className='movie-cast'>
        <h4>Featured Cast</h4>
        <div className='movie-cast-list'>

        </div>
      </div>
      <div className='movie-recommendations'>
        <h4>Recommendations</h4>
        <div className='movie-recommendation-list'>

        </div>
      </div>

        




    </div>
  );
};

export default MoviePage;