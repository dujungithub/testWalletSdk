import React from 'react';
import { useModel } from 'umi';
import WebHome from './web';
import MobileHome from './mobile';

const Home = () => {
  const { isMobile } = useModel('app');
  return (
    isMobile ? <MobileHome />
    : <WebHome />
  );
};

export default Home;
