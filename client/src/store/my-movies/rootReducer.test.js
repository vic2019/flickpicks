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
  // UNDO_DELETE,
  // ERROR_UNDO_DELETE,
  // ERROR_NETWORK,
  SET_FILTER_TO_ALL
} from './types';

const { myMovies } = testState;

describe('rootReducer', () => {
  it('returns the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(testState);
  })

  it('handels SET_TAGS', () => {
    const movie = myMovies.byId.id0;
    const tagSetter = { 
      [Tag.TO_WATCH]: false, 
      [Tag.WATCHED]: true,
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
          [Tag.TO_WATCH]: { 'id0': false, 'id1': true, 'id2': true },
          [Tag.WATCHED]: { 'id0': true, 'id1': false, 'id2': false },
          classic: { 'id0': false, 'id1': true, 'id2': false },
          'rom com': { 'id0': true, 'id1': false, 'id2': false }
        }
      })
    };
    
    expect(rootReducer(myMovies, action)).toEqual(expectedState);
  });
  
  it('handles DELETE_MOVIE', () => {
    const action = {
      type: DELETE_MOVIE,
      movie: myMovies.byId.id0
    };
    const newById = {
      id1: {
        id: 'id1',
        tMDb_id: '105',
        title: 'Back to the Future',
        image: '/pTpxQB1N0waaSc3OSn0e9oc8kx9.jpg',
        dateAdded: '2019-06-21'
      }, 
      id2: {
        id: 'id2',
        tMDb_id: '13466',
        title: 'October Sky',
        image: '/oeFdjM0P3DMIKOloApLAn96GHiM.jpg',
        dateAdded: '2019-06-22'
      }
    }
    const expectedState = {
      myMovies: Object.assign({}, myMovies, { 
        byId: newById,
        allIds: ['id2', 'id1'], 
      })
    }

    console.log(expectedState);
    expect(rootReducer(testState, action)).toEqual(expectedState);
  });
  
  it('handels SET_FILTER', () => {
    const action = {
      type: SET_FILTER,
      filters: {
        [Tag.TO_WATCH]: false,
        [Tag.WATCHED]: false,
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
      [Tag.TO_WATCH]: true,
      [Tag.WATCHED]: true,
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
          [Tag.TO_WATCH]: { 'id0': false, 'id1': true, 'id2': true },
          [Tag.WATCHED]: { 'id0': true, 'id1': false, 'id2': false },
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
          [Tag.TO_WATCH]: { 'id0': false, 'id1': true, 'id2': true },
          [Tag.WATCHED]: { 'id0': true, 'id1': false, 'id2': false },
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
  
