import { useState } from 'react';

const useLoginModel = () => {
  const [loginInfo, setLoginInfo] = useState(null);

  return {
    loginInfo,
    setLoginInfo
  };

};

export default useLoginModel;
