import { AppLevelActionTypes } from '../app-level/types';

export const SET_DISCOVER_PARAMS = 'SET_PARAMS'
export const UPDATE_DISCOVER_MOVIES = 'UPDATE_DISCOVER_MOVIES'

export interface Discover {
  genres: number[]
  allGenres: Genre[]
  year: number
  allYears: number[]
  sortBy: string
  sortOptions: string[]
  movies: Movie[]
  page: number
  totalPages: number
}

export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  releaseDate: string
  image: string
  poster: string
}

export interface Params {
  genres?: number[]
  year?: number
  sortBy?: string
  page?: number
}

interface SetParamsAction {
  type: typeof SET_DISCOVER_PARAMS
  payload: Params
}

interface UpdateMoviesAction {
  type: typeof UPDATE_DISCOVER_MOVIES
  payload: {
    movies: Movie[]
    page: number
    totalPages: number
  }
}

export type DiscoverActionTypes = SetParamsAction | UpdateMoviesAction | AppLevelActionTypes
// | SetGenresAction | SetYearAction | SetSortByAction | NavToPageAction;