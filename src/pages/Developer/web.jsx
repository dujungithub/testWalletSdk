import BaseLayout from '@/components/BaseLayout';
import React from 'react';
import styles from './web.less';
import footLogo from '@/assets/images/developer/foot_logo.svg';
import WormholeBridge from '@wormhole-foundation/wormhole-connect';

const DeveloperWeb = () => {
  const config = {
    environment: "mainnet",
    networks: [],
    tokens: ["ETH", "WETH", "MATIC", "WMATIC"],
  }
 return(
    <BaseLayout>
      <div className={styles.container}>
        <WormholeBridge config={config} />
      </div>
  </BaseLayout>
 )
};

export default DeveloperWeb;
