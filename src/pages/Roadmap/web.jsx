import lineOne from '@/assets/images/roadmap/lineOne.svg';
import lineTwo from '@/assets/images/roadmap/lineTwo.svg';
import roadImg from '@/assets/images/roadmap/stage.svg';
import BaseLayout from '@/components/BaseLayout';
import React, { useState } from 'react';
import styles from './web.less';

const RoadmapWeb = () => {
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
              <div className={styles.itemTop}>
                <span>0{index + 1}</span>
                <img className={styles.stage} src={roadImg} alt="stage" />
                <div className={styles.desc}>{item}</div>
                {index < mapList?.length - 1 ? (
                  <img
                    className={styles.line}
                    src={index % 2 === 0 ? lineOne : lineTwo}
                    alt="lineOne"
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default RoadmapWeb;
