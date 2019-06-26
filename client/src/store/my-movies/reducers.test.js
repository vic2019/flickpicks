import { myMoviesReducer, filterReducer } from './reducers';
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

const { filter, myMovies } = testState;


describe('myMoviesReducer', () => {
  it('returns the initial state', () => {
    expect(myMoviesReducer(undefined, {})).toEqual(myMovies);
  })

  it('handels SET_TAGS', () => {
    const movie = testState.myMovies.abc0;
    const action = {
      type: SET_TAGS,
      movie,
      tag: Tag.WATCHED,
      customTags: ['comedy']
    };
    const { id, tMDb_id, title, image, dateAdded } = movie;
    const expectedState = Object.assign({}, myMovies, {
      abc0: {
        tag: action.tag,
        customTags: action.customTags,
        id, tMDb_id, title, image, dateAdded
      }
    });

    expect(myMoviesReducer(myMovies, action)).toEqual(expectedState);
  });

  it('handles DELETE_MOVIE', () => {
    const action = {
      type: DELETE_MOVIE,
      movie: myMovies.abc0
    };
    const expectedState = Object.assign({}, myMovies);
    delete expectedState[action.movie.id];

    expect(myMoviesReducer(myMovies, action)).toEqual(expectedState);
  });

  it('handels ERROR_INVALID_TAG', () => {
    const action ={
      type: ERROR_INVALID_TAG,
      msg: ''
    };
    const expectedState = myMovies;
    
    expect(myMoviesReducer(myMovies, action)).toEqual(expectedState);
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
      filterSet: [Tag.TO_WATCH, Tag.WATCHED]
    };

    expect(filterReducer(filter, action)).toEqual(expectedState);
  });
});