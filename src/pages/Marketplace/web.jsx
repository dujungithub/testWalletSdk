import BaseLayout from '@/components/BaseLayout';
import React,{useEffect} from 'react';
import styles from './web.less';
import footLogo from '@/assets/images/developer/foot_logo.svg';
import {SDK,TickMath,ClmmPoolUtil,d,sendTransaction,Percentage,adjustForCoinSlippage,creatPoolTransactionPayload} from '@cetusprotocol/cetus-sui-clmm-sdk';
import { RawSigner,signAndExecuteTransactionBlock,Ed25519Keypair } from '@mysten/sui.js'
import BN from 'bn.js'
import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js';
import { Network, TurbosSdk } from 'turbos-clmm-sdk';

const MarketplaceWeb = () => {
  const SDKConfig = {
    testnet:  {
       clmmConfig: {
        pools_id: '0xc090b101978bd6370def2666b7a31d7d07704f84e833e108a969eda86150e8cf',
        global_config_id: '0x6f4149091a5aea0e818e7243a13adcfb403842d670b9a2089de058512620687a',
        global_vault_id: '0xf3114a74d54cbe56b3e68f9306661c043ede8c6615f0351b0c3a93ce895e1699'
      },
      tokenConfig: {
       coin_registry_id: '0xb52e4b2bef6fe50b91680153c3cf3e685de6390f891bea1c4b6d524629f1f1a9',
       pool_registry_id: '0x68a66a7d44840481e2fa9dce43293a31dced955acc086ce019853cb6e6ab774f',
       coin_list_owner: '0x1370c41dce1d5fb02b204288c67f0369d4b99f70df0a7bddfdcad7a2a49e3ba2',
       pool_list_owner: '0x48bf04dc68a2b9ffe9a901a4903b2ce81157dec1d83b53d0858da3f482ff2539'
      },
    },
    mainnet: {
      clmmConfig: {
        pools_id: '0xf699e7f2276f5c9a75944b37a0c5b5d9ddfd2471bf6242483b03ab2887d198d0',
        global_config_id: '0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f',
        global_vault_id: '0xce7bceef26d3ad1f6d9b6f13a953f053e6ed3ca77907516481ce99ae8e588f2b'
      },
      tokenConfig: {
        coin_registry_id: '0xe0b8cb7e56d465965cac5c5fe26cba558de35d88b9ec712c40f131f72c600151',
        pool_registry_id: '0xab40481f926e686455edf819b4c6485fbbf147a42cf3b95f72ed88c94577e67a',
        coin_list_owner: '0x1f6510ee7d8e2b39261bad012f0be0adbecfd75199450b7cbf28efab42dad083',
        pool_list_owner: '0x6de133b609ea815e1f6a4d50785b798b134f567ec1f4ee113ae73f6900b4012d'
      },
    }
  }
  const netConfig = {
    testnet: {
      fullRpcUrl: 'https://fullnode.testnet.sui.io',
      faucetURL: '',
      faucet: {
        faucet_display: '',
        faucet_router: '',
      },
      simulationAccount: {
        address: '',
      },
      token: {
        token_display: '',
        config: SDKConfig.testnet.tokenConfig,
      },
      clmm: {
        clmm_display: '0x0868b71c0cba55bf0faf6c40df8c179c67a4d0ba0e79965b68b3d72d7dfbf666',
        clmm_router: {
          cetus: '0x3a86c278225173d4795f44ecf8cfe29326d701be42b57454b05be76ad97227a7',
          deepbook: '',
        },
        config: SDKConfig.testnet.clmmConfig,
      }
    },
    mainnet: {
      fullRpcUrl: 'https://fullnode.mainnet.sui.io',
      faucetURL: '',
      faucet: {
        faucet_display: '0x4d892ceccd1497b9be7701e09d51c580bc83f22c9c97050821b373a77d0d9a9e',
        faucet_router: '0xff3004dc90fee6f7027040348563feb866a61c8bb53049cc444c1746db8b218d',
      },
      simulationAccount: {
        address: '0x326ce9894f08dcaa337fa232641cc34db957aec9ff6614c1186bc9a7508df0bb',
      },
      token: {
        token_display: '0x481fb627bf18bc93c02c41ada3cc8b574744ef23c9d5e3136637ae3076e71562',
        config: SDKConfig.mainnet.tokenConfig,
      },
      clmm: {
        clmm_display: '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        clmm_router: {
          cetus: '0x2eeaab737b37137b94bfa8f841f92e36a153641119da3456dec1926b9960d9be',
          deepbook: '',
        },
        config: SDKConfig.mainnet.clmmConfig,
      },
    }
  }

  const buildTestAccount=()=>{
    const mnemonics = ''
    const testAccountObject = Ed25519Keypair.deriveKeypair(mnemonics)
    // console.log(' Address: ', testAccountObject.getPublicKey().toSuiAddress())
  
    return testAccountObject
  }

  const getSdkData = async()=>{
    //select net type
    const sdk = new SDK(netConfig.mainnet)
    // // When connecting the wallet, set the wallet address
    sdk.senderAddress = '22222'
    //create clmm pool and add liquidity
    // const signer = new RawSigner(buildTestAccount(), sdk.fullClient)
    const keypair = new Ed25519Keypair();
    const provider = new JsonRpcProvider();
    const signer = new RawSigner(keypair, provider);
    console.log(signer,'signer')
    // initialize sqrt_price
    const initialize_sqrt_price = TickMath.priceToSqrtPriceX64(d(1.2),6,6).toString()
    const tick_spacing = 2
    const tick_spacings = 2
    const current_tick_index = TickMath.sqrtPriceX64ToTickIndex(new BN(initialize_sqrt_price))
    // build tick range
    const lowerTick = TickMath.getPrevInitializableTickIndex(new BN(current_tick_index).toNumber()
        , new BN(tick_spacing).toNumber())
    const upperTick = TickMath.getNextInitializableTickIndex(new BN(current_tick_index).toNumber()
        , new BN(tick_spacings).toNumber())
    // input token amount
    const fix_coin_amount = new BN(200)
    // input token amount is token a
    const fix_amount_a = true
    // slippage value
    const slippage = 0.05
    const poolList =  await sdk.Token.getAllRegisteredPoolList()
    //my write address
    const poolAddress = poolList?.[0]?.address
    const pool = await sdk.Resources.getPool(poolAddress)
    const curSqrtPrice = new BN(pool.current_sqrt_price)
    // Estimate liquidity and token amount from one amounts
    const liquidityInput = ClmmPoolUtil.estLiquidityAndcoinAmountFromOneAmounts(
            lowerTick,
            upperTick,
            fix_coin_amount,
            fix_amount_a,
            true,
            slippage,
            curSqrtPrice
          )
    // Estimate  token a and token b amount
    const amount_a = fix_amount_a ? fix_coin_amount.toNumber()  : liquidityInput.tokenMaxA.toNumber()
    const amount_b = fix_amount_a ? liquidityInput.tokenMaxB.toNumber()  : fix_coin_amount.toNumber()

    // build creatPoolPayload Payload
    const creatPoolPayload = await sdk.Pool.creatPoolTransactionPayload({
        coinTypeA: `0x3cfe7b9f6106808a8178ebd2d5ae6656cd0ccec15d33e63fd857c180bde8da75::coin:CetusUSDT`,
        coinTypeB: `0x3cfe7b9f6106808a8178ebd2d5ae6656cd0ccec15d33e63fd857c180bde8da75::coin::CetusUSDC`,
        tick_spacing: tick_spacing,
        initialize_sqrt_price: initialize_sqrt_price,
        uri: '',
        amount_a: amount_a,
        amount_b: amount_b,
        fix_amount_a: fix_amount_a,
        tick_lower: lowerTick,
        tick_upper: upperTick
      })

      console.log(creatPoolPayload,'creatPoolTransactionPayload')

    // send the transaction
    const transferTxn = await sendTransaction(signer, creatPoolTransactionPayload,true)
    console.log('doCreatPool: ', transferTxn)
  }

  const getTurbosData= async()=>{
    const provider = new JsonRpcProvider(testnetConnection);
    const sdk = new TurbosSdk(provider, Network.testnet);
    const mnemonic = sdk.account.generateMnemonic(); // OR from your own
    const keypair = sdk.account.getKeypairFromMnemonics(mnemonic);
    const signer = new RawSigner(keypair, provider);
    const result = await sdk.pool.createPool({
      address: '0x12345abcde',
      fee: '0xd58ce57234701d2d7427cb1c4e8168b498a469198983f37f4bbd61787634633d',
      coins: ['0x2::sui:SUI', '0x123abcd::coin:COIN'],
      amount: [5, 10],
      currentPrice: 200,
      minPrice: 100,
      maxPrice: 1000,
      slippage: 0.2,
      signAndExecute(txb, provider) {
        return signer.signAndExecuteTransactionBlock(txb);
      },
    });
    // console.log(result,'result')
    // const result = await sdk.pool.createPool({
    //   pool: '0x1234567abcdefg', // Pool ID
    //   address: '0x12345abcde',
    //   amount: [5, 10],
    //   minPrice: 100,
    //   maxPrice: 1000,
    //   slippage: 0.2,
    //   signAndExecute(txb, provider) {
    //     return signer.signAndExecuteTransactionBlock(txb);
    //   },
    // });
  }

  useEffect(()=>{
    getSdkData()
    // getTurbosData()
  },[])
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.bgTop}/>
        <div className={styles.bgBottom}/>
        <div className={styles.letter}>
           <div className={styles.desc}>Coming soon...</div>
        </div>
        <div className={styles.footer}>
            <img src={footLogo} alt='footLogo'/>
            <p>© 2023 Cubic . All rights reserved.</p>
        </div>
      </div>
    </BaseLayout>
  );
};

export default MarketplaceWeb;