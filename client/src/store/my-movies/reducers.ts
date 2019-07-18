import { combineReducers } from 'redux';

import {
  Set,
  ById,
  ByTag,
  AllIds,
  MyMoviesActionTypes,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  SET_FILTERS,
  SHOW_ALL,
  DELETE_MOVIE,
  // UNDO_DELETE,
  // ERROR
} from './types';

import { testState } from '../index';

let state = testState;


const byIdReducer = (
  byId: ById = state.myMovies.byId,
  action: MyMoviesActionTypes
): ById => {
  switch(action.type) {
    case DELETE_MOVIE:
      const newById = Object.assign({}, byId);
      delete newById[action.movie.id];
      return newById;
    default:
      return  byId;
  }
};

const byTagReducer = (
  byTag: ByTag = state.myMovies.byTag,
  action: MyMoviesActionTypes
): ByTag => {
  switch(action.type) {
    case SET_TAGS:
      const tagArray_setTags: ByTag[] = Object.keys(byTag).map(tag => {
        const newSet: Set = Object.assign({}, byTag[tag], { 
          [action.movie.id]: true
        });
        if (!action.tags[tag]) delete newSet[action.movie.id];          
        return { [tag]: newSet };
      });    
      return Object.assign({}, ...tagArray_setTags);
    case CREATE_TAG:
      return Object.assign({}, byTag, { [action.tag]: {} });
    case DELETE_TAG:
      const newByTag: ByTag = Object.assign({}, byTag);
      delete newByTag[action.tag];
      return newByTag;
    case DELETE_MOVIE:
      const tagArray_deleteMovie: ByTag[] = Object.keys(byTag).map(tag => {
        const newSet: Set = Object.assign({}, byTag[tag]);
        delete newSet[action.movie.id];
        return { [tag]: newSet };
      });
      return Object.assign({}, ...tagArray_deleteMovie);    
    default:
      return byTag;
  }
}

const allIdsReducer = (
  allIds: AllIds = state.myMovies.allIds,
  action: MyMoviesActionTypes
): AllIds => {
  switch(action.type) {
    case DELETE_MOVIE:
      return allIds.filter(id => id !== action.movie.id);
    default:
      return allIds;
  }
};

const filtersReducer = (
  filters: Set = state.myMovies.filters,
  action: MyMoviesActionTypes
): Set => {
  switch(action.type) {
    case SET_FILTERS:
      return action.filters;
    default:
      return filters;
  }
};

const showAllReducer = (
  showAll: boolean = state.myMovies.showAll,
  action: MyMoviesActionTypes
): boolean => {
  switch(action.type) {
    case SET_FILTERS:
      return false;
    case SHOW_ALL:
      return true;
    default:
      return showAll;
  }
};

export const myMoviesReducer = combineReducers({
  byId: byIdReducer,
  byTag: byTagReducer,
  allIds: allIdsReducer,
  filters: filtersReducer,
  showAll: showAllReducer
});



// export const myMoviesReducer = (
//   { byId, byTag, allIds, filters, showAll }: MyMovies = state.myMovies,
//   action: MyMoviesActionTypes
// ): MyMovies => {
//   switch (action.type) {
//     case SET_TAGS:
//       return {
//         byId: byIdReducer(byId, action),
//         byTag: byTagReducer(byTag, action),
//         allIds,
//         filters,
//         showAll
//       };
//     case CREATE_TAG:
//       return {
//         byId: byIdReducer(byId, action),
//         byTag: byTagReducer(byTag, action),
//         allIds,
//         filters,
//         showAll
//       };
//     case DELETE_TAG:
//       return {
//         byId: byIdReducer(byId, action),
//         byTag: byTagReducer(byTag, action),
//         allIds,
//         filters,
//         showAll
//       };
//     case DELETE_MOVIE:
//       return {
//         byId: byIdReducer(byId, action),
//         byTag: byTagReducer(byTag, action),
//         allIds: allIds.filter(id => id !== action.movie.id),
//         filters,
//         showAll
//       };  
//     case SET_FILTERS:
//       return {
//         byId: byIdReducer(byId, action),
//         byTag: byTagReducer(byTag, action),
//         allIds,
//         filters: action.filters,
//         showAll: false
//       };
//     case SHOW_ALL:
//       return {
//         byId: byIdReducer(byId, action),
//         byTag: byTagReducer(byTag, action),
//         allIds,
//         filters,
//         showAll: true
//       };
//     default:
//       return { byId, byTag, allIds, filters, showAll };
//   }
// };