import {useModel,history} from 'umi';
import React,{useState,useEffect,useRef} from "react";
import {Button} from 'antd';
import BaseLayout from '@/components/BaseLayout';
import { ProForm, ProFormText } from '@ant-design/pro-form';
import {verifyByEmail} from '@/services/account.js';
import styles from './index.less'

const Login=()=>{
    const {isMobile} = useModel('app');
    const {loginInfo,setLoginInfo} = useModel('login');
    const {httpUserInfo} = useModel('account');
    const [isForm, setIsFrom] = useState(false);
    const [count, setCount] = useState(0);
    const formRef = useRef();
    const COUNTDOWN = 60;

    useEffect(() => {
        !isMobile && history.push('/home');
      }, [isMobile]);

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
        setLoginInfo(formRef.current?.getFieldsValue());
        const params={
            email:values.email,
            token:values.code
        }
        if(localStorage.getItem('invite_token')){
            params.inviter = localStorage.getItem('invite_token');
          }
        await httpUserInfo(params);
    };

    const sendCode=()=>{
        if (count <= COUNTDOWN && count > 0) return;
        setCount(COUNTDOWN);
        const email = formRef?.current?.getFieldValue('email');
        verifyByEmail({email:email})
    }

    return (
        <BaseLayout>
         <div className={styles.container}>
            <p className={styles.title}>Log in</p>
            <p className={styles.subTitle}>
                <span>Sign in with your Email, Fully web2 gaming</span>
                <span>experiences in Cubic.</span>
            </p>
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
                    >Log in</Button>
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
         </div>
        </BaseLayout>
    )
}

export default Login;