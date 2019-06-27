import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { filterReducer, movieSetReducer } from './my-movies/reducers';

export const rootReducer = combineReducers({
  filter: filterReducer,
  movieSet: movieSetReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

  return store;
}