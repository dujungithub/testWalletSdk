import { useState } from 'react';
import { useModel } from 'umi';
import WebDeveloper from './web';
import MobileDeveloper from './mobile';
import { useEffect } from 'react';
import {
  getTaskList,
  getSNSStatus,
  createPoster,
  getSNSDetail,
  getInviteLink,
} from '@/services/games';
import { message } from 'antd';

const Games = () => {
  const { isMobile } = useModel('app');
  const { getCurrentUserInfo } = useModel('account');
  const [taskDetail, setTaskDetail] = useState([]);
  const [shareStatus, setShareStatus] = useState(false);
  const [shareFailMsg, setShareFailMsg] = useState('');
  const [posterDetail, setPosterDetail] = useState(null);
  const [echartsData, setEchartsData] = useState([]);
  const [inviteLink, setInviteLink] = useState('');
  const [inviteNum, setInviteNum] = useState(0);

  // get task
  const getTaskListFn = async () => {
    const res = await getTaskList();
    if (res?.code === 200) {
      setTaskDetail(res?.data);
    } else {
      message.error(res.message || 'error');
    }
  };

  const getShareStatus = async (type) => {
    // share
    const res = await getSNSStatus();
    if (res?.code === 0) {
      setShareStatus(res?.data?.status || null);
      setShareFailMsg(res?.data?.err || '');
    } else {
      // message.error(res.message || "error")
    }
  };
  const createPosterFn = async () => {
    const res = await createPoster();
    if (res?.code === 0) {
      // message.success('Success');
      const resStatus = await getSNSStatus();
      if (resStatus?.code === 0) {
        setShareStatus(resStatus?.data?.status || null);
        setShareFailMsg(resStatus?.data?.err || '');
      }
      let count = 0;
      let timer = null;
      timer = setInterval(async()=>{
        const res = await getSNSStatus();
        if (res?.code === 0) {
          setShareStatus(res?.data?.status || null);
          setShareFailMsg(res?.data?.err || '');
          if(res?.data?.status===1 && count > 3){
            message.error(res?.data?.err)
          }else if(res?.data?.status===2){
            message.success('Success');
          }else if(res?.data?.status===3){
            message.error('Something Went Wrong. Please try later or use another Steam account.')
          }
          if(res?.data?.status===2 ||res?.data?.status===3 ){
            timer && clearInterval(timer);
          }
          if(count<4){
            count+=1;
          }else{
            timer && clearInterval(timer);
          }
        } else {
          // message.error(res.message || "error")
        }
      },5000)
    } else {
      message.error(res.message || 'error');
    }
  };

  const getPosterDetailFn = async () => {
    const res = await getSNSDetail();
    if (res?.code === 200) {
      setPosterDetail(res.data);
      formatDetail(res.data);
    } else {
      message.error(res.message || 'error');
    }
  };

  const formatDetail = (record) => {
    const total = record?.totalPlayingHours;
    let arr = record?.mostPlayedGames?.slice(0, 3);
    let data = [];
    let hours = 0;
    arr.forEach((item) => {
      hours += item.playingHours;
      data.push({
        value: item.playingHours,
        name: item.name,
      });
    });
    data.push({
      value: total - hours,
      name: 'other',
    });
    setEchartsData(data);
  };

  const getInviteLinkFn = async () => {
    const res = await getInviteLink();
    console.log(res);
    if (res?.code === 200) {
      const url = res?.data?.invitaionCode
        ? `${window.location.origin}/home?code=${res?.data?.invitaionCode}`
        : '';
      setInviteLink(url);
      setInviteNum(res?.data.amount)
    } else {
      message.error(res?.message || 'Error');
    }
  };


  useEffect(() => {
    if (getCurrentUserInfo()?.access_token) {
      // get task
      getTaskListFn();
      getInviteLinkFn();
    }
  }, [getCurrentUserInfo()?.access_token]);

  const webProps = {
    shareFailMsg,
    taskDetail,
    shareStatus,
    posterDetail,
    echartsData,
    inviteLink,
    inviteNum,
    getShareStatus,
    getTaskListFn,
    createPosterFn,
    getPosterDetailFn,
    getInviteLinkFn,
  };

  return isMobile ? <MobileDeveloper {...webProps}/> : <WebDeveloper {...webProps} />;
};

export default Games;
