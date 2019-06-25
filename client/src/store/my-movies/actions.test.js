import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import { Tag, DELETE_MOVIE, SET_TAG, SET_FILTER } from './types';
import { testState } from './reducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('setTag', () => {
  it('creates SET_TAG after making http call', () => {
    const movie = testState.myMovies[0];
    const tag = Tag.WATCHED;
    const expectedAction = {
      type: SET_TAG,
      movie,
      tag
    }
    const store = mockStore(testState);

    return store.dispatch(actions.setTag(movie, tag)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

describe('setFilter', () => {
  it('creates SET_FILTER after making http call', () => {
    const filter = [Tag.TO_WATCH, 'comedy'];
    const expectedAction = {
      type: SET_FILTER,
      filter
    }
    const store = mockStore(testState);

    return store.dispatch(actions.setFilter(filter)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

describe('deleteMovie', () => {
  it('creates DELETE_MOVIE after making http call', () => {
    const movie = testState.myMovies[0];
    const expectedAction = {
      type: DELETE_MOVIE,
      movie
    };
    const store = mockStore({ myMovies: [] });

    return store.dispatch(actions.deleteMovie(movie)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});