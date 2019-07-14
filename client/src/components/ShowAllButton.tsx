import React from 'react';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';

import { showAll } from '../store/my-movies/actions'

interface Props {
  showAll: any
}

const ShowAllButton = ({
  showAll,
}: Props)  => {
  return (
    <span onClick={showAll}>Show All</span>
  );
}

export default connect(
  () => {},
  { showAll }
)(ShowAllButton);