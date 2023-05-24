import React from 'react';
import { useModel } from 'umi';
import WebDeveloper from './web';
import MobileDeveloper from './mobile';

const Developer = () => {
  const { isMobile } = useModel('app');
  return (
    isMobile ? <MobileDeveloper />
    : <WebDeveloper />
  );
};

export default Developer;
