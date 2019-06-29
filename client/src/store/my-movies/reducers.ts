// This test has not been updated. 
// Use /store/my-movies/rootReducer.test.js instead.

import {
  Tag,
  ByTag,
  MyMovies,
  MyMoviesActionTypes,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  SET_FILTER,
  SET_FILTER_TO_ALL,
  DELETE_MOVIE,
  ERROR_INVALID_TAG,
  // UNDO_DELETE,
  // ERROR_UNDO_DELETE,
  // ERROR_NETWORK
} from './types';


export const testState = {
  myMovies: {
    byId: {
      id0: {
        id: 'id0',
        tMDb_id: '630',
        title: 'The Wizard of Oz',
        image: '/mkFyFkF5KXVcb8Hf8Dj0KZuew2u.jpg',
        dateAdded: '2019-06-20'
      }, 
      id1: {
        id: 'id1',
        tMDb_id: '105',
        title: 'Back to the Future',
        image: '/pTpxQB1N0waaSc3OSn0e9oc8kx9.jpg',
        dateAdded: '2019-06-21'
      }, 
      id2: {
        id: 'id2',
        tMDb_id: '13466',
        title: 'October Sky',
        image: '/oeFdjM0P3DMIKOloApLAn96GHiM.jpg',
        dateAdded: '2019-06-22'
      }
    },
    byTag: {
      [Tag.TO_WATCH]: { 'id0': false, 'id1': true, 'id2': true },
      [Tag.WATCHED]: { 'id0': true, 'id1': false, 'id2': false },
      classic: { 'id0': true, 'id1': true, 'id2': false },
      'rom com': { 'id0': false, 'id1': false, 'id2': false }
    },
    allIds: ['id0', 'id2', 'id1'],
    filters: {
      [Tag.TO_WATCH]: true,
      [Tag.WATCHED]: false,
      classic: false,
      'rom com': false
    }
  }
}

let state = testState;


export const byTagReducer = (
  byTag: ByTag = state.myMovies.byTag, action: MyMoviesActionTypes
): ByTag => {
  switch (action.type) {
    case SET_TAGS:
      const newByTagArray = Object.keys(action.tagSetter).map(key => {
        if (byTag[key] === undefined) return {};
        return {
          [key]: Object.assign({}, byTag[key], {
            [action.movie.id]: action.tagSetter[key]
          })
        };
      });
      return Object.assign({}, ...newByTagArray);
    case CREATE_TAG:
      return Object.assign({}, byTag, {
        [action.tag]: {}
      });
    case DELETE_TAG:
      const newByTag = Object.assign({}, byTag);
      delete newByTag[action.tag];
      return newByTag;
    default:
      return byTag;
  }
};


export const myMoviesReducer = (
  myMovies: MyMovies = state.myMovies, action: MyMoviesActionTypes
): MyMovies => {
  switch (action.type) {
    case SET_TAGS:
    case CREATE_TAG:
    case DELETE_TAG:
      return Object.assign({}, myMovies, {
        byTag: byTagReducer(myMovies.byTag, action)
      });
    case DELETE_MOVIE:
      const newById = Object.assign({}, myMovies.byId);
      delete newById[action.movie.id];  
      const newAllIds = myMovies.allIds.filter(id => {
        return id !== action.movie.id
      });    
      return Object.assign({}, myMovies, {
        byId: newById,
        allIds: newAllIds
      });
    case SET_FILTER: 
      return Object.assign({}, myMovies, {
        filters: action.filters
      });
    case SET_FILTER_TO_ALL:
      const tagSetter = Object.keys(myMovies.byTag).map(key => {
        return {
          [key]: true
        };
      });
      return Object.assign({}, myMovies, {
        filters: Object.assign({}, ...tagSetter)
      }); 
    case ERROR_INVALID_TAG:
      console.log(action.msg); //to be implemented
      return myMovies;
    default:
      return myMovies;
  }
};

