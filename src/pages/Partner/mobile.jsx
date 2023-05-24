import BaseLayout from '@/components/BaseLayout';
import React, { useState } from 'react';
import MobileBg from '@/assets/images/partner/partnerMobile.svg';
import styles from './mobile.less';

const PartnerMobile = () => {
  const [iconlist] = useState(['upstairsMobile', 'bnbchainMobile', 'virtuosMobile', 'mesonMobile']);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.bgImg}>
            <img src={MobileBg} alt='bgImg'/>
        </div>
        <div className={styles.main}>
            <div className={styles.title}>Partner</div>
            <div className={styles.iconlist}>
            {iconlist?.map((item, index) => (
                <div key={index} className={styles.item}>
                    <img  src={require(`@/assets/images/partner/${item}.svg`)} alt="icon" />
                </div>
            ))}
            </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default PartnerMobile;
