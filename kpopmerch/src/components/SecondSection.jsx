import React from 'react';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex bg-cover bg-center" 
      style={{ backgroundImage: "url('/background2-01.png')" }}
    >
      <div className="flex w-full max-w-screen-xl mx-auto">
        <div className="w-1/2"></div>

        <div className="w-1/2 flex flex-col items-left justify-center p-0 text-left">
          <h2 className="text-3xl font-bold mb-8 leading-tight drop-shadow-lg" style={{ color: "rgba(51, 78, 172, 1)" }}>Berikut Adalah Tentang Kami</h2>
          <p className="text-lg font-normal mb-8 leading-relaxed">
            Merch Kpop didirikan pada tahun [2022] merupakan toko yang menyediakan merch kpop baik original ataupun fanmade. kami menjamin ke-originalitas produk karena kami membeli langsung baik di web resmi, store resmi, dan pop-up store dengan harga yang terjangkau, karena kami first hand dan memiliki warehouse sendiri. Kami juga menyediakan fitur dp minimal 50% ataupun tabungan.
          </p>
          <div className="home-btn h-12">
            <a href="#">
              <button className="text-lg text-white rounded-lg px-8 py-1 hover:text-2xl transition-all" style={{ backgroundColor: "rgba(51, 78, 172, 1)" }}>
                Learn More
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
