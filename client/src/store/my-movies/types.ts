export const SET_TAGS = 'SET_TAG';
export const CREATE_TAG = 'CREATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const SET_FILTER = 'SET_FILTER';
export const SET_FILTER_TO_ALL = 'SET_FILTER_TO_ALL';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const UNDO_DELETE = 'UNDO_DELETE';
export const ERROR_INVALID_TAG = 'ERROR_INVALID_TAG';
export const ERROR_UNDO_DELETE = 'ERROR_UNDO_DELETE';
export const ERROR_NETWORK = 'ERROR_NETWORK';

export enum Tag {
  TO_WATCH = 0,
  WATCHED = 1,
}

export interface Filter {
  appliedFilter: (Tag | string)[]
  filterSet: (Tag | string)[]
}

export interface Movie {
  id: string
  tMDb_id: string
  title: string
  image: string
  tag: Tag
  customTags: string[]
  dateAdded: string
}

export interface MovieSet {
  order: string[]
  [key: string]: any
}

export interface MyMovies {
  filter: Filter
  movieSet: MovieSet
}

interface SetTagsAction {
  type: typeof SET_TAGS
  movie: Movie 
  tag: Tag
  customTags: string[]
};

interface ModifyTagAction {
  type: typeof CREATE_TAG | typeof DELETE_TAG
  tag: string
}

interface SetFilterAction {
  type: typeof SET_FILTER
  filter: (Tag | string)[]
};

interface SetFilterToAllAction {
  type: typeof SET_FILTER_TO_ALL
};

interface DeleteMovieAction {
  type: typeof DELETE_MOVIE
  movie: Movie
};

interface UndoDeleteAction {
  type: typeof UNDO_DELETE
}

interface ErrorAction {
  type: typeof ERROR_INVALID_TAG | typeof ERROR_UNDO_DELETE | typeof ERROR_NETWORK
  msg: string | number
}

export type MyMoviesActionTypes = 
  SetTagsAction | ModifyTagAction | SetFilterAction | SetFilterToAllAction | DeleteMovieAction | UndoDeleteAction | ErrorAction;