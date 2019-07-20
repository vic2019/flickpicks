import React from 'react';
import { Button, Checkbox, Input, InputLabel, ListItemIcon, Select, MenuItem, FormControl } from '@material-ui/core';

import { connect } from 'react-redux';
import { AppState } from '../store';

import { updateDiscover } from '../store/discover/actions';
import { Genre } from '../store/discover/types';


interface Props {
  genres: number[]
  allGenres: Genre[]
  year: number | undefined
  allYears: number[]
  sortBy: string
  sortOptions: string[]
  updateDiscover: any
}

const SortOptions: { [key: string]: string } = {
  'popularity.asc': 'Popularity Ascending',
  'popularity.desc': 'Popularity Descending',
  'release_date.asc': 'Release Date Ascending',
  'release_date.des': 'Release Date Descending',
  'original_title.asc': 'Title Ascending',
  'original_title.des': 'Title Descending',
};

const DiscoverInput = ({
  genres,
  allGenres,
  year,
  allYears,
  sortBy,
  sortOptions,
  updateDiscover
}: Props) => {

  return (
    <div className='DiscoverInput'>
      <FormControl fullWidth margin='dense'>
        <InputLabel>Genres</InputLabel>
        <Select
          multiple
          value={genres}
          onChange={e => {
            const value = e.target.value as number[];
            if (value.indexOf(-1) !== -1) {
              updateDiscover({ genres: [] });
            } else {
              updateDiscover({ genres: value });
            }
          }}
          input={<Input />}
          renderValue={ids => (ids as number[]).map(id => {
              for (let genre of allGenres) {
                if (genre.id === id) return genre.name;
              }
              return '';
            }).join(', ')
          }
        >
          <MenuItem value={-1} key={-1}>
            <Button fullWidth disableRipple size='large' variant='text'>
              Clear All
            </Button>
          </MenuItem>
          {allGenres.map(genre => (
            <MenuItem value={genre.id} key={genre.id}>
              <ListItemIcon>             
                <Checkbox checked={genres.indexOf(genre.id) > -1} />
              </ListItemIcon>             
             {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin='dense'>
        <InputLabel>Year</InputLabel>
        <Select
          value={year}
          onChange={e => {
            updateDiscover({ year: e.target.value });
          }}
          inputProps={{ name: 'year' }}
        >
          <MenuItem value={undefined} key={'none'}>None</MenuItem>
          {allYears.map(year => (
            <MenuItem value={year} key={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin='dense'>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={e => {
            updateDiscover({ sortBy: e.target.value });
          }}
          inputProps={{ name: 'sortBy' }}
        >
          {sortOptions.map(option => (
            <MenuItem value={option} key={option}>
              {SortOptions[option]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
};

const mapStateToProps = (state: AppState) => ({
  genres: state.discover.genres,
  allGenres: state.discover.allGenres,
  year: state.discover.year,
  allYears: state.discover.allYears,
  sortBy: state.discover.sortBy,
  sortOptions: state.discover.sortOptions,
});

export default connect(
  mapStateToProps,
  { updateDiscover }
)(DiscoverInput);