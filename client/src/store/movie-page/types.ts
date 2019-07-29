import { AppLevelActionTypes } from '../app-level/types';

export const LOAD_MOVIE = 'LOAD_MOVIE';

export interface MoviePage {
  id: number
  backdrop: string
  poster: string
  title: string
  releaseDate: string
  overview: string
  crew: Crew[]
  cast: Cast[]
  recommendations: Recommendation[]
}

interface Crew {
  name: string
  job: string
}

interface Cast {
  name: string
  character: string
  image: string
}

interface Recommendation {
  id: number
  title: string
  image: string
}

interface loadMovieAction {
  type: typeof LOAD_MOVIE
  payload: MoviePage
}

export type MoviePageActionTypes = loadMovieAction | AppLevelActionTypes