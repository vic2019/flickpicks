import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { myMoviesReducer } from './my-movies/reducers';
import { discoverReducer } from './discover/reducers';
import { moviePageReducer } from './movie-page/reducers';
import { searchReducer } from './search/reducers';

export const rootReducer = combineReducers({
  myMovies: myMoviesReducer,
  discover: discoverReducer,
  search: searchReducer,
  moviePage: moviePageReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

  return store;
}