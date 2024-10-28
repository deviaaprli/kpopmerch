import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-cover bg-center" id="contact" style={{ backgroundColor: "rgba(167, 193, 254, 0.5)" }}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <div className="space-y-4 text-center md:text-center">
            <h1 className="text-xl font-medium" style={{ color: "rgba(51, 78, 172, 1)" }}>Merch Kpop</h1>
            <a href="#" className="block mx-auto md:mx-0">
              <img src="/logo.png" alt="Logo" className="h-11 mx-auto" />
            </a>
          </div>

          <div className="space-y-4 text-left">
            <p className="text-lg font-light" style={{ color: "rgba(51, 78, 172, 1)" }}>Find and Grab Your Wishlist with Us</p>
            <p className="text-lg font-light" style={{ color: "rgba(51, 78, 172, 1)" }}>Fast, Trusted, First Hand, Original</p>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-medium py-0" style={{ color: "rgba(51, 78, 172, 1)" }}>Contact Info</h3>
            <a href="tel:+6289661187120" className="text-lg block py-2 mt-4" style={{ color: "rgba(51, 78, 172, 1)" }}>
              <i className="fas fa-phone pr-4" style={{ color: "rgba(51, 78, 172, 1)" }}></i>+62 85156560522
            </a>
            <a href="mailto:kirashkr130103@gmail.com" className="text-lg block py-2 mt-2" style={{ color: "rgba(51, 78, 172, 1)" }}>
              <i className="fas fa-envelope pr-4" style={{ color: "rgba(51, 78, 172, 1)" }}></i>Kpopmerch@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4">
        <a href="#" className="rounded-full h-10 w-10 inline-block leading-10 text-center mx-2" 
          style={{
            backgroundColor: "rgba(51, 78, 172, 1)", 
            color: "rgba(255, 255, 255, 1)", 
            transition: "background-color 0.3s ease, color 0.3s ease" 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)"; 
            e.currentTarget.style.color = "rgba(51, 78, 172, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(51, 78, 172, 1)"; 
            e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
          }}>
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="rounded-full h-10 w-10 inline-block leading-10 text-center mx-2" 
          style={{
            backgroundColor: "rgba(51, 78, 172, 1)", 
            color: "rgba(255, 255, 255, 1)", 
            transition: "background-color 0.3s ease, color 0.3s ease" 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)"; 
            e.currentTarget.style.color = "rgba(51, 78, 172, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(51, 78, 172, 1)"; 
            e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
          }}>
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="#" className="rounded-full h-10 w-10 inline-block leading-10 text-center mx-2" 
          style={{
            backgroundColor: "rgba(51, 78, 172, 1)", 
            color: "rgba(255, 255, 255, 1)", 
            transition: "background-color 0.3s ease, color 0.3s ease" 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)"; 
            e.currentTarget.style.color = "rgba(51, 78, 172, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(51, 78, 172, 1)"; 
            e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
          }}>
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
