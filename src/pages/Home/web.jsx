import styles from './web.less';
import suiSvg from '@/assets/images/developer/sui.svg';
import { Parallax } from 'rc-scroll-anim';
import 'rc-scroll-anim/assets/index.css';
import Studios from './components/Studios';
import Users from './components/Users';
import Partner from './components/Partner';
import Footer from './components/Footer';
import { history } from 'umi';
import {
  useWallet,
} from '@suiet/wallet-kit';
import {TransactionBlock} from '@mysten/sui.js'

const HomeWeb = () => {
  const wallet = useWallet();
  const {
    signAndExecuteTransactionBlock
  } = wallet;

  const handleExecuteMoveCall= async (address, module, method, args) =>{
    console.log(wallet,'wallet')
    if (!address || !module || !method) return;
    try {
      const tx = new TransactionBlock();
      let argArr = [];
      if (args && args.length > 0) {
        argArr = args.map(item => tx.pure(item));
      }
      tx.moveCall({
        target:`${address}::${module}::${method}`,
        arguments: argArr
      });
      console.log(tx,'tx')
      const resData = await signAndExecuteTransactionBlock({
        transactionBlock: tx
      });
      console.log('executeMoveCall success', resData);
      console.log('executeMoveCall succeeded (see response in the console)');
    } catch (e) {
      console.error('executeMoveCall failed', e);
      console.log('executeMoveCall failed (see response in the console)');
    }
  }

  return (
       <>
        <div className={styles.home}>
          <div className={styles.mountainTop}/>
          <div className={styles.mountain_bottom}></div>
          <div className={styles.spring_water}></div>
          <div className={styles.desc} onClick={()=>handleExecuteMoveCall('0x57c53166c2b04c1f1fc93105b39b6266cb1eccbe654f5d2fc89d5b44524b11fd','nft','mint',['Suiet NFT','Suiet Sample NFT','https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4'])}>
            <p>Onboarding Millions</p>
            <p>in Web3 Games</p>
            <div onClick={() => {history.push("/games")}} className={styles.airdrop}>Play with Cubic</div>
            <div className={styles.sui}>
              <span>Built on</span>
              <img src={suiSvg} alt='suiSvg'/>
            </div>
          </div>
          <div className={styles.home_water}></div>
          <Parallax
            animation={[
              { y: 480, playScale: [0.3, 0.8] },
              // { opacity: 0, playScale: [0.2, 0.8] }
            ]}
            style={{ transform: 'translateY(330px)'}}
            className={styles.mountain_bg}
          />
        </div>
        <div className={styles.line}></div>
        <Studios/>
        <Users/>
        <Partner/>
        <Footer/>
       </>
  );
};

export default HomeWeb;
