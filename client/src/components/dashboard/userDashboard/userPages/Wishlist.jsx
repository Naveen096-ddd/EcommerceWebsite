import React from 'react';

const Wishlist = ({ darkMode }) => {
  const wishlist = [
    { id: 'WL1001', name: 'Modern Wooden Chair', price: 79.99, image: 'https://via.placeholder.com/150?text=Wooden+Chair' },
    { id: 'WL1002', name: 'Leather Recliner Sofa', price: 499.99, image: 'https://via.placeholder.com/150?text=Leather+Sofa' },
    { id: 'WL1003', name: 'Glass Coffee Table', price: 129.99, image: 'https://via.placeholder.com/150?text=Coffee+Table' },
    { id: 'WL1004', name: 'Bookshelf Rack', price: 89.99, image: 'https://via.placeholder.com/150?text=Bookshelf' },
    { id: 'WL1005', name: 'Nightstand Drawer', price: 59.99, image: 'https://via.placeholder.com/150?text=Nightstand' },
  ];

  return (
    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-green-600 font-bold mb-4">${item.price.toFixed(2)}</p>
              <div className="flex justify-between gap-2">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
                  Add to Cart
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;