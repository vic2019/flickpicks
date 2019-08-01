import React, { useState } from 'react';
import { Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';

import TagSelector from './TagSelector';
import DeleteMovie from './DeleteMovie';
import Divider from './Divider';
import shrug from '../images/shrug.png';
import { img500BaseUrl } from '../config';


const onError = (e: any) => {
  e.target.onerror = null; 
  e.target.src = shrug;
};

interface Props {
  id: string
  title: string
  image: string
  dateAdded: string
}

const MyMovieItem = ({ id, title, image, dateAdded }: Props)  => {
  const [isVisible, setVisible] = useState(true);

  const dateString = dateAdded.split(' ').slice(1, 4).join(' ');

  const linkTo = `/movie/${id}-${title.split(/[,:]/).join('')
    .split(' ').join('-')}`;

  return (
    <>
      <Fade in={isVisible} timeout={{ enter: 0, exit: 180 }}>
        {/* Fade must only contain a single child element, and 
        it can't be a React.Fragment */}
        <div className='MovieItem'>
          <Link to={linkTo}>
            <img
              className='movie-item-thumb'
              src={img500BaseUrl+ image}
              alt='movie poster'
              onError={onError}
            />
          </Link>
          <div>
            <Link
              to={linkTo}
            >
              <div className='movie-item-title'>{title}</div>
            </Link>
            <div>{`Date Added: ${dateString}`}</div>
            <TagSelector movie={{ id, title, image, dateAdded }} />
            <DeleteMovie movie={{ id, title, image, dateAdded }} transitionOut={setVisible} />
          </div>
        </div>
      </Fade>
      <Divider />
    </>
  );
}

export default React.memo(MyMovieItem);