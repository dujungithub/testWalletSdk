import React from 'react';
import { useModel } from 'umi';
import WebRoadmap from './web';
import MobileRoadmap from './mobile';

const Roadmap = () => {
  const { isMobile } = useModel('app');
  return (
    isMobile ? <MobileRoadmap />
    : <WebRoadmap />
  );
};

export default Roadmap;
