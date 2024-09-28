import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50" style={{ backgroundColor: "rgba(208, 227, 255, 1)" }}>
      <div className="flex items-center justify-between px-4 md:px-0 py-3 max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <a href="#" className="mr-0">
            <img src="/logo.png" alt="Logo" className="h-11" />
          </a>
          <h1 className="text-xl font-medium" style={{ color: "rgba(51, 78, 172, 1)" }}>Merch Kpop</h1>
        </div>

        <nav className={`fixed md:static top-0 right-0 w-64 h-full bg-white md:bg-transparent md:w-auto md:flex md:items-center transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform`}>
          <a href="#home" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Home</a>
          <a href="#aboutus" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>About Us</a>
          <a href="#popular" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Popular</a>
          <a href="#product" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Product</a>
          <a href="#contact" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Contact</a>
          <a href="#receipt" className="block md:inline-block text-xl font-medium px-6 py-3" style={{ color: "rgba(51, 78, 172, 1)" }}>Receipt</a>
        </nav>

        <div className="flex items-center" style={{ color: "rgba(51, 78, 172, 1)" }}>
          <i className="fas fa-search text-2xl cursor-pointer mr-6" style={{ color: "rgba(51, 78, 172, 1)" }} onClick={() => setIsSearchActive(!isSearchActive)}></i>
          <i className="fas fa-bars text-2xl cursor-pointer md:hidden" style={{ color: "rgba(51, 78, 172, 1)" }} onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
          <div className="relative">
            <i className="fas fa-shopping-cart text-2xl cursor-pointer relative">
              <span className="absolute bottom-4 left-5 bg-red-500 text-white text-sm rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </i>
          </div>
        </div>

        {isSearchActive && (
          <div className="absolute top-full right-0 mt-4 w-1/2 bg-transparent">
            <input type="search" placeholder="Search..." className="w-full p-2 text-lg bg-white rounded-lg shadow-md" />
          </div>
        )}

        {/* Shopping Cart Section */}
        {/* <div className="hidden md:block bg-white p-4 shadow-md rounded-lg">
          <h2>My Cart</h2>
          <div id="cart">
            <div className="cart-item"></div>
          </div>
          <hr className="my-4 border-black" />
          <h3 id="total-price">Total Price: Rp.0</h3>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => window.location.href = 'checkout.php'}>Checkout</button>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;