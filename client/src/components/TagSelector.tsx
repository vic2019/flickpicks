import React from 'react';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags } from '../store/my-movies/actions';
import { Movie, ByTag } from '../store/my-movies/types'

interface Props {
  movie: Movie
  byTag: ByTag
  setTags: any
}

const TagSelector = ({
  movie,
  byTag,
  setTags
}: Props) => {
  return(
    <div className='TagSelector'>
      {Object.keys(byTag).map(tag => (
        <span>{tag + ' '}</span>
      ))}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag,
});

export default connect(
  mapStateToProps,
  { setTags }
)(TagSelector);