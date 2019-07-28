import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

import {
  Movie,
  Set,
  ByTag,
  MyMovies,
  MyMoviesActionTypes,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  SET_FILTERS,
  SHOW_ALL,
  DELETE_MOVIE,
  ADD_MOVIE,
  // ERROR,
  // UNDO_DELETE
} from './types';

import {
  SHOW_WAITING,
  HIDE_WAITING,
  SHOW_ERROR,
  HIDE_ERROR
} from '../app-level/types';

export const setTags = (
  movie: Movie, tags: Set
): ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {
  dispatch({
    type: SHOW_WAITING
  });

  const newTags: Set = Object.assign({}, ...Object.keys(tags).map(tag => (
    tags[tag]? { [tag]: true }: {} 
  )));

  new Promise(resolve => resolve())
    .then(() => void dispatch({
      type: SET_TAGS,
      movie,
      tags: newTags
    }))
    .catch(err => dispatch({
      type: SHOW_ERROR,
      msg: err.message
    }))
    .finally(() =>{
      dispatch({
        type: HIDE_WAITING
      }); 
    });
}

export const createTag = (
  tag: string
): ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {  
  dispatch({
    type: SHOW_WAITING
  });

  new Promise(resolve => resolve())
    .then(() => void dispatch({
      type: CREATE_TAG,
      tag
    }))
    .catch(err => dispatch({
      type: SHOW_ERROR,
      msg: err.message
    }))
    .finally(() =>{
      dispatch({
        type: HIDE_WAITING
      }); 
    });
};

export const deleteTag = (
  tag: string
): ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {
  dispatch({
    type: SHOW_WAITING
  });

  new Promise(resolve => resolve())
    .then(_ => void dispatch({
      type: DELETE_TAG,
      tag
    }))
    .catch(err => dispatch({
      type: SHOW_ERROR,
      msg: err.message
    }))
    .finally(() =>{
      dispatch({
        type: HIDE_WAITING
      }); 
    });
};

export const setFilters = (
  filters: Set
): ThunkAction<void, { myMovies: MyMovies }, null, MyMoviesActionTypes> => (
  dispatch, getState
) => {
  const byTag: ByTag = getState().myMovies.byTag;
  const newFilters: Set = Object.assign({}, ...Object.keys(filters).map(tag => (
    byTag[tag]? filters[tag]? { [tag]: true }: {}: {}
  )));

  dispatch({
    type: SET_FILTERS,
    filters: newFilters
  });
}

export const showAll = (): MyMoviesActionTypes => {
  return {
    type: SHOW_ALL,
  };
}

export const deleteMovie = (
  movie: Movie
): ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {
  dispatch({
    type: SHOW_WAITING
  });

  new Promise(resolve => resolve())
    .then(_ => void dispatch({
      type: DELETE_MOVIE,
      movie
    }))
    .catch(err => dispatch({
      type: SHOW_ERROR,
      msg: err.message
    }))
    .finally(() =>{
      dispatch({
        type: HIDE_WAITING
      }); 
    });
};

export const addMovie = (
  movie: Movie
): ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {
  dispatch({
    type: SHOW_WAITING
  });

  new Promise(resolve => resolve())
    .then(_ => void dispatch({
      type: ADD_MOVIE,
      movie
    }))
    .catch(err => dispatch({
      type: SHOW_ERROR,
      msg: err.message
    }))
    .finally(() =>{
      dispatch({
        type: HIDE_WAITING
      }); 
    });
};