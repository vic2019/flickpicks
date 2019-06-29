import { movieSetReducer, filterReducer } from './reducers';
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


describe('movieSetReducer', () => {
  it('returns the initial state', () => {
    expect(movieSetReducer(undefined, {})).toEqual(movieSet);
  })

  it('handels SET_TAGS', () => {
    const movie = testState.movieSet.abc0;
    const action = {
      type: SET_TAGS,
      movie,
      tag: Tag.WATCHED,
      customTags: ['comedy']
    };
    const { id, tMDb_id, title, image, dateAdded } = movie;
    const expectedState = Object.assign({}, movieSet, {
      abc0: {
        tag: action.tag,
        customTags: action.customTags,
        id, tMDb_id, title, image, dateAdded
      }
    });

    expect(movieSetReducer(movieSet, action)).toEqual(expectedState);
  });

  it('handles DELETE_MOVIE', () => {
    const action = {
      type: DELETE_MOVIE,
      movie: movieSet.abc0
    };
    const expectedState = Object.assign({}, movieSet);
    delete expectedState[action.movie.id];
    expectedState.order = ['abc1', 'abc2'];

    expect(movieSetReducer(movieSet, action)).toEqual(expectedState);
  });

  it('handels ERROR_INVALID_TAG', () => {
    const action ={
      type: ERROR_INVALID_TAG,
      msg: ''
    };
    const expectedState = movieSet;

    expect(movieSetReducer(movieSet, action)).toEqual(expectedState);
  });
});


describe('filterReducer', () => {
  it('handels SET_FILTER', () => {
    const action ={
      type: SET_FILTER,
      filter: [Tag.TO_WATCH, 'comedy']
    };
    const expectedState = {
      appliedFilter: action.filter,
      filterSet: filter.filterSet
    };

    expect(filterReducer(filter, action)).toEqual(expectedState);
  });

  it('handels SET_FILTER_TO_ALL', () => {
    const action ={
      type: SET_FILTER_TO_ALL
    };
    const expectedState = {
      appliedFilter: filter.filterSet,
      filterSet: filter.filterSet
    };

    expect(filterReducer(filter, action)).toEqual(expectedState);
  });

  it('handels CREATE_TAG', () => {
    const action ={
      type: CREATE_TAG,
      tag: 'sci-fi'
    };
    const expectedState = {
      appliedFilter: filter.appliedFilter,
      filterSet: [...filter.filterSet, action.tag]
    };

    expect(filterReducer(filter, action)).toEqual(expectedState);
  });

  it('handels ERROR_INVALID_TAG', () => {
    const tag = 'comedy';
    const action ={
      type: ERROR_INVALID_TAG,
      msg: `The tag "${tag}" already exists.`
    };
    const expectedState = filter;

    expect(filterReducer(filter, action)).toEqual(expectedState);
  });

  it('handels DELETE_TAG', () => {
    const action ={
      type: DELETE_TAG,
      tag: 'comedy'
    };
    const expectedState = {
      appliedFilter: filter.appliedFilter,
      filterSet: [Tag.TO_WATCH, Tag.WATCHED, 'drama', 'fantasy']
    };

    expect(filterReducer(filter, action)).toEqual(expectedState);
  });
});