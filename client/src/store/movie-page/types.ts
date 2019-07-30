import { AppLevelActionTypes } from '../app-level/types'

export const LOAD_MOVIE = 'LOAD_MOVIE'
export const NOT_FOUND = 'NOT_FOUND'

export interface MoviePage {
  notFound: boolean
  id: number
  backdrop: string
  poster: string
  title: string
  releaseDate: string
  overview: string
  crew: Crew[]
  cast: Cast[]
  recommendations: Recommendation[]
  videos: Video[]
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

interface Video {
  key: string
}

interface LoadMovieAction {
  type: typeof LOAD_MOVIE
  payload: MoviePage
}

interface NotFoundAction {
  type: typeof NOT_FOUND
}

export type MoviePageActionTypes = LoadMovieAction | NotFoundAction | AppLevelActionTypes