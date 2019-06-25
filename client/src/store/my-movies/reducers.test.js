import { myMoviesReducer } from './reducers';
import { Tag, DELETE_MOVIE, SET_TAG, SET_FILTER } from './types';
import { testState } from './reducers';

const { filter, myMovies } = testState;

describe('myMoviesReducer', () => {
  it('returns the initial state', () => {
    expect(myMoviesReducer(testState, {})).toEqual(testState);
  })

  it('handels SET_TAG', () => {
    const action ={
      type: SET_TAG,
      movie: testState.myMovies[0],
      tag: Tag.WATCHED
    };
    const { movie_id, tMDb_id, title, image, dateAdded } = action.movie;
    const expectedState = {
      filter,
      myMovies: [{
        tag: action.tag,
        movie_id, tMDb_id, title, image, dateAdded
      },
      ...myMovies.slice(1, myMovies.length)
      ]
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
  
  it('handels SET_FILTER when filter is "all"', () => {
    const action ={
      type: SET_FILTER,
      filter: ['all']
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

  it('handles DELETE_MOVIE', () => {
    const action = {
      type: DELETE_MOVIE,
      movie: testState.myMovies[0]
    };
    const expectedState = {
      filter,
      myMovies: myMovies.slice(1, myMovies.length)
    };

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });
});