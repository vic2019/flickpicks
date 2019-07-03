import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

import {
  Movie,
  TagSetter,
  ByTag,
  MyMovies,
  AppState,
  MyMoviesActionTypes,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  SET_FILTER,
  SET_FILTER_TO_ALL,
  DELETE_MOVIE,
  ERROR_INVALID_TAG,
  // UNDO_DELETE,
  // ERROR_UNDO_DELETE,
  // ERROR_NETWORK
} from './types';


export const setTags = (
  movie: Movie, tagSetter: TagSetter 
): ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {
  new Promise(resolve => resolve())
    .then(() => void dispatch({
      type: SET_TAGS,
      movie,
      tagSetter
    }))
    .catch();
}

export const createTag = (
  tag: string
): ThunkAction<void, AppState, null, MyMoviesActionTypes> => (
  dispatch, getState
) => {
  const { byTag } = getState().myMovies;
  for (let key of Object.keys(byTag)) {
    if (tag === key) {
      return void dispatch({
        type: ERROR_INVALID_TAG,
        msg: `The tag "${tag}" already exists.`
      });
    }    
  }
  
  new Promise(resolve => resolve())
    .then(() => void dispatch({
      type: CREATE_TAG,
      tag
    }))
    .catch();
};

export const deleteTag = (
  tag: string
): ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {
  new Promise(resolve => resolve())
    .then(_ => void dispatch({
      type: DELETE_TAG,
      tag
    }))
    .catch();
};

export const setFilter = (
  filters: TagSetter
): MyMoviesActionTypes => {
  return {
    type: SET_FILTER,
    filters
  };
}

export const setFilterToAll = (): MyMoviesActionTypes => {
  return {
    type: SET_FILTER_TO_ALL,
  };
}

export const deleteMovie = (
  movie: Movie
): ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {
  new Promise(resolve => resolve())
    .then(_ => void dispatch({
      type: DELETE_MOVIE,
      movie
    }))
    .catch();
};
