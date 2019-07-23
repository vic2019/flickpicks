// export const SET_GENRES = 'SET_GENRES'
// export const SET_YEAR = 'SET_YEAR'
// export const SET_SORTBY = 'SET_SORTBY'
export const SET_PARAMS = 'SET_PARAMS'
// export const NAV_TO_PAGE = 'NAV_PAGE'
export const UPDATE_MOVIES = 'UPDATE_MOVIES'

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
}

export interface NewParams {
  genres?: number[]
  year?: number
  sortBy?: string
  page?: number
}

// export interface DiscoverData {
//   page: number
//   totalPages: number
//   movies: Movie[]
// }

// interface SetGenresAction {
//   type: typeof SET_GENRES
//   genres: number[]
// }

// interface SetYearAction {
//   type: typeof SET_YEAR
//   year: number | undefined
// }

// interface SetSortByAction {
//   type: typeof SET_SORTBY
//   sortBy: string
// }

interface SetParamsAction {
  type: typeof SET_PARAMS
  payload: NewParams
}

// interface NavToPageAction {
//   type: typeof NAV_TO_PAGE
//   page: number
// }

interface UpdateMoviesAction {
  type: typeof UPDATE_MOVIES
  payload: {
    movies: Movie[]
    page: number
    totalPages: number
  }
}

export type DiscoverActionTypes = SetParamsAction | UpdateMoviesAction
// | SetGenresAction | SetYearAction | SetSortByAction | NavToPageAction;