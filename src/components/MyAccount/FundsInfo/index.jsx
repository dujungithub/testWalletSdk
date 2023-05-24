import { Button } from 'antd';
import { useModel } from 'umi';
import React from 'react';
import _ from 'lodash';
import receiveSvg from '@/assets/images/common/receive.svg';
import closeSvg from '@/assets/images/common/closed.svg';
import userImg from '@/assets/images/common/user.png';
import waterImg from '@/assets/images/common/water.png';
import walletImg from '@/assets/images/common/wallet_bg.png';
import styles from './index.less';
import {handleAddressShow} from '@/utils/utils';
import {   
    useAccountBalance,
    formatSUI
} from '@suiet/wallet-kit';

const FundsInfo =()=>{
    const {
        changeWalletTitle,
        changeWalletWidth,
        changeWalletStatus,
        changeMyaccountStatus,
        walletCollect,
        setIsShowWallet
      } = useModel('wallet');
    const {getCurrentUserInfo}=useModel('account');
    const {setShowEmailModal } = useModel('common');
    const {balance} = useAccountBalance();

    const handleAddFunds = () => {
        changeWalletStatus(true);
        changeWalletTitle('Add Funds');
        changeWalletWidth('640px');
    };

    return (
        <div className={styles.fundsBox}>
            <div className={styles.info}>
                <div className={styles.left}>
                    <img src={userImg} alt='userImg'/>
                    <div className={styles.detailInfo}>
                        { getCurrentUserInfo()?.address && <p>{handleAddressShow(getCurrentUserInfo().address)}</p>}
                        { getCurrentUserInfo()?.email && <p>{getCurrentUserInfo()?.email}</p>}
                        { getCurrentUserInfo()?.address &&!getCurrentUserInfo()?.email &&<p className={styles.verify} onClick={()=>{
                            setShowEmailModal(true);
                        }}>Verify E-mail</p>}
                    </div>
                </div>
                <img className={styles.close} onClick={() => {changeMyaccountStatus(false)}} src={closeSvg} alt="closeSvg" />
            </div>
            {
                getCurrentUserInfo()?.address &&
                <div className={styles.optBox}>
                    <p>Total balance</p>
                    <p>{formatSUI(balance ?? 0, {withAbbr: false})} Sui</p>
                    <span className={styles.receive} onClick={handleAddFunds}>Add Funds</span>
                </div>
            }

            {
                getCurrentUserInfo()?.address &&
                <div className={styles.waterBox}>
                    <img src={waterImg} alt='waterImg'/>
                    <div className={styles.waterInfo}>
                        <p className={styles.usdInfo}>
                            <span>Sui</span>
                            <span>{formatSUI(balance ?? 0, {withAbbr: false})} Sui</span>
                        </p>
                        {/* <p className={styles.suiInfo}>
                            <span>Sui</span>
                            <span>$20.66 USD</span>
                        </p> */}
                    </div>
                </div>
            }
            {
                getCurrentUserInfo()?.email && !getCurrentUserInfo()?.address &&
                <div className={styles.walletBox}>
                    <img src={walletImg} alt='walletImg'/>
                    <Button className={styles.btn} onClick={()=>{
                        changeMyaccountStatus(false);
                        setIsShowWallet(true);
                    }}>Connect Wallet</Button>
                </div>
            }
        </div>
    )
}

export default FundsInfo;