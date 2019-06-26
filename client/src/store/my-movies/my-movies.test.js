import { rootReducer } from '../index';
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

describe('rootReducer', () => {
  it('returns the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(testState);
  })

  it('handels SET_TAGS', () => {
    const movie = myMovies.abc0;
    const { id, tMDb_id, title, image, dateAdded } = movie;
    const action = {
      type: SET_TAGS,
      movie,
      tag: Tag.WATCHED,
      customTags: ['comedy']
    }
    const expectedState = {
      filter,
      myMovies: Object.assign({}, myMovies, {
        abc0: {
          tag: Tag.WATCHED,
          customTags: ['comedy'],
          id, tMDb_id, title, image, dateAdded
        }
      })
    };
    
    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handles DELETE_MOVIE', () => {
    const action = {
      type: DELETE_MOVIE,
      movie: testState.myMovies.abc0
    };
    const expectedState = {
      filter,
      myMovies: Object.assign({}, myMovies)
    }

    delete expectedState.myMovies.abc0; 
    // ^Note to self: Object.assign only copies at one level deep. If the value of a property on the source is an object, that object will NOT be deep-copied.

    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels SET_FILTER', () => {
    const action ={
      type: SET_FILTER,
      filter: [Tag.TO_WATCH, 'comedy']
    };
    const expectedState = {
      filter: {
        appliedFilter: [Tag.TO_WATCH, 'comedy'],
        filterSet: filter.filterSet
      },
      myMovies
    };

    expect(rootReducer(testState, action)).toEqual(expectedState);
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

    expect(rootReducer(testState, action)).toEqual(expectedState);
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
    }

    expect(rootReducer(testState, action)).toEqual(expectedState);
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

    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels ERROR_INVALID_TAG', () => {
    const action ={
      type: ERROR_INVALID_TAG,
      msg: 'meh'
    };
    const expectedState = testState;
    
    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
});
  
