import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../Auth/AuthModal'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);  // Reference to the menu

  // Check token in localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, consider user as logged in
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Logout berhasil');
          localStorage.removeItem('token'); // Remove token on logout
          setIsLoggedIn(false);
        } else {
          console.error('Logout gagal:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCloseModal = () => {
    setIsLoginActive(false); 
  };

  const handleLoginSuccess = () => {
    console.log('Login berhasil!');
    setIsLoggedIn(true); 
    setIsLoginActive(false); 
  };

  // Close menu when clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close menu if clicked outside
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50" style={{ backgroundColor: "rgba(208, 227, 255, 1)" }}>
      <div className="flex items-center justify-between px-4 md:px-0 py-3 max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <a href="#" className="mr-0">
            <img src="/logo.png" alt="Logo" className="h-11" />
          </a>
          <h1 className="text-xl font-medium" style={{ color: "rgba(51, 78, 172, 1)" }}>Merch Kpop</h1>
        </div>

        <nav
          ref={menuRef}  // Attach the ref to the menu element
          className={`fixed md:static top-0 right-0 w-64 h-full bg-white md:bg-transparent md:w-auto md:flex md:items-center transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform`}
        >
          <a onClick={() => navigate('/')} className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Home</a>
          <a href="#aboutus" onClick={() => navigate('')} className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>About Us</a>
          <a href="#popular" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Popular</a>
          <a href="#product" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Product</a>
          <a href="#contact" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Contact</a>
          <a href="#receipt" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Receipt</a>
        </nav>

        <div className="flex items-center" style={{ color: "rgba(51, 78, 172, 1)" }}>
          {isLoggedIn ? (
            <button className="text-xl font-medium cursor-pointer mr-6" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="text-xl font-medium cursor-pointer mr-6" onClick={() => setIsLoginActive(true)}>
              Login
            </button>
          )}
          <i className="fas fa-search text-2xl cursor-pointer mr-6" onClick={() => setIsSearchActive(!isSearchActive)}></i>
          <i className="fas fa-bars text-2xl cursor-pointer md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
          <div className="relative">
            <i className="fas fa-shopping-cart text-2xl cursor-pointer relative">
              <span className="absolute bottom-4 left-5 bg-red-500 text-white text-sm rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </i>
            {isLoggedIn && (
              <i className="fas fa-user-circle text-2xl cursor-pointer ml-6" title="Profile" onClick={() => navigate('/profile')}></i>
            )}
          </div>
        </div>

        {isLoginActive && <AuthModal onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />}

        {isSearchActive && (
          <div className="absolute top-full right-0 mt-4 w-1/2 bg-transparent">
            <input type="search" placeholder="Search..." className="w-full p-2 text-lg bg-white rounded-lg shadow-md" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
