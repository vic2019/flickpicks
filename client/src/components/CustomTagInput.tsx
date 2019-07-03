import React, { useState } from 'react';
import { Input } from '@material-ui/core';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { createTag } from '../store/my-movies/actions';
import { ByTag } from '../store/my-movies/types';


interface Props {
  createTag: any
  byTag: ByTag
}

const CustomTagInput = ({
  createTag,
  byTag
}: Props) => {
  const [text, setText] = useState('');
  // const [duplicateError, setDuplicateError] = useState(false);

  // const closeDuplicateError = () => setDuplicateError(false);

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const submit = (e: any) => {
    e.preventDefault();

    // Checking for duplicate should be done by the server
    // If duplicate, server will returns error msg and the error component will 
    // relay that msg to user through a snackbar

    for (let tag of Object.keys(byTag)) {
      if (text === tag) {
        // setDuplicateError(true);
        return;
      }    
    }

    createTag(text);
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
      {/* <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={duplicateError}
        autoHideDuration={2200}
        onClose={closeDuplicateError}
      >
        <SnackbarContent
          message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Error />
              <span>{`Error: The tag "${text}" already exists.`}</span>
            </span>
          }
        />
      </Snackbar> */}
    </>
  )
};

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag
});

export default connect(
  mapStateToProps,
  { createTag }
)(CustomTagInput);