import React from 'react';
import { useModel } from 'umi';
import WebPartner from './web';
import MobilePartner from './mobile';

const Partner = () => {
  const { isMobile } = useModel('app');
  return (
    isMobile ? <MobilePartner />
    : <WebPartner />
  );
};

export default Partner;
