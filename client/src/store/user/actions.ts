import axios from 'axios';
import { HOST, authData } from '../../config';

import { ThunkAction } from 'redux-thunk';

import {
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

export const getSession = (): ThunkAction<void, AppState, null, UserActionTypes> => (
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
    // window.location.hash = '';
    window.history.replaceState({}, '', 'http://localhost:3000/discover');
    checkTokenInMemory();
    return;
  }

  // Get id_token
  const hash = window.location.hash;
  const matches = hash.match(/id_token=([\w.-]*)&?/);
  const token = matches? matches[1]: '';
  window.history.replaceState({}, '', 'http://localhost:3000/');

  if (!token){
    // logOut()
    showError('Unable to log in at this moment. Please try again later.');
    setTimeout(hideError, 3000);
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

  // loadData

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
  
    // Validate against backend
  
    dispatch({
      type: LOG_IN,
      payload: {
        token: token,
        email: email,
      }
    });
    localStorage.setItem('token', token);

    // loadData
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

