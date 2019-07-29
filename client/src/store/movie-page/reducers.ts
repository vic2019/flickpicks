import {
  LOAD_MOVIE,
  MoviePage,
  MoviePageActionTypes
} from './types';

const initialState: MoviePage = {
  id: -1,
  backdrop: '',
  poster: '',
  title: '',
  releaseDate: '',
  overview: '',
  crew: [],
  cast: [],
  recommendations: []
}

export const moviePageReducer = (
  moviePage: MoviePage = initialState,
  action: MoviePageActionTypes
) => {
  switch(action.type) {
    case LOAD_MOVIE:
      return {
        ...action.payload
      };
    default:
      return moviePage;
  }
};