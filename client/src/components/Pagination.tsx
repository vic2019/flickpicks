import React from 'react';
import { Link } from 'react-router-dom';
import { updateDiscover } from '../store/discover/actions';
import { updateSearch } from '../store/search/actions';

interface Props {
  pathname: string
  page: number
  totalPages: number
  navToPage: typeof updateDiscover | typeof updateSearch
}

interface Page {
  num: number
  elem: JSX.Element
}

const Pagination = ({ pathname, page, totalPages, navToPage }: Props) => {
  if (totalPages === -1) return null;

  const largest = totalPages <= 1000? totalPages: 1000;

  const firstPage = (
    <Link 
      to={`${pathname}/1`}
      onClick={() => navToPage({ page: 1 })}
      className={page === 1? 'current-page-number': 'page-number'}
    >1</Link>
  );
  
  const lastPage = (
    <Link 
      to={`${pathname}/${largest}`}
      onClick={() => navToPage({ page: largest })}
      className={page === largest? 'current-page-number': 'page-number'}
    >
      {largest}
    </Link>
  );
  
  const pages: Page[] = [];
  for (let pg = page - 2; pg <= page + 2; pg++) {
    pages.push({
      num: pg,
      elem: (
        <Link 
          to={`${pathname}/${pg}`}
          onClick={() => navToPage({ page: pg })}
          className={pg === page? 'current-page-number': 'page-number'}
        >{pg}</Link>
      )
    })
  }

  return (
    <div className='Pagination'>
      {firstPage}
      {pages.filter(({ num, elem }) => num >= 2 && num < largest)
        .map(({ num, elem }, index, { length }) => {
          if (index === 0 && num > 2) {
            return <span key={num}><span>...</span>{elem}</span>;
          } else if (index === length - 1 && num < largest - 1) {
            return <span key={num}>{elem}<span>...</span></span>;
          } else {
            return <span key={num}>{elem}</span>;
          }
        }
      )}
      {largest === 1? null: lastPage}
    </div>
  )
};

export default Pagination;