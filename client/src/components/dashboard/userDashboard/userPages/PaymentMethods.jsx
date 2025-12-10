import React, { useState } from 'react';

const PaymentMethod = () => {
  const [methods, setMethods] = useState([
    { id: 'P1001', type: 'Visa', last4: '1234', holder: 'John Doe', expiry: '12/25' },
    { id: 'P1002', type: 'MasterCard', last4: '5678', holder: 'Jane Smith', expiry: '11/24' },
    { id: 'P1003', type: 'PayPal', email: 'john@example.com' },
  ]);

  const handleRemove = (id) => {
    setMethods(prev => prev.filter(method => method.id !== id));
  };

  const handleAdd = () => {
    alert('Add new payment method functionality triggered!');
  };

  return (
    <div className="min-h-screen p-6 text-black">
      <h2 className="text-3xl font-bold mb-6">Payment Methods</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {methods.map((method) => (
          <div
            key={method.id}
            className="p-4 rounded-2xl shadow-lg flex flex-col justify-between bg-white"
          >
            <div className="mb-4">
              {method.type !== 'PayPal' ? (
                <>
                  <h3 className="text-lg font-semibold">{method.type} **** {method.last4}</h3>
                  <p>{method.holder}</p>
                  <p>Expires: {method.expiry}</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">PayPal</h3>
                  <p>{method.email}</p>
                </>
              )}
            </div>
            <button
              onClick={() => handleRemove(method.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
            >
              Remove
            </button>
          </div>
        ))}

        <div
          onClick={handleAdd}
          className="p-4 rounded-2xl border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-blue-500 transition"
        >
          <span className="text-gray-500 font-semibold">+ Add New Payment Method</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
