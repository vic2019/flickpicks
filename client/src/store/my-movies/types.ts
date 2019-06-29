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


export interface Movie {
  id: string
  tMDb_id: string | number
  title: string
  image: string
  dateAdded: string
}

export enum Tag {
  TO_WATCH = 0,
  WATCHED = 1,
}

export interface TagSetter {
  [Tag.TO_WATCH]: boolean
  [Tag.WATCHED]: boolean
  [key: string]: boolean
}

export interface ByTag {
  [Tag.TO_WATCH]: { [key: string]: boolean }
  [Tag.WATCHED]: { [key: string]: boolean }
  [key: string]: { [key: string]: boolean }
}

export interface ById {
  [key: string]: Movie
}

export interface MyMovies {
  byId: ById
  byTag: ByTag
  allIds: string[]
  filters: TagSetter
}

interface SetTagsAction {
  type: typeof SET_TAGS
  movie: Movie 
  tagSetter: TagSetter
};

interface ModifyTagAction {
  type: typeof CREATE_TAG | typeof DELETE_TAG
  tag: string
}

interface SetFilterAction {
  type: typeof SET_FILTER
  filters: TagSetter
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