import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { updateDiscover }from './actions';
import { testState } from './reducers';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('updateDiscover', () => {
  it('', () => {
    const store = mockStore(testState);

    return store.dispatch(
      updateDiscover({ genres: [878, 9648] })
    ).then(() => {
      expect(store.getActions()[0]).toEqual({"type":"UPDATE_MOVIES","page":1,"totalPages":1,"movies":[{"id":180,"title":"Minority Report","image":"/bwC6eydgNpGIaLGosyhw0DUBmgb.jpg","releaseDate":"2002-06-20"},{"id":2675,"title":"Signs","image":"/kormVYncbZMrToXaOV58o74LNIz.jpg","releaseDate":"2002-08-02"},{"id":5137,"title":"Sky Captain and the World of Tomorrow","image":"/fMakUN0qcOZzzSTkdh6xWGimJnN.jpg","releaseDate":"2004-09-17"},{"id":10145,"title":"The Forgotten","image":"/kSQ0TGzg9pMGZMhWYQOIqW1wNqc.jpg","releaseDate":"2004-09-24"},{"id":438,"title":"Cube Zero","image":"/4rfHkswHlkEAxcEr5XtAKZnE1nJ.jpg","releaseDate":"2004-10-15"},{"id":20077,"title":"The Batman vs. Dracula","image":"/4aAlheGhU4rkDE4gSjekBnRXdGL.jpg","releaseDate":"2005-10-18"},{"id":15999,"title":"Vampire Hunter D: Bloodlust","image":"/gpSH2Mfj55EldgbfFja27ZBYZkS.jpg","releaseDate":"2000-08-25"},{"id":11099,"title":"The Final Cut","image":"/7CUPenZpmaHzSfVkgUQRXVXRLpA.jpg","releaseDate":"2004-10-15"},{"id":27653,"title":"An American Tail: The Mystery of the Night Monster","image":"/n3gyCXgWw8onehWMKW5N9C3OiGc.jpg","releaseDate":"1999-02-04"},{"id":3056,"title":"Frankenstein","image":"/jCGSQaP5Ny6EgCbt0devxd9q7DF.jpg","releaseDate":"2004-10-09"},{"id":14892,"title":"The Big Empty","image":"/t9s1dSHTRnMwXIAWCVQXSLVTcfk.jpg","releaseDate":"2003-05-16"},{"id":25530,"title":"First on the Moon","image":"/h3G2p9ZFFyZYt4s6H8ccFYsU79p.jpg","releaseDate":"2005-09-25"}]});
    });
  });
});