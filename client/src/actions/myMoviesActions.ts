import axios from 'axios';
import { SET_TAG, SET_FILTER, DELETE_MOVIE, UNDO_DELETE, MyMovie, 
  MyMoviesState, SetTagAction, SetFilterAction, DeleteMovieAction } 
  from './types';

//What's the type of dispatch and getState?
export const deleteMovie = (movie: MyMovie) => 
  (dispatch: any, getState: any) => {

    //Implement real backend operations
    axios.get('https://redux.js.org/')
      .then(res => 
        void dispatch({
          type: DELETE_MOVIE,
          payload: movie.movie_id
        })
      )
      .catch(err =>
        //Implement real error handling
        void alert(err)
      )
  };