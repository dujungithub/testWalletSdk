import React,{useEffect} from 'react';
import styles from './index.less';
import {useModel} from 'umi';
import {Modal } from 'antd';
import * as tweetnacl from 'tweetnacl'

import {   
  useWallet,
} from '@suiet/wallet-kit';

const WalletConnect= () => {
  const {walletCollect,isShowConnectModal,setIsShowConnectModal,setWalletCollect,setIsShowWallet } = useModel('wallet');
  const wallet = useWallet();
  const {disconnect,signMessage,account} = wallet;
  const handleCancel=()=>{
    setIsShowConnectModal(false);
  }

  const disconnectHandler=()=>{
    disconnect().then(res=>{
      setIsShowConnectModal(false);
      setWalletCollect(null);
    })
  }

  const switchHandler=()=>{
    setIsShowConnectModal(false);
    setIsShowWallet(true);
  }

  const  handleSignMsg= async ()=> {
    try {
      const msg = 'Hello world!'
      const result = await signMessage({
        message: new TextEncoder().encode('Hello world')
      })
      if (!result) {
        alert('signMessage return null')
        return
      }
      console.log('send message to be signed', msg)
      const textDecoder = new TextDecoder()
      console.log('signMessage success', result)
      console.log('signMessage signature', result.signature)
      console.log('signMessage signedMessage', textDecoder.decode(result.signedMessage).toString())
      // console.log('verify via tweetnacl', tweetnacl.sign.detached.verify(
      //   result.signedMessage,
      //   result.signature,
      //   account?.publicKey,
      // ))
      setIsShowConnectModal(false);
      alert('signMessage succeeded (see response in the console)')
    } catch (e) {
      console.error('signMessage failed', e)
      alert('signMessage failed (see response in the console)')
    }
  }

  return (
    <Modal 
      title='Account' 
      open={isShowConnectModal} 
      onCancel={handleCancel}
      footer={null}
      centered
      destroyOnClose
      wrapClassName={styles.walletWrapper}
      width={420}
    >
      <div className={styles.warapper}>
        <p className={styles.title}>Connected with Suiet</p>
        <div className={styles.btn}>
          <p onClick={disconnectHandler}>Disconnect</p>
          <p onClick={switchHandler}>Switch</p>
          <p onClick={handleSignMsg}>SignMsg</p>
        </div>
      </div>
    </Modal>
  );
};

export default WalletConnect;
