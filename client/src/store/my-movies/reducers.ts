import { SET_TAG, SET_FILTER, DELETE_MOVIE, UNDO_DELETE, Tag, MyMovie, 
  MyMoviesState, MyMoviesActionTypes } from './types';

  
const initialTestState: MyMoviesState = {
  myMovies: [
    {
      movie_id: '0',
      tMDb_id: 'a0',
      title: 'Wizard of Oz',
      image: 'wizardofoz',
      tag: Tag.TO_WATCH,
      dateAdded: '2019-06-20'
    }, {
      movie_id: '1',
      tMDb_id: 'a1',
      title: 'Star Wars',
      image: 'starwars',
      tag: Tag.WATCHED,
      dateAdded: '2019-06-21'
    }, {
      movie_id: '2',
      tMDb_id: 'a2',
      title: 'October Sky',
      image: 'octobersky',
      tag: Tag.TO_WATCH,
      dateAdded: '2019-06-22'
    }
  ]
};

export const myMoviesReducer = (
  state = initialTestState, action: MyMoviesActionTypes
): MyMoviesState => {
  switch (action.type) {
    case DELETE_MOVIE:
      return {
        myMovies: state.myMovies.filter(movie => {
          return movie.movie_id !== action.movie.movie_id;
        })
      };
    default:
      return state;
  }
};