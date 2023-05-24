import BaseLayout from '@/components/BaseLayout';
import React ,{useState,useEffect}from 'react';
import { useModel,history,useLocation} from 'umi';
import * as echarts from 'echarts';
import QRCode from 'qrcode';
import { message } from 'antd';
import html2canvas from 'html2canvas';
import { DiscordAuthAgent, SteamAuthAgent, TwitterAuthAgent } from '@cubicgames/sns-auth-sdk';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import logoSvg from '@/assets/images/game/logo.svg';
import handSvg from '@/assets/images/game/hand.svg';
import game1 from '@/assets/images/game/game1.svg';
import avatarImg from '@/assets/images/game/avatar.svg';
import timeIcon from '@/assets/images/game/days.svg';
import gamesIcon from '@/assets/images/game/games.svg';
import payTimeIcon from '@/assets/images/game/pay_time.svg';
import logoIcon from '@/assets/images/game/icon.svg';
import distributionIcon from '@/assets/images/game/distribution.png';
import favoriteIcon from '@/assets/images/game/favorite.png';
import bestIcon from '@/assets/images/game/best.png';
import invitationIcon from '@/assets/images/game/invitation.png';
import iconSteam from '@/assets/images/game/steam_icon.svg'
import plussign from '@/assets/images/game/plussign.svg'
import star from '@/assets/images/game/star.svg'
import {clearLocalstorage} from '@/utils/utils';
import { submitTask } from '@/services/games';
import { TaskStatus, TaskType, PosterStatus, MonthList } from '@/utils/enums';
import styles from './mobile.less';

