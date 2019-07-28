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

export interface Params {
  query?: string
  page?: number
}

interface SetParamsAction {
  type: typeof SET_SEARCH_PARAMS
  payload: {

  }
}

interface UpdateMoviesAction {
  type: typeof UPDATE_SEARCH_MOVIES
  payload: {
    movies: Movie[]
    page: number
    totalPages: number
  }
}

export type SearchActionTypes = SetParamsAction | UpdateMoviesAction
// | SetGenresAction | SetYearAction | SetSortByAction | NavToPageAction;