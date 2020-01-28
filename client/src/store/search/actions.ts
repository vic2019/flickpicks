import axios from 'axios';
import { HOST } from '../../config';

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
  SHOW_ERROR
} from '../app-level/types';

const BASE_REQ_URL = HOST + '/search';

const makeReqUrl = (
  params: Params, search: Search
): string => {
  const paramObj = Object.assign(
    { query: search.query },
    params,
    params.page? {}: { page: 1 }
  );

  return BASE_REQ_URL 
    + `?query=${paramObj.query? paramObj.query: ''}`
    + `&page=${paramObj.page? paramObj.page: '1'}`;
};

export const updateSearch = (
  params: Params
): ThunkAction<void, any, null, SearchActionTypes> => (
  dispatch, getState
) => {   
  const search: Search = getState().search;
  
  if (!params.query && !search.query) {
    dispatch({
      type: SHOW_ERROR,
      msg: 'Search field cannot be empty'
    });
    return;
  } 
  
  dispatch({
    type: SHOW_WAITING
  });
  
  const reqUrl = makeReqUrl(params, search);
  axios.get(reqUrl)
    .then(res => {
      dispatch({
        type: UPDATE_SEARCH_MOVIES,
        payload: res.data
      });

      dispatch({
        type: SET_SEARCH_PARAMS,
        payload: Object.assign({}, params, params.page? {}: { page: 1 })
      });
    })
    .catch(err => 
      dispatch({
      type: SHOW_ERROR,
      msg: err.message
    }))
    .finally(() =>{
      dispatch({
        type: HIDE_WAITING
      }); 
    });
};