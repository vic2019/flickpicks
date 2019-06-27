import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import { testState } from './reducers';
import {
  Tag,
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  ERROR_INVALID_TAG,
  SET_FILTER, 
  DELETE_MOVIE,
  UNDO_DELETE,
  ERROR_UNDO_DELETE,
  ERROR_NETWORK,
  SET_FILTER_TO_ALL
} from './types';

const { filter, movieSet } = testState;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('setTags', () => {
  it('creates SET_TAG after making http call', () => {
    const movie = movieSet.abc0;
    const tag = Tag.WATCHED;
    const customTags = ['comedy'];
    const expectedAction = {
      type: SET_TAGS,
      movie,
      tag,
      customTags
    }
    const store = mockStore(movieSet);

    return store.dispatch(actions.setTags(movie, tag, customTags)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

describe('setFilter', () => {
  it('creates SET_FILTER', () => {
    const filter = [Tag.TO_WATCH, 'comedy'];
    const expectedAction = {
      type: SET_FILTER,
      filter
    }
    
    expect(actions.setFilter(filter)).toEqual(expectedAction);
  });
});

describe('setFilterToAll', () => {
  it('creates SET_FILTER_TO_ALL', () => {
    const expectedAction = {
      type: SET_FILTER_TO_ALL,
    }
    
    expect(actions.setFilterToAll()).toEqual(expectedAction);
  });
});

describe('createTag', () => {
  it('creates CREATE_TAG after making http call', () => {
    const tag = 'sci-fi';
    const expectedAction = {
      type: CREATE_TAG,
      tag
    }
    const store = mockStore(filter);

    return store.dispatch(actions.createTag(tag)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

describe('createTag', () => {
  it('creates ERROR when tryign to create a duplicate tag', () => {
    const tag = 'comedy';
    const expectedAction = {
      type: ERROR_INVALID_TAG,
      msg: 'The tag "comedy" already exists.'
    }
    const store = mockStore(filter);

    return store.dispatch(actions.createTag(tag)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

describe('deleteTag', () => {
  it('creates DELETE_TAG after making http call', () => {
    const tag = 'comedy';
    const expectedAction = {
      type: DELETE_TAG,
      tag
    }
    const store = mockStore(filter);

    return store.dispatch(actions.deleteTag(tag)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

describe('deleteMovie', () => {
  it('creates DELETE_MOVIE after making http call', () => {
    const movie = testState.movieSet.abc0;
    const expectedAction = {
      type: DELETE_MOVIE,
      movie
    };
    const store = mockStore(movieSet);

    return store.dispatch(actions.deleteMovie(movie)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});