import React,{useState} from 'react';
import styles from './index.less';
import { Parallax } from 'rc-scroll-anim';

const Users = () => {
    const [current,setCurrent] = useState(0);
    const usersList =[
        {
          imgUrl:'oneclick_normal',
          selected:'oneclick_selected',
          title:'One-Click Play',
          desc:['Easy to Use Platform for all User Levels','Account Abstraction']
        },
        {
          imgUrl:'multiple_normal',
          selected:'multiple_selected',
          title:'Multiple Payment Channels',
          desc:['Fiat and Crypto Channels','Cross-Chain Deposit with almost Zero','Fees and Slippage']
        },
        {
          imgUrl:'gaming_normal',
          selected:'gaming_selected',
          title:'Gaming for All',
          desc:['Expansive Gaming Ecosystem for better','User Retention','Growable XP（Experience Points）&Rewards']
        },
        {
          imgUrl:'ture_normal',
          selected:'ture_selected',
          title:'True Ownership',
          desc:['Genuine & Safe Ownership of In-Game','Assets','Buy, Sell & Trade Assets Easily']
        }
      ]

    const clickHandler=(index)=>{
        setCurrent(index);
    }
    return (
        <div className={styles.studiosWrapper}>
           <Parallax
            animation={[
              { x: 100, playScale: [0.1, 0.7]},
            ]}
            style={{ transform: 'translateX(1050px)'}}
            className={styles.animation_img}
          />
            <div className={styles.left}>
                <div className={styles.title}>For Users</div>
                <div className={styles.list}>
                    <div className={styles.listItem}>
                        {
                            usersList?.map((item,index)=>(
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
                    <div className={styles.itemTitle}>{ usersList?.[current]?.title}</div>
                    <div className={styles.currentItem}>
                        {
                            usersList?.[current]?.desc.map((item,idex)=>(
                                <p key={idex}>{item}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
