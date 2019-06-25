import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { SET_TAG, SET_FILTER, CREATE_TAG, DELETE_TAG, DELETE_MOVIE, UNDO_DELETE, ERROR, Tag, MyMovie, MyMoviesState, MyMoviesActionTypes } from './types';

export const setTag = (
  movie: MyMovie, tag: Tag
): ThunkAction<void, MyMoviesState, null, MyMoviesActionTypes> => async (
  dispatch
) => {
  await axios.get('https://redux.js.org/')
    .then(_ => void dispatch({
      type: SET_TAG,
      movie,
      tag
    }))
    .catch();
}

export const setFilter = (
  filter: (Tag | string)[]
): ThunkAction<void, MyMoviesState, null, MyMoviesActionTypes> => async (
  dispatch
) => {
  await axios.get('https://redux.js.org/')
    .then(_ => void dispatch({
      type: SET_FILTER,
      filter
    }))
    .catch();
}

export const createTag = (
  tag: string
): ThunkAction<void, MyMoviesState, null, MyMoviesActionTypes> => async (
  dispatch, getState
) => {
  const { filterSet } = getState().filter;
  for (let filter of filterSet) {
    // console.log(`${tag} === ${filter}? ${tag === filter}`);
    if (tag === filter) return void dispatch({
      type: ERROR,
      msg: 'duplicate tag'
    });    
  }

  await axios.get('https://redux.js.org/')
    .then(_ => void dispatch({
      type: CREATE_TAG,
      tag
    }))
    .catch();
};

export const deleteMovie = (
  movie: MyMovie
): ThunkAction<void, MyMoviesState, null, MyMoviesActionTypes> => async (
  dispatch
) => {
  await axios.get('https://redux.js.org/')
    .then(_ => void dispatch({
      type: DELETE_MOVIE,
      movie
    }))
    .catch();
};


