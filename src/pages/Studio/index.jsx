import React from 'react';
import { useModel } from 'umi';
import WebStudio from './web';
import MobileStudio from './mobile';

const Studio= () => {
  const { isMobile } = useModel('app');
  return (
    isMobile ? <MobileStudio />
    : <WebStudio />
  );
};

export default Studio;
