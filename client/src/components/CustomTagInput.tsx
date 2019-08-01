import React, { useState } from 'react';
import { Input } from '@material-ui/core';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { createTag } from '../store/my-movies/actions';
import { ByTag } from '../store/my-movies/types';
import { showError as showMessage } from '../store/app-level/actions';

interface Props {
  createTag: any
  byTag: ByTag
  showMessage: any
}

const CustomTagInput = ({
  createTag,
  byTag,
  showMessage,
}: Props) => {
  const [text, setText] = useState('');

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const submit = (e: any) => {
    e.preventDefault();

    for (let tag of Object.keys(byTag)) {
      if (text === tag) {
        showMessage(`The tag "${text}" already exists.`);
        return;
      }    
    }

    createTag(text);
    showMessage(`Created tag "${text}"`);
    setText('');
  }
  
  return(
    <>
      <form 
        className='create-custom-tag-textfield'
        onSubmit={submit}
      >
        <Input
          placeholder="Add a custom tag"
          margin='none'
          disableUnderline
          value={text}
          onChange={handleChange}
        />
      </form>
    </>
  )
};

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag
});

export default connect(
  mapStateToProps,
  { createTag, showMessage }
)(CustomTagInput);