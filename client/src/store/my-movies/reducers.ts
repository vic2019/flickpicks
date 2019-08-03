import { combineReducers } from 'redux';

import {
  MyMovies,
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
  ADD_MOVIE,
  DELETE_MOVIE,
} from './types';


// const testMyMovies = {
//   byId: {
//     id0: {
//       id: 'id0',
//       tMDb_id: '630',
//       title: 'The Wizard of Oz',
//       image: '/mkFyFkF5KXVcb8Hf8Dj0KZuew2u.jpg',
//       dateAdded: '2019-06-20'
//     }, 
//     id1: {
//       id: 'id1',
//       tMDb_id: '105',
//       title: 'Back to the Future',
//       image: '/pTpxQB1N0waaSc3OSn0e9oc8kx9.jpg',
//       dateAdded: '2019-06-21'
//     }, 
//     id2: {
//       id: 'id2',
//       tMDb_id: '13466',
//       title: 'October Sky',
//       image: '/oeFdjM0P3DMIKOloApLAn96GHiM.jpg',
//       dateAdded: '2019-06-22'
//     },
//     id3: {
//       id: 'id3',
//       tMDb_id: '429617',
//       title: 'Spider-Man: Far from Home',
//       image: '/2cAc4qH9Uh2NtSujJ90fIAMrw7T.jpg',
//       dateAdded: '2019-06-23'
//     },
//     id4: {
//       id: 'id4',
//       tMDb_id: '301528',
//       title: 'Toy Story 4',
//       image: '/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
//       dateAdded: '2019-06-23'
//     },
//     id5: {
//       id: 'id5',
//       tMDb_id: '486131',
//       title: 'Shaft',
//       image: '/kfZqwGuvEBAysAbCsa0QLKoSYR.jpg',
//       dateAdded: '2019-06-23'
//     },
//     id6: {
//       id: 'id6',
//       tMDb_id: '320288',
//       title: 'Dark Phoenix',
//       image: '/kZv92eTc0Gg3mKxqjjDAM73z9cy.jpg',
//       dateAdded: '2019-06-24'
//     },
//     id7: {
//       id: 'id7',
//       tMDb_id: '566555',
//       title: 'Detective Conan: The Fist of Blue Sapphire',
//       image: '/86Y6qM8zTn3PFVfCm9J98Ph7JEB.jpg',
//       dateAdded: '2019-06-25'
//     },
//     id8: {
//       id: 'id8',
//       tMDb_id: '299537',
//       title: 'Captain Marvel',
//       image: '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
//       dateAdded: '2019-07-01'
//     },
//     id9: {
//       id: 'id9',
//       tMDb_id: '420817',
//       title: 'Aladdin',
//       image: '/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
//       dateAdded: '2019-07-02'
//     }
//   },
//   byTag: {
//     'To-Watch': { 'id3': true, 'id5': true, 'id7': true, 'id9': true },
//     'Watched': { 'id0': true, 'id1': true, 'id2': true, 'id6': true },
//     'classic': { 'id0': true, 'id1': true },
//     'Superhero': { 'id3': true, 'id6': true, 'id8': true },
//     'Fantasy': { 'id0': true, 'id9': true },
//     'Animated': { 'id4': true, 'id7': true },
//     '???': { 'id2': true }
//   },
//   allIds: [
//     'id0', 'id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9'
//   ],
//   filters: { 'To-Watch': true, 'Superhero': true },
//   showAll: false
// };


const initialState: MyMovies = {
  byId: {},
  byTag: {
    "To Watch": {},
    "Watched": {}
  },
  allIds: [],
  filters: {},
  showAll: true
};

const byIdReducer = (
  byId: ById = initialState.byId,
  action: MyMoviesActionTypes
): ById => {
  switch(action.type) {
    case ADD_MOVIE:
      return Object.assign({}, byId, { [action.movie.id]: action.movie });
    case DELETE_MOVIE:
      const newById = Object.assign({}, byId);
      delete newById[action.movie.id];
      return newById;
    default:
      return  byId;
  }
};

const byTagReducer = (
  byTag: ByTag = initialState.byTag,
  action: MyMoviesActionTypes
): ByTag => {
  switch(action.type) {
    case SET_TAGS:
      const tagArray_setTags: ByTag[] = Object.keys(byTag).map(tag => {
        const newSet: Set = Object.assign({}, byTag[tag], { 
          [action.movie.id]: action.movie.id
        });
        if (!action.tags[tag]) delete newSet[action.movie.id];          
        return { [tag]: newSet };
      });    
      return Object.assign({}, ...tagArray_setTags);
    case CREATE_TAG:
      return Object.assign({}, byTag, { [action.tag]: {} });
    case ADD_MOVIE:
        return Object.assign({}, byTag, {
          "To Watch": Object.assign({}, byTag["To Watch"], { 
            [action.movie.id]: action.movie.id
          })
        });
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
  allIds: AllIds = initialState.allIds,
  action: MyMoviesActionTypes
): AllIds => {
  switch(action.type) {
    case ADD_MOVIE:
        return [...allIds, action.movie.id];
    case DELETE_MOVIE:
      return allIds.filter(id => id !== action.movie.id);
    default:
      return allIds;
  }
};

const filtersReducer = (
  filters: Set = initialState.filters,
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
  showAll: boolean = initialState.showAll,
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