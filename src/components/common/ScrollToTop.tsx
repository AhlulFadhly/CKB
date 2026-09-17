import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component:
 * In single-page applications (SPA) using React Router, navigating to a new route
 * does not automatically reset the window/viewport scroll position.
 * This component listens for route changes (pathname & search) and scrolls
 * the window and document to the top immediately (scrollY = 0).
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Reset window scroll position
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // Reset document element & body scroll position
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, search]);

  return null;
};
