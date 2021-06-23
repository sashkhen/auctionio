import { useEffect } from 'react';
import debounce from 'lodash.debounce';

export default function useResize(handler) {
  useEffect(() => {
    const handleResize = debounce(() => {
      const isMobile = window.innerWidth <= 768;
      handler(isMobile);
    });

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handler]);
}
