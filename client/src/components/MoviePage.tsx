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
      <div className='movie-details'>
        <h4>Overview</h4>
        <p>{'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.'}</p> 
      </div>              
      <div className='movie-crew'>
        <h4>Featured Crew</h4>
        <div className='movie-crew-list'>
          {CrewCard('Person One', 'Job 1')}
          {CrewCard('Person Two', 'Job 2')}
          {CrewCard('Person Three', 'Job 3')}
          {CrewCard('Person Four', 'Job 4')}
        </div>
      </div>
      <div className='movie-cast'>
        <h4>Featured Cast</h4>
        <div className='movie-cast-list'>
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
        </div>
      </div>
      <div className='movie-recommendations'>
        <h4>Recommendations</h4>
        <div className='movie-recommendation-list'>
          {RecommendationCard('Avangers: Endgame', '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg')}
          {RecommendationCard('Avangers: Endgame', '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg')}
          {RecommendationCard('Avangers: Endgame', '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg')}
          {RecommendationCard('Avangers: Endgame', '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg')}
          {RecommendationCard('Avangers: Endgame', '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg')}
        </div>
      </div>

        




    </div>
  );
};

const CrewCard = (name: string, job: string) => {
  return (
    <span className='movie-crew-card'>
      <span><strong>{name}</strong></span>
      <span>{job}</span>
    </span>
  );
};

const CastCard = (name: string, character: string, image: string) => {
  return (
    <span className='movie-cast-card'>
      <img
        src={`https://image.tmdb.org/t/p/w500${image}`}
      />
      <span><strong>{name}</strong></span>
      <span>{character}</span>
    </span>
  );
};

const RecommendationCard = (title: string, image: string) => {
  return (
    <span className='movie-recommendation-card'>
      <img
        src={`https://image.tmdb.org/t/p/w500${image}`}
      />
      <span>{title}</span>
    </span>
  );
};



export default MoviePage;