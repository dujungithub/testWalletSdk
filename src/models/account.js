import { useState } from 'react';
import {loginByWallet,loginByEmail} from '@/services/account';
import { message } from 'antd';
import { useModel,history } from 'umi';
import {clearLocalstorage} from '@/utils/utils';
const useAccountModel = () => {

    const [userInfo, setUserInfo] = useState({});
    const {isMobile} = useModel('app');
    const { redirectUrl, setRedireactUrl } = useModel('common');

    const httpUserInfo = async(values) => {
        try {
          let res = await loginByEmail(values);
          const {code,data} = res;
          if(code===200){
            setUserInfo(Object.assign(getCurrentUserInfo(),data));
            localStorage.setItem('userInfo', JSON.stringify(Object.assign(getCurrentUserInfo(),data)));
            if(isMobile){
              if (redirectUrl && redirectUrl?.pathname !== '/login') {
                const { search, pathname } = redirectUrl;
                history.push(`${pathname}${search}`);
                setRedireactUrl(null);
              } else {
                history.push('/home');
              }
            }
            localStorage.removeItem('invite_token');
            window.location.reload();
          } else {
            message.error('email verification fail');
            clearLocalstorage();
          }
        } catch (e) {
          console.error(e);
        }
    };

    const getCurrentUserInfo = () => {
        const userInfo = localStorage.getItem('userInfo');
        return JSON.parse(userInfo) || {};
    };

    const clearUserData = () => {
      setUserInfo({});
    };



    const httpWalletInfo = (values) => {
      try {
        loginByWallet(values).then(res=>{
          const {code,data} = res;
          if(code===200){
            setUserInfo(Object.assign(getCurrentUserInfo(),data));
            localStorage.setItem('userInfo', JSON.stringify(Object.assign(getCurrentUserInfo(),data)));
            localStorage.removeItem('invite_token');
            // window.location.reload();
          }
        })
      } catch (e) {
        console.error(e);
      }
  };

  return {
        userInfo,
        httpUserInfo,
        getCurrentUserInfo,
        httpWalletInfo,
        clearUserData
    }
}
export default useAccountModel
