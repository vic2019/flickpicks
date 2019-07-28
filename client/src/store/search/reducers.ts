import {
  SET_SEARCH_PARAMS,
  UPDATE_SEARCH_MOVIES,
  Search,
  SearchActionTypes
} from './types'

const initialState = {
  query: '',
  movies: [],
  page: -1,
  totalPages: -1
}

export const searchReducer = (
  search: Search = initialState,
  action: SearchActionTypes
) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS:
      return {
        ...search,
        ...action.payload
      };
    case UPDATE_SEARCH_MOVIES:
      return {
        ...search,
        movies: action.payload.movies,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    default:
      return search;
  }
};
