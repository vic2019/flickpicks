import {
  Tag,
  MyMovie,
  MyMoviesState,
  MyMoviesActionTypes,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  ERROR_INVALID_TAG,
  SET_FILTER,
  SET_FILTER_TO_ALL,
  DELETE_MOVIE,
  UNDO_DELETE,
  ERROR_UNDO_DELETE,
  ERROR_NETWORK
} from './types';

  
export const testState: MyMoviesState = {
  filter: {
    appliedFilter: [Tag.TO_WATCH, Tag.WATCHED],
    filterSet: [Tag.TO_WATCH, Tag.WATCHED, 'comedy']
  },
  myMovies: {
    abc0: {
      id: 'abc0',
      tMDb_id: 'a0',
      title: 'Wizard of Oz',
      image: 'wizardofoz',
      tag: Tag.TO_WATCH,
      customTags: [],
      dateAdded: '2019-06-20'
    }, 
    abc1: {
      id: 'abc1',
      tMDb_id: 'a1',
      title: 'Star Wars',
      image: 'starwars',
      tag: Tag.WATCHED,
      customTags: ['comedy'],
      dateAdded: '2019-06-21'
    }, 
    abc2: {
      id: 'abc2',
      tMDb_id: 'a2',
      title: 'October Sky',
      image: 'octobersky',
      tag: Tag.TO_WATCH,
      customTags: ['comedy'],
      dateAdded: '2019-06-22'
    }
  }
};


export const myMoviesReducer = (
  state = testState, action: MyMoviesActionTypes
): MyMoviesState => {
  switch (action.type) {
    case SET_TAGS:
      const updatedMovie = Object.assign({}, action.movie, {
        tag: action.tag,
        customTags: action.customTags
      });
      return {
        filter: state.filter,
        myMovies: Object.assign({}, state.myMovies, {
          [action.movie.id]: updatedMovie
        })
      };
    case SET_FILTER: 
      return {
        filter: {
          appliedFilter: action.filter,
          filterSet: state.filter.filterSet
        },
        myMovies: state.myMovies
      };
    case SET_FILTER_TO_ALL: 
      return {
        filter: {
          appliedFilter: state.filter.filterSet,
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
    case DELETE_TAG:
      const { appliedFilter, filterSet } = state.filter;
      return {
        filter: {
          appliedFilter: appliedFilter,
          filterSet: filterSet.filter(tag => tag !== action.tag)
        },
        myMovies: state.myMovies
      };
    case DELETE_MOVIE:
      const updatedMyMovies = Object.assign({}, state.myMovies);
      delete updatedMyMovies[action.movie.id];
      return {
        filter: state.filter,
        myMovies: updatedMyMovies
      };
    case ERROR_INVALID_TAG:
      console.log(action.msg);
      return state;
    default:
      return state;
  }
};