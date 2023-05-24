import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import MobileBg from '@/assets/images/studio/studioMobile.svg';
import styles from './mobile.less';

const StudioMobile= () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.bgImg}>
            <img src={MobileBg} alt='bgImg'/>
        </div>
        <div className={styles.main}>
          <div className={styles.letter}>
            <div>Doraemon&apos;s pocket</div>
            <div>The best partner of web3</div>
            <div>game developers</div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default StudioMobile;
