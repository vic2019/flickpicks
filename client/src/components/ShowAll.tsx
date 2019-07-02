import React from 'react';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';

import { setFilterToAll } from '../store/my-movies/actions'

interface Props {
  setFilterToAll: any
}

const ShowAll = ({
  setFilterToAll,
}: Props)  => {
  return (
    <Button onClick={setFilterToAll}>Show All</Button>
  );
}

export default connect(
  () => {},
  { setFilterToAll }
)(ShowAll);