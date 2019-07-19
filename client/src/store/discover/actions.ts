import axios from 'axios';

import { ThunkAction } from 'redux-thunk';

import {
  SET_GENRES,
  SET_YEAR,
  SET_SORTBY,
  NAV_TO_PAGE,
  NAV_TO_FIRST_PAGE,
  NAV_TO_LAST_PAGE,
  UPDATE_MOVIES,
  Discover,
  NewParam,
  DiscoverData,
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
  newParam: NewParam, discover: Discover
): string => {
  const paramObj = Object.assign({},
    { genres: discover.genres },
    { year: discover.year },
    { sortBy: discover.sortBy },
    { page: discover.page },
    newParam
  );

  return BASE_REQ_URL + `with_genres=${paramObj.genres.join('%2C')}`
    + `&year=${paramObj.year}`
    + `&sort_by=${paramObj.sortBy}`
    + `&page=${paramObj.page}`;
};

const updateDiscoverParamAction = (
  newParam: NewParam
): DiscoverActionTypes | undefined => {
  console.log(newParam.genres)
  const key = Object.keys(newParam)[0];
  switch(key) {
    case 'genres':
      return { type: SET_GENRES, genres: (<number[]>newParam.genres) };
    case 'year':
      return { type: SET_YEAR, year: (<number | undefined>newParam.year) };
    case 'sortBy':
      return { type: SET_SORTBY, sortBy: (<string>newParam.sortBy) };
    case 'page':
      return { type: NAV_TO_PAGE, page: (<number>newParam.page) };
    default:
      return undefined;    
  }
};

export const updateDiscover = (
  newParam: NewParam
): ThunkAction<void, any, null, DiscoverActionTypes> => (
  dispatch, getState
) => {
  const discover: Discover = getState().discover;
  const reqUrl = makeReqUrl(newParam, discover);
  console.log(reqUrl);

  console.log('SHOW_WAITING')

  axios.get(reqUrl)
    .then(res => {
      if (res.status !== 200) throw Error('nope');
      res.data.type = UPDATE_MOVIES;
      dispatch(res.data);
    })
    .then(() => {
      const action = updateDiscoverParamAction(newParam);
      if (action) dispatch(action);
    })
    .catch(err => console.log(err))
    .finally(() =>{
      console.log('HIDE_WAITING');     
    });
};