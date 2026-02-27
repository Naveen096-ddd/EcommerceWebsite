import React, { useState, useEffect } from "react";
import { getCartApi, removeFromCartApi } from "../../../../apis/Api";
import { io } from "socket.io-client";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const fetchCart = async () => {
    try {
      const response = await getCartApi();
      if (response.data.success) {
        setCartItems(response.data.cartItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("cartUpdated", () => {
      fetchCart();
    });
    return () => socket.disconnect();
  }, []);
  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_id === cartId ? { ...item, quantity } : item
      )
    );
  };
  const removeItem = async (cartId) => {
    try {
      await removeFromCartApi(cartId);
      setCartItems((prev) =>
        prev.filter((item) => item.cart_id !== cartId)
      );
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen  px-4 sm:px-6 lg:px-12 py-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-center text-gray-800">
        🛒 Your Shopping Cart
      </h2>
      {cartItems.length === 0 && (
        <div className="text-center py-24">
          <h2 className="text-2xl font-semibold text-gray-500">
            Your cart is empty 🛍️
          </h2>
        </div>
      )}
      <div className="text-black grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">

          {cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="group flex flex-col sm:flex-row gap-6 p-5 sm:p-6 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-full sm:w-48 md:w-56 lg:w-44 xl:w-52 aspect-[4/3] overflow-hidden rounded-2xl shadow-md flex-shrink-0">
                <img
                  src={`http://localhost:3002/uploads/${item.image}`}
                  alt={item.Product_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {item.Product_name}
                  </h3>

                  <p className="text-lg font-semibold text-green-600 mt-1">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
                  <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden shadow-inner w-fit">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.cart_id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-4 py-2 hover:bg-gray-200 transition text-lg"
                    >
                      −
                    </button>

                    <span className="px-6 font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.cart_id, item.quantity + 1)
                      }
                      className="px-4 py-2 hover:bg-gray-200 transition text-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.cart_id)}
                  className="mt-4 text-red-500 hover:text-red-600 font-semibold transition text-left sm:text-right"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="lg:sticky lg:top-10 h-fit">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">
                Order Summary
              </h3>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-white/40 pt-4">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button
                className="w-full mt-8 bg-white text-blue-600 font-bold py-3 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Checkout
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;