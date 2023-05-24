import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import footLogo from '@/assets/images/developer/foot_logo.svg';
import styles from './mobile.less';

const DeveloperMobile = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.bgTop}/>
        <div className={styles.bgBottom}/>
        <div className={styles.letter}>
           <div className={styles.desc}>Coming soon...</div>
        </div>
        <div className={styles.footer}>
            <img src={footLogo} alt='footLogo'/>
            <p>© 2023 Cubic . All rights reserved.</p>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DeveloperMobile;