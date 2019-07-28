import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { HIDE_ERROR } from '../store/app-level/types';

interface Props {
  error: boolean
  errorMsg: string
  hide: any
}

const Notification = ({
  error, errorMsg, hide
}: Props) => {
  const handleClose = () => hide();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={error}
      autoHideDuration={5000}
      onClose={handleClose}
      message={<span className='notification-text'>{errorMsg}</span>}
      action={
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
          size='small'
        >
          <CloseIcon />
        </IconButton>
      }
    />
  )
};

export default connect(
  (state: AppState) => ({ 
    error: state.appLevel.error,
    errorMsg: state.appLevel.errorMsg
  }),
  dispatch => ({
    hide: () => dispatch({
      type: HIDE_ERROR
    })
  })
)(Notification);