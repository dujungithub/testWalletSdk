import React, { useState } from 'react';
import styles from './index.less';
import arrowSvg from '@/assets/images/developer/arrow.svg';
import { Parallax, OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
require('swiper/swiper.min.css');
const Partner = () => {
  const [current, setCurrent] = useState(null);
  const partnerList = [
    // {
    //   imgUrl:'virtuos',
    //   imgIcon:'icon_upstairs',
    //   desc:['UPSTAIRS is a unique NFT Marketplace that launched in','October 2022. Upstairs emphasizes engaging and','immersive user experiences beyond the triviality of','buy, hold and sell.'],
    //   hrefUrl:'https://www.upstairs.io/',
    // },
    {
      imgUrl: 'meson_img',
      imgIcon: 'icon_meson',
      desc: [
        'MESON is a fast and costless cross-chain protocol',
        'focusing on stablecoins and ranks top 3 in this market.',
        "Meson's cross-chain SDK helps DApps attract and",
        'acquire users from any chain.',
      ],
      hrefUrl: 'https://www.meson.to/',
    },
    {
      imgUrl: 'virtuos_img',
      imgIcon: 'new_virtuos',
      desc: [
        'VIRTUOS was founded in 2004 as a leading content',
        'production company specializing in Video Game',
        'Development and Art Production and is home to over',
        '3,500 full-time professionals.',
      ],
      hrefUrl: 'https://www.virtuosgames.com/',
    },
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

  const enterHandler = (e, index) => {
    e.stopPropagation();
    setCurrent(index);
  };

  const leaveHandler = (e) => {
    e.stopPropagation();
    setCurrent(null);
  };
  return (
    <div className={styles.partnerWrap}>
      {/* <Parallax
        animation={[{ y: 400, playScale: [0.2, 0.7] }]}
        style={{ transform: 'translate(-50%, 300px)' }}
        className={styles.animation_bg}
      />
      <div className={styles.wrapper_bg}></div>
      <div className={styles.bg_top}></div>
      <div className={styles.bg_bottom}></div>
      <div className={styles.left}>
        <div className={styles.title}>Partners</div>
        <div className={styles.subTitle}>
          <p>A continuously increasing list of Partners and Supporters</p>
        </div>
        <OverPack style={{ overflow: 'hidden', height: 420, width: "100%"}}>
          <QueueAnim
            key="queue"
            leaveReverse
            className={styles.list}
            style={{ position: 'relative', left: '50%', marginLeft: -395}}
          >
            {partnerList?.map((item, index) => (
              <div
                className={styles.item}
                key={index}
                onMouseEnter={(e) => enterHandler(e, index)}
                onMouseLeave={leaveHandler}
              >
                <img
                  src={require(`@/assets/images/developer/${item.imgUrl}.svg`)}
                  className={styles.imgUrl}
                  alt="imgUrl"
                />
                <div
                  className={
                    current === index ? `${styles.mask} ${styles.showMask}` : `${styles.mask}`
                  }
                >
                  <img
                    src={require(`@/assets/images/developer/${item.imgIcon}.svg`)}
                    className={styles.maskIcon}
                    alt="imgIcon"
                  />
                  {item?.desc?.map((ite, idx) => (
                    <p key={idx}>{ite}</p>
                  ))}
                  <a href={item.hrefUrl} target="_blank" rel="noreferrer">
                    <span>Learn More</span>
                    <img src={arrowSvg} alt="arrowSvg" />
                  </a>
                </div>
              </div>
            ))}
          </QueueAnim>
        </OverPack>
      </div> */}
      <div className={styles.wrapper_bg}/>
      <div className={styles.bg_top}/>
      <div className={styles.bg_bottom}/>
      <div className={styles.content}>
      <div className={styles.title}>Partners</div>
      <div className={styles.subTitle}>A continuously increasing list of Partners and Supporters</div>
      <div className={styles.partnerImg}>
        {
          partnerFirstList &&
          <Swiper
            className={`${styles.swiperBox} swiper-no-swiping`}
            spaceBetween={32}
            slidesPerView={4}
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
            spaceBetween={32}
            slidesPerView={4}
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
      </div>
    </div>
  );
};

export default Partner;
