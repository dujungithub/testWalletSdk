import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import styles from './web.less';

const PlayerWeb = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.letter}>
          <div>Say GoodBye to Wallet</div>
          <div>Any player can freely embrace</div>
          <div>web3 games</div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default PlayerWeb;
