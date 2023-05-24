import BaseLayout from '@/components/BaseLayout';
import React,{useEffect, useRef, useState} from 'react';
import styles from './index.less';
import TypeWriter from "typewriter-effect";
import {useModel,history} from 'umi';
import {Input} from 'antd';
import {SendOutlined,LoadingOutlined} from '@ant-design/icons';
import {chatByStart,chatByAnswers,chatByStop} from '@/services/chat';

const messageType = {
  answer: "answer",
  question: "question"
};

const ChatWeb = () => {
  const {isMobile} = useModel('app');
  const inputRef = useRef();
  const chatWrapperRef = useRef();
  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [current,setCurrent] = useState(null)
  const [showmask,setShowMask] = useState(null)
  let timer = null;

  const nftList=[
    {
        name:'Quiz Game',
        desc:'Interactive NFT, users can play guessing games with AI bots, each NFT is a different scene, currently NFT is still in the development and testing stage',
        properties:[
            {
                name:'Scene',
                value:'Movies',
            }
        ],
        nftAddress:'0x6638....6d0734',
        ownerAddress:'0x6638....6d0734',
        tokenId:'token1',
        stopId:'token2'
    }
  ]

  useEffect(() => {
    if(isMobile){
        history.push('/home');
    }else{
        history.push('/room-chat');
    }
  }, [isMobile]);

  useEffect(() => {
    return () => {
        current?.stopId && callInterface(chatByStop,'get',current.stopId);
        if (timer) clearInterval(timer);
    };
  }, []);

  const clickHandler=(item)=>{
    callInterface(chatByStart,'get',item.tokenId);
    setCurrent(item);
    setShowMask(true);
    getFocus();
  }

  const getFocus=()=>{
    timer = setTimeout(() => {
        chatWrapperRef?.current?.addEventListener("DOMNodeInserted", e => {
          e.currentTarget.scroll({
            top: e.currentTarget.scrollHeight,
            behavior: "smooth"
          });
        });
      }, 200);
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13) question&&callInterface(chatByAnswers,'post',current.tokenId);
  };

  const callInterface=(callFn,type,tokenId)=>{
    try{
        if (onRequest) return;
        const params = {answer:{'content':question}};
        const newMessages = [...messages, {
        type: messageType.question,
        content: question
        }];
        setMessages(newMessages);
        setQuestion("");
        setOnRequest(true);
        if(type ==='get'){
            callFn(tokenId).then(res=>{
                setOnRequest(false);
                if(res){
                    setMessages([...newMessages, {
                        type: messageType.answer,
                        content: res.answer
                    }]);
                }
            })
        }else{
            callFn(params,tokenId).then(res=>{
                setOnRequest(false);
                if(res){
                    setMessages([...newMessages, {
                        type: messageType.answer,
                        content: res.answer
                    }]);
                }
            })
        }
    }catch{
        setOnRequest(false);
        console.error(e);
    }
  }

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.nftList}>
            {
                nftList?.map((item,index)=>(
                    <div key={index} className={styles.nftItem}>
                        <div className={styles.nftImg}>
                            <div className={styles.chatDesc} onClick={e=>clickHandler(item,e)}>CHAT</div>
                            {
                                showmask && <div className={styles.chatItem}>
                                    <div className={styles.messageItem} ref={chatWrapperRef}>
                                    {messages.map((item, index) => (
                                        <div key={index} className={item.type === messageType.answer ? styles.answerItem : styles.questionItem}>
                                        {index === messages.length - 1 ? (
                                            item.type === messageType.answer ? (
                                            <TypeWriter onInit={(writer) => {
                                                writer.typeString(item.content)
                                                .callFunction(() => {
                                                    document.querySelector(".Typewriter__cursor").style.display = "none";
                                                    setOnRequest(false);
                                                    setTimeout(() => {
                                                    inputRef.current.focus();
                                                    }, 200);
                                                })
                                                .changeDelay(50)
                                                .start();
                                            }} />
                                            ) : item.content
                                        ) : (
                                            item.content
                                        )}
                                        </div>
                                    ))}
                                    </div>
                                    <div className={styles.inputItem}>
                                    <Input
                                        ref={inputRef}
                                        bordered={false}
                                        disabled={onRequest}
                                        onPressEnter={onEnterPress}
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder="Guess?"
                                    />
                                    {
                                        onRequest ? <LoadingOutlined style={{fontSize:24,color:'#FFF'}}/> : <SendOutlined style={{fontSize:24,color:'#FFF'}}/>
                                    }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles.nftDetailBox}>
                            <p >{item.name} <span>#{item.tokenId}</span></p>
                            <div className={styles.nftDetail}>
                                <p className={styles.desc}>Description</p>
                                <p className={styles.descInfo}>{item.desc}</p>
                                <p className={styles.desc}>Properties</p>
                                <div className={styles.propertiesBox}>
                                    {
                                        item?.properties?.map((ite,idx)=>(
                                            <div key={idx} className={styles.properties}>
                                                <span>{ite.name}</span>
                                                <span>{ite.value}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <p className={styles.desc}>Details</p>
                                <div className={styles.detailInfo}>
                                    <p>
                                        <span>NFT Address</span>
                                        <span>{item.nftAddress}</span>
                                    </p>
                                    <p>
                                        <span>Owner Address</span>
                                        <span>{item.ownerAddress}</span>
                                    </p>
                                    <p>
                                        <span>Token ID</span>
                                        <span>{item.tokenId}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </BaseLayout>
  );
};

export default ChatWeb;