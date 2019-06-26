import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import {
  Tag,
  MyMovie,
  MyMoviesState,
  MyMoviesActionTypes,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  ERROR_INVALID_TAG,
  SET_FILTER,
  SET_FILTER_TO_ALL,
  DELETE_MOVIE,
  UNDO_DELETE,
  ERROR_UNDO_DELETE,
  ERROR_NETWORK
} from './types';


export const setTags = (
  movie: MyMovie, tag: Tag, customTags: string[]
): ThunkAction<void, MyMoviesState, null, MyMoviesActionTypes> => async (
  dispatch, getState
) => {
  const { filterSet } = getState().filter;
  
  for (let tag of customTags) {
    let isTagInvalid: boolean = true;
    for (let filter of filterSet) {
      if (tag === filter) {
        isTagInvalid = false;
        break;
      }
    }

    if (isTagInvalid) {
      return void dispatch({
        type: ERROR_INVALID_TAG,
        msg: 'One of the tags selected is invalid. Please refresh the page and try again.'
      });
    }
  }

  await axios.get('https://redux.js.org/')
    .then(_ => void dispatch({
      type: SET_TAGS,
      movie,
      tag,
      customTags
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
    if (tag === filter) {
      return void dispatch({
        type: ERROR_INVALID_TAG,
        msg: `The tag "${tag}" already exists.`
      });
    }    
  }
  
  await axios.get('https://redux.js.org/')
  .then(_ => void dispatch({
    type: CREATE_TAG,
    tag
  }))
  .catch();
};


export const deleteTag = (
  tag: string
): ThunkAction<void, MyMoviesState, null, MyMoviesActionTypes> => async (
  dispatch
) => {
  await axios.get('https://redux.js.org/')
  .then(_ => void dispatch({
    type: DELETE_TAG,
    tag
  }))
  .catch();
};


export const setFilter = (
  filter: (Tag | string)[]
): MyMoviesActionTypes => {
  return {
    type: SET_FILTER,
    filter
  };
}


export const setFilterToAll = (): MyMoviesActionTypes => {
  return {
    type: SET_FILTER_TO_ALL,
  };
}


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


