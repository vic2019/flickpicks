import {
  Tag,
  Movie,
  MovieSet,
  MyMovies,
  Filter,
  MyMoviesActionTypes,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  SET_FILTER,
  SET_FILTER_TO_ALL,
  DELETE_MOVIE,
  ERROR_INVALID_TAG,
  UNDO_DELETE,
  ERROR_UNDO_DELETE,
  ERROR_NETWORK
} from './types';


export const testState: MyMovies = {
  filter: {
    appliedFilter: [Tag.TO_WATCH],
    filterSet: [Tag.TO_WATCH, Tag.WATCHED, 'comedy']
  },
  movieSet: {
    order: ['abc0', 'abc1', 'abc2'],
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


export const movieSetReducer = (
  state = testState.movieSet, action: MyMoviesActionTypes
): MovieSet => {
  switch (action.type) {
    case SET_TAGS:
      const updatedMovie = Object.assign({}, action.movie, {
        tag: action.tag,
        customTags: action.customTags
      });
      return Object.assign({}, state, {
        [action.movie.id]: updatedMovie
      });
    case DELETE_MOVIE:
      const newState = Object.assign({}, state, {
        order: state.order.filter(id => id !== action.movie.id)
      });
      delete newState[action.movie.id];      
      return newState;
    case ERROR_INVALID_TAG:
      console.log(action.msg); //to be implemented
      return state;
    default:
      return state;
  }
};


export const filterReducer = (
  state = testState.filter, action: MyMoviesActionTypes
): Filter => {
  switch(action.type) {
    case SET_FILTER: 
      return Object.assign({}, state, {
        appliedFilter: action.filter
      });
    case SET_FILTER_TO_ALL:
      return Object.assign({}, state, {
        appliedFilter: state.filterSet
      });
    case CREATE_TAG:
      return Object.assign({}, state, {
        filterSet: [...state.filterSet, action.tag]
      });
    case DELETE_TAG:
      return {
        appliedFilter: state.appliedFilter,
        filterSet: state.filterSet.filter(tag => tag !== action.tag),
      };
    case ERROR_INVALID_TAG:
      console.log(action.msg); //to be implemented
      return state;
    default:
      return state;
  }
};