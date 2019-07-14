import React from 'react';

import DiscoverInput from './DiscoverInput';
import DiscoverMovieList from './DiscoverMovieList';

const Discover = () => {
  return (
    <div className='Discover'>
      <DiscoverInput />
      <DiscoverMovieList />
    </div>
  )
};

export default Discover;