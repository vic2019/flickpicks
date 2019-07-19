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
  allGenres: [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ],
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
