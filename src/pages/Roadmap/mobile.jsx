import roadImg from '@/assets/images/roadmap/stage.svg';
import MobileBg from '@/assets/images/roadmap/roadmapMobile.svg';
import MobileLine from '@/assets/images/roadmap/lineMobile.svg';
import BaseLayout from '@/components/BaseLayout';
import React, { useState } from 'react';
import styles from './mobile.less';

const Roadmap = () => {
  const [mapList] = useState([
    'Account abstraction completed',
    'Game developer toolkit completed',
    'Platform launched and coin issuance completed.',
    'The first game launched',
    'Treasury opens governance and conducts external investment.',
  ]);
  return (
    <BaseLayout>
      <div className={styles.container}>
            <div className={styles.title}>Roadmap</div>
            <div className={styles.mapList}>
                 {mapList?.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <img
                            className={styles.line}
                            src={MobileLine}
                            alt="MobileLine"
                        />
                        <div className={styles.itemRight}>
                            <div className={styles.itemTop}>
                                <span>0{index + 1}</span>
                                <img className={styles.stage} src={roadImg} alt="stage" />
                            </div>
                            <div className={styles.desc}>{item}</div>
                            </div>
                        </div>
                    ))}
            </div>
      </div>
    </BaseLayout>
  );
};

export default Roadmap;
