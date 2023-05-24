import React from "react";
import { useModel } from 'umi';
import { Modal } from 'antd';
import styles from './index.less';

const LoginModal = ()=>{
    const {showLoginModal,setShowLoginModal,setShowEmailModal } = useModel('common');
    const {setIsShowWallet} = useModel('wallet');
    return (
        <Modal 
            title={
                <div className={styles.headTitle}>
                    <p className={styles.title}>Log In</p>
                    <p className={styles.subTitle}>Connect your account now and start exploring. </p>
                </div>
            }
            centered
            destroyOnClose
            width={420}
            open={showLoginModal}
            footer={null}
            className={styles.loginModal}
            onCancel={()=>{
                setShowLoginModal(false);
            }}
        >
            <div className={styles.walletImg} onClick={()=>{
                setShowLoginModal(false);
                setIsShowWallet(true);
            }}>
                <p>Wallet</p>
                <p>Choose from your installed wallets.</p>
            </div>
            <div className={`${styles.walletImg} ${styles.emailImg}`} onClick={()=>{
                setShowLoginModal(false);
                setShowEmailModal(true);
            }}>
                <p>E-mail</p>
                <p>Sign in with your Email.</p>
            </div>
        </Modal>
    )
}

export default LoginModal;