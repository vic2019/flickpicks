import React, { useState } from 'react';
import { Input, Snackbar, SnackbarContent } from '@material-ui/core';
import Error from '@material-ui/icons/Error';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { createTag } from '../store/my-movies/actions';
import { ByTag } from '../store/my-movies/types';


interface Props {
  createTag: any
  byTag: ByTag
}

const CreateCustomTag = ({
  createTag,
  byTag
}: Props) => {
  const [textField, setTextField] = useState('');
  const [duplicateError, setDuplicateError] = useState(false);

  const closeDuplicateError = () => setDuplicateError(false);

  const handleChange = (e: any) => {
    setTextField(e.target.value);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const newTag = textField;

    for (let tag of Object.keys(byTag)) {
      if (tag === newTag) {
        setDuplicateError(true);
        return;
      }    
    }

    await createTag(newTag);
    setTextField('');
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
          value={textField}
          onChange={handleChange}
        />
      </form>
      <Snackbar
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
              <span>{`Error: The tag "${textField}" already exists.`}</span>
            </span>
          }
        />
      </Snackbar>
    </>
  )
};

const mapStateToProps = (state: AppState) => ({
  byTag: state.myMovies.byTag
});

export default connect(
  mapStateToProps,
  { createTag }
)(CreateCustomTag);