import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { myMoviesReducer } from './my-movies/reducers';
import { discoverReducer } from './discover/reducers';

import { SortBy } from './discover/types';

export const rootReducer = combineReducers({
  myMovies: myMoviesReducer,
  discover: discoverReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

  return store;
}



export const testState = {
  discover: {
    genres: [],
    allGenres: [],
    year: 2005,
    allYears: [],
    sortBy: SortBy['Popularity Descending'],
    sortOptions: [],
    movies: [],
    page: 1,
    totalPages: 5
  },
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
      },
      id3: {
        id: 'id3',
        tMDb_id: '429617',
        title: 'Spider-Man: Far from Home',
        image: '/2cAc4qH9Uh2NtSujJ90fIAMrw7T.jpg',
        dateAdded: '2019-06-23'
      },
      id4: {
        id: 'id4',
        tMDb_id: '301528',
        title: 'Toy Story 4',
        image: '/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
        dateAdded: '2019-06-23'
      },
      id5: {
        id: 'id5',
        tMDb_id: '486131',
        title: 'Shaft',
        image: '/kfZqwGuvEBAysAbCsa0QLKoSYR.jpg',
        dateAdded: '2019-06-23'
      },
      id6: {
        id: 'id6',
        tMDb_id: '320288',
        title: 'Dark Phoenix',
        image: '/kZv92eTc0Gg3mKxqjjDAM73z9cy.jpg',
        dateAdded: '2019-06-24'
      },
      id7: {
        id: 'id7',
        tMDb_id: '566555',
        title: 'Detective Conan: The Fist of Blue Sapphire',
        image: '/86Y6qM8zTn3PFVfCm9J98Ph7JEB.jpg',
        dateAdded: '2019-06-25'
      },
      id8: {
        id: 'id8',
        tMDb_id: '299537',
        title: 'Captain Marvel',
        image: '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
        dateAdded: '2019-07-01'
      },
      id9: {
        id: 'id9',
        tMDb_id: '420817',
        title: 'Aladdin',
        image: '/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
        dateAdded: '2019-07-02'
      }
    },
    byTag: {
      'To-Watch': { 'id3': true, 'id5': true, 'id7': true, 'id9': true },
      'Watched': { 'id0': true, 'id1': true, 'id2': true, 'id6': true },
      'classic': { 'id0': true, 'id1': true },
      'Superhero': { 'id3': true, 'id6': true, 'id8': true },
      'Fantasy': { 'id0': true, 'id9': true },
      'Animated': { 'id4': true, 'id7': true },
      '???': { 'id2': true }
    },
    allIds: [
      'id0', 'id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9'
    ],
    filters: { 'To-Watch': true, 'Superhero': true },
    showAll: false
  }
}