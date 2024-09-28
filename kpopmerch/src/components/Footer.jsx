import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Footer = () => {
  return (
    <footer className="bg-cover bg-center" id="contact" style={{ backgroundColor: "rgba(167, 193, 254, 0.5)" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        <div className="space-y-4">
          <div className="flex items-center mb-8">
            <h1 className="text-2xl text-blue-500">Merch Kpop</h1>
          </div>
          <p className="text-lg">Find and Grab Your Wishlist with Us</p>
          <p className="text-lg">Fast, Trusted, First Hand, Original</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl text-blue-500 py-4">Contact Info</h3>
          <a href="tel:+6289661187120" className="text-lg text-blue-500 block py-2">
            <i className="fas fa-phone pr-2"></i>+62 896 6118 7120
          </a>
          <a href="mailto:kirashkr130103@gmail.com" className="text-lg text-blue-500 block py-2">
            <i className="fas fa-envelope pr-2"></i>kirashkr130103@gmail.com
          </a>
        </div>
      </div>
      <div className="text-center py-4">
        <a href="#" className="bg-blue-500 text-white rounded-full h-10 w-10 inline-block leading-10 text-center mx-2 hover:bg-white hover:text-blue-500">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="bg-blue-500 text-white rounded-full h-10 w-10 inline-block leading-10 text-center mx-2 hover:bg-white hover:text-blue-500">
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="#" className="bg-blue-500 text-white rounded-full h-10 w-10 inline-block leading-10 text-center mx-2 hover:bg-white hover:text-blue-500">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
