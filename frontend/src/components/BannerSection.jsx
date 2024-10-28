import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

const banner1 = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Lorem ipsum dolor sit amet',
    image: '/product1.png',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Lorem ipsum dolor sit amet',
    image: '/product2.png',
  },
];

const banner2 = [
  {
    name: 'Top Product',
    description: 'This is the top ad description.',
    image: '/product1.png',
  },
];

const banner3 = [
  {
    name: 'Bottom Product',
    description: 'This is the bottom ad description.',
    image: '/product2.png',
  },
];

const BannerSection = () => {
  return (
    <section className="bg-gray-100 md:pt-20"> {/* Added padding-top */}
      <div className="flex w-full max-w-screen-xl mx-auto items-center justify-between"> {/* Centered the content */}
        
        {/* Left Banner */}
        <div className="flex flex-col w-3/5 p-8">
          <div className="rounded-lg overflow-hidden mb-8" style={{ backgroundColor: "rgba(208, 227, 255, 1)" }}> {/* Blue background */}
            <Swiper spaceBetween={10} slidesPerView={1} modules={[Navigation, Pagination]}>
              {/* Map over banner1 to create slides */}
              {banner1.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="flex p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-22 h-20 rounded-lg border-2 border-white mr-4" // Set height and width, added border
                    />
                    <div>
                      <h4 className="font-semibold text-black">{product.name}</h4>
                      <p className="text-black">{product.description}</p> 
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Banners */}
        <div className="flex flex-col w-2/5">
          <div className="flex flex-col w-full">
            {/* Top Banner */}
            <div className="bg-white shadow-lg rounded-lg m-2 flex flex-col">
              <img src={banner2[0].image} alt="Top Ad" className="rounded-t-lg" />
              <div className="p-4">
                <h4 className="font-semibold">{banner2[0].name}</h4>
                <p>{banner2[0].description}</p>
              </div>
            </div>
            {/* Bottom Banner */}
            <div className="bg-white shadow-lg rounded-lg m-2 flex flex-col">
              <img src={banner3[0].image} alt="Bottom Ad" className="rounded-t-lg" />
              <div className="p-4">
                <h4 className="font-semibold">{banner3[0].name}</h4>
                <p>{banner3[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;