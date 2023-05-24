import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import MobileBg from '@/assets/images/player/playerMobile.svg';
import styles from './mobile.less';

const PlayerMobile = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.bgImg}>
            <img src={MobileBg} alt='bgImg'/>
        </div>
        <div className={styles.main}>
            <div className={styles.letter}>
            <div>Say GoodBye to Wallet</div>
            <div>Any player can freely embrace</div>
            <div>web3 games</div>
            </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default PlayerMobile;
