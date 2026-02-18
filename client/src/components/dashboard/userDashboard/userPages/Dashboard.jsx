import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useShop } from "../../../context/ShopContext";
import { cards, upiApps } from "../../../../assets/Assets";

export default function Home() {
  const {
    furnitureProducts,
    scrollRef1,
    scrollRef2,
    isHovered1,
    getCurrentLocation,
    setIsHovered1,
    isHoveredHovered2,
    setIsHovered2,
    quantities,
    increment,
    decrement,
    addToCart,
    handleBuy,
    buyOpen,
    setBuyOpen,
    selectedProduct,
    buyQuantity,
    setBuyQuantity,
    address,
    setAddress,
    handling,
    setHandling,
    assembly,
    setAssembly,
    deliveryDate,
    setDeliveryDate,
    paymentMethod,
    setPaymentMethod,
    paymentStep,
    setPaymentStep,
    placeOrder,
    selectedCard,
    setSelectedCard,
    selectedUPI,
    setSelectedUPI,
    validateOrderDetails,
  } = useShop();
  useEffect(() => {
    const el = scrollRef1.current;
    if (!el) return;
    let x = 0;
    const i = setInterval(() => {
      if (!isHovered1) {
        x += 1;
        el.scrollLeft = x;
        if (x > el.scrollWidth - el.clientWidth) x = 0;
      }
    }, 30);
    return () => clearInterval(i);
  }, [isHovered1]);
  useEffect(() => {
    const el = scrollRef2.current;
    if (!el) return;
    let x = 0;
    const i = setInterval(() => {
      if (!isHoveredHovered2) {
        x += 1;
        el.scrollLeft = x;
        if (x > el.scrollWidth - el.clientWidth) x = 0;
      }
    }, 30);
    return () => clearInterval(i);
  }, [isHoveredHovered2]);
  const renderProductCard = (product) => (
    <div key={product.id} className="flex-shrink-0 w-64 bg-white text-black rounded-lg shadow-md p-4 hover:scale-105 transition-transform">
      <img src={product.imageUrl} className="h-40 text-black w-full object-cover rounded mb-3" alt={product.Product_name}/>
      <h2 className="font-semibold">{product.Product_name}</h2>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <span className="text-sm text-gray-500">Color: {product.color}</span>
          <span className="text-sm text-gray-500 ml-12">Size: {product.size}</span>
        </div>
      </div>
     <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <button className="px-2 bg-gray-200" onClick={() => decrement(product.id)}>-</button>
          <span className="mx-2">{quantities[product.id] || 0}</span>
          <button className="px-2 bg-gray-200" onClick={() => increment(product.id)}>+</button>
        </div>
        <div className="text-lg font-semibold">₹{product.price}</div>
      </div>

      <div className="flex justify-between mt-3">
        <button
          className="bg-indigo-500 text-white px-3 py-2 rounded"
          onClick={() => addToCart(product.id)}
        >
          <FaShoppingCart />
        </button>
        <button
          className="bg-green-600 text-white px-3 py-2 rounded"
          onClick={() => handleBuy(product)}
        >
          Buy
        </button>
      </div>
    </div>
  );
  return (
    <div className=" dark:bg-black">
      <div className=" py-12 dark:bg-black">
        <h1 className="text-4xl font-bold text-center mb-6">Best Sellers</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {furnitureProducts.map(renderProductCard)}
        </div>
      </div>
      {buyOpen && selectedProduct && (
        <div className="fixed inset-0 mt-16 flex text-black justify-end bg-black/50 z-50">
          <div className="w-96 bg-white h-full p-6 overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {paymentStep === 1
                  ? "Order Details"
                  : paymentStep === 2
                  ? "Payment"
                  : "Order Summary"}
              </h2>
              <button className="text-2xl" onClick={() => setBuyOpen(false)}>
                ×
              </button>
            </div>
            <span className="text-lg text-black font-bold mt-4">{selectedProduct.Product_name}</span>
            <img
              src={selectedProduct.imageUrl}
              className="w-full h-40 object-cover rounded mt-3"
              alt=""
            />
            {paymentStep === 1 && (
              <>
                <label className="font-semibold mt-4 block">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded p-2"
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(+e.target.value)}
                  required
                />
                <label className="font-semibold mt-4 block">Delivery Address</label>
                  <button
                    onClick={getCurrentLocation}
                    className="w-full bg-blue-600 text-white p-2 rounded mt-2"
                  >
                    Use Current Location
                  </button>
                  <label className="font-semibold mt-4 block">or other Delivery Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                    className="border p-2 rounded"
                  />

                  {address && (
                    <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                      {address}
                    </div>
                  )}

                <label className="block mt-4 font-semibold">Handling Preference</label>
                <select
                  className="w-full border p-2 rounded"
                  value={handling}
                  onChange={(e) => setHandling(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Lift Available">Lift Available</option>
                  <option value="Carry Using Stairs">Carry Using Stairs</option>
                  <option value="Fragile Handling">Fragile Handling</option>
                </select>
                <label className="block mt-4 font-semibold">Assembly Required</label>
                <select
                  className="w-full border p-2 rounded"
                  value={assembly}
                  onChange={(e) => setAssembly(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label className="block mt-4 font-semibold">
                  Preferred Delivery Date
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
                <label className="block mt-4 font-semibold">Payment Method</label>
                <select
                  className="w-full border p-2 rounded"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="COD">Cash on Delivery</option>
                </select>

                {paymentMethod === "UPI" && (
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Choose UPI App:</p>
                    <div className="grid grid-cols-3 gap-3 mb-2">
                      {upiApps.map((app) => (
                        <button
                          key={app.name}
                          onClick={() => setSelectedUPI(app.name)}
                          className={`flex flex-col items-center p-2 border rounded-lg transition ${
                            selectedUPI === app.name
                              ? "border-blue-500 shadow-lg"
                              : "border-gray-300"
                          }`}
                        >
                          {app.icon}
                          <span className="text-sm mt-1">{app.name}</span>
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      placeholder="example@upi"
                      className="w-full border p-2 rounded"
                    />
                  </div>
                )}
                {paymentMethod === "CARD" && (
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Choose Card:</p>
                    <div className="grid grid-cols-3 gap-3 mb-2">
                      {cards.map((card) => (
                        <button
                          key={card.name}
                          onClick={() => setSelectedCard(card.name)}
                          className={`flex flex-col items-center p-2 border rounded-lg transition ${
                            selectedCard === card.name
                              ? "border-blue-500 shadow-lg"
                              : "border-gray-300"
                          }`}
                        >
                          {card.icon}
                          <span className="text-sm mt-1">{card.name}</span>
                        </button>
                      ))}
                    </div>
                    {selectedCard && (
                      <div className="space-y-2 mt-2">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full border p-2 rounded"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-1/2 border p-2 rounded"
                          />
                          <input
                            type="password"
                            placeholder="CVV"
                            className="w-1/2 border p-2 rounded"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {paymentMethod === "COD" && (
                  <p className="text-green-600 font-semibold mt-2">
                    You will pay at the time of delivery.
                  </p>
                )}
                <button
                  className="w-full bg-indigo-600 text-white p-3 rounded mt-6"
                  onClick={() => {
                    if (validateOrderDetails()) setPaymentStep(2);
                  }}
                >
                  Proceed To Payment
                </button>
              </>
            )}
            {paymentStep === 2 && (
              <>
                <h2 className="mt-4 text-lg font-semibold">Complete your payment</h2>
                <p className="mt-2 font-semibold">
                  Payment Method: {paymentMethod}
                </p>
                <button
                  className="w-full bg-green-600 text-white p-3 rounded mt-6"
                  onClick={() => setPaymentStep(3)}
                >
                  Complete Payment
                </button>
              </>
            )}
            {paymentStep === 3 && (
              <>
                <h2 className="text-2xl font-bold text-center mt-4 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2 p-4 rounded-lg bg-gray-50">
                  <p>Product: {selectedProduct.Product_name}</p>
                  <p>Quantity: {buyQuantity}</p>
                  <p>Total: ₹{selectedProduct.price * buyQuantity}</p>
                  <p>Address: {address}</p>
                  <p>Handling: {handling}</p>
                  <p>Assembly: {assembly}</p>
                  <p>Delivery Date: {deliveryDate}</p>
                  <p>Payment: {paymentMethod}</p>
                </div>
                <button
                  className="w-full mt-6 p-3 rounded-lg bg-purple-600 text-white font-bold"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
