import axios from 'axios';

import { ThunkAction } from 'redux-thunk';

import {
  SET_DISCOVER_PARAMS,
  UPDATE_DISCOVER_MOVIES,
  Discover,
  Params,
  DiscoverActionTypes
} from './types';

import {
  SHOW_WAITING,
  HIDE_WAITING,
  SHOW_ERROR,
  HIDE_ERROR
} from '../app-level/types';

const BASE_REQ_URL = 'http://localhost:3009/discover';

const makeReqUrl = (
  params: Params, discover: Discover
): string => {
  const paramObj = Object.assign(
    { genres: discover.genres },
    { year: discover.year },
    { sortBy: discover.sortBy },
    // Don't put page here. Either params would contain page, or tMDb's api
    // would default to page === 1.
    params
  );

  return BASE_REQ_URL 
    + `?with_genres=${paramObj.genres.join('%2C')}`
    + `&year=${paramObj.year > 0? paramObj.year: ''}`
    + `&sort_by=${paramObj.sortBy}`
    + `&page=${paramObj.page? paramObj.page: ''}`;
};

export const updateDiscover = (
  params: Params
): ThunkAction<void, any, null, DiscoverActionTypes> => (
  dispatch, getState
) => {
  const discover: Discover = getState().discover;
  const reqUrl = makeReqUrl(params, discover);

  // console.log('SHOW_WAITING')

  axios.get(reqUrl)
    .then(res => {
      if (res.status !== 200) throw Error('nope');
   
      dispatch({
        type: UPDATE_DISCOVER_MOVIES,
        payload: res.data
      });
    })
    .then(() => {
      dispatch({
        type: SET_DISCOVER_PARAMS,
        payload: params
      });
      window.history.pushState(
        {}, '', reqUrl.slice(reqUrl.indexOf('?'), reqUrl.length)
      )
    })
    .catch(err => alert(err.message))
    .finally(() =>{
      // console.log('HIDE_WAITING');     
    });
};