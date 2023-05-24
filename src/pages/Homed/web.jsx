import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import styles from './web.less';

const HomeWeb = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.letter}>
          <div>Accelerating players into</div>
          <div>
            the <span>decentralized era</span> of gaming
          </div>
          <div className={styles.btn}>Learn More</div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomeWeb;