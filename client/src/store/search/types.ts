import { AppLevelActionTypes } from '../app-level/types';

export const UPDATE_SEARCH_MOVIES = 'UPDATE_SEARCH_MOVIES'
export const SET_SEARCH_PARAMS = 'SET_SEARCH_PARAMS'

export interface Search {
  query: string
  movies: Movie[]
  page: number
  totalPages: number
}

export interface Movie {
  id: number
  title: string
  releaseDate: string
  image: string
  poster: string
}

export interface Params {
  query?: string
  page?: number
}

interface SetSearchParamsAction {
  type: typeof SET_SEARCH_PARAMS
  payload: {

  }
}

interface UpdateSearchMoviesAction {
  type: typeof UPDATE_SEARCH_MOVIES
  payload: {
    movies: Movie[]
    page: number
    totalPages: number
  }
}

export type SearchActionTypes = SetSearchParamsAction | UpdateSearchMoviesAction | AppLevelActionTypes;