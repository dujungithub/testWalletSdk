import React from "react";
import {useModel } from 'umi';
import styles from './index.less';
import {handleAddressShow} from '@/utils/utils';

const WithCrypto =()=>{
    const { getCurrentUserInfo } = useModel('account');
    return (
        <div className={styles.cryto}>
            <div className={styles.address}>
                <span>Address</span>
                <span>{handleAddressShow(getCurrentUserInfo()?.address)}</span>
            </div>
            <p>Users can transfer stablecoins from any chain to Cubic on Sui, powered by meson.</p>
            <a className={styles.mesonBtn} href='https://demo.meson.to/cubic' target='_blank' rel="noreferrer">Transfer Stablecoin to Sui</a>
        </div>
    )
}

export default WithCrypto;