import { Button } from 'antd';
import { useModel } from 'umi';
import React from 'react';
import _ from 'lodash';
import receiveSvg from '@/assets/images/common/receive.svg';
import closeSvg from '@/assets/images/common/closed.svg';
import styles from './index.less';

const FundsInfo =()=>{
    const {
        changeWalletTitle,
        changeWalletWidth,
        changeWalletStatus,
        changeMyaccountStatus
      } = useModel('wallet');
    const handleAddFunds = () => {
        changeWalletStatus(true);
        changeWalletTitle('Add Funds');
        changeWalletWidth('640px');
    };

    return (
        <div className={styles.fundsBox}>
            <div className={styles.close}>
                <img onClick={() => {changeMyaccountStatus(false)}} src={closeSvg} alt="closeSvg" />
            </div>
            <div className={styles.optBox}>
                <Button className={styles.receive} onClick={handleAddFunds}>
                    <img src={receiveSvg} alt='receiveSvg'/>
                    Add Funds
                </Button>
            </div>
        </div>
    )
}

export default FundsInfo;