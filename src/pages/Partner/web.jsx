import BaseLayout from '@/components/BaseLayout';
import React, { useState } from 'react';
import styles from './web.less';

const PartnerWeb = () => {
  const [iconlist] = useState(['upstairs', 'virtuos', 'bnbchain', 'meson']);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.title}>Partner</div>
        <div className={styles.iconlist}>
          {iconlist?.map((item, index) => (
            <img key={index} src={require(`@/assets/images/partner/${item}.svg`)} alt="icon" />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default PartnerWeb;
