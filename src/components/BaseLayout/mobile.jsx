import logoSvg from '@/assets/images/common/logos.svg';
import twitterSvg from '@/assets/images/common/twitter.svg';
import discordSvg from '@/assets/images/common/discordMobile.svg';
import telegramSvg from '@/assets/images/common/telegramMobile.svg';
import loginIcon from '@/assets/images/common/icon_login.svg';
import { Layout } from 'antd';
import React,{useState,useEffect} from "react";
import { NavLink,history,useModel,useLocation } from 'umi';
import { Popup } from 'antd-mobile';
import routes from '../../../config/routes';
import menuImg from '@/assets/images/common/menu.svg'
import closeImg from '@/assets/images/common/close.svg'
import styles from './mobile.less';
import docIcon from "@/assets/images/common/doc.svg";

const { Header } = Layout;

const BaseLayoutMobile =({children})=>{
    const [ showMenu, setShowMenu ] = useState(false);
    const { getCurrentUserInfo } = useModel('account');
    const { setRedireactUrl } = useModel('common');
    const location = useLocation();

    useEffect(() => {
        if (showMenu) {
          document.querySelector('#children').style.overflow = 'hidden';
        } else {
          document.querySelector('#children').style.overflow = 'auto';
        }
      }, [showMenu]);

    const closeMenu=()=>{
        setShowMenu(false);
    }

    const linkLogin=()=>{
        setRedireactUrl(location);
        history.push('/login');
    }

    return (
        <div className={styles.layout}>
            <Header className={styles.header}>
                <div className={styles.navbox}>
                    <span className={styles.logo}>
                        <img src={logoSvg} alt="logo" />
                    </span>
                    <div className={styles.rightContent}>
                        {
                            getCurrentUserInfo().access_token ? <img className={styles.loginIcon} src={loginIcon} alt='loginIcon'/>: <span onClick={linkLogin}>Login</span>
                        }
                        <div className={styles.menuImg} onClick={() => setShowMenu(true)}>
                            <img src={menuImg} alt='menuImg'/>
                        </div>
                    </div>
                </div>
                <Popup
                    visible={showMenu}
                    position='left'
                    closeOnMaskClick
                    onMaskClick={closeMenu}
                    >
                    <div className={styles.menuBox}>
                        <div className={styles.closeHead}>
                            <img src={logoSvg} alt="logo" />
                            <p className={styles.right}>
                                {
                                   getCurrentUserInfo().access_token ? <img className={styles.loginIcon} src={loginIcon} alt='loginIcon'/>: <span onClick={linkLogin}>Login</span>
                                }
                                <img className={styles.closeImg} src={closeImg} alt='closeImg' onClick={closeMenu}/>
                            </p>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.menu}>
                                {
                                    routes?.map(item=>item.showMenu && (
                                        <NavLink
                                        className={`${styles.menuItem} ${
                                            location.pathname.includes(item.path) ? styles.active : ''
                                        }`}
                                        key={item.path}
                                        to={item.path}
                                    >
                                        {item.name}
                                    </NavLink>
                                    ))
                                }
                            </div>
                            <div className={styles.bottomWrapper}>
                                <div className={styles.btnBox}>
                                    <div className={styles.btn}>
                                        <a href='https://docs.cubicgames.xyz/' target='_blank' rel="noreferrer">
                                            <img src={docIcon} alt='docIcon'/>Docs
                                        </a>
                                    </div>
                                    <div className={styles.airdrop} onClick={()=>{
                                        history.push('/games')
                                    }}>Airdrop</div>
                                </div>
                                <div className={styles.contact}>
                                    <a className={styles.twitter} href='https://t.me/cubicgamesxyz' target='_blank' rel="noreferrer">
                                        <img src={telegramSvg} alt='telegramSvg'/>
                                    </a>
                                    <a className={styles.twitter} href='https://discord.gg/BPtkXgcHwF' target='_blank' rel="noreferrer">
                                        <img src={discordSvg} alt='discordSvg'/>
                                    </a>
                                    <a className={styles.twitter} href='https://twitter.com/cubicgamesxyz' target='_blank' rel="noreferrer">
                                        <img src={twitterSvg} alt='twitterSvg'/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </Header>
            <div id="children">{children}</div>
        </div>
    )
}

export default BaseLayoutMobile;