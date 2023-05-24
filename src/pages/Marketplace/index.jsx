import React from 'react';
import { useModel } from 'umi';
import WebMarketplace from './web';
import MobileMarketplace from './mobile';

const Marketplace = () => {
  const { isMobile } = useModel('app');
  return (
    isMobile ? <MobileMarketplace />
    : <WebMarketplace />
  );
};

export default Marketplace;
