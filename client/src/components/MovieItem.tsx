import React from 'react';

import { Movie } from '../store/my-movies/types';

const MovieItem = ({
  id,   
  tMDb_id,
  title,
  image,
  dateAdded,
}: Movie)  => {
  return (
    <div className='MovieItem'>
      {title + ' ' + dateAdded}
    </div>
  );
}

export default MovieItem;