import {clearLocalstorage} from '@/utils/utils';
import {history} from 'umi';
import {message} from 'antd'

const handle401 = () => {
  clearLocalstorage();
  if (history.location.pathname.includes('games')){
    if(localStorage.getItem('isMobile')){
      history.push('/login')
    }else{
      window.location.reload();
    }
  }else{
    window.location.reload();
  }
};

const errorHandler = (error, options) => {
  const { response } = error;
  if (options.skipErrorHandler) {
    console.log('skipErrorHandler');
  } else if (options.errorHandler) {
    options.errorHandler(error);
  } else {
    const data = response.data || { Message: response.massage };
    if (response && response.status) {
      if (response.status === 401) {
        handle401();
      }
      if (response.status === 429) {
        // errorMessage('The server is busy, please try again later.');
      } else {
        const errorText = data?.message;
        errorText && message.error(errorText)
      }
    } else if (!response) {
      message.error('Network error')
    }
  }

  throw response;
};

/**
 * @name request
 */
export const request = {
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  paramsSerializer(params) {
    return queryString.stringify(params);
  },
  errorConfig: {
    errorHandler: errorHandler,
    errorThrower: () => {},
  },
  requestInterceptors: [
    (config) => {
      if (config.method?.toUpperCase() === 'GET') {
        config.params = config.data;
      }
      config.headers = {
        ...config.headers,
      };
      return config;
    },
  ],
  responseInterceptors: [
    async (response) => {
      return response;
    },
  ],
};
