// import axios from 'axios';

import { ThunkAction } from 'redux-thunk';

import {
  SET_GENRES,
  SET_YEAR,
  SET_SORTBY,
  NAV_TO_PAGE,
  NAV_TO_FIRST_PAGE,
  NAV_TO_LAST_PAGE,
  SET_WAITING,
  CANCEL_WAITING,
  LOAD_MOVIES,
  Discover,
  DiscoverActionTypes
} from './types';

export const setGenres = (
  genres: number[]
): ThunkAction<void, null, null, DiscoverActionTypes> => async (
  dispatch
) => {
  const res = await new Promise(resolve => resolve());
  dispatch({
    type: SET_GENRES,
    genres: genres
  });
};

