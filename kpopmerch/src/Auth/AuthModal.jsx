import React, { useState } from 'react';
import FloatLogin from '../pages/FloatLogin';
import FloatSignUp from '../pages/FloatSignUp';

const AuthModal = ({ onClose }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const handleSignUpClick = () => {
    setIsLoginVisible(false);
  };

  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };

  const handleClose = () => {
    onClose(); 
  };

  return (
    <>
      {isLoginVisible ? (
        <FloatLogin onClose={handleClose} onSignUp={handleSignUpClick} />
      ) : (
        <FloatSignUp onClose={handleClose} onLogin={handleLoginClick} />
      )}
    </>
  );
};

export default AuthModal;
