import React, {useEffect} from "react";
import { useModel, useSearchParams } from 'umi';
import BaseLayoutMobile from "./mobile";
import BaseLayoutWeb from "./web";
import {
  WalletProvider,
  SuietWallet,
  SuiWallet,
  EthosWallet,
  MartianWallet,
  SurfWallet,
  GlassWallet,
  MorphisWallet,
  OneKeyWallet,
  SpacecyWallet
} from '@suiet/wallet-kit';

const BaseLayout=({children})=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const { isMobile } = useModel('app');
    const { changeMyaccountStatus } = useModel('wallet');
    const {setShowLoginModal } = useModel('common');

    useEffect(() => {
      if(searchParams.get('code')){
        localStorage.setItem('invite_token', searchParams.get('code') || '');
      }
    }, [])

    const openWallet = () => {
        if (!isMobile) {
          changeMyaccountStatus(true);
        } else {
        }
    };

    const loginHandler = ()=>{
        if (!isMobile) {
            setShowLoginModal(true);
        }else{
            history.push('/login');
        }
    };

    const props = {
        openWallet,
        loginHandler
      };
    return (
      <WalletProvider defaultWallets={[
        SuiWallet,
        SuietWallet,
        EthosWallet,
        GlassWallet,
        MartianWallet,
        MorphisWallet,
        OneKeyWallet,
        SpacecyWallet,
        SurfWallet
    ]}>
        {
            isMobile ? <BaseLayoutMobile>{children}</BaseLayoutMobile>
              : <BaseLayoutWeb {...props}>{children}</BaseLayoutWeb>
        }
    </WalletProvider>
    )
}

export default BaseLayout;
