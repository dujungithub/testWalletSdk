import React from 'react';
import { useModel } from 'umi';
import WebPlayer from './web';
import MobilePlayer from './mobile';

const Player = () => {
  const { isMobile } = useModel('app');
  return (
    isMobile ? <MobilePlayer />
    : <WebPlayer />
  );
};

export default Player;
