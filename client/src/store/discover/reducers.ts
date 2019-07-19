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
} from './types'


const initialState = {
  genres: [],
  allGenres: [{
    id: 1,
    name: 'SciFi'
  }, {
    id: 2,
    name: 'Drama'
  }, {
    id: 3,
    name: 'Fantasy'
  }],
  year: undefined,
  allYears: Array(new Date().getFullYear() - 1899).fill(null).map((_, i) => (
    new Date().getFullYear() - i
  )),
  sortBy: 'popularity.desc',
  sortOptions: [
    'popularity.asc',
    'popularity.desc',
    'release_date.asc',
    'release_date.des',
    'original_title.asc',
    'original_title.des'
  ],
  movies: [],
  page: undefined,
  totalPages: undefined
}

export const discoverReducer = (
  discover: Discover = initialState,
  action: DiscoverActionTypes
) => {
  switch (action.type) {
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
