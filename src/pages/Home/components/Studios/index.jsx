import React,{useState} from 'react';
import styles from './index.less';
import { Parallax } from 'rc-scroll-anim';
import {history} from 'umi';
import IconLink from '@/assets/images/developer/icon_link.svg';

const Studios = () => {
    const [current,setCurrent] = useState(0);
    const studiosList =[
        {
          imgUrl:'api_normal',
          selected:'api_selected',
          title:'API&SDK',
          desc:['Blockchain Interaction Tools','Game Launchpad','AI Integration']
        },
        {
          imgUrl:'payments_normal',
          selected:'payments_selected',
          title:'Payments',
          desc:['Fiat & Crypto Payment Solutions','Easily Open up Multiple Revenue Streams']
        },
        {
          imgUrl:'exchange_normal',
          selected:'exchange_selected',
          title:'In-Game Exchange',
          desc:['Built- In Token Exchange & NFT','Marketplace','Customizable & Interactive NFTs']
        },
        {
          imgUrl:'growth_normal',
          selected:'growth_selected',
          title:'User Growth Support',
          desc:['User Management Tools','Dashboard for Operations & Data','Analysis']
        }
      ]

      const clickHandler=(index)=>{
        setCurrent(index);
      }
  return (
    <div className={styles.studiosWrapper}>
        <Parallax
            animation={[
              { x: -238, playScale: [0.1, 0.7]},
            ]}
            style={{ transform: 'translateX(-1050px)'}}
            className={styles.animation_img}
          />
        <Parallax
            animation={[
              { y: 280, playScale: [0.2, 0.7] },
            ]}
            style={{ transform: 'translate(-50%, 100px)'}}
            className={styles.animation_bg}
          />
          <div className={styles.wrapper_bg}></div>
          <div className={styles.bg_top}></div>
          <div className={styles.bg_bottom}>
            <div className={styles.plant}></div>
          </div>
        <div className={styles.left}>
            <div className={styles.title}>For Game Studios</div>
            <div className={styles.list}>
                <div className={styles.listItem}>
                    {
                        studiosList?.map((item,index)=>(
                            <img
                                className={current===index ? styles.selected : ''}
                                key={index}
                                src={require(`@/assets/images/developer/${current===index ? item.selected : item.imgUrl}.svg`)}
                                alt='img'
                                onClick={(e)=>clickHandler(index,e)}
                                />
                        ))
                    }
                </div>
                <div className={styles.itemTitle}>{ studiosList?.[current]?.title}</div>
                <div className={styles.currentItem}>
                    {
                        studiosList?.[current]?.desc.map((item,idex)=>(
                            <p key={idex}>
                              {item}
                              {
                                idex ===2 && current===0 && <img src={IconLink} alt='IconLink' onClick={()=>{
                                  history.push('/room-chat');
                                }}/>
                              }
                            </p>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  );
};

export default Studios;
