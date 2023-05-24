import React,{useState} from "react";
import { Button } from 'antd';
import { useModel } from 'umi';
import WithCard from './components/WithCard';
import WithCrypto from './components/WithCrypto';
import styles from './index.less';

const AddFunds =()=>{
    const [tab, setTab] = useState('crypto');
    const { changeWalletStatus } = useModel('wallet');
    const selectTabs = [
        {
          key:'With Crypto',
          value: 'crypto'
        },
        {
          key: 'With Credit Card',
          value: 'card'
        }
    ];

    const changedTab = (value) => {
        setTab(value);
    };

    const handleBack = () => {
      changeWalletStatus(false);
    };
    const props = {
        handleBack
    };
    
    return (
        <div className={styles.addBox}>
            <div className={styles.selectBox}>
                {selectTabs.map((item) => (
                    <Button
                        key={item.value}
                        className={`${styles.btn} ${tab === item.value && styles.active}`}
                        onClick={() => changedTab(item.value)}
                    >
                        {item.key}
                    </Button>
                ))}
            </div>
            {
                ['card'].includes(tab) && <WithCard {...props}/>
            }
            {
                ['crypto'].includes(tab) && <WithCrypto {...props} />
            }
        </div>
    )
}

export default AddFunds;