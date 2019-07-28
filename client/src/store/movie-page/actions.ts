import axios from 'axios';

import { ThunkAction } from 'redux-thunk';

import {
  LOAD_MOVIE,
  NOT_FOUND,
  MoviePageActionTypes
} from './types';

import {
  SHOW_WAITING,
  HIDE_WAITING,
  SHOW_ERROR,
  HIDE_ERROR
} from '../app-level/types';

const BASE_REQ_URL = 'http://localhost:3009/movie?id=';

export const movieNotFound = () => ({ type: NOT_FOUND });

export const loadMovie = (
  id: number
): ThunkAction<void, null, null, MoviePageActionTypes> => (
  dispatch
) => {
  dispatch({
    type: SHOW_WAITING
  });
  
  const reqUrl = BASE_REQ_URL + String(id);

  axios.get(reqUrl)
    .then(res => {
      dispatch({
        type: LOAD_MOVIE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: NOT_FOUND
      });
      dispatch({
        type: SHOW_ERROR,
        msg: err.message
      });
    })
    .finally(() =>{
      dispatch({
        type: HIDE_WAITING
      }); 
    });
};