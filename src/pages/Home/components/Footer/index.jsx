import React  from 'react';
import styles from './index.less';
import footLogo from '@/assets/images/developer/foot_logo.svg';

const Footer = () => {
    const connectList = [
        {
            imgIcon:'tl',
            imgHref:'https://t.me/cubicgamesxyz'
        },
        {
            imgIcon:'dc',
            imgHref:'https://discord.gg/BPtkXgcHwF'
        },
        {
            imgIcon:'tw',
            imgHref:'https://twitter.com/cubicgamesxyz'
        }
    ]
    return (
        <div className={styles.footWrapper}>
            <div className={styles.connected}>STAY CONNECTED</div>
            <div className={styles.connecteList}>
                {
                    connectList?.map((item,index)=>(
                        <a key={index} href={item.imgHref}  target='_blank' rel="noreferrer">
                            <img  alt='imgIcon' src={require(`@/assets/images/developer/${item.imgIcon}.svg`)}/>
                        </a>
                    ))
                }
            </div>
            <img src={footLogo} alt='footLogo'/>
            <p>© 2023 Cubic . All rights reserved.</p>
        </div>
    );
};

export default Footer;
