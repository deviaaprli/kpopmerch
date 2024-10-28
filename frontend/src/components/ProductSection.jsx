import React from 'react';

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
  {
    id: 9,
    name: 'Custom Card Holder Akrilik',
    price: '75.000',
    weight: '0.5 Kg',
    stock: 15,
    image: '/product8.png',
  },
  {
    id: 10,
    name: 'LightStick Blackpink V2',
    price: '750.000',
    weight: '1.25 Kg',
    stock: 10,
    image: '/product6.png',
  },
  {
    id: 11,
    name: 'New Jeans BBB Album',
    price: '230.000/Version',
    weight: '2 Kg',
    stock: 10,
    image: '/product7.png',
    versionOptions: ['Blue', 'Black', 'Pink'],
  },
  {
    id: 12,
    name: 'Custom Card Holder Akrilik',
    price: '75.000',
    weight: '0.5 Kg',
    stock: 15,
    image: '/product8.png',
  },
];

const addItem = (name, price, weight) => {
  console.log(`Added ${name} to cart: ${price}, Weight: ${weight}`);
};

const ProductSection = () => {
  return (
    <section className="product" id="product" style={{ marginTop: '6rem' }}>
      <div className="flex w-full max-w-screen-xl mx-auto items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
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
                  <select className="border border-gray-300 rounded-md mr-2">
                    {product.versionOptions.map((version, index) => (
                      <option key={index} value={version}>
                        {version}
                      </option>
                    ))}
                  </select>
                ) : null}
                <button
                  onClick={() => addItem(product.name, product.price, product.weight)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
