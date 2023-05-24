import BaseLayout from '@/components/BaseLayout';
import React,{useState} from 'react';
import { Popup } from 'antd-mobile';
import styles from './mobile.less';
import arrowLeft from '@/assets/images/developer/arrow_left.svg';
import arrowRight from '@/assets/images/developer/arrow_right.svg';
import mobileLeft from '@/assets/images/developer/mobile_left.svg';
import mobileRight from '@/assets/images/developer/mobile_right.svg';
import close from '@/assets/images/developer/close.svg';
import arrowSvg from '@/assets/images/developer/arrow.svg';
import suiSvg from '@/assets/images/developer/sui.svg';

const DeveloperMobile = () => {
  const [current,setCurrent] = useState(0);
  const [ showInfo, setShowInfo ] = useState(false);

  const studiosList =[
    {
      imgUrl:'api',
      title:'API&SDK',
      desc:['Blockchain Interaction Tools','Game Launchpad','AI Integration']
    },
    {
      imgUrl:'payments',
      title:'Payments',
      desc:['Fiat & Crypto Payment Solutions','Easily Open up Multiple Revenue','Streams']
    },
    {
      imgUrl:'exchange',
      title:'In-Game Exchange',
      desc:['Built- In Token Exchange & NFT','Marketplace','Customizable & Interactive NFTs']
    },
    {
      imgUrl:'growth',
      title:'User Growth Support',
      desc:['User Management Tools','Dashboard for Operations & Data','Analysis']
    }
  ]

  const usersList =[
    {
      imgUrl:'oneclick',
      title:'One-Click Play',
      desc:['Easy to Use Platform for all User','Levels','Account Abstraction']
    },
    {
      imgUrl:'multiple',
      title:'Multiple Payment Channels',
      desc:['Fiat and Crypto Channels','Cross-Chain Deposit with almost Zero','Fees and Slippage']
    },
    {
      imgUrl:'gaming',
      title:'Gaming for All',
      desc:['Expansive Gaming Ecosystem for','Better User Retention','Growable XP（Experience Points）','&Rewards']
    },
    {
      imgUrl:'ture',
      title:'True Ownership',
      desc:['Genuine & Safe Ownership of In-Game','Assets','Buy, Sell & Trade Assets Easily']
    }
  ]

  const partnerList=[
    {
      imgUrl:'mobile_virtuos',
      imgIcon:'img_upstairs',
      desc:['UPSTAIRS is a unique NFT Marketplace that launched','in October 2022. Upstairs emphasizes engaging and','immersive user experiences beyond the triviality of','buy, hold and sell.'],
      hrefUrl:'https://www.upstairs.io/',
      detailUrl:'detail_upstairs',
    },
    {
      imgUrl:'mobile_meson',
      imgIcon:'img_meson',
      desc:['MESON is a fast and costless cross-chain protocol','focusing on stablecoins and ranks top 3 in this',"market. Meson's cross-chain SDK helps DApps attract",'and acquire users from any chain.'],
      hrefUrl:'https://www.meson.to/',
      detailUrl:'detail_meson',
    },
    {
      imgUrl:'mobile_upstairs',
      imgIcon:'img_virtuos',
      desc:['VIRTUOS was founded in 2004 as a leading content','production company specializing in Video Game','Development and Art Production and is home to over','3,500 full-time professionals.'],
      hrefUrl:'https://www.virtuosgames.com/',
      detailUrl:'detail_virtuos',
    }
  ]

  const clickHandler=(type)=>{
    switch (type){
      case 'left':
        setCurrent(current-1);
        break;
      case 'right':
        setCurrent(current+1);
        break;
      default:
        break;
    }
  }

  const closeInfo=()=>{
    setShowInfo(false);
  }

  const clickImg=()=>{
    setShowInfo(true);
  }

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.home}>
          <div className={styles.bg}/>
          <div className={styles.content}>
            <p>Onboarding</p>
            <p>Millions</p>
            <p>in Web3 Games</p>
            <div className={styles.sui}>
              <span>Built on</span>
              <img src={suiSvg} alt='suiSvg'/>
            </div>
          </div>
        </div>
        <div className={styles.studios}>
          <div className={styles.title}>
            For Game Studios
          </div>
          <div className={styles.list}>
            {
              studiosList?.map((item,index)=>(
                <div className={styles.item} key={index}>
                  <img src={require(`@/assets/images/developer/${item.imgUrl}.svg`)} alt='imgUrl'/>
                  <p>{item.title}</p>
                  {
                    item?.desc?.map((ite,idx)=>(
                      <span key={idx}>{ite}</span>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
        <div className={`${styles.studios} ${styles.user}`}>
          <div className={styles.title}>
            For Users
          </div>
          <div className={styles.list}>
            {
              usersList?.map((item,index)=>(
                <div className={styles.item} key={index}>
                  <img src={require(`@/assets/images/developer/${item.imgUrl}.svg`)} alt='imgUrl'/>
                  <p>{item.title}</p>
                  {
                    item?.desc?.map((ite,idx)=>(
                      <span key={idx}>{ite}</span>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
        {/* <div className={styles.partner}>
          <div className={styles.title}>
            Partners
          </div>
          <div className={styles.list}>
            <div className={styles.listBg}/>
            <div className={styles.wrapper}>
              <div className={styles.item}>
                <div className={styles.arrowLeft}>
                  {
                    current > 0 && <img src={arrowLeft} alt='arrowLeft' onClick={()=>clickHandler('left')}/>
                  }
                </div>
                <div className={styles.imgWrapper} onClick={clickImg}>
                  <img src={require(`@/assets/images/developer/${partnerList?.[current]?.imgUrl}.svg`)} alt='imgUrl'/>
                  <img src={mobileLeft} alt='mobileLeft' />
                  <img src={mobileRight} alt='arrowRight'/>
                  <img src={require(`@/assets/images/developer/${partnerList?.[current]?.imgIcon}.svg`)} alt='imgIcon'/>
                </div>
                <div className={styles.arrowRight}>
                  {
                    current < partnerList?.length-1 && <img src={arrowRight} alt='arrowRight' onClick={()=>clickHandler('right')}/>
                  }
                </div>
              </div>
            </div>
          </div>
          <Popup
            visible={showInfo}
            position='left'
            closeOnMaskClick
            onMaskClick={closeInfo}
          >
            <div className={styles.infoBox}>
                <div className={styles.closeHead}>
                  <img src={close} alt='close' onClick={closeInfo}/>
                </div>
                <img src={require(`@/assets/images/developer/${partnerList?.[current]?.detailUrl}.svg`)} alt='detailUrl'/>
                {
                  partnerList?.[current]?.desc?.map((ite,idx)=>(
                    <p key={idx}>{ite}</p>
                  ))
                }
                <a href={partnerList?.[current]?.hrefUrl} target='_blank' rel="noreferrer">
                  <span>Learn More</span>
                  <img src={arrowSvg} alt='arrowSvg'/>
                </a>
            </div>
          </Popup>
        </div> */}
      </div>
    </BaseLayout>
  );
};

export default DeveloperMobile;