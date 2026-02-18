import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {  cards, upiApps } from "../../../assets/Assets";
// import axios from "axios";
import axiosInstance from "../../../apis/axiosInstancs";
import { getProductsApi } from "../../../apis/Api";
import { loginApi } from "../../../apis/Api";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../../components/AlertMessage";
const FurnatureItems = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [furnitureProducts, setFurnitureProducts] = useState([]);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [handling, setHandling] = useState("");
  const [assembly, setAssembly] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedUPI, setSelectedUPI] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const handleAlertClose = () => setAlertOpen(false);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await getProductsApi();
      setFurnitureProducts(res.data);
      const initialQty = {};
      res.data.forEach((p) => {
        initialQty[p.id] = 0;
      });
      setQuantities(initialQty);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  fetchProducts();
}, []);
  const useAutoScroll = (scrollRef, isHovered) => {
    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;
      let scrollAmount = 0;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const interval = setInterval(() => {
        if (!isHovered) {
          scrollAmount += 1;
          if (scrollAmount > maxScroll) scrollAmount = 0;
          scrollContainer.scrollLeft = scrollAmount;
        }
      }, 30);
      return () => clearInterval(interval);
    }, [isHovered]);
  };
  useAutoScroll(scrollRef1, isHovered1);
  useAutoScroll(scrollRef2, isHovered2);
  const increment = (id) => setQuantities({ ...quantities, [id]: quantities[id] + 1 });
  const decrement = (id) => quantities[id] > 0 && setQuantities({ ...quantities, [id]: quantities[id] - 1 });
  const addToCart = (id) => {
    setCartCount(cartCount + quantities[id]);
    setQuantities({ ...quantities, [id]: 0 });
    setIsOpen(true);
  };
  const handleBuy = (product) => {
    setSelectedProduct(product);
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      setPaymentStep(1);
    }
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
    if (paymentMethod === "UPI" && !selectedUPI) {
      alert("Please select a UPI app");
      return false;
    }
    if (paymentMethod === "CARD" && !selectedCard) {
      alert("Please select a card");
      return false;
    }
    return true;
  };
const handleSubmitLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setAlertSeverity("warning");
    setAlertMessage("Please fill in all fields");
    setAlertOpen(true);
    return;
  }
  try {
    setLoading(true);
    const res = await loginApi({ email, password });
    console.log("LOGIN RESPONSE 👉", res.data);
    const token = res.data.token || res.data.data?.token;
    const role = res.data.role || res.data.data?.role;
    const user = res.data.user || res.data.data?.user;
    if (token) {
      setAlertSeverity("success");
      setAlertMessage("Login successful!");
      setAlertOpen(true);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role || "user");
      localStorage.setItem("email", email);
      localStorage.setItem("loggedInUser", JSON.stringify(user || { email }));
      setIsLoggedIn(true);
      setLoggedInUser(user || { email });
      setShowLogin(false);
      setTimeout(() => {
        if ((role || "user") === "user") navigate("/userdash");
        else navigate("/");
      }, 300);
    } else {
      setAlertSeverity("error");
      setAlertMessage(res.data.message || "Invalid credentials");
      setAlertOpen(true);
    }
  } catch (error) {
    console.error("LOGIN ERROR 👉", error.response?.data || error.message);
    setAlertSeverity("error");
    setAlertMessage(error.response?.data?.message || "Login failed");
    setAlertOpen(true);
  } finally {
    setLoading(false);
  }
};

