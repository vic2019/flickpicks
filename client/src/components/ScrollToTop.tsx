import React, { useEffect } from 'react';

const ScrollToTop = (props: any, page: number) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  },[window.location.pathname, window.location.search]); 

  return props.children;
};

export default ScrollToTop;