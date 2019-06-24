import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { myMoviesReducer } from './my-movies/reducers';

const rootReducer = combineReducers({
  myMovies: myMoviesReducer
});

//export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

  return store;
}