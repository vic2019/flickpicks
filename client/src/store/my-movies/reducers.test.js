import { myMoviesReducer } from './reducers';
import { testState } from './reducers';
import { DELETE_MOVIE } from './types';

describe('myMoviesReducer', () => {
  it('returns the initial state', () => {
    expect(myMoviesReducer(testState, {})).toEqual(testState);
  })

  it('takes movie and deletes it from myMovies', () => {
    const action = {
      type: DELETE_MOVIE,
      movie: testState.myMovies[0]
    };
    const myMovies = testState.myMovies;
    const expectedState = {
      myMovies: myMovies.slice(1, myMovies.length)
    };

    expect(myMoviesReducer(testState, action)).toEqual(expectedState);
  });
});