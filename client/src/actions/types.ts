export const SET_TAG = 'SET_TAG';
export const SET_FILTER = 'SET_FILTER';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const UNDO_DELETE = 'UNDO_DELETE';

enum Tag {
  TO_WATCH = 'TO_WATCH',
  WATCHED = 'WATCHED',
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
  myMovies: MyMovie[]
};

export interface SetTagAction {
  type: typeof SET_TAG
  payload: Tag
};

export interface SetFilterAction {
  type: typeof SET_FILTER
  payload: string
};

export interface DeleteMovieAction {
  type: typeof DELETE_MOVIE
};

//export interface UndoDeleteAction to be implemented