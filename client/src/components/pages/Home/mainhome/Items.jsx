// import { useState, useRef, useEffect } from "react";
// import { FaShoppingCart } from "react-icons/fa";
// import { useCart } from "../../../context/CartContext";
// import { Link } from "react-router-dom";
// import { furnitureProducts } from "../../../../assets/Assets"; 

// const FurnatureItems = () => {
//   const { addToCart } = useCart(); // <-- Correct context function

//   const [quantities, setQuantities] = useState(
//     furnitureProducts.reduce((acc, p) => {
//       acc[p.id] = 0;
//       return acc;
//     }, {})
//   );

//   const scrollRef1 = useRef(null);
//   const scrollRef2 = useRef(null);

//   const [isHovered1, setIsHovered1] = useState(false);
//   const [isHovered2, setIsHovered2] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   // Auto scrolling logic
//   const useAutoScroll = (ref, isHovered) => {
//     useEffect(() => {
//       const box = ref.current;
//       let x = 0;
//       const max = box.scrollWidth - box.clientWidth;

//       const timer = setInterval(() => {
//         if (!isHovered) {
//           x += 1;
//           if (x > max) x = 0;
//           box.scrollLeft = x;
//         }
//       }, 30);

//       return () => clearInterval(timer);
//     }, [isHovered]);
//   };

//   useAutoScroll(scrollRef1, isHovered1);
//   useAutoScroll(scrollRef2, isHovered2);

//   // Quantity controls
//   const increment = (id) =>
//     setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));

//   const decrement = (id) =>
//     setQuantities((prev) =>
//       prev[id] > 0 ? { ...prev, [id]: prev[id] - 1 } : prev
//     );

//   // Add to cart
//   const addItemToCart = (product) => {
//     const qty = quantities[product.id];

//     console.log("ADDING:", product.name, " QTY:", qty); // DEBUG

//     addToCart(product, qty); // <-- This sends data to Context

//     // Reset quantity
//     setQuantities((prev) => ({ ...prev, [product.id]: 0 }));

//     // Show popup
//     setIsOpen(true);
//   };

//   const renderCard = (product) => (
//     <div
//       key={product.id}
//       className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4"
//     >
//       <img className="h-40 w-full object-cover rounded mb-4" src={product.image} />

//       <h2 className="text-gray-900 font-medium text-lg mb-1">{product.name}</h2>
//       <p className="text-gray-500 text-sm mb-2">{product.description}</p>

//       <div className="flex justify-between text-sm mb-2">
//         <span>Color: {product.color}</span>
//         <span>Size: {product.size}</span>
//       </div>

//       <div className="flex items-center mb-4">
//         <button onClick={() => decrement(product.id)} className="px-2 py-1 bg-gray-200 rounded">
//           -
//         </button>
//         <span className="mx-2">{quantities[product.id]}</span>
//         <button onClick={() => increment(product.id)} className="px-2 py-1 bg-gray-200 rounded">
//           +
//         </button>
//       </div>

//       <div className="flex justify-between items-center">
//         <span className="font-bold text-lg">₹{product.price}</span>
//         <button
//           className="bg-indigo-500 text-white px-4 py-2 rounded"
//           onClick={() => addItemToCart(product)}
//         >
//           <FaShoppingCart />
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 p-6">

//       <h1 className="text-4xl text-center font-bold mb-8">Best Sellers</h1>

//       {/* POPUP */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center"
//           onClick={() => setIsOpen(false)}
//         >
//           <div className="bg-white p-6 rounded" onClick={(e) => e.stopPropagation()}>
//             <h2 className="text-center font-bold text-lg">
//               Product added to cart!
//             </h2>
//             <div className="flex justify-center mt-4">
//               <Link to="/cart">
//                 <button className="bg-indigo-500 text-white px-4 py-2 rounded">
//                   View Cart
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ROW 1 */}
//       <div
//         ref={scrollRef1}
//         className="flex space-x-6 overflow-x-auto overflow-y-hidden pb-4"
//         onMouseEnter={() => setIsHovered1(true)}
//         onMouseLeave={() => setIsHovered1(false)}
//       >
//         {furnitureProducts.slice(0, 10).map(renderCard)}
//       </div>

//       {/* ROW 2 */}
//       <div
//         ref={scrollRef2}
//         className="flex space-x-6 overflow-x-auto overflow-y-hidden pb-4 mt-10"
//         onMouseEnter={() => setIsHovered2(true)}
//         onMouseLeave={() => setIsHovered2(false)}
//       >
//         {furnitureProducts.slice(10, 20).map(renderCard)}
//       </div>
//     </div>
//   );
// };

// export default FurnatureItems;

import React from "react";

const products = [
  {
    brand: "FURNIHOME",
    name: "Modern Wooden Chair",
    image: "https://dummyimage.com/400x400/8B4513/fff",
    price: 120,
    rating: 4,
    reviews: 12,
  },
  {
    brand: "FURNIHOME",
    name: "Luxury Sofa",
    image: "https://dummyimage.com/400x400/1F2937/fff",
    price: 450,
    rating: 5,
    reviews: 24,
  },
  {
    brand: "FURNIHOME",
    name: "Glass Coffee Table",
    image: "https://dummyimage.com/400x400/CCCCCC/fff",
    price: 220,
    rating: 3,
    reviews: 8,
  },
  {
    brand: "FURNIHOME",
    name: "Office Desk",
    image: "https://dummyimage.com/400x400/555555/fff",
    price: 330,
    rating: 4,
    reviews: 15,
  },
];

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
      <p className="text-xl font-semibold">${price}.00</p>
      <button className="mt-2 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
        Add to Cart
      </button>
    </div>
  </div>
);

const FurnitureGrid = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Furniture Collection</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default FurnitureGrid;
