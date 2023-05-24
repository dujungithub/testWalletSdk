import React from 'react';
import BaseLayout from '@/components/BaseLayout/web';
import { history } from 'umi';
import styles from './web.less';
import footLogo from '@/assets/images/developer/foot_logo.svg';

const NoMatchWeb = () => {

    const goHome = () => {
        history.push('/home');
    };

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.noMatch}>404</div>
          <div className={styles.title}>Not found</div>
          <div className={styles.desc}>The requested URL  was not found on this server.</div>
          <div className={styles.btn} onClick={goHome}>Back Homepage</div>
        </div>
        <div className={styles.footer}>
            <img src={footLogo} alt='footLogo'/>
            <p>© 2023 Cubic . All rights reserved.</p>
        </div>
      </div>
    </BaseLayout>
  );
};

export default NoMatchWeb;
