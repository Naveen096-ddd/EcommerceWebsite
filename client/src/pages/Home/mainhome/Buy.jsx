// FurnatureItems.jsx
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { furnitureProducts } from "../../../assets/Assets";

const FurnatureItems = () => {
  const [buyOpen, setBuyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [handling, setHandling] = useState("");
  const [assembly, setAssembly] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setBuyOpen(true);
  };

  const validateOrderDetails = () => {
    if (!buyQuantity || buyQuantity < 1) {
      alert("Please select quantity");
      return false;
    }
    if (!address.trim()) {
      alert("Please enter delivery address");
      return false;
    }
    if (!handling) {
      alert("Please select handling preference");
      return false;
    }
    if (!assembly) {
      alert("Please select assembly option");
      return false;
    }
    if (!deliveryDate) {
      alert("Please select delivery date");
      return false;
    }
    if (!paymentMethod) {
      alert("Please select payment method");
      return false;
    }
    return true;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!validateOrderDetails()) return;

    alert(`Order placed successfully!
Product: ${selectedProduct.name}
Quantity: ${buyQuantity}
Address: ${address}
Handling: ${handling}
Assembly: ${assembly}
Delivery Date: ${deliveryDate}
Payment Method: ${paymentMethod}`);

    // Reset form
    setBuyOpen(false);
    setSelectedProduct(null);
    setBuyQuantity(1);
    setAddress("");
    setHandling("");
    setAssembly("");
    setDeliveryDate("");
    setPaymentMethod("");
  };

  return (
    <div className="p-12 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Furniture Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {furnitureProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-gray-500 mb-2">{product.description}</p>
            <p className="font-semibold mb-2">₹{product.price}</p>
            <button
              className="bg-green-600 text-white px-3 py-2 rounded mt-auto"
              onClick={() => handleBuy(product)}
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      {buyOpen && selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={() => setBuyOpen(false)} className="text-2xl">
                ×
              </button>
            </div>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
            <p className="font-semibold mb-4">₹{selectedProduct.price}</p>

            <form onSubmit={placeOrder}>
              <label className="block font-semibold mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full border rounded p-2 mb-3"
                value={buyQuantity}
                onChange={(e) => setBuyQuantity(e.target.value)}
                required
              />

              <label className="block font-semibold mb-1">Delivery Address</label>
              <textarea
                className="w-full border rounded p-2 mb-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <label className="block font-semibold mb-1">Handling Preference</label>
              <select
                className="w-full border rounded p-2 mb-3"
                value={handling}
                onChange={(e) => setHandling(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Lift Available">Lift Available</option>
                <option value="Carry Using Stairs">Carry Using Stairs</option>
                <option value="Fragile Handling">Fragile Handling</option>
              </select>

              <label className="block font-semibold mb-1">Assembly Required</label>
              <select
                className="w-full border rounded p-2 mb-3"
                value={assembly}
                onChange={(e) => setAssembly(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <label className="block font-semibold mb-1">Preferred Delivery Date</label>
              <input
                type="date"
                className="w-full border rounded p-2 mb-3"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
              />

              <label className="block font-semibold mb-1">Payment Method</label>
              <select
                className="w-full border rounded p-2 mb-4"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="UPI">UPI</option>
                <option value="CARD">Card</option>
                <option value="COD">Cash on Delivery</option>
              </select>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FurnatureItems;
