import axios from 'axios';

import { ThunkAction } from 'redux-thunk';

import {
  // SET_GENRES,
  // SET_YEAR,
  // SET_SORTBY,
  SET_PARAMS,
  // NAV_TO_PAGE,
  UPDATE_MOVIES,
  // Genre,
  Discover,
  NewParams,
  DiscoverActionTypes
} from './types';

import {
  SHOW_WAITING,
  HIDE_WAITING,
  SHOW_ERROR,
  HIDE_ERROR
} from '../app-level/types';

const BASE_REQ_URL = 'http://localhost:3009/discover?';

const makeReqUrl = (
  newParams: NewParams, discover: Discover
): string => {
  const paramObj = Object.assign(
    { genres: discover.genres },
    { year: discover.year },
    { sortBy: discover.sortBy },
    // Don't put page here. Either newParams would contain page, or tMDb's api
    // would default to page === 1.
    newParams
  );

  return BASE_REQ_URL 
    + `with_genres=${paramObj.genres.join('%2C')}`
    + `&year=${paramObj.year > 0? paramObj.year: ''}`
    + `&sort_by=${paramObj.sortBy}`
    + `&page=${paramObj.page? paramObj.page: ''}`;
};

const updateDiscoverParamAction = (
  newParams: NewParams, discover: Discover
): DiscoverActionTypes => {

  return {
    type: SET_PARAMS,
    payload: newParams
  };
};

export const updateDiscover = (
  newParams: NewParams
): ThunkAction<void, any, null, DiscoverActionTypes> => (
  dispatch, getState
) => {
  const discover: Discover = getState().discover;
  const reqUrl = makeReqUrl(newParams, discover);

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
      const action = updateDiscoverParamAction(newParams, discover);
      if (action) dispatch(action);
      window.history.pushState(
        {}, '', reqUrl.slice(reqUrl.indexOf('?'), reqUrl.length)
      )
    })
    .catch(err => console.log(err))
    .finally(() =>{
      // console.log('HIDE_WAITING');     
    });
};