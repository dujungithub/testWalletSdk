import BaseLayout from '@/components/BaseLayout';
import logoSvg from '@/assets/images/common/logos.svg';
import suiLogo from '@/assets/images/developer/sui_logo.svg';
import linkImg from '@/assets/images/developer/link.svg';
import arrowLeft from '@/assets/images/developer/arrow_left.svg';
import arrowRight from '@/assets/images/developer/arrow_right.svg';
import arrowSvg from '@/assets/images/developer/arrow.svg';
import close from '@/assets/images/developer/close.svg';
import React,{useState} from 'react';
import {history} from 'umi';
import { Popup } from 'antd-mobile';
import styles from './mobile.less';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
require('swiper/swiper.min.css');

const HomeMobile = () => {
  const [studioCurrent,setStudioCurrent] = useState(0);
  const [userCurrent,setUserCurrent] = useState(0);
  const [partnerCurrent,setPartnerCurrent] = useState(0);
  const [showInfo, setShowInfo ] = useState(false);
  const studiosList =[
    {
      imgUrl:'icon_api_normal',
      selected:'icon_api_selected',
      title:'API&SDK',
      desc:['Blockchain Interaction Tools','Game Launchpad','AI Integration']
    },
    {
      imgUrl:'icon_payments_normal',
      selected:'icon_payments_selected',
      title:'Payments',
      desc:['Fiat & Crypto Payment Solutions','Easily Open up Multiple Revenue','Streams']
    },
    {
      imgUrl:'icon_exchange_normal',
      selected:'icon_exchange_selected',
      title:'In-Game Exchange',
      desc:['Built- In Token Exchange & NFT','Marketplace','Customizable & Interactive NFTs']
    },
    {
      imgUrl:'icon_usergrowth_normal',
      selected:'icon_usergrowth_selected',
      title:'User Growth Support',
      desc:['User Management Tools','Dashboard for Operations & Data','Analysis']
    }
  ];

  const usersList =[
    {
      imgUrl:'icon_oneclick_normal',
      selected:'icon_oneclick_selected',
      title:'One-Click Play',
      desc:['Easy to Use Platform for all User','Levels','Account Abstraction']
    },
    {
      imgUrl:'icon_multiple_normal',
      selected:'icon_multiple_selected',
      title:'Multiple Payment Channels',
      desc:['Fiat and Crypto Channels','Cross-Chain Deposit with almost Zero','Fees and Slippage']
    },
    {
      imgUrl:'icon_gamingfor_normal',
      selected:'icon_gamingfor_selected',
      title:'Gaming for All',
      desc:['Expansive Gaming Ecosystem for','Better User Retention','Growable XP（Experience Points）','&Rewards']
    },
    {
      imgUrl:'icon_ture_normal',
      selected:'icon_ture_selected',
      title:'True Ownership',
      desc:['Genuine & Safe Ownership of In-Game','Assets','Buy, Sell & Trade Assets Easily']
    }
  ];

  const partnerList=[
    // {
    //   imgUrl:'mobile_virtuos',
    //   imgIcon:'img_upstairs',
    //   desc:['UPSTAIRS is a unique NFT Marketplace that launched','in October 2022. Upstairs emphasizes engaging and','immersive user experiences beyond the triviality of','buy, hold and sell.'],
    //   hrefUrl:'https://www.upstairs.io/',
    //   detailUrl:'detail_upstairs',
    // },
    {
      imgUrl:'img_meson_mobile',
      imgIcon:'meson_icon',
      desc:['MESON is a fast and costless cross-chain protocol','focusing on stablecoins and ranks top 3 in this',"market. Meson's cross-chain SDK helps DApps attract",'and acquire users from any chain.'],
      hrefUrl:'https://www.meson.to/',
      detailUrl:'meson_icon',
    },
    {
      imgUrl:'img_virtuos_mobile',
      imgIcon:'virtuos_icon',
      desc:['VIRTUOS was founded in 2004 as a leading content','production company specializing in Video Game','Development and Art Production and is home to over','3,500 full-time professionals.'],
      hrefUrl:'https://www.virtuosgames.com/',
      detailUrl:'virtuos_icon',
    }
  ];

  const connectList = [
    {
        imgIcon:'tl_mobile',
        imgHref:'https://t.me/cubicgamesxyz'
    },
    {
        imgIcon:'dc__mobile',
        imgHref:'https://discord.gg/BPtkXgcHwF'
    },
    {
        imgIcon:'tw__mobile',
        imgHref:'https://twitter.com/cubicgamesxyz'
    }
];

const partnerFirstList = [
  {
    imgUrl:'part_sui'
  },
  {
    imgUrl:'part_Suiet'
  },
  {
    imgUrl:'part_suistart'
  },
  {
    imgUrl:'part_suipad'
  },
  {
    imgUrl:'part_thumb'
  },
  {
    imgUrl:'part_belaunch'
  },
  {
    imgUrl:'part_divine'
  },
  {
    imgUrl:'part_ethos'
  },
  {
    imgUrl:'part_blockmania'
  },
  {
    imgUrl:'part_taskon'
  },
  {
    imgUrl:'part_nerd'
  },
  {
    imgUrl:'part_suiduckz'
  },
  {
    imgUrl:'part_cassava'
  },
  {
    imgUrl:'part_watorflow'
  },
  {
    imgUrl:'part_ocen'
  }
];
const partnerLastList = [
  {
    imgUrl:'part_virtuos'
  },
  {
    imgUrl:'part_meson'
  },
  {
    imgUrl:'part_cetus'
  },
  {
    imgUrl:'part_turbos'
  },
  {
    imgUrl:'part_martian'
  },
  {
    imgUrl:'part_depthos'
  },
  {
    imgUrl:'part_suishi'
  },
  {
    imgUrl:'part_blockVision'
  },
  {
    imgUrl:'part_minimar'
  },
  {
    imgUrl:'part_coinstagest'
  },
  {
    imgUrl:'part_metachat'
  },
  {
    imgUrl:'part_suipiens'
  },
  {
    imgUrl:'part_suiGoats'
  },
  {
    imgUrl:'part_labs'
  },
  {
    imgUrl:'part_vpc'
  }
];

  const clickHandler=(index,type)=>{
    switch(type){
      case 'studio':
      setStudioCurrent(index);
      break;
      case 'user':
        setUserCurrent(index);
      break;
    }
  }

  const partnerHandler=(type)=>{
    switch (type){
      case 'left':
        setPartnerCurrent(partnerCurrent-1);
        break;
      case 'right':
        setPartnerCurrent(partnerCurrent+1);
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
          <p>Onboarding Millions</p>
          <p>in Web3 Games</p>
          <p onClick={()=>{
            history.push('/games');
          }}>Play with Cubic</p>
          <p>
            Built on
            <img src={suiLogo} alt=''/>
          </p>
        </div>
        <div className={styles.studio}>
          <p className={styles.title}>For Game Studios</p>
          <div className={styles.list}>
            {
              studiosList?.map((item,index)=>(
                <img
                  className={studioCurrent===index ? styles.selected : ''}
                  key={index}
                  src={require(`@/assets/images/developer/${studioCurrent===index ? item.selected : item.imgUrl}.svg`)}
                  alt='img'
                  onClick={(e)=>clickHandler(index,'studio',e)}
                />
              ))
            }
          </div>
          <div className={styles.itemTitle}>{ studiosList?.[studioCurrent]?.title}</div>
            <div className={styles.currentItem}>
              {
                studiosList?.[studioCurrent]?.desc.map((item,idex)=>(
                  <p key={idex}>
                    {item}
                    {
                      idex ===2 && studioCurrent===0 && <img src={linkImg} alt='linkImg' onClick={()=>{}}/>
                    }
                    </p>
                ))
              }
          </div>
        </div>
        <div className={styles.user}>
          <p className={styles.title}>For Users</p>
          <div className={styles.list}>
            {
              usersList?.map((item,index)=>(
                <img
                  className={userCurrent===index ? styles.selected : ''}
                  key={index}
                  src={require(`@/assets/images/developer/${userCurrent===index ? item.selected : item.imgUrl}.svg`)}
                  alt='img'
                  onClick={(e)=>clickHandler(index,'user',e)}
                />
              ))
            }
          </div>
          <div className={styles.itemTitle}>{ usersList?.[userCurrent]?.title}</div>
            <div className={styles.currentItem}>
              {
                usersList?.[userCurrent]?.desc.map((item,idex)=>(
                  <p key={idex}>{item} </p>
                ))
              }
          </div>
        </div>
        <div className={styles.partner}>
          <p className={styles.title}>Partners</p>
          <p className={styles.subTitle}>
              <span>A continuously increasing list of Partners</span>
              <span>and Supporters</span>
          </p>
          {/* <div className={styles.item}>
            <div className={styles.arrowLeft}>
              {
                partnerCurrent > 0 && <img src={arrowLeft} alt='arrowLeft' onClick={()=>partnerHandler('left')}/>
              }
            </div>
            <div className={styles.imgWrapper} onClick={clickImg}>
              <img src={require(`@/assets/images/developer/${partnerList?.[partnerCurrent]?.imgUrl}.svg`)} alt='imgUrl'/>
            </div>
            <div className={styles.arrowRight}>
              {
                partnerCurrent < partnerList?.length-1 && <img src={arrowRight} alt='arrowRight' onClick={()=>partnerHandler('right')}/>
              }
            </div>
          </div> */}
          <div className={styles.partnerImg}>
            {
              partnerFirstList &&
              <Swiper
                className={`${styles.swiperBox} swiper-no-swiping`}
                spaceBetween={16}
                slidesPerView={3}
                modules={[Autoplay]}
                pagination={{ type: 'fraction' }}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: true
                }}
                speed={5000}
                loop
              >
                {
                  partnerFirstList?.map((item, index) =>(
                    <SwiperSlide key={index}>
                        <div className={styles.divBox}>
                          <img src={require(`@/assets/images/developer/${item.imgUrl}.svg`)} alt={item.imgUrl} style={{ height: '144px', width: 'auto' }}/>
                        </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            }
            {
              partnerLastList &&
              <Swiper
                className={`${styles.swiperBox} swiper-no-swiping`}
                spaceBetween={16}
                slidesPerView={3}
                modules={[Autoplay]}
                pagination={{ type: 'fraction' }}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: true
                }}
                speed={5000}
                loop
              >
                {
                  partnerLastList?.map((item, index) => (
                    <SwiperSlide className={styles.swiperItem} key={index}>
                        <div className={styles.divBox}>
                          <img src={require(`@/assets/images/developer/${item.imgUrl}.svg`)} alt={item.imgUrl} style={{ height: '144px', width: 'auto' }}/>
                        </div>
                      </SwiperSlide>
                  ))
                }
              </Swiper>
            }
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
                <img src={require(`@/assets/images/developer/${partnerList?.[partnerCurrent]?.detailUrl}.svg`)} alt='detailUrl'/>
                {
                  partnerList?.[partnerCurrent]?.desc?.map((ite,idx)=>(
                    <p key={idx}>{ite}</p>
                  ))
                }
                <a href={partnerList?.[partnerCurrent]?.hrefUrl} target='_blank' rel="noreferrer">
                  <span>Learn More</span>
                  <img src={arrowSvg} alt='arrowSvg'/>
                </a>
            </div>
          </Popup>
        </div>
        <div className={styles.footer}>
            <p>STAY CONNECTED</p>
            <div className={styles.connecteList}>
              {
                connectList?.map((item,index)=>(
                  <a key={index} href={item.imgHref}  target='_blank' rel="noreferrer">
                    <img  alt='imgIcon' src={require(`@/assets/images/developer/${item.imgIcon}.svg`)}/>
                  </a>
                ))
              }
            </div>
            <img src={logoSvg} alt='logoSvg'/>
            <span>© 2023 Cubic . All rights reserved.</span>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomeMobile;