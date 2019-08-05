import React from 'react';

import MyMovieItem from './MyMovieItem';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { ById, ByTag, Set } from '../store/my-movies/types';

interface Props {
  byId: ById
  byTag: ByTag
  allIds: string[]
  filters: Set
  showAll: boolean
}

const MovieList = ({
  byId,
  byTag,
  allIds,
  filters,
  showAll
}: Props)  => {
  const allMovies = Object.entries(byId).map(([id, movie]) => (
    <MyMovieItem key={id} {...movie} />
  ));

  const filteredMovies = Object.keys(
    Object.assign({}, ...Object.keys(filters).map(tag => (byTag[tag])))
  ).map(id => (<MyMovieItem key={id} {...byId[id]} />));

  return <>{showAll? allMovies: filteredMovies}</>
}

const mapStateToProps = (state: AppState) => ({
  byId: state.myMovies.byId,
  byTag: state.myMovies.byTag,
  allIds: state.myMovies.allIds,
  filters: state.myMovies.filters,
  showAll: state.myMovies.showAll
});

export default connect(
  mapStateToProps
)(MovieList);