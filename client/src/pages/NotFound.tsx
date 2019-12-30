import React from 'react';

export default function NotFound() {
  const style = { fontSize: '18px', margin: '10px' }

  return (
    <div className='NotFound'>
      <p style={style}>
        This page does not exist..
        <span role='img' aria-label='sad face'>😞</span>
      </p>
    </div>
  );
};