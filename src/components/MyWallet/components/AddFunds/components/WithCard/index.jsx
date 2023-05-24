import alchemySvg from '@/assets/images/developer/alchemy.svg';
import opencSvg from '@/assets/images/developer/openc.svg';
import cpaySvg from '@/assets/images/developer/cpay.svg';
import payComing from '@/assets/images/common/pay_coming.svg';
import React from "react";
import { Row, Col } from 'antd';
import styles from './index.less';

const WithCard =()=>{
    return (
        <div className={styles.cBox}>
            <img src={payComing} alt='payComing'/>
            <div className={styles.letter}>Coming soon</div>
              {/* <Row>
              <Col span={24}>
                <div className={styles.button}>
                  <img src={alchemySvg} alt="alchemy" />
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.button}>
                  <img src={opencSvg} alt="openC" />
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.button}>
                  <img src={cpaySvg} alt="cPay" />
                </div>
              </Col>
              <Col span={24}>
                <div onClick={() => {}} className={styles.policy}>
                  <div>
                     · By Adding funds with Credit Card, you agree to our<a> Terms of Service </a>and our
                    <a> Privacy Policy</a>
                  </div>
                  <div>
                     · For more information, please refer to FAQs - [Adding funds using Credit Card]
                  </div>
                </div>
              </Col>
            </Row> */}
        </div>
    )
}

export default WithCard;