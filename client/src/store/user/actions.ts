import axios from 'axios';
import { HOST, authData } from '../../config';

import { ThunkAction } from 'redux-thunk';

import {
  WILL_REDIRECT_TO_AUTH_UI,
  LOG_IN,
  LOG_OUT,
  User,
  UserActionTypes
} from './types';

import {
  SHOW_WAITING,
  HIDE_WAITING,
  SHOW_ERROR
} from '../app-level/types';

import {
  showError,
  hideError
} from '../app-level/actions';

import { AppState } from '../index';

import { CognitoAuth } from 'amazon-cognito-auth-js';

const auth = new CognitoAuth(authData);

export const getSession = (): ThunkAction<void, any, null, UserActionTypes> => (
  dispatch, getState
) => {
  const appState: AppState  = getState();
  localStorage.setItem('appState', JSON.stringify(appState));
  
  dispatch({
    type: WILL_REDIRECT_TO_AUTH_UI
  });
  auth.getSession();
};

export const logIn = (): ThunkAction<void, any, null, UserActionTypes> => (
  dispatch
) => {
  const appState: AppState = JSON.parse(localStorage.getItem('appState') || '');
  console.log(appState);

  // Get id_token
  const hash = window.location.hash;
  const matches = hash.match(/id_token=([\w.-]*)&?/);
  const idToken = matches? matches[1]: '';
  window.location.assign('#');

  // Validate token
  const payload = JSON.parse(window.atob(idToken.split('.')[1]));
  const email = payload['email'];
  const exp = payload['exp'];
  const now = new Date();
  if (now.getTime() > exp * 1000) {
    showError('Unable to log in at this moment. Please try again later.');
    setTimeout(hideError, 3000);
    return;
  }

  // axios

  dispatch({
    type: LOG_IN,
    payload: {
      token: idToken,
      email: email
    }
  });
};

export const logOut = (): ThunkAction<void, any, null, UserActionTypes> => (
  dispatch
) => {
  auth.signOut();
  localStorage.clear();
  dispatch({
    type: LOG_OUT
  });
};

