import React, { memo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { setTags } from '../store/my-movies/actions';
import { Movie, ByTag } from '../store/my-movies/types'


export enum Side {
  Top = 'top',
  Bottom = 'bottom'
}

interface Props {
  byTag: ByTag
  setTags: any
  side: Side
  id?: Movie['id']
}

const TagSelector = memo(({
  byTag,
  setTags,
  side,
  id
}: Props) => {
  const [ visible, set ] = useState(false);

  const options = Object.keys(byTag).map(tagName => (
    <div >
      <input type='checkbox' value={tagName} />
      {tagName}
    </div>  
  ));

  const toggle = (isVisible: boolean) => () => void set(isVisible);
  
  return(
    <div className='TagSelector'>
      <Button 
        className='tag-selector-toggle'
        size='small'
        color='primary'
        variant='outlined'
        onClick={toggle(true)}
      >
        Edit Tags
      </Button>
      <Drawer 
        className='tag-selector-dropdown' 
        anchor={side} 
        open={visible} 
        onClose={toggle(false)}
      >
        {options}
        <Button className='tag-selector-save-button'> Save {id} </Button>
      </Drawer>
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