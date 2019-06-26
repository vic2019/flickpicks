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

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('setTags', () => {
  it('creates SET_TAG after making http call', () => {
    const movie = testState.myMovies[0];
    const tag = Tag.WATCHED;
    const customTags = ['comedy'];
    const expectedAction = {
      type: SET_TAGS,
      movie,
      tag,
      customTags
    }
    const store = mockStore(testState);

    return store.dispatch(actions.setTags(movie, tag, customTags)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

describe('setTags', () => {
  it('creates ERROR_INVALID_TAG when selecting an invalid custom tag', () => {
    const movie = testState.myMovies[0];
    const tag = Tag.WATCHED;
    const customTags = [''];
    const expectedAction = {
      type: ERROR_INVALID_TAG,
      msg: 'One of the tags selected is invalid. Please refresh the page and try again.'
    }
    const store = mockStore(testState);

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
    const store = mockStore(testState);

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
    const store = mockStore(testState);

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
    const store = mockStore(testState);

    return store.dispatch(actions.deleteTag(tag)).then(() => {
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