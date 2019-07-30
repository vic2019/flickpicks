import { useEffect } from 'react';
import { withRouter } from 'react-router';

interface Props {
  children?: any
  location: {
    pathname: string
  }
}

const ScrollToTop = ({ children, location: { pathname } }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default withRouter(ScrollToTop);