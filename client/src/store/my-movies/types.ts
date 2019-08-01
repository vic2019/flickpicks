import { AppLevelActionTypes } from '../app-level/types';

export const SET_TAGS = 'SET_TAG';
export const CREATE_TAG = 'CREATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const SET_FILTERS = 'SET_FILTERs';
export const SHOW_ALL = 'SHOW_ALL';
export const ADD_MOVIE = 'ADD_MOVIE'
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const UNDO_DELETE = 'UNDO_DELETE';
export const ERROR = 'ERROR';

export interface Movie {
  id: string
  title: string
  image: string
  dateAdded: string
}

export interface Set {
  [key: string]: boolean
}

export interface ById {
  [key: string]: Movie
}

export interface ByTag {
  [key: string]: Set
}

export type AllIds = string[]

export interface MyMovies {
  byId: ById
  byTag: ByTag
  allIds: string[]
  filters: Set
  showAll: boolean
}

interface SetTagsAction {
  type: typeof SET_TAGS
  movie: Movie 
  tags: Set
};

interface ModifyTagAction {
  type: typeof CREATE_TAG | typeof DELETE_TAG
  tag: string
}

interface SetFiltersAction {
  type: typeof SET_FILTERS
  filters: Set
};

interface ShowAllAction {
  type: typeof SHOW_ALL
};

interface AddMovieAction {
  type: typeof ADD_MOVIE
  movie: Movie
};

interface DeleteMovieAction {
  type: typeof DELETE_MOVIE
  movie: Movie
};

interface UndoDeleteAction {
  type: typeof UNDO_DELETE
}

export type MyMoviesActionTypes = 
  SetTagsAction | ModifyTagAction | SetFiltersAction | ShowAllAction | AddMovieAction | DeleteMovieAction | UndoDeleteAction | AppLevelActionTypes;