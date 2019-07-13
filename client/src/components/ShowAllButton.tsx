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
    <Button onClick={showAll} size='small'>Show All</Button>
  );
}

export default connect(
  () => {},
  { showAll }
)(ShowAllButton);