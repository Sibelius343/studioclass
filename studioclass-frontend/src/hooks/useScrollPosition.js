import { useRef, useEffect } from 'react';

const useScrollPosition = () => {
  const scrollPosition = useRef();

  const scrollListener = () => {
    console.log(scrollPosition.current);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return scrollPosition.current;
}

export default useScrollPosition;