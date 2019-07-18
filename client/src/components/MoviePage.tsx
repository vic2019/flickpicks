import React from 'react';

const MoviePage = () => {
  return (
    <div className='MoviePage'>
      <img 
        className='movie-page-backdrop'
        src='https://image.tmdb.org/t/p/w500/dihW2yTsvQlust7mSuAqJDtqW7k.jpg'
      />
      <div className='movie-page-header'>
        <img 
          className='movie-page-poster' 
          src='https://image.tmdb.org/t/p/w500/rjbNpRMoVvqHmhmksbokcyCr7wn.jpg'
        />
        <h3 className='movie-page-title'>{'Spider-Man: Far from Home'}
          <span className='movie-page-release-year'>(2019)</span>
        </h3>
      </div>
      <div className='movie-page-details'>
        <h4>Overview</h4>
        <p>{'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.'}</p> 
      </div>              
      <div className='movie-page-crew'>
        <h4>Featured Crew</h4>
        <div className='movie-page-crew-list'>
          {CrewCard('Person One', 'Job 1')}
          {CrewCard('Person Two', 'Job 2')}
          {CrewCard('Person Three', 'Job 3')}
          {CrewCard('Person Four', 'Job four')}
        </div>
      </div>
      <div className='movie-page-cast'>
        <h4>Featured Cast</h4>
        <div className='movie-page-cast-list'>
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
          {CastCard('Tom Holland', 'Peter Parker / Spider-Man', '/2qhIDp44cAqP2clOgt2afQI07X8.jpg')}
        </div>
      </div>
      <div className='movie-page-recommendations'>
        <h4>Recommendations</h4>
        <div className='movie-page-recommendation-list'>
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
        src={`https://image.tmdb.org/t/p/w500${image}`}
      />
      <span><strong>{name}</strong></span>
      <span>{character}</span>
    </span>
  );
};

const RecommendationCard = (title: string, image: string) => {
  return (
    <span className='movie-page-recommendation-card'>
      <img
        src={`https://image.tmdb.org/t/p/w500${image}`}
      />
      <span>{title}</span>
    </span>
  );
};



export default MoviePage;