import axios from 'axios';

import { ThunkAction } from 'redux-thunk';

import {
  LOAD_MOVIE,
  NOT_FOUND,
  MoviePageActionTypes
} from './types';

const BASE_REQ_URL = 'http://localhost:3009/movie?id=';

export const movieNotFound = () => ({ type: NOT_FOUND });

export const loadMovie = (
  id: number
): ThunkAction<void, null, null, MoviePageActionTypes> => (
  dispatch
) => {
  const reqUrl = BASE_REQ_URL + String(id);

  // show waiting

  axios.get(reqUrl)
    .then(res => {
      dispatch({
        type: LOAD_MOVIE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: NOT_FOUND });
      console.log(err.message);
    })
    .finally(() =>{
      // console.log('HIDE_WAITING');     
    });
};