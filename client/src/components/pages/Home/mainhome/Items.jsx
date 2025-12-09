import { useState, useRef, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { furnitureProducts } from "../../../../assets/Assets"; 

const FurnatureItems = () => {
  const { addToCart } = useCart(); // <-- Correct context function

  const [quantities, setQuantities] = useState(
    furnitureProducts.reduce((acc, p) => {
      acc[p.id] = 0;
      return acc;
    }, {})
  );

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Auto scrolling logic
  const useAutoScroll = (ref, isHovered) => {
    useEffect(() => {
      const box = ref.current;
      let x = 0;
      const max = box.scrollWidth - box.clientWidth;

      const timer = setInterval(() => {
        if (!isHovered) {
          x += 1;
          if (x > max) x = 0;
          box.scrollLeft = x;
        }
      }, 30);

      return () => clearInterval(timer);
    }, [isHovered]);
  };

  useAutoScroll(scrollRef1, isHovered1);
  useAutoScroll(scrollRef2, isHovered2);

  // Quantity controls
  const increment = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const decrement = (id) =>
    setQuantities((prev) =>
      prev[id] > 0 ? { ...prev, [id]: prev[id] - 1 } : prev
    );

  // Add to cart
  const addItemToCart = (product) => {
    const qty = quantities[product.id];

    console.log("ADDING:", product.name, " QTY:", qty); // DEBUG

    addToCart(product, qty); // <-- This sends data to Context

    // Reset quantity
    setQuantities((prev) => ({ ...prev, [product.id]: 0 }));

    // Show popup
    setIsOpen(true);
  };

  const renderCard = (product) => (
    <div
      key={product.id}
      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4"
    >
      <img className="h-40 w-full object-cover rounded mb-4" src={product.image} />

      <h2 className="text-gray-900 font-medium text-lg mb-1">{product.name}</h2>
      <p className="text-gray-500 text-sm mb-2">{product.description}</p>

      <div className="flex justify-between text-sm mb-2">
        <span>Color: {product.color}</span>
        <span>Size: {product.size}</span>
      </div>

      <div className="flex items-center mb-4">
        <button onClick={() => decrement(product.id)} className="px-2 py-1 bg-gray-200 rounded">
          -
        </button>
        <span className="mx-2">{quantities[product.id]}</span>
        <button onClick={() => increment(product.id)} className="px-2 py-1 bg-gray-200 rounded">
          +
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">₹{product.price}</span>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={() => addItemToCart(product)}
        >
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 p-6">

      <h1 className="text-4xl text-center font-bold mb-8">Best Sellers</h1>

      {/* POPUP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-white p-6 rounded" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-center font-bold text-lg">
              Product added to cart!
            </h2>
            <div className="flex justify-center mt-4">
              <Link to="/cart">
                <button className="bg-indigo-500 text-white px-4 py-2 rounded">
                  View Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ROW 1 */}
      <div
        ref={scrollRef1}
        className="flex space-x-6 overflow-x-auto overflow-y-hidden pb-4"
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
      >
        {furnitureProducts.slice(0, 10).map(renderCard)}
      </div>

      {/* ROW 2 */}
      <div
        ref={scrollRef2}
        className="flex space-x-6 overflow-x-auto overflow-y-hidden pb-4 mt-10"
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
      >
        {furnitureProducts.slice(10, 20).map(renderCard)}
      </div>
    </div>
  );
};

export default FurnatureItems;

