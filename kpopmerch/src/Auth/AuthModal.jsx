import React, { useState } from 'react';
import FloatLogin from '../pages/FloatLogin';
import FloatSignUp from '../pages/FloatSignUp';
import FloatResetPassword from '../pages/FloatResetPassword';

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);

  const handleSignUpClick = () => {
    setIsLoginVisible(false);
  };

  const handleLoginClick = () => {
    setIsLoginVisible(true);
    setIsResetPasswordVisible(false);
  };

  const handleResetPasswordClick = () => {
    setIsLoginVisible(false);
    setIsResetPasswordVisible(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isResetPasswordVisible ? (
        <FloatResetPassword onClose={handleClose} onLogin={handleLoginClick} />
      ) : isLoginVisible ? (
        <FloatLogin 
          onClose={handleClose} 
          onSignUp={handleSignUpClick} 
          onResetPassword={handleResetPasswordClick}  
          onLoginSuccess={onLoginSuccess} // Pass `onLoginSuccess` ke FloatLogin
        />
      ) : (
        <FloatSignUp onClose={handleClose} onLogin={handleLoginClick} />
      )}
    </>
  );
};
export default AuthModal;
