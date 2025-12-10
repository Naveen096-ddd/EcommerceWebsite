
import React from "react";
import { useState, useEffect, useRef } from "react";
import { furnitureProducts ,cards, upiApps} from "../../../../assets/Assets"; 
import { FaShoppingCart} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useBlogs } from "../../../context/BlogContext";
import { products } from "../../../../assets/Assets";
//Our Furniture Collection
const FurnceCollectionSection = () => (
    <section className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 py-24">
        <div className="container px-5  mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900 title-font mb-1">
                FURNITURE COLLECTION
            </h2>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Discover stylish and comfortable furniture for every corner of your home. From living room essentials to bedroom must-haves, we bring you modern designs crafted for your lifestyle.
            </p>
            </div>
            <div className="flex flex-wrap">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Elegant Sofa Sets
                </h2>
                <p className="leading-relaxed text-base mb-4">
                Comfortable and stylish sofas perfect for modern living rooms. Available in multiple colors and fabrics.
                </p>
                <a className="text-green-800 inline-flex items-center cursor-pointer">
                Learn More
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Dining Tables
                </h2>
                <p className="leading-relaxed text-base mb-4">
                Modern and rustic dining tables to suit your space. Durable wood and sleek designs for every home.
                </p>
                <a className="text-green-800 inline-flex items-center cursor-pointer">
                Learn More
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Stylish Chairs
                </h2>
                <p className="leading-relaxed text-base mb-4">
                Ergonomic and trendy chairs for dining, workspaces, or living areas. Comfort meets design.
                </p>
                <a className="text-green-800 inline-flex items-center cursor-pointer">
                Learn More
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Bedroom Essentials
                </h2>
                <p className="leading-relaxed text-base mb-4">
                Beds, nightstands, and wardrobes crafted to provide both style and functionality for your bedroom.
                </p>
                <a className="text-green-800 inline-flex items-center cursor-pointer">
                Learn More
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
            </div>
            <button className="flex mx-auto mt-16 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 border-0 py-3 px-10 rounded-lg text-lg shadow-md transition transform hover:scale-105 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            Shop Now
            </button>
        </div>
    </section>
)
//Buying Furnitures file
const FurnatureItems = () => {
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState(
    furnitureProducts.reduce((acc, p) => {acc[p.id] = 0;
      return acc;
    }, {})
  );
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const useAutoScroll = (scrollRef, isHovered) => {
    useEffect(() => {
      const scrollContainer = scrollRef.current;
      let scrollAmount = 0;
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;

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
  const increment = (id) =>
    setQuantities({ ...quantities, [id]: quantities[id] + 1 });
  const decrement = (id) =>
    quantities[id] > 0 &&
    setQuantities({ ...quantities, [id]: quantities[id] - 1 });
  const addToCart = (id) => {
    setCartCount(cartCount + quantities[id]);
    setQuantities({ ...quantities, [id]: 0 });
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUPI, setSelectedUPI] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [buyOpen, setBuyOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [handling, setHandling] = useState("");
  const [assembly, setAssembly] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
   const [showSignup, setShowSignup] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSummaryCard, setShowSummaryCard] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleBuy = (product) => {
    setSelectedProduct(product);
    if (!isLoggedIn) {
      setShowSignup(true);

    } else {
      setPaymentStep(1);
    }
    setBuyOpen(true);
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
          alert("Please fill in all fields!");
          return;
        }
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        setIsLoggedIn(true);
        setShowSignup(false);
        setPaymentStep(1);
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    alert("Login successful!");
    setIsLoggedIn(true);
    setShowLogin(false);
    setPaymentStep(1); 
  }
  const placeOrder = (e) => {
    e.preventDefault();
    console.log(selectedProduct, address, paymentMethod, handling, assembly, deliveryDate);
    alert("Order placed successfully!");
  };
  const renderProductCard = (product) => (
    <div
      key={product.id}
      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 hover:scale-105 transition-transform cursor-pointer"
    >
      <img
        className="h-40 w-full object-cover rounded mb-4"
        src={product.image}
        alt={product.name}
      />
      <h2 className="text-gray-900 font-medium text-lg">{product.name}</h2>
      <p className="text-gray-500 text-sm mb-2">{product.description}</p>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 text-sm">Color: {product.color}</span>
        <span className="text-gray-900 text-sm">Size: {product.size}</span>
      </div>
      <div className="flex items-center mb-4">
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => decrement(product.id)}
        >
          -
        </button>
        <span className="mx-2">{quantities[product.id]}</span>
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => increment(product.id)}
        >
          +
        </button>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">₹{product.price}</span>
        <button
          className="bg-indigo-500 text-white px-3 py-2 rounded"
          onClick={() => addToCart(product.id)}
        >
          <FaShoppingCart />
        </button>
        <button
          className="bg-green-600 text-white px-2 py-2 rounded"
          onClick={() => handleBuy(product)}
        >
          BuyNow
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

            <h2 className="text-lg font-bold text-center">
              Please create an account to proceed...
            </h2>

            <div className="flex justify-center mt-6">
              <Link to="/signup">
                <button className="bg-indigo-500 text-white px-4 py-2 rounded">
                  Sign Up
                </button>
              </Link>
            </div>
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
                {showSignup && showLogin
                  ? "Order Summary"
                  : paymentStep === 1
                  ? "Order Details"
                  : paymentStep === 2
                  ? "Payment"
                  : paymentStep === 3
                  ? "Order Placed"
                  : "Order Summary"}
              </h2>

              <button className="text-2xl" onClick={() => setBuyOpen(false)}>
                ×
              </button>
            </div>
            <img
              src={selectedProduct.image}
              className="w-full h-40 object-cover rounded mt-3"
              alt=""
            />
            <h3 className="text-lg font-bold mt-2">{selectedProduct.name}</h3>
            <p className="font-semibold">₹{selectedProduct.price}</p>
            {showSignup && (
              <div className="mt-4">
                <form className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 backdrop-blur-3xl w-[20rem] p-8 rounded-3xl shadow-3xl shadow-purple-500/40  border border-white/20 h-auto" onSubmit={handleSubmit}>
                  <h2 className="text-4xl font-extrabold text-white mb-6 flex justify-center">Signup</h2>
                  <label className="text-base text-white mb-1 block">Full Name:</label>
                  <input
                    type="text"
                    className="border border-white/40 bg-white/20 text-white rounded px-4 py-2 w-full focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <label className="text-base text-white mb-1 block">Email:</label>
                  <input
                    type="email"
                    className="border border-white/40 bg-white/20 text-white rounded px-4 py-2 w-full focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <label className="text-base text-white mb-1 block">Password:</label>
                  <input
                    type="password"
                    className="border border-white/40 bg-white/20 text-white rounded px-4 py-2 w-full focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <label className="text-base text-white mb-1 block">Confirm Password:</label>
                  <input
                    type="password"
                    className="border border-white/40 bg-white/20 text-white rounded px-4 py-2 w-full focus:outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                <div className="flex justify-center mt-4">
                  <p className="text-white text-lg">
                      Already have an account?{" "}
                      <a href="#" className="text-[#00f7ff] font-semibold hover:underline"    onClick={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                      }}>Login</a>
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <button className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setShowSignup(true);
                    setPaymentStep(1);
                  }}>Sign Up
                  </button>
                </div>
              </form>
            </div>
            )}
            {showLogin && (
              <div className="mt-4 flex justify-center">
                <form
                  className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 backdrop-blur-3xl w-[20rem] p-8 rounded-3xl shadow-3xl shadow-purple-500/40  border border-white/20 h-auto"
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
                    <button
                      type="button"
                      className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 
                        text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200 w-full"
                        onClick={(e)=>{
                          e.preventDefault();
                          setIsLoggedIn(true);
                          setShowLogin(false);
                          setPaymentStep(1);
                        }}
                    >
                      Login & Continue
                    </button>
                  </div>
                </form>
              </div>
            )}
            {!showSignup && !showLogin && paymentStep === 1 && (
              <>
                <label className="font-semibold mt-4 block">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded p-2"
                  value={buyQuantity}
                  onChange={(e) => setBuyQuantity(e.target.value)}
                />
                <label className="font-semibold mt-4 block">Delivery Address</label>
                <textarea
                  className="w-full border rounded p-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                />
                <label className="block mt-4 font-semibold">
                  Handling Preference
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={handling}
                  onChange={(e) => setHandling(e.target.value)}
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
                />
                <label className="block mt-4 font-semibold">Payment Method</label>
                <div className="w-full space-y-4">
                  <select
                    className="w-full border p-2 rounded"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                  onClick={() => setPaymentStep(2)}
                >
                  Proceed To Payment
                </button>
              </>
            )}
            {paymentStep === 2 && !showSignup && !showLogin && (
              <>
                <h2 className="mt-4 text-lg font-semibold">Complete your payment</h2>
                <p className="mt-2 font-semibold">Payment Method: {paymentMethod}</p>
                <button
                  className="w-full bg-green-600 text-white p-3 rounded mt-6"
                  onClick={() => setPaymentStep(3)}
                >
                  Complete Payment
                </button>
              </>
            )}
            {paymentStep === 3 && !showSignup && !showLogin &&  (
              <>
                <h2 className="text-2xl font-bold text-center mt-4 mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x">
                  Order Summary
                </h2>

                <div className="space-y-3 p-6 rounded-xl shadow-lg bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                  <p>
                    <span className="font-semibold text-gray-700">Product:</span> {selectedProduct.name}
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
//Categories File
const CategoriesSection = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <section className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500">
      <div className="container mx-auto px-2">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">
          Popular Categories
        </h1>
        <div className="flex flex-wrap -m-4">
          {categories.map((category) => (
            <div key={category.id} className="p-4 w-1/2 sm:w-1/3 md:w-1/6">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white shadow-lg flex flex-col">
                <div className="relative w-full h-50 cursor-pointer">
                  <img
                    className="w-full h-full object-cover"
                    src={category.image}
                    alt={category.names}
                  />
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700  hidden md:inline-block"
                  >
                    View
                  </button>
                </div>
                <div className="p-2 flex-1 flex items-center justify-center">
                  <h3 className="text-center text-sm font-medium text-gray-900">
                    {category.names}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-2/5 p-6 relative">
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedCategory.names}</h2>
              <img
                src={selectedCategory.image}
                alt={selectedCategory.names}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <p className="text-gray-700 mb-2">
                {selectedCategory.description || "No description available."}
              </p>
              <p className="text-gray-900 font-semibold mb-1">
                Price: ${selectedCategory.price}
              </p>
              <p className="text-yellow-500 font-medium">
                Rating: {selectedCategory.rating} ⭐
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
//Dummy Our New Collection file
const ProductCard = ({ brand, name, image, price, rating, reviews }) => (
  <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
    <img src={image} alt={name} className="w-full h-64 object-cover object-center" />
    <div className="p-4">
      <h2 className="text-sm text-gray-500">{brand}</h2>
      <h1 className="text-lg font-medium text-gray-900">{name}</h1>
      <div className="flex items-center mt-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-indigo-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ))}
        <span className="text-gray-600 ml-2">{reviews} Reviews</span>
      </div>
      <p className="text-xl font-semibold">₹{price}.00</p>
      <div className="mt-2 flex gap-2">
          <button className="flex-1 bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
            Add to Cart
          </button>
          {/* <button className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition" >
            Buy
          </button> */}
        </div>
    </div>
  </div>
);
const FurnitureGrid = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 mx-auto py-12 px-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Our New  Collection</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};
//Discover the Latest in Furniture file
const BlogsSection = ({ blogs, openComments }) => (
  <section className=" bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 py-24">
    <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center mb-9">Discover the Latest in Furniture & Home Decor</h1>
      <div className="flex flex-wrap -m-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 w-full sm:w-1/2 md:w-1/4">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={blog.img}
                alt={blog.title}
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  {blog.category}
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  {blog.title}
                </h1>
                <p className="leading-relaxed mb-3">{blog.description}</p>
                <div className="flex items-center flex-wrap">
                  <a className="text-indigo-500 inline-flex items-center cursor-pointer">
                    Learn More
                  </a>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    {blog.likes}
                  </span>
                  <span
                    onClick={() => openComments(blog.id)}
                    className="text-gray-400 inline-flex items-center leading-none text-sm cursor-pointer hover:text-indigo-500"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 10c0 3.866-3.582 7-8 7a8.964 8.964 0 01-4-.9L2 17l1.9-4a8.964 8.964 0 01-.9-4c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                    </svg>
                    {blog.comments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
//FurnitureFeatures Content
const FurnitureFeaturesContent = () => {
  return (
    <section className="text-gray-700 body-font bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-4xl text-3xl font-semibold title-font text-gray-900 mb-4 tracking-wide">
            Crafted Elegance for Your Home
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-600">
            Discover premium furniture designed with precision, warmth, and timeless charm.
            Every piece is crafted to elevate your home into a sanctuary of comfort and style.
          </p>

          <div className="flex mt-6 justify-center">
            <div className="w-20 h-1 rounded-full bg-amber-600"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M18 20v-6M6 20v-6M3 10h18M7 10V5a5 5 0 0110 0v5" />
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg font-medium mb-3">Handcrafted Luxury</h2>
              <p className="leading-relaxed text-base">
                Every piece is hand-crafted by skilled artisans using fine hardwoods,
                ensuring durability and a luxurious finish that ages beautifully.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 12h16M2 15v-3a3 3 0 013-3h14a3 3 0 013 3v3M2 15h2v3h16v-3h2" />
              </svg>
            </div>

            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg font-medium mb-3">
                Modern Comfort
              </h2>
              <p className="leading-relaxed text-base">
                Experience unmatched comfort with plush upholstery and ergonomic
                designs perfect for cozy evenings and elegant gatherings.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 2l7 10H5l7-10zM6 14h12v3H6v-3zM10 17v3h4v-3" />
              </svg>
            </div>

            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg font-medium mb-3">
                Timeless Aesthetic
              </h2>
              <p className="leading-relaxed text-base">
                Our designs blend modern minimalism with classic elegance,
                giving your home a warm, rich, and timeless personality.
              </p>
            </div>
          </div>
        </div>
        <button className="flex mx-auto mt-16 text-white bg-amber-600 border-0 py-3 px-10
          focus:outline-none hover:bg-amber-700 rounded-lg shadow-lg text-lg transition">
          Explore Collection
        </button>
      </div>
    </section>
  );
};
//Contact Section
const ContactSection = () => (
  <>
    <section className="relative min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 flex justify-center items-center px-4 py-12">
      <h1 className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl md:text-4xl font-bold text-black z-20">Contact Us</h1>
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="map"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=India&ie=UTF8&t=&z=5&iwloc=B&output=embed"
          className="filter grayscale contrast-125 opacity-40"
        ></iframe>
      </div>
      <div className="container px-5 py-15 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-xl p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-lg">
          <h2 className="text-gray-900 text-2xl mb-2 font-semibold title-font">Get in Touch</h2>
          <p className="leading-relaxed mb-6 text-gray-600">
            Have a question about our furniture? Send us a message and we'll get back to you promptly.
          </p>

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="message" className="leading-7 text-sm text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>

          <button className="text-white bg-green-600 border-0 py-3 px-6 focus:outline-none hover:bg-green-700 rounded-lg text-lg transition">
            Send Message
          </button>

          <p className="text-xs text-gray-500 mt-3">
            We value your feedback and inquiries. Visit our showroom for a firsthand experience of our furniture collection.
          </p>
        </div>
      </div>
    </section>
  </>
);
const HomeContent = () => {
  const { blogs, categories, activeBlog, openComments, closeComments } = useBlogs();
  return (
    <div>
      <FurnceCollectionSection/>
      <CategoriesSection categories={categories} />
      <FurnatureItems/>
      <FurnitureGrid />
      <BlogsSection blogs={blogs} openComments={openComments} />
      {activeBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg relative">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows="5"
              placeholder="Write a comment..."
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={closeComments}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded mr-2"
              >
                Close
              </button>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-4 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <FurnitureFeaturesContent/>
      <ContactSection/>

    </div>
  );
};

export default HomeContent;
