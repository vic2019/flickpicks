import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';


const sortOptions = {
  'popularity.asc': 'Popularity Ascending',
  'popularity.desc': 'Popularity Descending',
  'release_date.asc': 'Release Date Ascending',
  'release_date.des': 'Release Date Descending',
  'original_title.asc': 'Original Title Ascending',
  'original_title.des': 'Original Title Descending',
};


const DiscoverInput = () => {
  const [values, set] = useState({
    genres: [], year: '', sortBy: 'popularity.desc'
  });
  const currentYear = new Date().getFullYear();

  const handleChange = (
    e: React.ChangeEvent<{name?: string; value: unknown}>
  ) => {
    set(oldValues => ({
      ...oldValues,
      [e.target.name as string]: e.target.value
    }))
  };

  return (
    <div className='DiscoverInput'>
      <FormControl fullWidth margin='dense'>
        <InputLabel>Genres</InputLabel>
        <Select
          value={values.genres}
          onChange={handleChange}
          inputProps={{ name: 'genres' }}
        >
          <MenuItem value={''} key={'none'}>None</MenuItem>
          {Array(currentYear - 1989).fill(null).map((_, index) => {
            const value = String(currentYear - index);
            return (<MenuItem value={value} key={value}>{value}</MenuItem>);
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth margin='dense'>
        <InputLabel>Year</InputLabel>
        <Select
          value={values.year}
          onChange={handleChange}
          inputProps={{ name: 'year' }}
        >
          <MenuItem value={''} key={'none'}>None</MenuItem>
          {Array(currentYear - 1989).fill(null).map((_, index) => {
            const value = String(currentYear - index);
            return (<MenuItem value={value} key={value}>{value}</MenuItem>);
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth margin='dense'>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={values.sortBy}
          onChange={handleChange}
          inputProps={{ name: 'sortBy' }}
        >
          {Object.entries(sortOptions).map(([key, value]) => (
            <MenuItem value={key} key={key}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
};

export default DiscoverInput;