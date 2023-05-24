import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import MobileBg from '@/assets/images/home/homeMobile.svg';
import styles from './mobile.less';

const HomeMobile = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.bgImg}>
            <img src={MobileBg} alt='bgImg'/>
        </div>
        <div className={styles.main}>
            <div className={styles.letter}>
              <div>Accelerating players</div>
              <div>
              into the <span>decentralized</span>
              </div>
              <div><span>era</span> of gaming</div>
              <div className={styles.btn}>Learn More</div>
            </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomeMobile;