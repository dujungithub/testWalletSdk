import { useState } from "react";

const WalletModel = () => {
  const [walletList, setWalletList] = useState(null);
  const [isShowWallet, setIsShowWallet] = useState(false);
  const [currentWalletKey, setCurrentWalletKey] = useState(null);
  const [clickWalletKey, setClickWalletKey] = useState(null);
  const [walletCollect, setWalletCollect] = useState(null);
  const [isShowNotice, setIsShowNotice] = useState(false);
  const [isShowErrorNotice, setIsShowErrorNotice] = useState(false);
  const [isShowConnectModal, setIsShowConnectModal] = useState(false);
  const [isFirstAccess,setIsFirstAccess] = useState(false);
  const [showWallet, setWalletShow] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [walletTitle, setWalletTitle] = useState('');
  const [walletWidth, setWalletWidth] = useState('383px');

  const changeWalletStatus = (show) => {
    setWalletShow(show);
  };

  const changeMyaccountStatus = (show) => {
    setShowUserAccount(show);
  };

  const changeWalletTitle = (title) => {
    setWalletTitle(title);
  };

  const changeWalletWidth = (width) => {
    setWalletWidth(width);
  };


  return {
    isFirstAccess,
    clickWalletKey,
    walletList, 
    isShowWallet,
    currentWalletKey,
    walletCollect,
    isShowNotice,
    isShowErrorNotice,
    isShowConnectModal,
    showWallet,
    showUserAccount,
    walletTitle,
    walletWidth,
    setIsShowWallet,
    setCurrentWalletKey,
    setWalletCollect,
    setIsShowNotice,
    setIsShowErrorNotice,
    setWalletList,
    setClickWalletKey,
    setIsShowConnectModal,
    setIsFirstAccess,
    changeWalletStatus,
    changeMyaccountStatus,
    changeWalletTitle,
    changeWalletWidth
  };
};

export default WalletModel;
