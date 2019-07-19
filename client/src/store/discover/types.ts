import { NumberTypeAnnotation } from "@babel/types";

export const SET_GENRES = 'SET_GENRES'
export const SET_YEAR = 'SET_YEAR'
export const SET_SORTBY = 'SET_SORTBY'
export const NAV_TO_PAGE = 'NAV_PAGE'
export const NAV_TO_FIRST_PAGE = 'NAV_FIRST_PAGE'
export const NAV_TO_LAST_PAGE = 'NAV_LAST_PAGE'
export const UPDATE_MOVIES = 'UPDATE_MOVIES'

export interface Discover {
  genres: number[]
  allGenres: Genre[]
  year: number | undefined
  allYears: number[]
  sortBy: string
  sortOptions: string[]
  movies: Movie[]
  page: number | undefined
  totalPages: number | undefined
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
}

export interface NewParam {
  genres?: number[]
  year?: number | undefined
  sortBy?: string
  page?: number | undefined
}

export interface DiscoverData {
  page: number
  totalPages: number
  movies: Movie[]
}

interface SetGenresAction {
  type: typeof SET_GENRES
  genres: number[]
}

interface SetYearAction {
  type: typeof SET_YEAR
  year: number | undefined
}

interface SetSortByAction {
  type: typeof SET_SORTBY
  sortBy: string
}

interface NavToPageAction {
  type: typeof NAV_TO_PAGE
  page: number
}

interface UpdateMoviesAction {
  type: typeof UPDATE_MOVIES
  movies: Movie[]
  page: number
  totalPages: number
}

export type DiscoverActionTypes = SetGenresAction | SetYearAction | SetSortByAction | NavToPageAction | UpdateMoviesAction