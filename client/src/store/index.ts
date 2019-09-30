import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { myMoviesReducer } from './my-movies/reducers';
import { discoverReducer } from './discover/reducers';
import { moviePageReducer } from './movie-page/reducers';
import { searchReducer } from './search/reducers';
import { appLevelReducer } from './app-level/reducers';
import { userReducer } from './user/reducers';

export const rootReducer = combineReducers({
  myMovies: myMoviesReducer,
  discover: discoverReducer,
  search: searchReducer,
  moviePage: moviePageReducer,
  appLevel: appLevelReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}