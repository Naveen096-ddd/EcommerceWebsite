import React, { useState } from 'react';

const Addresses = ({ darkMode }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 'A1001',
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    {
      id: 'A1002',
      name: 'Jane Smith',
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA',
    },
  ]);

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for address ID: ${id}`);
  };

  const handleAdd = () => {
    alert('Add New Address functionality triggered!');
  };

  return (
    <div className={'p-6'}>
      <h2 className="text-3xl font-bold mb-6">Your Addresses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} flex flex-col justify-between`}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">{address.name}</h3>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(address.id)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Add New Address Card */}
        <div
          onClick={handleAdd}
          className={`p-4 rounded-2xl border-2 border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-blue-500 transition`}
        >
          <span className="text-gray-500 dark:text-gray-400 font-semibold">+ Add New Address</span>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
