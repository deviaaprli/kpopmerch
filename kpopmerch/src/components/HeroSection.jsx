import React from 'react';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center bg-cover bg-center" 
      style={{ backgroundImage: "url('../public/background-01.png')" }}
    >
      <div className="w-1/2 mx-auto text-center p-16"> 
        <h2 className="text-7xl font-bold mb-8 leading-tight text-blue-800 drop-shadow-lg">안녕하세요</h2>
        <h2 className="text-7xl font-bold mb-8 leading-tight text-blue-800 drop-shadow-lg">친구</h2>
        <p className="text-lg mb-8 leading-relaxed">
          Grab your wishlist here chingu. fast, trusted, originality product, and money back guarantee.
        </p>
        <div className="home-btn h-12">
          <a href="#">
            <button className="text-lg bg-blue-800 text-white rounded-lg px-10 py-3 hover:text-2xl transition-all">
              See more
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
