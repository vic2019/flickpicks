import axios from 'axios';
import { myMoviesEndpoint, HOST } from '../../config';

import { ThunkAction } from 'redux-thunk';

import {
  Movie,
  Set,
  ById,
  ByTag,
  AllIds,
  MyMovies,
  MyMoviesActionTypes,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  SET_FILTERS,
  SHOW_ALL,
  DELETE_MOVIE,
  ADD_MOVIE,
  INIT_MYMOVIES
} from './types';

import {
  SHOW_WAITING,
  HIDE_WAITING,
  SHOW_ERROR,
} from '../app-level/types';

import {
  AppState
} from '../index';

import LocalStorage from '../localStorage/localStorage';

const localS = new LocalStorage();

// Storing MyMovies in local storage
export const initMyMovies = ()
: ThunkAction<void, null, null, MyMoviesActionTypes> => (
  dispatch
) => {
  if (!localS.byId || !localS.byTag || !localS.allIds) {
    return;
  }

  dispatch({
    type: INIT_MYMOVIES,
    payload: {
      byId: localS.byId,
      byTag: localS.byTag,
      allIds: localS.allIds
    }
  });
}

const writeToDB = (dispatch: any, getState: any) => {
  const appState: AppState = getState();
  const token: string = appState.user.token;
  if (!token) return;

  const { byTag, byId, allIds } = appState.myMovies;

  axios.post(myMoviesEndpoint, {
      byTag, byId, allIds
    }, {
    headers: {
      Authorization: token,
    }
  })
  .catch(err => {
    dispatch({
      type: SHOW_ERROR,
      msg: 'Unable to connect to server. Your changes are not saved.'
    });
  });
};

export const setTags = (
  movie: Movie, tags: Set
): ThunkAction<void, { myMovies: MyMovies }, null, MyMoviesActionTypes> => (
  dispatch, getState
) => {
  dispatch({
    type: SHOW_WAITING
  });

  const byTag = getState().myMovies.byTag;

  const newTags: Set = Object.assign({}, ...Object.keys(tags).map(tag => (
    tags[tag]? { [tag]: tag }: {} 
  )));

  new Promise(resolve => {
    const updateArray = Object.keys(byTag).map(tag => {
      if (tags[tag]) {
        return {
          [tag]: {
            ...byTag[tag],
            [movie.id]: movie.id
          }
        };
      } else {
        const tagWithoutMovie = { ...byTag[tag] };
        delete tagWithoutMovie[movie.id];
        return {
          [tag]: tagWithoutMovie
        };
      }
    });
    localS.setByTag(Object.assign({}, ...updateArray));

    resolve();
  })
    .then(() => void dispatch({
      type: SET_TAGS,
      movie,
      tags: newTags
    }))
    // .then(() => {
    //   writeToDB(dispatch, getState);
    // })
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
): ThunkAction<void, { myMovies: MyMovies }, null, MyMoviesActionTypes> => (
  dispatch, getState
) => {  
  dispatch({
    type: SHOW_WAITING
  });

  const byTag = getState().myMovies.byTag;

  new Promise(resolve => {
    localS.setByTag({ 
      ...byTag,
      [tag]: {}
    });

    resolve();
  })
    .then(() => void dispatch({
      type: CREATE_TAG,
      tag
    }))
    // .then(() => {
    //   writeToDB(dispatch, getState);
    // })
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
): ThunkAction<void, { myMovies: MyMovies }, null, MyMoviesActionTypes> => (
  dispatch, getState
) => {
  dispatch({
    type: SHOW_WAITING
  });

  const byTag = getState().myMovies.byTag;

  new Promise(resolve => {
    const byTagWithoutTag = { ...byTag };
    delete byTagWithoutTag[tag];
    localS.setByTag(byTagWithoutTag);

    resolve();
  })
    .then(_ => void dispatch({
      type: DELETE_TAG,
      tag
    }))
    // .then(() => {
    //   writeToDB(dispatch, getState);
    // })
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
    byTag[tag]? filters[tag]? { [tag]: tag }: {}: {}
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
): ThunkAction<void, { myMovies: MyMovies }, null, MyMoviesActionTypes> => (
  dispatch, getState
) => {
  
  const byId: ById = getState().myMovies.byId;
  const byTag: ByTag = getState().myMovies.byTag;
  const allIds: AllIds = getState().myMovies.allIds;
  
  new Promise(resolve => {
    const byIdWithoutMovie = { ...byId };
    delete byIdWithoutMovie[movie.id];
    localS.setById(byIdWithoutMovie);
    localS.setByTag(Object.assign({}, 
      ...Object.entries(byTag).map(([tag, ids]) => {
        const updatedTag = { ...ids };
        delete updatedTag[movie.id];
        return { [tag]: updatedTag };
      }))
    );
    localS.setAllIds(allIds.filter(id => id !== movie.id));

    resolve();
  })
    .then(_ => void dispatch({
      type: DELETE_MOVIE,
      movie
    }))
    // .then(() => {
    //   writeToDB(dispatch, getState);
    // })
    .catch(err => dispatch({
      type: SHOW_ERROR,
      msg: err.message
    }))
};

export const addMovie = (
  movie: Movie
): ThunkAction<void, { myMovies: MyMovies }, null, MyMoviesActionTypes> => (
  dispatch, getState
) => { 
  const byId: ById = getState().myMovies.byId;
  const byTag: ByTag = getState().myMovies.byTag;
  const allIds: AllIds = getState().myMovies.allIds;
  
  new Promise(resolve => {
    localS.setById({
      ...byId,
      [movie.id]: movie
    });

    localS.setByTag({
      ...byTag,
      "To Watch": { ...byTag["To Watch"], [movie.id]: movie.id }
    });

    localS.setAllIds([...allIds, movie.id]);
    
    resolve();
  })
    .then(_ => void dispatch({
      type: ADD_MOVIE,
      movie
    }))
    // .then(() => {
    //   writeToDB(dispatch, getState);
    // })
    .catch(err => dispatch({
      type: SHOW_ERROR,
      msg: err.message
    }))
};