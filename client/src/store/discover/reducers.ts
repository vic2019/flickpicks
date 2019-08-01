import {
  SET_DISCOVER_PARAMS,
  UPDATE_DISCOVER_MOVIES,
  Discover,
  DiscoverActionTypes
} from './types'

const initialState: Discover = {
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
  year: -1,
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
  page: -1,
  totalPages: -1
}

export const discoverReducer = (
  discover: Discover = initialState,
  action: DiscoverActionTypes
) => {
  switch (action.type) {
    case SET_DISCOVER_PARAMS:
      return {
        ...discover,
        ...action.payload
      };
    case UPDATE_DISCOVER_MOVIES:
      return {
        ...discover,
        movies: action.payload.movies,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    default:
      return discover;
  }
};
