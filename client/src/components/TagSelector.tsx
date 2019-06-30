import React, { memo, useState } from 'react';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags } from '../store/my-movies/actions';
import { Movie, ByTag } from '../store/my-movies/types'

interface Props {
  movie: Movie
  byTag: ByTag
  setTags: any
}

const TagSelector = memo(({
  movie,
  byTag,
  setTags
}: Props) => {
  const [ visible, set ] = useState(false);
  const options = Object.keys(byTag).map(tagName => (
    <div >
      <input type='checkbox' value={tagName} />
      {tagName}
    </div>  
  ));

  const onClick = () => {
    set(!visible);
  };
  

  return(
    <div className='TagSelector'>
      <p 
        className='tag-selector-button'
        onClick={onClick}
      >Add Tags</p>
      {visible?
        <div className='tag-selector-dropdown'>
          {options}
          <div className='tag-selector-save-button'> Save </div>
        </div>: null
      }
    </div>
  )
});

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag,
});

export default connect(
  mapStateToProps,
  { setTags }
)(TagSelector);