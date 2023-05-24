import React from 'react';
import { useModel } from 'umi';
import WebNoMatch from './web';
import MobileNoMatch from './mobile';

const NoMatch = () => {
  const { isMobile } = useModel('app');
  return (
    isMobile ? <MobileNoMatch />
    : <WebNoMatch />
  );
};

export default NoMatch;
