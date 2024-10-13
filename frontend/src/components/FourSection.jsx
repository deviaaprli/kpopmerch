import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

const products = [
  {
    id: 1,
    name: 'LightStick Ofc Treasure',
    price: '700.000',
    weight: '1.5 Kg',
    stock: 10,
    image: '/product1.png',
  },
  {
    id: 2,
    name: 'Collection Book 2P PVC',
    price: '30.000',
    weight: '0.5 Kg',
    stock: 5,
    image: '/product2.png',
  },
  {
    id: 3,
    name: 'Collection Book Daiso',
    price: '50.000',
    weight: '0.5 Kg',
    stock: 10,
    image: '/product3.png',
  },
  {
    id: 4,
    name: 'Treasure Reboot Album',
    price: '150.000/Version',
    weight: '2.5 Kg',
    stock: 12,
    image: '/product4.png',
    versionOptions: ['Black', 'White', 'Grey'],
  },
  {
    id: 5,
    name: 'Blackpink Album HYLT',
    price: '200.000/Version',
    weight: '1.5 Kg',
    stock: 10,
    image: '/product5.png',
    versionOptions: ['Black', 'Pink'],
  },
  {
    id: 6,
    name: 'LightStick Blackpink V2',
    price: '750.000',
    weight: '1.25 Kg',
    stock: 10,
    image: '/product6.png',
  },
  {
    id: 7,
    name: 'New Jeans BBB Album',
    price: '230.000/Version',
    weight: '2 Kg',
    stock: 10,
    image: '/product7.png',
    versionOptions: ['Blue', 'Black', 'Pink'],
  },
  {
    id: 8,
    name: 'Custom Card Holder Akrilik',
    price: '75.000',
    weight: '0.5 Kg',
    stock: 15,
    image: '/product8.png',
  },
];

const addItem = (name, price, weight) => {
  // Implement your add to cart functionality here
  console.log(`Added ${name} to cart: ${price}, Weight: ${weight}`);
};

const ProductCarousel = () => {
  return (
    <section className="product" id="product">
      <div className="heading text-center mb-6">
        <h2 className="text-3xl font-bold">Our Exclusive Products</h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={4} // Set number of slides per view
        spaceBetween={20} // Space between slides
        className="product-row"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <div className="img mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg border border-gray-300 w-32 h-32 object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">Harga: {product.price}</p>
              <p className="text-sm text-gray-600">Berat: {product.weight}</p>
              <p className="text-sm text-gray-600">Stok: {product.stock}</p>
              <div className="orderNow mt-4">
                {product.versionOptions ? (
                  <>
                    <select className="border border-gray-300 rounded-md mr-2">
                      {product.versionOptions.map((version, index) => (
                        <option key={index} value={version}>
                          {version}
                        </option>
                      ))}
                    </select>
                  </>
                ) : null}
                <button
                  onClick={() => addItem(product.name, product.price, product.weight)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCarousel;
