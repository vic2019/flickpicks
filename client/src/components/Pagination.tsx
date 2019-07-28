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

  const firstPage = (
    <Link to={`${pathname}/page1`}>
    <span
      onClick={() => navToPage({ page: 1 })}
      className={page === 1? 'current-page-number': 'page-number'}
    >1</span>
    </Link>
  );
  
  const lastPage = (
    <Link to={`${pathname}/page${totalPages}`}>
    <span
      onClick={() => navToPage({ page: totalPages })}
      className={page === totalPages? 'current-page-number': 'page-number'}
    >{totalPages}</span>
    </Link>
  );
  
  const pages: Page[] = [];
  for (let pg = page - 2; pg <= page + 2; pg++) {
    pages.push({
      num: pg,
      elem:  <Link to={`${pathname}/page${pg}`}><span
        onClick={() => navToPage({ page: pg })}
        className={pg === page? 'current-page-number': 'page-number'}
      >{pg}</span></Link>
    })
  }

  return (
    <div className='Pagination'>
      {firstPage}
      {pages.filter(({ num, elem }) => num > 1 && num < totalPages)
        .map(({ num, elem }, index, { length }) => {
          if (index === 0 && num > 2) {
            return <><span>...</span>{elem}</>;
          } else if (index === length - 1 && num < totalPages - 1) {
            return <>{elem}<span>...</span></>;
          } else {
            return elem;
          }
        }
      )}
      {totalPages === 1? null: lastPage}
    </div>
  )
};

export default Pagination;