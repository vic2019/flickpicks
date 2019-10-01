import axios from 'axios';
import { myMoviesEndpoint, authData } from '../../config';

import { ThunkAction } from 'redux-thunk';

import {
  LOG_IN,
  LOG_OUT,
  UserActionTypes
} from './types';

import {
  SHOW_ERROR
} from '../app-level/types';

import {
  INIT_MYMOVIES
} from '../my-movies/types';

import { AppState } from '../index';

import { CognitoAuth } from 'amazon-cognito-auth-js';

const auth = new CognitoAuth(authData);

const loadMyMovies = (dispatch: any, token: string) => {
  axios.get(myMoviesEndpoint, {
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    const { byId, byTag, allIds } = res.data.Item;
    if (!byId || !byTag || !allIds) throw Error();

    dispatch({
      type: INIT_MYMOVIES,
      payload: {
        byId,
        byTag,
        allIds
      }
    });
  })
  .catch(err => {
    dispatch({
      type: SHOW_ERROR,
      msg: 'Unable to load user data. Please try again later.'
    });
  });
};

export const getSession = (): 
ThunkAction<void, AppState, null, UserActionTypes> => (
  _, getState
) => {
  const appState: AppState  = getState();
  localStorage.setItem('appState', JSON.stringify(appState));
  localStorage.setItem('wasRedirected', 'YES');
  
  auth.getSession();
};

export const checkLoginStatus = (): ThunkAction<void, any, null, UserActionTypes> => (
  dispatch
) => {
  const wasRedirected: string | null = localStorage.getItem('wasRedirected');
  const appStateJSON = localStorage.getItem('appState');
  const appState = appStateJSON? JSON.parse(appStateJSON): {};
  localStorage.removeItem('wasRedirected');
  localStorage.removeItem('appState');
  console.log(appState);

  if (!wasRedirected) {
    window.history.replaceState({}, '', 'https://flickpicks.victorwang.info/discover');
    checkTokenInMemory();
    return;
  }

  // Get id_token
  const hash = window.location.hash;
  const matches = hash.match(/id_token=([\w.-]*)&?/);
  const token = matches? matches[1]: '';
  window.history.replaceState({}, '', 'https://flickpicks.victorwang.info');

  if (!token){
    dispatch({
      type: SHOW_ERROR,
      msg: 'Unable to log in at this moment. Please try again later.'
    });
    setTimeout(() => {
      localStorage.clear();
      dispatch({
        type: LOG_OUT
      });
      auth.signOut();
    }, 2500);
    return;
  }

  const payload = JSON.parse(window.atob(token.split('.')[1]));
  const email = payload['email'];

  dispatch({
    type: LOG_IN,
    payload: {
      token, 
      email
    }
  });

  localStorage.setItem('token', token);
  loadMyMovies(dispatch, token);

  function checkTokenInMemory() {
    const token: string | null = localStorage.getItem('token');
    if (!token) return;
  
    // Validate token
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    const email = payload['email'];
    const exp = payload['exp'];
    const now = new Date();
    if (now.getTime() > exp * 1000) {
      localStorage.removeItem('token');
      return;
    }
  
    dispatch({
      type: LOG_IN,
      payload: {
        token: token,
        email: email,
      }
    });

    loadMyMovies(dispatch, token);

    return;
  }
};

export const logOut = (): ThunkAction<void, any, null, UserActionTypes> => (
  dispatch
) => {
  localStorage.clear();
  dispatch({
    type: LOG_OUT
  });
  auth.signOut();
};