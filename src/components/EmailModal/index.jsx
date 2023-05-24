import React,{useState,useEffect,useRef} from "react";
import { useModel } from 'umi';
import { Modal,Button } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-form';
import {verifyByEmail} from '@/services/account.js';
import styles from './index.less';

const EmailModal = ()=>{
    const {showEmailModal,setShowEmailModal,setShowLoginModal,isVerifyModal,setIsVerifyModal } = useModel('common');
    const {loginInfo,setLoginInfo} = useModel('login');
    const {httpUserInfo} = useModel('account');
    const [isForm, setIsFrom] = useState(false);
    const [count, setCount] = useState(0);
    const formRef = useRef();
    const COUNTDOWN = 60;

    useEffect(() => {
        if (count <= 0) return;
        const timer = setInterval(() => {
          if (count - 1 < 0) {
            clearInterval(timer);
          } else {
            setCount(count - 1);
          }
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      }, [count]);

    const handleSubmit = async(values) => {
        setLoginInfo({ email: values.email });
        let ops = {
          email:values.email,
          token:values.code
      }
      if(localStorage.getItem('invite_token')){
        ops.inviter = localStorage.getItem('invite_token');
      }
        await httpUserInfo(ops);
        setShowEmailModal(false);
        setIsVerifyModal(false);
    };

    const sendCode=()=>{
        if (count <= COUNTDOWN && count > 0) return;
        setCount(COUNTDOWN);
        const email = formRef?.current?.getFieldValue('email');
        verifyByEmail({email:email})
    }

    return (
        <Modal
            title={
                <div className={styles.headTitle}>
                    <p className={styles.title}>
                        {
                            !isVerifyModal && <LeftOutlined
                                style={{fontSize:12,marginRight:8,color:'#fff'}}
                                onClick={()=>{
                                    setShowEmailModal(false);
                                    setShowLoginModal(true);
                                }}
                            />
                        }
                        E-mail
                    </p>
                    {!isVerifyModal && <p className={styles.subTitle}>Sign in with your Email.</p>}
                </div>
            }
            centered
            destroyOnClose
            width={430}
            open={showEmailModal}
            footer={null}
            className={styles.emailModal}
            onCancel={()=>{
                setShowEmailModal(false);
                setIsVerifyModal(false);
            }}
        >
            <ProForm
                formRef={formRef}
                className={styles.loginForm}
                initialValues={{...loginInfo}}
                onFinish={async(values) => {
                    await handleSubmit(values);
                  }}
                onFieldsChange={(changedValues, allValues)=>{
                    setIsFrom(allValues.every(item=>item.errors.length === 0));
                }}
                submitter={{
                    render:(props)=><Button
                    className={styles.btn}
                    disabled={!isForm}
                    onClick={() => props.form?.submit?.()}
                    >
                      {!isVerifyModal ? 'Log in' : 'Verify'}
                    </Button>
                }}
            >
                <ProFormText
                    name="email"
                    placeholder='Email address'
                    rules={[
                        {
                            required: true,
                            message: 'Please fill Email address!'
                        }, {
                            pattern: /\w[-\w.+]*@.+[A-Za-z]{2,14}/,
                            message: 'Please fill in a valid email!'
                        }
                    ]}
                    fieldProps={{
                        allowClear: false,
                        suffix: <span className={styles.sendCode} onClick={sendCode}>
                          {(count <= COUNTDOWN && count > 0) ? count : 'Verify'}
                        </span>
                      }}
                />
                <ProFormText
                    name="code"
                    placeholder='Enter your verification code'
                    rules={[
                        {
                            required: true,
                            message: 'Please fill verification code!'
                        }, {
                            min: 6,
                            type: 'string',
                            message: 'Please fill a 6-digit verification code!'
                        }
                    ]}
                    fieldProps={{
                        maxLength: 6
                      }}
                />

            </ProForm>
        </Modal>
    )
}

export default EmailModal;
