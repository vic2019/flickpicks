import axios from 'axios';

import { ThunkAction } from 'redux-thunk';

import {
  SET_SEARCH_PARAMS,
  UPDATE_SEARCH_MOVIES,
  Search,
  Params,
  SearchActionTypes
} from './types';

import {
  SHOW_WAITING,
  HIDE_WAITING,
  SHOW_ERROR,
  HIDE_ERROR
} from '../app-level/types';

const BASE_REQ_URL = 'http://localhost:3009/search';

const makeReqUrl = (
  params: Params, search: Search
): string => {
  const paramObj = Object.assign(
    { query: search.query },
    // Don't put page here. Either params would contain page, or tMDb's api
    // would default to page === 1.
    params
  );

  return BASE_REQ_URL 
    + `?query=${paramObj.query? paramObj.query: ''}`
    + `&page=${paramObj.page? paramObj.page: ''}`;
};

export const updateSearch = (
  params: Params
): ThunkAction<void, any, null, SearchActionTypes> => (
  dispatch, getState
) => {
  const search: Search = getState().search;
  const reqUrl = makeReqUrl(params, search);

  dispatch({
    type: SHOW_WAITING
  });

  axios.get(reqUrl)
    .then(res => {
      if (res.status !== 200) throw Error('nope');

      dispatch({
        type: UPDATE_SEARCH_MOVIES,
        payload: res.data
      });
    })
    .then(() => {
      dispatch({
        type: SET_SEARCH_PARAMS,
        payload: params
      });
      window.history.pushState(
        {}, '', reqUrl.slice(reqUrl.indexOf('?'), reqUrl.length)
      );
    })
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