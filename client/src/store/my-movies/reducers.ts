import { SET_TAG, SET_FILTER, CREATE_TAG, DELETE_MOVIE, ERROR, UNDO_DELETE, Tag, MyMoviesState, MyMoviesActionTypes } from './types';

  
export const testState: MyMoviesState = {
  filter: {
    appliedFilter: [Tag.TO_WATCH, Tag.WATCHED],
    filterSet: [Tag.TO_WATCH, Tag.WATCHED, 'comedy']
  },
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
  state = testState, action: MyMoviesActionTypes
): MyMoviesState => {
  switch (action.type) {
    case SET_TAG:
      return {
        filter: state.filter,
        myMovies: state.myMovies.map(movie => {
          if (movie.movie_id !== action.movie.movie_id) return movie;
          
          const { movie_id, tMDb_id, title, image, dateAdded } = action.movie;return { 
            tag: action.tag, 
            movie_id, tMDb_id, title, image, dateAdded 
          };
        })
      };
    case SET_FILTER: 
      return {
        filter: {
          appliedFilter: action.filter[0] === 'all'? 
            state.filter.filterSet: action.filter,
          filterSet: state.filter.filterSet
        },
        myMovies: state.myMovies
      };
    case CREATE_TAG:
      return {
        filter: {
          appliedFilter: state.filter.appliedFilter,
          filterSet: [...state.filter.filterSet, action.tag]
        },
        myMovies: state.myMovies
      };
    case DELETE_MOVIE:
      return {
        filter: state.filter,
        myMovies: state.myMovies.filter(movie => {
          return movie.movie_id !== action.movie.movie_id;
        })
      };
    case ERROR:
      // Do something different?
      return state;
    default:
      return state;
  }
};