const placeOrder = async (e) => {
  e.preventDefault();
  if (!validateOrderDetails()) return;
  const order = {
    userId: loggedInUser?.id,
    product: selectedProduct,
    status: "UNREAD",      
    acceptedBy: null, 
    address,
    paymentMethod,
    handling,
    assembly,
    deliveryDate,
    quantity: buyQuantity,
  };
  try {
    const response = await axiosInstance.post("/orders", order, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Order saved:", response.data);
    alert("Order placed successfully!");
    setBuyOpen(false);
    setSelectedProduct(null);
    setBuyQuantity(1);
    setAddress("");
    setPaymentMethod("");
    setHandling("");
    setAssembly("");
    setDeliveryDate("");
  } catch (error) {
    console.error("Failed to place order:", error);
    alert("Failed to place order. Please try again.");
  }
};
const handleLogout = () => {
  localStorage.clear();
  setIsLoggedIn(false);
  setShowLogin(true);
  navigate("/");
};
useEffect(() => {
  const syncAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (!token) {
      setShowLogin(true);    
      setLoggedInUser(null);
    }
  };
  syncAuth();
  window.addEventListener("storage", syncAuth);
  return () => window.removeEventListener("storage", syncAuth);
}, []);
  const renderProductCard = (product) => (
    <div
      key={product.id}
      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 hover:scale-105 transition-transform cursor-pointer"
    >
      <img
        className="h-40 w-full object-cover rounded mb-4"
        src={product.imageUrl}
        alt={product.Product_name}
      />
      <h2 className="text-gray-900 font-medium text-lg">{product.Product_name}</h2>
      <p className="text-gray-500 text-sm mb-2">{product.description}</p>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 text-sm">Color: {product.color}</span>
        <span className="text-gray-900 text-sm">Size: {product.size}</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <button className="px-2 bg-gray-200" onClick={() => decrement(product.id)}>-</button>
          <span className="mx-2">{quantities[product.id] || 0}</span>
          <button className="px-2 bg-gray-200" onClick={() => increment(product.id)}>+</button>
        </div>
        <div className="text-lg font-semibold">₹{product.price}</div>
      </div>
      <div className="flex justify-between items-center mt-3">
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
    <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 mx-auto px-12 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">Best Sellers</h1>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-2 text-xl"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      <div
        ref={scrollRef1}
        className="flex space-x-6 overflow-x-hidden pb-4"
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
      >
        {furnitureProducts.slice(0, 10).map(renderProductCard)}
      </div>
      <div
        ref={scrollRef2}
        className="flex space-x-6 overflow-x-hidden pb-4 mt-10"
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
      >
        {furnitureProducts.slice(10, 20).map(renderProductCard)}
      </div>
      {buyOpen && selectedProduct && (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
          <div className="w-96 bg-white h-full p-6 overflow-y-auto shadow-xl">

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                { showLogin
                  ? "Order Summary"
                  : paymentStep === 1
                  ? "Order Details: "
                  : paymentStep === 2
                  ? "Payment"
                  : paymentStep === 3
                  ? "Order Placed"
                  : "Order Summary"}
              </h2>
              {isLoggedIn && (
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
              <button className="text-2xl" onClick={() => setBuyOpen(false) }>
                ×
              </button>
              
            </div>
            <img
              src={selectedProduct.imageUrl}
              className="w-full h-40 object-cover rounded mt-3"
              alt=""
            />
            <h3 className="text-lg font-bold mt-2">{selectedProduct.Product_name}</h3>
            <p className="font-semibold">₹{selectedProduct.price}</p>
            {showLogin && (
              <div className="mt-4 flex justify-center">
                <form
                  className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 backdrop-blur-3xl w-[20rem] p-8 rounded-3xl shadow-3xl shadow-purple-500/40 border border-white/20 h-auto"
                  onSubmit={handleSubmitLogin}
                >
                  <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Login</h2>
                  <label className="text-sm text-white mb-1 block">Email:</label>
                  <input
                    type="email"
                    className="border border-white/40 bg-white/20 text-white rounded px-3 py-2 w-full focus:outline-none mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className="text-sm text-white mb-1 block">Password:</label>
                  <input
                    type="password"
                    className="border border-white/40 bg-white/20 text-white rounded px-3 py-2 w-full focus:outline-none mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div className="flex justify-center mt-6">
                    <button type="submit" className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200 w-full">
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
                <AlertMessage
                          open={alertOpen}
                          severity={alertSeverity}
                          message={alertMessage}
                          handleClose={handleAlertClose}
                        />
              </div>
              
            )}
            {!showLogin && paymentStep === 1 && (
              <>
                <label className="font-semibold mt-4 block">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded p-2"
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(e.target.value)}
                  required
                />
                <label className="font-semibold mt-4 block">Delivery Address</label>
                <textarea
                  className="w-full border rounded p-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                  required
                />
                <label className="block mt-4 font-semibold">
                  Handling Preference
                </label>
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
                <div className="w-full space-y-4">
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
                    <div>
                      <p className="font-semibold mb-2">Choose UPI App:</p>
                      <div className="grid grid-cols-3 gap-3 mb-2">
                        {upiApps.map((app) => (
                          <button
                            key={app.name}
                            onClick={() => setSelectedUPI(app.name)}
                            required
                            className={`flex flex-col items-center p-2 border rounded-lg transition-transform duration-200 hover:scale-105 ${
                              selectedUPI === app.name ? "border-blue-500 shadow-lg" : "border-gray-300"
                            }`}
                          >
                            {app.icon}
                            <span className="text-sm mt-1">{app.name}</span>
                          </button>
                        ))}
                      </div>

                      <label className="block font-semibold mb-1">Enter UPI ID:</label>
                      <input
                        type="text"
                        placeholder="example@upi"
                        className="w-full border p-2 rounded"
                      />
                    </div>
                  )}
                  {paymentMethod === "CARD" && (
                      <div>
                        <p className="font-semibold mb-2">Choose Card:</p>
                        <div className="grid grid-cols-3 gap-3 mb-2">
                          {cards.map((card) => (
                            <button
                              key={card.name}
                              onClick={() => setSelectedCard(card.name)}
                              required
                              className={`flex flex-col items-center p-2 border rounded-lg transition-transform duration-200 hover:scale-105 ${
                                selectedCard === card.name ? "border-blue-500 shadow-lg" : "border-gray-300"
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
                      <p className="text-green-600 font-semibold">You will pay at the time of delivery.</p>
                    )}
                </div>
                <button
                  className="w-full bg-indigo-600 text-white p-3 rounded mt-6"
                  onClick={() => {
                    if (validateOrderDetails()) {
                      setPaymentStep(2);
                    }
                  }}
                  required
                >
                  Proceed To Payment
                </button>
              </>
            )}
            {paymentStep === 2  && !showLogin && (
              <>
                <h2 className="mt-4 text-lg font-semibold">Complete your payment</h2>
                <p className="mt-2 font-semibold">Payment Method: {paymentMethod}</p>
                <button
                  className="w-full bg-green-600 text-white p-3 rounded mt-6"
                  onClick={() => setPaymentStep(3)}
                  required
                >
                  Complete Payment
                </button>
              </>
            )}
            {paymentStep === 3  && !showLogin &&  (
              <>
                <h2 className="text-2xl font-bold text-center mt-4 mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x">
                  Order Summary
                </h2>

                <div className="space-y-3 p-6 rounded-xl shadow-lg bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                  <p>
                    <span className="font-semibold text-gray-700">Product:</span> {selectedProduct.Product_name}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Quantity:</span> {buyQuantity}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Total Price:</span> ₹{selectedProduct.price * buyQuantity}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Address:</span> {address}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Handling:</span> {handling}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Assembly:</span> {assembly}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Delivery Date:</span> {deliveryDate}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Payment Method:</span> {paymentMethod}
                  </p>
                </div>
                <button className="w-full mt-6 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl" onClick={placeOrder}>Place Order</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default FurnatureItems;
