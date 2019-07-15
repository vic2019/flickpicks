export const SET_GENRES = 'SET_GENRES'
export const SET_YEAR = 'SET_YEAR'
export const SET_SORTBY = 'SET_SORTBY'
export const NAV_TO_PAGE = 'NAV_PAGE'
export const NAV_TO_FIRST_PAGE = 'NAV_FIRST_PAGE'
export const NAV_TO_LAST_PAGE = 'NAV_LAST_PAGE'
export const SET_WAITING = 'SET_WAITING'
export const CANCEL_WAITING = 'CANCEL_WAITING'
export const LOAD_MOVIES = 'LOAD_MOVIES'

export interface Discover {
  settings: Settings
  movies: Movie[]
  page: number
  totalPages: number
  waiting: boolean
}

export interface Settings {
  genres: number[]
  allGenres: Genre[]
  year: number
  allYears: number[]
  sortBy: SortBy
  sortOptions: SortBy[]
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
  yearReleased: number
  image: string
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
  year: SortBy
}

interface NavToPageAction {
  type: typeof NAV_TO_PAGE
  page: number
}

interface SetWaitingAction {
  type: typeof SET_WAITING
}

interface CancelWaitingAction {
  type: typeof CANCEL_WAITING
}

interface LoadMoviesAction {
  type: typeof LOAD_MOVIES
  movies: Movie[]
  page: number
  totalPages: number
}

export type DiscoverActionTypes = SetGenresAction | SetYearAction | SetSortByAction | NavToPageAction | SetWaitingAction | CancelWaitingAction | LoadMoviesAction