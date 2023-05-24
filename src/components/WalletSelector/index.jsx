import {
    useWallet
} from '@suiet/wallet-kit';
import React,{useEffect} from 'react';
import {useModel} from 'umi';
import {Modal } from 'antd';
import styles from './index.less';
import suiJpg from '@/assets/images/common/sui.jpg';
import closeSvg from '@/assets/images/common/close_modal.svg';

const WalletSelector=() =>{
  const {
    walletList,
    isShowWallet,
    setIsShowWallet,
    setWalletList,
    setCurrentWalletKey,
    setWalletCollect,
    setIsShowErrorNotice,
    setClickWalletKey 
  } = useModel('wallet');
  const {httpWalletInfo} = useModel('account');
  const wallet = useWallet();
  const {
    select,  // select
    configuredWallets,  // default wallets
    detectedWallets,  // Sui-standard wallets detected from browser env
    connected,
    signMessage,
  } = wallet;



  useEffect(()=>{
    setWalletList([...configuredWallets, ...detectedWallets]);
  },[])

  useEffect(() => {
    if (!connected){
        return
    }else{
        setWalletCollect(wallet);
        localStorage.setItem('walletCollects',JSON.stringify(wallet));
        handleSignMsg();
    }
  }, [connected])


  const  handleSignMsg= async ()=> {
    try {
      const msg = 'Sign in with sui to CubicGames'
      const result = await signMessage({
        message: new TextEncoder().encode('Sign in with sui to CubicGames')
      })
      if (!result) {
        // alert('signMessage return null')
        return
      }
      const params = {
        message:msg,
        signature:result.signature
      }
      if(localStorage.getItem('invite_token')){
        params.inviter = localStorage.getItem('invite_token');
      }
      // await httpWalletInfo(params);
      setIsShowWallet(false);
    } catch (e) {
      console.error('signMessage failed', e)
      // alert('signMessage failed (see response in the console)')
    }
  }

  const handleCancel=()=>{
    setIsShowWallet(false);
  }
  const clickHandler=(item,index,e)=>{
     // check if user installed the wallet
    if (!item.installed) {
        // do something like guiding users to install
        setIsShowErrorNotice(true);
        setIsShowWallet(false);
        setClickWalletKey(index);
        return;
    }
    select(item.name).then(res=>{
        setCurrentWalletKey(index);
        setIsShowWallet(false);
        localStorage.setItem('currentKey',index);
    })
}

  return (
    <Modal
        title='Connect a Wallet'
        open={isShowWallet}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnClose
        wrapClassName={styles.walletWrapper}
        width={496}
        closeIcon={<img src={closeSvg} alt='closeSvg'/>}
    >
        {walletList?.map((item,index)=>(
                <div
                    key={item.name}
                    onClick={(e)=>clickHandler(item,index,e)}
                    className={styles.item}
                    >
                        <span>{item?.name}</span>
                        <img src={index === 0 ? suiJpg :item?.iconUrl} alt='iconUrl'/>
                </div>
            ))}
    </Modal>
  )
}

export default WalletSelector;
