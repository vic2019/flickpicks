import React from 'react';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';

import { deleteMovie } from '../store/my-movies/actions';
import { Movie } from '../store/my-movies/types';


interface Props {
  movie: Movie
  deleteMovie: any
  zoomOut: any
}

const DeleteMovie = ({ movie, deleteMovie, zoomOut }: Props) => {
  const deleteMovieItem = () => {
    zoomOut(false);
    setTimeout(() => void deleteMovie(movie), 400); 
  };

  return (
    <Button
      className='delete-movie-button'
      size='small'
      onClick={deleteMovieItem}
    >
      Delete
    </Button>
  );
};

export default connect(
  () => {},
  { deleteMovie }
)(DeleteMovie);

