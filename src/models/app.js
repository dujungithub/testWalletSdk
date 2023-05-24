import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

const MOBILE_WIDTH = 750;
const useAppModel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const getWindowScreen = throttle(() => {
    const result = window.innerWidth <= MOBILE_WIDTH || /mobile/gi.test(navigator.userAgent);
    setIsMobile(result);
    localStorage.setItem('isMobile', result);
  }, 100);

  useEffect(() => {
    getWindowScreen();
    window.addEventListener('resize', getWindowScreen, false);
    return () => {
      window.removeEventListener('resize', getWindowScreen, false);
    };
  }, []);

  return { isMobile};
};

export default useAppModel;
