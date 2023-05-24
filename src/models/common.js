import { useState } from 'react';

const useCommonModel = () => {
    const [redirectUrl, setRedireactUrl] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [isVerifyModal, setIsVerifyModal] = useState(false);
    return {
        redirectUrl, setRedireactUrl,
        showLoginModal, setShowLoginModal,
        showEmailModal, setShowEmailModal,
        isVerifyModal, setIsVerifyModal
    }
}

export default useCommonModel;
