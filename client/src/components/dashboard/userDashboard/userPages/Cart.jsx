import React, { useState } from 'react';

const Cart = ({ darkMode }) => {
  const [cartItems, setCartItems] = useState([
    { id: 'C1001', name: 'Modern Wooden Chair', price: 79.99, quantity: 1, image: 'https://via.placeholder.com/150?text=Chair' },
    { id: 'C1002', name: 'Leather Recliner Sofa', price: 499.99, quantity: 2, image: 'https://via.placeholder.com/150?text=Sofa' },
    { id: 'C1003', name: 'Glass Coffee Table', price: 129.99, quantity: 1, image: 'https://via.placeholder.com/150?text=Table' },
  ]);

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className={`p-6 rounded-2xl min-h-screen`}>
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-2xl"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1 text-black">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-green-600 font-bold">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span>Qty:</span>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 text-center border rounded-lg px-2 py-1 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="mt-2 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="p-4  dark:bg-gray-800 rounded-2xl shadow-md max-w-md ml-auto">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
