import React from 'react';
import { useModel } from 'umi';
import WebDeveloper from './web';
import MobileDeveloper from './mobile';
import BaseLayout from '@/components/BaseLayout';
import {
  WalletProvider,
} from '@suiet/wallet-kit';

const Home = () => {
  const { isMobile } = useModel('app');
  return (
    <BaseLayout>
      {
          isMobile ? <MobileDeveloper />
          : <WebDeveloper />
      }
    </BaseLayout>
  );
};

export default Home;
