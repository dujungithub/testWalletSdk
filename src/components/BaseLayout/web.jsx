import logoSvg from '@/assets/images/common/logos.svg';
import twitterSvg from '@/assets/images/common/twitter.svg';
import discordSvg from '@/assets/images/common/discord.svg';
import telegramSvg from '@/assets/images/common/telegram.svg';
import { Layout,notification } from 'antd';
import { useEffect } from 'react';
import { history,useModel } from 'umi';
import routes from '../../../config/routes';
import styles from './web.less';
import {CheckOutlined} from '@ant-design/icons';
import Wallet from '@/components/WalletSelector';
import WalletConnect from '@/components/WalletConnect';
import MyWallet from '@/components/MyWallet';
import MyAccount from '@/components/MyAccount';
import LoginModal from '@/components/LoginModal';
import EmailModal from '@/components/EmailModal';
import walletIcon from "@/assets/images/developer/wallet.svg";
import docIcon from "@/assets/images/common/doc.svg";

const { Header } = Layout;

const BaseLayoutWeb= ({
  children,
  openWallet,
  loginHandler
}) => {
  const {
    isShowWallet,
    clickWalletKey,
    walletList,
    walletCollect,
    isShowNotice,
    isShowErrorNotice,
    setIsShowNotice,
    setIsShowErrorNotice,
    setWalletCollect,
    setCurrentWalletKey,
    setWalletList,
    isShowConnectModal,
    showWallet,
    showUserAccount,
  } = useModel('wallet');
  const { getCurrentUserInfo } = useModel('account');
  const { showLoginModal,showEmailModal } = useModel('common');
  const [api, contextHolder] = notification.useNotification();



  useEffect(()=>{
    const walletCollects = JSON.parse(localStorage.getItem('walletCollects'));
    if(walletCollects){
      setWalletCollect(walletCollects);
      setWalletList([...walletCollects?.configuredWallets, ...walletCollects?.detectedWallets]);
    }
    setCurrentWalletKey(localStorage.getItem('currentKey'));
  },[])

  useEffect(()=>{
    // isShowNotice && api.open({
    //   message: 'Wallet Connected',
    //   icon: <CheckOutlined style={{ color: '#76C8FF' }} />,
    //   onClick:setIsShowNotice(false),
    //   className:`${styles.successWrap}`,
    // });
    isShowErrorNotice && api['error']({
      message: 'WalletNotReadyError',
      onClick:setIsShowErrorNotice(false),
      description:<div>Please install <a href={walletList?.[clickWalletKey]?.downloadUrl?.browserExtension} target="_blank" rel="noreferrer">{walletList?.[clickWalletKey]?.name}</a> extension first</div>,
      className:`${styles.errorWrap}`,
      duration:null
    });
  },[isShowErrorNotice])

  const goHome = () => {
    const url = window.location.href;
    if (url.indexOf('/home') === -1) {
      history.push('/home');
    }
  };

  const handleClick = (e, route) => {
    e.preventDefault();
    history.push(route.path);
  };

  return (
    <div className={styles.layout}>
      {contextHolder}
      <Header className={styles.header}>
        <div className={styles.navbox}>
          <span className={styles.logo} onClick={goHome}>
            <img src={logoSvg} alt="logo" />
          </span>
          <div className={styles.menuBox}>
            {routes.map(
              (route) =>
                route?.showMenu && (
                  <a
                    className={`${styles.menuItem} ${
                      location.pathname.includes(route.path) ? styles.active : ''
                    }`}
                    key={route.path}
                    onClick={(e) => handleClick(e, route)}
                  >
                    {route.name}
                  </a>
                ),
            )}
          </div>
          <div className={styles.rightContent}>

            <div className={styles.lauch}>
              <a href='https://docs.cubicgames.xyz/' target='_blank' rel="noreferrer">
                <img src={docIcon} alt='docIcon'/>Docs
              </a>
            </div>
            <div className={styles.airdrop} onClick={() => {history.push("/games")}} >
              <span>Airdrop</span>
            </div>
            <div className={styles.contact}>
              <a className={styles.twitter} href=' https://t.me/cubicgamesxyz' target='_blank' rel="noreferrer">
                <img src={telegramSvg} alt='telegramSvg'/>
              </a>
              <a className={styles.twitter} href='https://discord.gg/BPtkXgcHwF' target='_blank' rel="noreferrer">
                <img src={discordSvg} alt='discordSvg'/>
              </a>
              <a className={styles.twitter} href='https://twitter.com/cubicgamesxyz' target='_blank' rel="noreferrer">
                <img src={twitterSvg} alt='twitterSvg'/>
              </a>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.connect}>
                  {
                    (getCurrentUserInfo()?.access_token || getCurrentUserInfo()?.address) ? <img src={walletIcon} alt="wallet" onClick={openWallet}/>
                    :<span onClick={loginHandler}>Login</span>
                  }
                </div>
            </div>
          </div>
        </div>
      </Header>
      <div id="children">
        {children}
        {isShowWallet && <Wallet/>}
        {isShowConnectModal && <WalletConnect/>}
        {showWallet && <MyWallet />}
        {showUserAccount && <MyAccount />}
        {showLoginModal && <LoginModal/>}
        {showEmailModal && <EmailModal/>}
      </div>
    </div>
  );
};

export default BaseLayoutWeb;
