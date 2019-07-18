import { discoverReducer } from './reducers';
import { testState } from '../index';

import {
  SET_GENRES,
  NAV_TO_PAGE,
  DiscoverActionTypes,
  UPDATE_MOVIES
} from './types';
import { CardActions } from '@material-ui/core';

const { discover } = testState;

describe('discoverReducer', () => {
  // it('returns the initial state', () => {
  //   expect(discoverReducer(discover, {})).toEqual(discover);
  // })

  it('sets genres', () => {
    const action: DiscoverActionTypes = {
      type: SET_GENRES,
      genres: [878, 9648]
    }
    const expectedState = {
      ...discover,
      genres: action.genres
    }
    
    expect(discoverReducer(discover, action)).toEqual(expectedState);
  });
  
  it('sets page', () => {
    const action: DiscoverActionTypes = {
      type: NAV_TO_PAGE,
      page: 2
    }
    const expectedState = {
      ...discover,
      page: 2
    }
    
    expect(discoverReducer(discover, action)).toEqual(expectedState);
  });
  
  it('updates movies', () => {
    const action: DiscoverActionTypes = {
      type: UPDATE_MOVIES,
      page: 3,
      totalPages: 5,
      movies:[{"id":180,"title":"Minority Report","image":"/bwC6eydgNpGIaLGosyhw0DUBmgb.jpg","releaseDate":"2002-06-20"},{"id":2675,"title":"Signs","image":"/kormVYncbZMrToXaOV58o74LNIz.jpg","releaseDate":"2002-08-02"}]
    }
    const expectedState = {
      ...discover,
      page: 3,
      totalPages: 5,
      movies: action.movies
    }
    
    expect(discoverReducer(discover, action)).toEqual(expectedState);
  });

  
});
  
