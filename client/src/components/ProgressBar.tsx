import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { AppState } from '../store';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#424242',
  },
});

interface Props {
  waiting: boolean
}

const ProgressBar = ({ waiting }: Props) => {
  const classes = useStyles();

  return waiting? <LinearProgress classes={classes} color='secondary' />: null;
};

export default connect(
  (state: AppState) => ({ waiting: state.appLevel.waiting })
)(ProgressBar);


