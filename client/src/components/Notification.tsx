import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { hideError } from '../store/app-level/actions';

interface Props {
  error: boolean
  errorMsg: string
  hideError: any
}

const Notification = ({
  error, errorMsg, hideError
}: Props) => {
  const handleClose = () => hideError();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={error}
      autoHideDuration={3000}
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
          <CloseIcon fontSize='small' />
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
  { hideError }
)(Notification);