import axios from 'axios';

import { ThunkAction } from 'redux-thunk';

import {
  SET_PARAMS,
  UPDATE_MOVIES,
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
    { page: search.page },
    { query: search.query },
    params
  );

  return BASE_REQ_URL 
    + `?query=${paramObj.query? paramObj.query: ''}`
    + `&page=${paramObj.page? paramObj.page: ''}`;
};

const updateSearchParamAction = (
  params: Params, search: Search
): SearchActionTypes => {

  return {
    type: SET_PARAMS,
    payload: params
  };
};

export const updateSearch = (
  params: Params
): ThunkAction<void, any, null, SearchActionTypes> => (
  dispatch, getState
) => {
  const search: Search = getState().search;
  const reqUrl = makeReqUrl(params, search);

  // console.log('SHOW_WAITING')

  axios.get(reqUrl)
    .then(res => {
      if (res.status !== 200) throw Error('nope');

      dispatch({
        type: UPDATE_MOVIES,
        payload: res.data
      });
    })
    .then(() => {
      const action = updateSearchParamAction(params, search);
      if (action) dispatch(action);
      window.history.pushState(
        {}, '', reqUrl.slice(reqUrl.indexOf('?'), reqUrl.length)
      );
    })
    .catch(err => console.log(err))
    .finally(() =>{
      // console.log('HIDE_WAITING');     
    });
};