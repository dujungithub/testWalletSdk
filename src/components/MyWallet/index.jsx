import { Modal } from 'antd';
import { useModel } from 'umi';
import React from "react";
import AddFunds from './components/AddFunds';
import styles from './index.less';

const MyWallet =()=>{
    const {
        showWallet, 
        walletTitle, 
        changeWalletStatus,
        walletWidth
    } = useModel('wallet');
    const titleDic = {
        'Add Funds': 'Add Funds'
     };
    return (
        <Modal
            title={
            <span className={styles.title}>
                {
                titleDic[walletTitle] ? titleDic[walletTitle] : walletTitle
                }
            </span>
            }
            closeIcon={<span className={styles.close} />}
            width={walletWidth}
            footer={null}
            centered
            className={styles.walletModal}
            open={showWallet}
            destroyOnClose
            onCancel={() => changeWalletStatus(false)}
        >
            {
            ['Add Funds'].includes(walletTitle) && <AddFunds />
            }
        </Modal>
    )
}

export default MyWallet;