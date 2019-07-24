import {
  LOAD_MOVIE,
  NOT_FOUND,
  MoviePage,
  MoviePageActionTypes
} from './types';

const initialState: MoviePage = {
  notFound: true,
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
    case NOT_FOUND: 
      return {
        ...moviePage,
        notFound: true
      };
    default:
      return moviePage;
  }
};