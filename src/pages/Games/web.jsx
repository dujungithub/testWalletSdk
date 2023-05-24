import BaseLayout from '@/components/BaseLayout';
import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import * as echarts from 'echarts';
import { DiscordAuthAgent, SteamAuthAgent, TwitterAuthAgent } from '@cubicgames/sns-auth-sdk';
import QRCode from 'qrcode';
import { message } from 'antd';
import html2canvas from 'html2canvas';
import { submitTask } from '@/services/games';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './web.less';
import game1 from '@/assets/images/game/game1.svg';
import comingSoonImg from '@/assets/images/game/coming.svg';
import twitterImg from '@/assets/images/game/icon_twitter.svg';
import emailIcon from '@/assets/images/game/email.svg';
import walletIcon from '@/assets/images/game/icon_wallet.svg';
import discordIcon from '@/assets/images/game/icon_discord.svg';
import steamIcon from '@/assets/images/game/icon_steam.svg';
import avatarImg from '@/assets/images/game/avatar.svg';
import timeIcon from '@/assets/images/game/days.svg';
import gamesIcon from '@/assets/images/game/games.svg';
import payTimeIcon from '@/assets/images/game/pay_time.svg';
import logoIcon from '@/assets/images/game/icon.svg';
import logoSvg from '@/assets/images/common/logos.svg';
import { TaskStatus, TaskType, PosterStatus, MonthList } from '@/utils/enums';
import { clearLocalstorage } from '@/utils/utils';
import distributionIcon from '@/assets/images/game/distribution.svg';
import favoriteIcon from '@/assets/images/game/favorite.svg';
import bestIcon from '@/assets/images/game/best.svg';
import invitationIcon from '@/assets/images/game/invitation.svg';
import iconSteam from '@/assets/images/game/steam_icon.svg'
import plussign from '@/assets/images/game/plussign.svg'
import star from '@/assets/images/game/star.svg'
const GamesWeb = ({
  taskDetail,
  shareStatus,
  shareFailMsg,
  posterDetail,
  echartsData,
  inviteNum,
  getTaskListFn,
  getShareStatus,
  createPosterFn,
  getPosterDetailFn,
  getInviteLinkFn,
  inviteLink,
}) => {
  const [showGame, setShowGame] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const { setShowLoginModal, setShowEmailModal,setIsVerifyModal } = useModel('common');
  const { setIsShowWallet } = useModel('wallet');
  const { getCurrentUserInfo, clearUserData } = useModel('account');
  const [isLogin, setIsLogin] = useState(false);
  const [discordUserInfo, setDiscordUserInfo] = useState(null);
  const [steamUserInfo, setSteamUserInfo] = useState(null);
  const [twitterUserInfo, setTwitterUserInfo] = useState(null);
  const [showLink, setShowLink] = useState(false);
  const discordAgent = new DiscordAuthAgent(process.env.Api);
  const steamAgent = new SteamAuthAgent(process.env.Api);
  const twitterAgent = new TwitterAuthAgent(process.env.Api);
  useEffect(() => {
    setIsLogin(getCurrentUserInfo()?.access_token);
  }, [getCurrentUserInfo]);

  const gameList = [
    {
      id: 1,
      image: game1,
      name: 'BattleShipforSui',
      url: 'https://zkgamesdev.cubicgames.xyz/',
    },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  const taskDefaultList = [
    {
      id: 5,
      icon: walletIcon,
      name: 'Connect wallet',
    },
    {
      id: 4,
      icon: emailIcon,
      name: 'Verify email',
    },
    {
      id: 1,
      icon: twitterImg,
      name: 'Twitter',
      child: [
        {
          id: 2,
          text: (
            <div className={styles.twitter_task}>
              <div>
                Follow{' '}
                <a target="_blank" href="https://twitter.com/cubicgamesxyz" className={styles.mark} rel="noreferrer">
                  @ Cubic
                </a>{' '}
                on Twitter
              </div>
            </div>
          ),
        },
        {
          id: 3,
          text: (
            <div className={styles.twitter_task}>
              <div>
                Like & Retweet{' '}
                <a
                  target="_blank"
                  href="https://twitter.com/cubicgamesxyz/status/1645332213125492736"
                  className={styles.mark} rel="noreferrer"
                >
                  @ Cubic
                </a>{' '}
                on Twitter
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 6,
      icon: discordIcon,
      name: 'Join the Discord',
      child: [
        {
          id: 2,
          text: (
            <div className={styles.twitter_task}>
              <div>
                Join
                <a target="_blank" href="https://discord.gg/BPtkXgcHwF" className={styles.mark} rel="noreferrer">
                  @ Cubic
                </a>{' '}
                on Discord
              </div>
            </div>
          ),
        },
      ],
    },
    // {
    //   id: 7,
    //   icon: steamIcon,
    //   name: 'Sign in with Steam',
    // },
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

  const convertToImage = async (container, options = {}) => {
    const scale = window.devicePixelRatio;

    const _width = container.offsetWidth;
    const _height = container.offsetHeight;

    let { width, height } = options;
    width = width || _width;
    height = height || _height;

    const ops = {
      scale: 2,
      // width,
      // height,
      useCORS: true,
      allowTaint: false,
      ...options,
    };
    const canvasRes = await html2canvas(container, ops);
    return canvasRes.toDataURL('image/png');
  };

  useEffect(() => {
    if (showBill) {
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
  }, [showBill, echartsData]);

  useEffect(() => {
    if (getCurrentUserInfo()?.access_token) {
      discordAgentFn();
      steamAgentFn();
      twitterAgentFn();
    }
  }, [getCurrentUserInfo()?.access_token]);

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
        >
          Go
        </span>
      );
    } else {
      if (item.status != TaskStatus.Finish) {
        dom = (
          <span
            className={styles.confirm}
            onClick={async () => {
              submitTaskFn(item.id);
            }}
          >
            Confirm
          </span>
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
          );
        }
      }
    }
    return dom;
  };

  const getDiscordRender = (item) => {
    let dom = null;
    if (!discordUserInfo) {
      dom = (
        <span
          className={styles.go_btn}
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
        >
          Go
        </span>
      );
    } else {
      if (item.status === TaskStatus.NotStarted) {
        dom = (
          <span
            className={styles.confirm}
            onClick={async () => {
              submitTaskFn(item.id);
            }}
          >
            Confirm
          </span>
        );
      } else {
        dom = (
          <>
            {item.experience > 0 && <span className={styles.experience}>+{item.experience}</span>}
          </>
        );
      }
    }
    return dom;
  };

  const getTwitterRender = (item) => {
    let dom = null;
    if (!twitterUserInfo) {
      dom = (
        <span
          className={styles.go_btn}
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
        >
          Go
        </span>
      );
    } else {
      if (item.status === TaskStatus.NotStarted) {
        dom = (
          <span
            className={styles.confirm}
            onClick={async () => {
              submitTaskFn(item.id);
            }}
          >
            Confirm
          </span>
        );
      } else {
        dom = (
          <>
            {item.experience > 0 && <span className={styles.experience}>+{item.experience}</span>}
          </>
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
  const getEmailRender = (item) => {
    let dom = null;
    if (item.status === TaskStatus.Finish) {
      dom = (
        <>{item.experience > 0 && <span className={styles.experience}>+{item.experience}</span>}</>
      );
    } else {
      dom = (
        <span
          className={styles.go_btn}
          onClick={async () => {
            setIsVerifyModal(true);
            setShowEmailModal(true);
          }}
        >
          Go
        </span>
      );
    }
    return dom;
  };

  const getWalletRender = (item) => {
    let dom = null;
    if (item.status === TaskStatus.Finish) {
      dom = (
        <>{item.experience > 0 && <span className={styles.experience}>+{item.experience}</span>}</>
      );
    } else {
      dom = (
        <span
          className={styles.go_btn}
          onClick={async () => {
            setIsShowWallet(true);
          }}
        >
          Go
        </span>
      );
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

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.container_bg_top}></div>
        <div className={styles.container_bg_bottom}>
          <img src={logoSvg} />
          <span>© 2023 Cubic . All rights reserved.</span>
        </div>
        <div className={styles.game_container}>
          <div className={styles.game_part}>
            {/* online games */}
            <div className={styles.game_play}>
              <div className={styles.mask}>
                {console.log(process.env.GameLink)}
                {showGame && isLogin ? (
                  <iframe
                    style={{ width: '100%', height: '100%', borderRadius: '17px' }}
                    src={`${process.env.GameLink}?token=${
                      getCurrentUserInfo()?.access_token
                    }`}
                  />
                ) : (
                  <>
                    <div className={styles.mask_img}></div>
                    <div className={styles.mask_bottom}>
                      <div className={styles.game_name}>My Cubi</div>
                      <div className={styles.game_info}>
                      Welcome to get your own Cubi. Cubi will accompany you to explore this magical new era.{' '}
                      </div>
                      <div
                        className={styles.game_btn}
                        onClick={() => {
                          if (isLogin) {
                            setShowGame(true);
                          } else {
                            setShowLoginModal(true);
                          }
                        }}
                      >
                        Play with Cubi
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* games list */}
            <div className={styles.game_list}>
              <div className={styles.title}>Game List</div>
              <div className={styles.list}>
                {gameList?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={item.url ? styles.item_jump : styles.item}
                      onClick={() => {
                        if (item.url) {
                          window.open(item.url);
                        }
                      }}
                    >
                      {item.image && (
                        <div className={styles.item_mask}>
                          {item.name && <div className={styles.item_name}>{item.name}</div>}
                        </div>
                      )}
                      <div className={styles.game_image}>
                        <img src={item.image || comingSoonImg} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.game_status}>
            <div className={styles.account_wrap}>
              <div className={styles.linear_bg}></div>
              <div className={styles.account}>
                <div className={styles.title}>Level Up My Cubi</div>
                <div className={styles.welcome}>Equip your Cubi with powerful features.</div>
                <div
                  className={isLogin ? styles.disconnect : styles.login}
                  onClick={() => {
                    if (isLogin) {
                      setSteamUserInfo(null);
                      setDiscordUserInfo(null);
                      setTwitterUserInfo(null);
                      clearLocalstorage();
                      clearUserData();
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                >
                  {isLogin ? 'Disconnect' : 'Log in'}
                </div>
                {isLogin && (
                  <div className={styles.level_line}>
                    <div className={styles.current_level}>
                      <div className={styles.level}>
                        Current level：<span>{taskDetail?.level}</span>
                      </div>
                      <span className={styles.value}>
                        {taskDetail?.currEXP}/{taskDetail?.targetEXP}
                      </span>
                    </div>
                    <div className={styles.progress_bar}>
                      <div
                        style={{ width: `${(taskDetail?.currEXP / taskDetail?.targetEXP) * 100}%` }}
                        className={styles.bar}
                      ></div>
                    </div>
                  </div>
                )}
                <div className={styles.divide_line}></div>
                {isLogin ? (
                  <>
                    {taskDetail?.tasks?.map((item) => {
                      return (
                        item.type === TaskType.Steam ? null :
                        <div key={item.id}>
                          <div
                            onClick={() => {}}
                            className={item.icon ? styles.task_item : styles.twitter_task}
                          >
                            {item.icon ? (
                              <>
                                <div className={styles.task_name}>
                                  <img src={item.icon} />
                                  <span>{item.title}</span>
                                </div>
                                {item.type === TaskType.Email && getEmailRender(item)}
                                {item.type === TaskType.Wallet && getWalletRender(item)}
                                {/* {item.status !== TaskStatus.NotStarted ? ( */}
                                {item.type === TaskType.Twitter && getTwitterRender(item)}
                                {item.type === TaskType.Discord && getDiscordRender(item)}
                                {/* {item.type === TaskType.Steam && getSteamBtnRender(item)} */}
                              </>
                            ) : (
                              <>
                                <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
                                {getSubtaskConfirmRender(item)}
                              </>
                            )}
                          </div>
                          {/* {item.type === 2004 && <div className={styles.divide_line}></div>} */}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {taskDefaultList?.map((item) => {
                      return (
                        <>
                          <div key={item.id} className={styles.task_item}>
                            <div className={styles.task_name}>
                              <img src={item.icon} />
                              <span>{item.name}</span>
                            </div>
                            <span
                              className={styles.go_btn}
                              onClick={() => {
                                setShowLoginModal(true);
                              }}
                            >
                              Go
                            </span>
                          </div>
                          {item?.child?.map((subtask) => {
                            return <div key={subtask.id}>{subtask.text}</div>;
                          })}
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            {
              isLogin ?
              setSteamDom()
              :
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
                          setShowLoginModal(true);
                        }}
                      >
                        Go
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className={styles.invite_wrap}>
              <div className={styles.linear_bg}></div>
              <div className={styles.invite}>
                <div className={styles.title}>Invite your friends</div>
                <div className={styles.invite_intro}>
                  Send the link to your gamer friends. ({inviteNum}/5)
                </div>
                {showLink && inviteLink ? (
                  <div className={styles.invite_task}>
                    <span className={styles.invite_link}> {inviteLink || 'Link'}</span>
                    <CopyToClipboard
                      text={inviteLink || 'Link'}
                      onCopy={() => {
                        message.success('Successfully copied');
                      }}
                    >
                      <span className={styles.copy}>Copy</span>
                    </CopyToClipboard>
                  </div>
                ) : (
                  <div
                    className={styles.create_link}
                    onClick={() => {
                      if (isLogin) {
                        setShowLink(true);
                      } else {
                        setShowLoginModal(true);
                      }
                    }}
                  >
                    Create Referral Links
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {showBill && (
          <div className={styles.game_bill}>
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
                        Beating <span>{posterDetail?.rank?.toFixed(2) * 100}%</span> of Global
                        Players
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
                  // e.stopPropagation();
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
                  setShowBill(false);
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

export default GamesWeb;
