import { SET_TAG, SET_FILTER, DELETE_MOVIE, UNDO_DELETE, Tag, MyMovie, 
  MyMoviesState, MyMoviesActionTypes } 
  from './types';

import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

export const deleteMovie = (
  movie: MyMovie
): ThunkAction<void, MyMoviesState, null, MyMoviesActionTypes> => async (
  dispatch
) => {
  await axios.get('https://redux.js.org/')
    .then(_ => void dispatch({
      type: DELETE_MOVIE,
      movie: movie
    }))
    .catch(err => void alert(err));
};


