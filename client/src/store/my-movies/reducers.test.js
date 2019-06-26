import { myMoviesReducer } from './reducers';
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
    expect(myMoviesReducer(testState, {})).toEqual(testState);
  })

  it('handels SET_TAGS', () => {
    const action ={
      type: SET_TAGS,
      movie: testState.myMovies.abc0,
      tag: Tag.WATCHED,
      customTags: ['comedy']
    };
    const { id, tMDb_id, title, image, dateAdded } = action.movie;
    const expectedState = {
      filter,
      myMovies: Object.assign({}, myMovies, {
        abc0: {
          tag: action.tag,
          customTags: action.customTags,
          id, tMDb_id, title, image, dateAdded
        }
      })
    };

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels SET_FILTER', () => {
    const action ={
      type: SET_FILTER,
      filter: [Tag.TO_WATCH, 'comedy']
    };
    const expectedState = {
      filter: {
        appliedFilter: action.filter,
        filterSet: filter.filterSet
      },
      myMovies
    };

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels SET_FILTER_TO_ALL', () => {
    const action ={
      type: SET_FILTER_TO_ALL
    };
    const expectedState = {
      filter: {
        appliedFilter: filter.filterSet,
        filterSet: filter.filterSet
      },
      myMovies
    };

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });

  it('handels CREATE_TAG', () => {
    const action ={
      type: CREATE_TAG,
      tag: 'sci-fi'
    };
    const expectedState = {
      filter: {
        appliedFilter: filter.appliedFilter,
        filterSet: [...filter.filterSet, action.tag]
      },
      myMovies
    };

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels DELETE_TAG', () => {
    const action ={
      type: DELETE_TAG,
      tag: 'comedy'
    };
    const expectedState = {
      filter: {
        appliedFilter: filter.appliedFilter,
        filterSet: [Tag.TO_WATCH, Tag.WATCHED]
      },
      myMovies
    };

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });

  it('handles DELETE_MOVIE', () => {
    const action = {
      type: DELETE_MOVIE,
      movie: testState.myMovies.abc0
    };
    const updatedMyMovies = Object.assign({}, myMovies);
    delete updatedMyMovies[action.movie.id];
    const expectedState = {
      filter,
      myMovies: updatedMyMovies
    };

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });

  it('handels ERROR_INVALID_TAG', () => {
    const action ={
      type: ERROR_INVALID_TAG,
      msg: ''
    };
    const expectedState = testState;

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });
});