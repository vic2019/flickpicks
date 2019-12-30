import { useEffect } from 'react';
import { withRouter } from 'react-router';

interface Props {
  children?: any
}

const ScrollToTop = ({ children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return children;
};

export default withRouter(ScrollToTop);