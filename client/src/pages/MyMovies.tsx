import React from 'react';
import { Helmet } from 'react-helmet';

import FilterSelector from '../components/FilterSelector';
import ShowAllButton from '../components/ShowAllButton';
import CustomTagInput from '../components/CustomTagInput';
import MyMovieList from '../components/MyMovieList';
// import LoadButton from './LoadButton';

const MyMovies = () => {
  return (
    <div className="MyMovies">
      <Helmet>
        <meta name="description" content="Movies saved by the user" />
      </Helmet>
      <div className="my-movies-toggles">
        <FilterSelector />
        <span className="breadcrumb-divider">/</span>
        <ShowAllButton />
      </div>
      <CustomTagInput />
      <MyMovieList />
      {/* <LoadButton /> */}
    </div>
  );
};

export default MyMovies;