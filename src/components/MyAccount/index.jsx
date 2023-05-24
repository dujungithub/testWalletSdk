import { Drawer } from 'antd';
import { useModel, history } from 'umi';
import React, { useEffect } from 'react';
import FundsInfo from './FundsInfo';
import styles from './index.less';

const MyAccount =()=>{
    const { showUserAccount, changeMyaccountStatus } = useModel('wallet');
    return (
        <Drawer
            className={styles.walletModal}
            placement="right"
            height='auto'
            width={400}
            open={showUserAccount}
            onClose={() => {changeMyaccountStatus(false)}}
            closable={false}
            zIndex={1000}
        >
            <FundsInfo />
        </Drawer>
    )
}

export default MyAccount;