import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import styles from './web.less';

const StudioWeb= () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.letter}>
          <div>Doraemon&apos;s pocket</div>
          <div>The best partner of web3</div>
          <div>game developers</div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default StudioWeb;
