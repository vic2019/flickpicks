import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import { DELETE_MOVIE, Tag } from './types';
import { testState } from './reducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('deleteMovie', () => {
  it('accepts movie, makes http call, then creates DELETE_MOVIE',() => {
    const movie = testState[0];
    const expectedAction = {
      type: DELETE_MOVIE,
      movie: movie
    };
    const store = mockStore({ myMovies: [] });

    return store.dispatch(actions.deleteMovie(movie)).then(() => {
      const actions = store.getActions();
      expect(actions[actions.length - 1]).toEqual(expectedAction);
    });
  });
});