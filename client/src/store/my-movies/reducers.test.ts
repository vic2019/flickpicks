import { rootReducer } from '../index';
import { testState } from './reducers';
import {
  SET_TAGS,
  CREATE_TAG, 
  DELETE_TAG, 
  ERROR_INVALID_TAG,
  SET_FILTER, 
  DELETE_MOVIE,
  // UNDO_DELETE,
  // ERROR_UNDO_DELETE,
  // ERROR_NETWORK,
  SET_FILTER_TO_ALL
} from './types';

const { myMovies } = testState;

describe('rootReducer', () => {
  it('returns the initial state', () => {
    expect(rootReducer(undefined, { type: undefined })).toEqual(testState);
  })

  it('handels SET_TAGS', () => {
    const movie = myMovies.byId.id0;
    const tagSetter = { 
      'To-Watch': false, 
      'Watched': true,
      classic: false,
      'rom com': true
    }
    const action = {
      type: SET_TAGS,
      movie,
      tagSetter
    }
    const expectedState = {
      myMovies: Object.assign({}, myMovies, {
        byTag: {
          'To-Watch': { 'id0': false, 'id1': true, 'id2': true },
          'Watched': { 'id0': true, 'id1': false, 'id2': false },
          classic: { 'id0': false, 'id1': true, 'id2': false },
          'rom com': { 'id0': true, 'id1': false, 'id2': false }
        }
      })
    };
    
    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handles DELETE_MOVIE', () => {
    const { byId, allIds } = myMovies;
    const action = {
      type: DELETE_MOVIE,
      movie: myMovies.byId.id0
    };
    const newById = Object.assign({}, byId);
    delete newById.id0;
    
    const newAllIds = allIds.slice(1, allIds.length);

    const expectedState = {
      myMovies: Object.assign({}, myMovies, { 
        byId: newById,
        allIds: newAllIds
      })
    }

    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels SET_FILTER', () => {
    const action = {
      type: SET_FILTER,
      filters: {
        'To-Watch': false,
        'Watched': false,
        classic: true,
        'rom com': true
      }
    }
    const expectedState = {
      myMovies: Object.assign({}, myMovies, {
        filters: action.filters
      })
    };

    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels SET_FILTER_TO_ALL', () => {
    const action ={
      type: SET_FILTER_TO_ALL
    };
    const filters = {
      'To-Watch': true,
      'Watched': true,
      classic: true,
      'rom com': true
    };
    const expectedState = {
      myMovies: Object.assign({}, myMovies, {
        filters
      })
    };

    expect(rootReducer(testState, action)).toEqual(expectedState);
  });

  it('handels CREATE_TAG', () => {
    const action ={
      type: CREATE_TAG,
      tag: 'sci-fi'
    };
    const expectedState = {
      myMovies: Object.assign({}, myMovies, { 
        byTag: {
          'To-Watch': { 'id0': false, 'id1': true, 'id2': true },
          'Watched': { 'id0': true, 'id1': false, 'id2': false },
          classic: { 'id0': true, 'id1': true, 'id2': false },
          'rom com': { 'id0': false, 'id1': false, 'id2': false },
          'sci-fi': {}
        }
      })
    }

    expect(rootReducer(testState, action)).toEqual(expectedState);
  });

  it('handels DELETE_TAG', () => {
    const action ={
      type: DELETE_TAG,
      tag: 'rom com'
    };
    const expectedState = {
      myMovies: Object.assign({}, myMovies, { 
        byTag: {
          'To-Watch': { 'id0': false, 'id1': true, 'id2': true },
          'Watched': { 'id0': true, 'id1': false, 'id2': false },
          classic: { 'id0': true, 'id1': true, 'id2': false }
        }
      })
    }

    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels ERROR_INVALID_TAG', () => {
    const action ={
      type: ERROR_INVALID_TAG,
      msg: ''
    };
    const expectedState = testState;
    
    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
});
  
