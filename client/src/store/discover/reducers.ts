import {
  SET_GENRES,
  SET_YEAR,
  SET_SORTBY,
  NAV_TO_PAGE,
  NAV_TO_FIRST_PAGE,
  NAV_TO_LAST_PAGE,
  UPDATE_MOVIES,
  SortBy,
  Discover,
  NewParam,
  DiscoverData,
  DiscoverActionTypes
} from './types'

import { testState } from '../index';

let state = testState;

export const discoverReducer = (
  discover: Discover = state.discover,
  action: DiscoverActionTypes
) => {
  switch(action.type) {
    case SET_GENRES:
      return {
        ...discover,
        genres: action.genres
      };
    case SET_YEAR:
      return {
        ...discover,
        year: action.year
      };
    case SET_SORTBY:
      return {
        ...discover,
        sortBy: action.sortBy
      };
    case NAV_TO_PAGE:
      return {
        ...discover,
        page: action.page
      };
    case UPDATE_MOVIES:
      return {
        ...discover,
        movies: action.movies,
        page: action.page,
        totalPages: action.totalPages
      };
    default:
      return discover;
  }
};
