export const SET_TAG = 'SET_TAG';
export const SET_FILTER = 'SET_FILTER';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const UNDO_DELETE = 'UNDO_DELETE';

export enum Tag {
  TO_WATCH = 0,
  WATCHED = 1,
}

export interface MyMovie {
  movie_id: string
  tMDb_id: string
  title: string
  image: string
  tag: Tag
  dateAdded: string
}

export interface MyMoviesState {
  filter: {   // What is the type of Set in typescript?
    appliedFilter: (Tag | string)[]
    filterSet: (Tag | string)[]
  }
  myMovies: MyMovie[]
};

interface SetTagAction {
  type: typeof SET_TAG
  movie: MyMovie 
  tag: Tag
};

interface SetFilterAction {
  type: typeof SET_FILTER
  filter: (Tag | string)[]
};

interface DeleteMovieAction {
  type: typeof DELETE_MOVIE
  movie: MyMovie
};

//interface UndoDeleteAction to be implemented

export type MyMoviesActionTypes = 
  SetTagAction | SetFilterAction | DeleteMovieAction;