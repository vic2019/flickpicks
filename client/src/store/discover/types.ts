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
  year: number
  allYears: number[]
  sortBy: SortBy
  sortOptions: SortBy[]
  movies: Movie[]
  page: number
  totalPages: number
}

export interface Genre {
  id: number
  name: string
}

export enum SortBy {
  'Popularity Ascending' = 'popularity.asc',
  'Popularity Descending' = 'popularity.desc',
  'Release Date Ascending' = 'release_date.asc',
  'Release Date Descending' = 'release_date.des',
  'Original Title Ascending' = 'original_title.asc',
  'Original Title Descending' = 'original_title.des',
}

export interface Movie {
  id: number
  title: string
  releaseDate: string
  image: string | null
}

export interface NewParam {
  [key: string]: number | number[] | SortBy
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
  year: number
}

interface SetSortByAction {
  type: typeof SET_SORTBY
  sortBy: SortBy
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