const GamesMobile = ({
  taskDetail,
  shareStatus,
  shareFailMsg,
  posterDetail,
  echartsData,
  inviteNum,
  getShareStatus,
  createPosterFn,
  getTaskListFn,
  getPosterDetailFn,
  inviteLink,
}) => {
  const { getCurrentUserInfo,clearUserData } = useModel('account');
  const { setRedireactUrl } = useModel('common');
  const [showShare,setShowShare] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [discordUserInfo, setDiscordUserInfo] = useState(null);
  const [steamUserInfo, setSteamUserInfo] = useState(null);
  const [twitterUserInfo, setTwitterUserInfo] = useState(null);
  const location = useLocation();
  const discordAgent = new DiscordAuthAgent(process.env.Api);
  const steamAgent = new SteamAuthAgent(process.env.Api);
  const twitterAgent = new TwitterAuthAgent(process.env.Api);

  const gameListImg=[
    {
      iconUrl:'game_ing',
      desc:'Game name'
    },
    {
      iconUrl:'game_coming',
    },
    {
      iconUrl:'game_coming',
    },
    {
      iconUrl:'game_coming',
    },
  ];

  const getDiffDays = (second) => {
    let time1 = moment();
    let time2 = moment(second * 1000);
    return time1.diff(time2, 'day');
  };

  const recordList = [
    {
      id: 1,
      icon: timeIcon,
      label: 'Days Together',
      val: getDiffDays(posterDetail?.createdAt),
      unit: ' Days',
    },
    {
      id: 2,
      icon: gamesIcon,
      label: 'Total Games',
      val: posterDetail?.totalOwnedGames,
      unit: '',
    },
    {
      id: 3,
      icon: payTimeIcon,
      label: 'Total Playtime',
      val: posterDetail?.totalPlayingHours,
      unit: 'h',
    },
  ];

  const taskDefaultList = [
    {
      id: 5,
      icon: 'icon_wallet',
      name: 'Connect wallet',
    },
    {
      id: 4,
      icon: 'icon_email',
      name: 'Verify email',
    },
    {
      id: 1,
      icon: 'icon_twitter',
      name: 'Twitter',
      child: [
        {
          id: 2,
          text: (
              <p>
                Follow
                <a
                  target="_blank"
                  href="https://twitter.com/cubicgamesxyz"
                  rel="noreferrer"> @Cubic </a>on Twitter
              </p>
          ),
        },
        {
          id: 3,
          text: (
              <p>
                Like & Retweet
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://twitter.com/cubicgamesxyz/status/1645332213125492736"
                >  @Cubic </a>on Twitter
                </p>
          ),
        },
      ],
    },
    {
      id: 6,
      icon: 'icon_discord',
      name: 'Join the Discord',
      child: [
        {
          id: 2,
          text: (
              <p>
                Join
                <a
                  target="_blank"
                  href="https://discord.gg/BPtkXgcHwF"
                  rel="noreferrer"> @Cubic </a>on Discord
              </p>
          ),
        },
      ],
    },
    // {
    //   id: 7,
    //   icon: 'icon_steam',
    //   name: 'Sign in with Steam',
    // },
  ];

  useEffect(() => {
    if (showShare) {
      let option;
      option = {
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: 'Playing Hours',
            type: 'pie',
            radius: '80%',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: echartsData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      document.getElementById('echarts')?.removeAttribute('_echarts_instance_');
      const dom = document.getElementById('echarts');
      let myChart =
        echarts &&
        echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false,
        });
      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }

      window.addEventListener('resize', myChart.resize);

      // qrcode
      async function getQrcodeUrl() {
        try {
          const url = await QRCode.toDataURL(inviteLink);
          setImgUrl(url);
        } catch (err) {
          console.error(err);
        }
      }
      getQrcodeUrl();
    }
  }, [showShare,echartsData]);

  const discordAgentFn = async () => {
    try {
      let authInfo = await discordAgent.getAuthInfo(getCurrentUserInfo()?.access_token);
      setDiscordUserInfo(authInfo);
    } catch (err) {}
  };

  const steamAgentFn = async () => {
    try {
      let authInfo = await steamAgent.getAuthInfo(getCurrentUserInfo()?.access_token);
      setSteamUserInfo(authInfo);
      getShareStatus();
    } catch (err) {}
  };

  const twitterAgentFn = async () => {
    try {
      let authInfo = await twitterAgent.getAuthInfo(getCurrentUserInfo()?.access_token);
      setTwitterUserInfo(authInfo);
    } catch (err) {}
  };

  useEffect(() => {
    if (!getCurrentUserInfo()?.email) {
      return;
    }
    discordAgentFn();
    steamAgentFn();
    twitterAgentFn();
  }, [getCurrentUserInfo()?.email]);



  const btnHandler=()=>{
    if(getCurrentUserInfo()?.email){
      setSteamUserInfo(null);
      setDiscordUserInfo(null);
      setTwitterUserInfo(null);
      clearLocalstorage();
      clearUserData()
    }else{
      setRedireactUrl(location);
      history.push('/login');
    }
  };

  const getEmailRender = (item) => {
    let dom = null;
    if (item.status === TaskStatus.Finish) {
      dom = (
        <>{item.experience > 0 && <p className={styles.value}>+{item.experience}</p> }</>
      );
    } else {
      dom = (
        <p
          className={styles.go}
          onClick={ () => {
            history.push('/login');
          }}
        >Go</p>
      );
    }
    return dom;
  };

  const getWalletRender = (item) => {
    let dom = null;
    if (item.status === TaskStatus.Finish) {
      dom = (
        <>{item.experience > 0 && <p className={styles.value}>+{item.experience}</p> }</>
      );
    } else {
      dom = (
          <p
            className={styles.go}
          >Go</p>
      );
    }
    return dom;
  };

  const submitTaskFn = async (_id) => {
    try {
      const res = await submitTask({ id: _id });
      if (res?.code === 200) {
        message.success('Success');
        getTaskListFn();
      } else {
        message.error('Fail');
      }
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  const getTwitterRender = (item) => {
    let dom = null;
    if (!twitterUserInfo) {
      dom = (
        <p
          className={styles.go}
          onClick={async () => {
            if (!twitterUserInfo) {
              let authInfo = await twitterAgent.activate(getCurrentUserInfo()?.access_token);
              setTwitterUserInfo(authInfo);
              if (authInfo?.id) {
                submitTaskFn(item.id);
              } else {
                message.error('Auth Error');
              }
            }
          }}
        >Go</p>
      );
    } else {
      if (item.status === TaskStatus.NotStarted) {
        dom = (
          <p
            className={styles.confirm}
            onClick={async () => {
              submitTaskFn(item.id);
            }}
          >Confirm</p>
        );
      } else {
        dom = (
          <>{item.experience > 0 && <p className={styles.value}>+{item.experience}</p> }</>
        );
      }
    }
    return dom;
  };

  const getDiscordRender = (item) => {
    let dom = null;
    if (!discordUserInfo) {
      dom = (
        <p
          className={styles.go}
          onClick={async () => {
            if (!discordUserInfo) {
              let authInfo = await discordAgent.activate(getCurrentUserInfo()?.access_token);
              setDiscordUserInfo(authInfo);
              if (authInfo?.id) {
                submitTaskFn(item.id);
              } else {
                message.error('Auth Error');
              }
            }
          }}
        >Go</p>
      );
    } else {
      if (item.status === TaskStatus.NotStarted) {
        dom = (
          <p
            className={styles.confirm}
            onClick={async () => {
              submitTaskFn(item.id);
            }}
          >Confirm</p>
        );
      } else {
        dom = (
          <>{item.experience > 0 && <p className={styles.value}>+{item.experience}</p> }</>
        );
      }
    }
    return dom;
  };
  const setSteamDom = () => {
    const typeDom = taskDetail?.tasks?.find(item => { return item.type === TaskType.Steam })
    let dom = null
    if (typeDom?.id) {
      dom = (
        <div  className={styles.sign_steam}>
          <div className={styles.linear_bg}></div>
          <div className={styles.steam}>
            <div className={styles.title}>Steam</div>
            <div className={styles.steam_content}>
              <div className={styles.steam_img}>
                <img src={iconSteam} />
              </div>
              <div className={styles.steam_text}>
                Sign in with Steam
              </div>
            </div>
            {getSteamBtnRender(typeDom)}
          </div>
        </div>
      )
    }
    // console.log(typeDom);
    return dom
  }
  const getSteamBtnRender = (item) => {
    let dom = null;
    if (!steamUserInfo) {
      dom = (
        <span
          className={styles.go_btn}
          onClick={async () => {
            if (!steamUserInfo) {
              let authInfo = await steamAgent.activate(getCurrentUserInfo()?.access_token);
              setSteamUserInfo(authInfo);
              if (authInfo?.id) {
                getShareStatus();
                submitTaskFn(item.id);
                // create job
              } else {
                message.error('Auth Error');
              }
            }
          }}
        >Go</span>
      );
    } else {
      if (item.status !== TaskStatus.Finish) {
        dom = (
          <span
            className={styles.confirm}
            onClick={async () => {
              submitTaskFn(item.id);
            }}
          >Confirm</span>
        );
      } else {
        if (shareStatus !== PosterStatus.Succeeded || shareStatus === null) {
          dom = (
            <>
              <div
                className={
                  shareStatus === PosterStatus.Failed || shareStatus === null
                    ? styles.create
                    : styles.creating
                }
                onClick={() => {
                  if (shareStatus === PosterStatus.Failed || shareStatus === null) {
                    createPosterFn();
                  }
                }}
              >
                {shareStatus === PosterStatus.Failed || shareStatus === null
                  ? 'Create'
                  : 'Creating'}
              </div>
              {shareStatus === PosterStatus.Failed && (
                <div className={styles.fail_msg}>
                  {shareFailMsg || 'steam profile must be public'}
                </div>
              )}
            </>
          );
        } else {
          dom = (
            <div className={styles.share}>
              <div className={styles.share_img}>
                <img src={plussign} />
                <img src={star} />
              </div>
              <div
                onClick={() => {
                  getPosterDetailFn();
                  setShowBill(true);
                }}
                className={styles.share_btn}
              >
              Share
              </div>
            </div>
            // <p className={styles.share} onClick={()=>{
            //   getPosterDetailFn();
            //   setShowShare(true);
            // }}>+<img src={handSvg} alt='handSvg'/><span>share</span>
            // </p>
          );
        }
      }
    }
    return dom;
  };

  const getSubtaskConfirmRender = (item) => {
    let dom = null;
    if (item.status === TaskStatus.Finish) {
      dom = (
        <>{item.experience > 0 && <span className={styles.experience}>+{item.experience}</span>}</>
      );
    } else {
      if (
        ((item.type === TaskType.Follow || item.type === TaskType.Like) && twitterUserInfo?.id) ||
        (item.type === TaskType.JoinDiscord && discordUserInfo?.id)
      ) {
        dom = (
          <span
            onClick={() => {
              submitTaskFn(item.id);
            }}
          >
            Confirm
          </span>
        );
      }
    }
    return dom;
  };

  const getFormatRate = () => {
    let rate = Number(posterDetail?.mostCompletedGame?.[0].completeness).toFixed(2) * 100;
    return rate + '%';
  };

  const formatTimeFn = (timestemp) => {
    // January 1, 2020
    let year = new Date(timestemp * 1000).getFullYear();
    let month = new Date(timestemp * 1000).getMonth();
    let day = new Date(timestemp * 1000).getDate();
    return `${MonthList[month]} ${day}, ${year}`;
  };

  const hoursToDaysFn = (hours) => {
    return Math.ceil(hours / 24);
  };

  const convertToImage = async (container) => {
    container.style.scale = 1;
    const ops = {
      scale: 2,
      useCORS: true,
      allowTaint: false,
    };
    const canvasRes = await html2canvas(container, ops);
    return canvasRes.toDataURL('image/png');
  };

  const createLink=()=>{
    if(!getCurrentUserInfo()?.email){
      setRedireactUrl(location);
      history.push('/login');
    }
  }

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.desc}>
          <div className={styles.descBg}/>
          <div className={styles.descMask}>
            <p>My Cubi</p>
            <p>Welcome to get your own Cubi. </p>
          </div>
        </div>
        <div className={ getCurrentUserInfo()?.email ? `${styles.levelBox} ${styles.levelLogin}` : `${styles.levelBox}`} >
        <div className={styles.level} >
          <div className={styles.lineBg}/>
          <div className={styles.levelContent}>
            <p className={styles.levelTitle}>Level Up My Cubi</p>
            <p className={styles.levelSubTitle}>Equip your Cubi with powerful features.</p>
            <p
              className={getCurrentUserInfo()?.email ? `${styles.btn} ${styles.disconnect}` : `${styles.btn}`}
              onClick={btnHandler}
            >{getCurrentUserInfo()?.email ? 'Disconnect' : 'Login '}</p>
            {
              getCurrentUserInfo()?.email &&<div className={styles.currentLevel}>
                <div className={styles.levelDetail}>
                  <p>
                    <span>Current level：</span>
                    <span>{taskDetail?.level}</span>
                  </p>
                  <p>{taskDetail?.currEXP}/{taskDetail?.targetEXP}</p>
                </div>
                <div className={styles.progress_bar}>
                  <div
                    style={{ width: `${(taskDetail?.currEXP / taskDetail?.targetEXP) * 100}%` }}
                    className={styles.bar}
                  ></div>
                </div>
              </div>
            }
            <div className={styles.levelList}>
              {
                getCurrentUserInfo()?.email ? (
                  taskDetail?.tasks?.map(item=>(
                    item.type === TaskType.Steam ? null :
                    <div key={item.id} className={styles.item}>
                        {
                          item?.icon ? (
                            <>
                              <div className={styles.introBox}>
                                <p className={styles.intro}>
                                  <img src={item.icon} />
                                  <span>{item.title}</span>
                                </p>
                                {item.type === TaskType.Email && getEmailRender(item)}
                                {item.type === TaskType.Wallet && getWalletRender(item)}
                                {item.type === TaskType.Twitter && getTwitterRender(item)}
                                {item.type === TaskType.Discord && getDiscordRender(item)}
                                {/* {item.type === TaskType.Steam && getSteamBtnRender(item)} */}
                              </div>
                            </>
                          ): <div className={styles.detailData}>
                                <p dangerouslySetInnerHTML={{ __html: item.title }}></p>
                                {getSubtaskConfirmRender(item)}
                              </div>
                        }
                    </div>
                  ))
                ):(
                  taskDefaultList?.map(item=>(
                    <div key={item.id} className={styles.item}>
                        <div className={styles.introBox}>
                          <p className={styles.intro}>
                            <img src={require(`@/assets/images/game/${item.icon}.svg`)} alt='img'/>
                            <span>{item.name}</span>
                          </p>
                          <p className={styles.go} onClick={()=>{
                            history.push('/login');
                          }}>GO</p>
                        </div>
                        <div className={styles.detail}>
                          {item?.child?.map((subtask) => {
                            return <div key={subtask.id}>{subtask.text}</div>;
                          })}
                        </div>
                    </div>
                  ))
                )
              }
            </div>
          </div>
        </div>
        </div>
        {
          getCurrentUserInfo()?.email ? setSteamDom() :
          <div className={styles.sign_steam}>
            <div className={styles.linear_bg}></div>
            <div className={styles.steam}>
              <div className={styles.title}>Steam</div>
              <div className={styles.steam_content}>
                <div className={styles.steam_img}>
                  <img src={iconSteam} />
                </div>
                <div className={styles.steam_text}>
                  Sign in with Steam
                </div>
                <div className={styles.steam_btn}>
                  <span
                    className={styles.go_btn}
                    onClick={() => {
                      history.push('/login');
                    }}
                  >
                    Go
                  </span>
                </div>
              </div>
            </div>
          </div>
        }

        <div className={styles.invite}>
            <p>Invite your friends</p>
            <p>Send the link to your gamer friends. ({inviteNum}/5)</p>
            {
              getCurrentUserInfo()?.email  && inviteLink  ? <div className={styles.copyLink}>
                <span className={styles.invite_link}> {inviteLink || 'Link'}</span>
                <CopyToClipboard
                  text={inviteLink || 'Link'}
                  onCopy={() => {
                  message.success('Successfully copied');
                  }}
                >
                <span className={styles.copy}>Copy</span>
                </CopyToClipboard>
            </div>:
              <div onClick={createLink} className={styles.link}>Create invitation links</div>
            }
        </div>
        <div className={styles.gameList}>
            <p className={styles.gameTitle}>Game List</p>
            <div className={styles.game}>
              {
                gameListImg?.map((item,index)=>(
                  <div className={styles.gameItem} key={index}>
                    <img src={require(`@/assets/images/game/${item.iconUrl}.svg`)} alt='img'/>
                    <span>{item?.desc}</span>
                    {
                      item?.desc && <div className={styles.descMask}/>
                    }
                  </div>
                ))
              }
            </div>
        </div>
        <div className={styles.footer}>
            <img src={logoSvg} alt='logoSvg'/>
            <span>© 2023 Cubic . All rights reserved.</span>
        </div>
        {showShare && (
          <div
            className={styles.game_bill}
            onClick={() => {
              setShowShare(false);
            }}
          >
             <div className={styles.bill_container} id="bill_container">
              <div className={styles.bill_title}>
                <div>My Steam Journey</div>
                <span>By Cubic</span>
              </div>
              <div className={styles.bill_content}>
                <div className={styles.bill_games}>
                <div className={styles.bill__title}><img src={distributionIcon}/></div>
                  <div className={styles.block}></div>
                  <div className={styles.echarts} id="echarts"></div>
                  <div className={styles.bill__title}><img src={favoriteIcon}/></div>
                  <div className={styles.bill_game_item}>
                    <div className={styles.item_mask}>
                      <div className={styles.item__name}>
                        Playtime：<span>{posterDetail?.mostPlayedGames?.[0].playingHours}h</span>
                      </div>
                    </div>
                    <div className={styles.game_image}>
                      <img src={posterDetail?.mostPlayedGames?.[0].bannerURL || game1} />
                    </div>
                  </div>
                  <div className={styles.bill__title}><img src={bestIcon}/></div>
                  <div className={styles.bill_game_item}>
                    <div className={styles.item_mask}>
                      <div className={styles.item__name}>
                        Achievements:<span>{posterDetail?.mostCompletedGame?.[0].achieved}/
                        {posterDetail?.mostCompletedGame?.[0].total}({getFormatRate()})</span>
                      </div>
                    </div>
                    <div className={styles.game_image}>
                      <img src={posterDetail?.mostCompletedGame?.[0].bannerURL || game1} />
                    </div>
                  </div>
                </div>
                <div className={styles.personal_info}>
                  <div className={styles.introduce}>
                    <img src={posterDetail?.avatar || avatarImg} />
                    <div className={styles.start_time}>
                      <div className={styles.info_name}>I am {posterDetail?.name} , </div>
                      <div className={styles.info_time}>
                        officially became a Steam player on{' '}
                        <span>{formatTimeFn(posterDetail?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.record}>
                    <div className={styles.record_list}>
                      {recordList?.map((item) => {
                        return (
                          <div key={item.id} className={styles.record_item}>
                            <img src={item.icon} alt="" />
                            <span>{item.label}</span>
                            <div>{`${item.val}${item.unit}`}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.defeat_rate}>
                      <div className={styles.cup}></div>
                      <div className={styles.rate}>
                        Beating<span>{posterDetail?.rank?.toFixed(2) * 100}%</span>of Global Players
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.game_socialize}>
                  <div className={styles.total_firends}>
                    <div>In the world of Steam,</div>
                    <div>I have {posterDetail?.friendSummary?.totalFriends || 0}{' '}
                    friends</div>
                  </div>
                  <div className={styles.socialize_title}>Since Our First Encounter</div>
                  <div className={styles.firend_list}>
                    {posterDetail?.friendSummary?.topFriends?.map((item) => {
                      return (
                        <div key={item.id} className={styles.firend_item}>
                          <img src={item.avatar} />
                          <div className={styles.item_days}>
                            <span>{hoursToDaysFn(item.duration)}</span> Days
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.bill__title}><img src={invitationIcon}/></div>
                  <div className={styles.qr_code}>
                    <img src={imgUrl} />
                  </div>
                </div>
              </div>
              <div className={styles.bg_bottom}>
                <img src={logoIcon} />
              </div>
            </div>
            <div className={styles.bth_list}>
              <div
                className={styles.download}
                onClick={async (e) => {
                  const dom = document.getElementById('bill_container');
                  const imgBlobData = await convertToImage(dom);
                  const a = document.createElement('a');
                  a.href = imgBlobData;
                  a.download = 'poster';
                  a.click();
                }}
              >
                Download
              </div>
              <div
                className={styles.cancel}
                onClick={() => {
                  setShowShare(false);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default GamesMobile;
