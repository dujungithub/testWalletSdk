import BaseLayout from '@/components/BaseLayout';
import React,{useState}from 'react';
import styles from './web.less';
import leftSvg from '@/assets/images/developer/left.svg';
import rightSvg from '@/assets/images/developer/right.svg';
import arrowSvg from '@/assets/images/developer/arrow.svg';
import suiSvg from '@/assets/images/developer/sui.svg';

const DeveloperWeb = () => {
  const [current,setCurrent] = useState(null);
  const studiosList =[
    {
      imgUrl:'api',
      title:'API&SDK',
      desc:['Blockchain Interaction Tools','Game Launchpad','AI Integration']
    },
    {
      imgUrl:'payments',
      title:'Payments',
      desc:['Fiat & Crypto Payment Solutions','Easily Open up Multiple Revenue Streams']
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
      desc:['Easy to Use Platform for all User Levels','Account Abstraction']
    },
    {
      imgUrl:'multiple',
      title:'Multiple Payment Channels',
      desc:['Fiat and Crypto Channels','Cross-Chain Deposit with almost Zero','Fees and Slippage']
    },
    {
      imgUrl:'gaming',
      title:'Gaming for All',
      desc:['Expansive Gaming Ecosystem for better','User Retention','Growable XP（Experience Points）','&Rewards']
    },
    {
      imgUrl:'ture',
      title:'True Ownership',
      desc:['Genuine & Safe Ownership of In-Game','Assets','Buy, Sell & Trade Assets Easily']
    }
  ]

  const partnerList=[
    {
      imgUrl:'virtuos',
      imgIcon:'icon_upstairs',
      desc:['UPSTAIRS is a unique NFT Marketplace that launched in','October 2022. Upstairs emphasizes engaging and','immersive user experiences beyond the triviality of','buy, hold and sell.'],
      hrefUrl:'https://www.upstairs.io/',
    },
    {
      imgUrl:'meson',
      imgIcon:'icon_meson',
      desc:['MESON is a fast and costless cross-chain protocol','focusing on stablecoins and ranks top 3 in this market.',"Meson's cross-chain SDK helps DApps attract and",'acquire users from any chain.'],
      hrefUrl:'https://www.meson.to/'
    },
    {
      imgUrl:'upstairs',
      imgIcon:'icon_virtuos',
      desc:['VIRTUOS was founded in 2004 as a leading content','production company specializing in Video Game','Development and Art Production and is home to over','3,500 full-time professionals.'],
      hrefUrl:'https://www.virtuosgames.com/'
    }
  ]

  const enterHandler=(e,index)=>{
    e.stopPropagation();
    setCurrent(index)
  }

  const leaveHandler=(e)=>{
    e.stopPropagation();
    setCurrent(null)
  }
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.home}>
          <p>Onboarding Millions</p>
          <p>in Web3 Games</p>
          <div className={styles.sui}>
            <span>Built on</span>
            <img src={suiSvg} alt='suiSvg'/>
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
            {
              partnerList?.map((item,index)=>(
                <div className={styles.item} key={index} onMouseEnter={(e)=>enterHandler(e,index)} onMouseLeave={leaveHandler}>
                  <img src={require(`@/assets/images/developer/${item.imgUrl}.svg`)} className={styles.imgUrl} alt='imgUrl'/>
                  <img src={require(`@/assets/images/developer/${item.imgIcon}.svg`)} className={styles.imgIcon} alt='imgIcon'/>
                  <img src={leftSvg} alt='leftSvg' className={styles.leftSvg}/>
                  <img src={rightSvg} alt='rightSvg' className={styles.rightSvg}/>
                  <div className={current === index ? `${styles.mask} ${styles.showMask}` : `${styles.mask}`}>
                    <img src={require(`@/assets/images/developer/${item.imgIcon}.svg`)} className={styles.maskIcon} alt='imgIcon'/>
                    {
                      item?.desc?.map((ite,idx)=>(
                        <p key={idx}>{ite}</p>
                      ))
                    }
                    <a href={item.hrefUrl} target='_blank' rel="noreferrer">
                      <span>Learn More</span>
                      <img src={arrowSvg} alt='arrowSvg'/>
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div> */}
      </div>
    </BaseLayout>
  );
};

export default DeveloperWeb;
