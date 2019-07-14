import React from 'react';

// import DiscoverControlls from './DiscoverControlls';
// import DiscoverMovieList from './DiscoverMovieList';

const test = [
  {
    title: "Avenger: Endgame",
    image: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    releaseYear: '2019'
  },
  {
    title: "Avenger: Endgame",
    image: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    releaseYear: '2019'
  },
  {
    title: "Avenger: Endgame",
    image: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    releaseYear: '2019'
  },
  {
    title: "Avenger: Endgame",
    image: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    releaseYear: '2019'
  },
  {
    title: "Avenger: Endgame",
    image: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    releaseYear: '2019'
  },
  {
    title: "Avenger: Endgame",
    image: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    releaseYear: '2019'
  }
]



const DiscoverMovieList = () => {
  return (
    <>
      {test.map(item => (
        <DiscoverMovieCard 
          {...item}
        />
      ))}
    </>
  )
};

interface DiscoverMovieCard {
  title: string
  image: string
  releaseYear: string
}

const DiscoverMovieCard = ({
  title, image, releaseYear
}: DiscoverMovieCard) => {
  return (
    <div className='discover-movie-card'>
      <img
        className='discover-movie-card-thumb'
        src={`https://image.tmdb.org/t/p/w500${image}`}
      />
      <div className='discover-movie-card-title'>{title}</div>
      <div>({releaseYear})</div>
    </div>
  )
};

export default DiscoverMovieList;