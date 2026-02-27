import React, { useContext, useEffect, useState } from "react";
import { useShop }  from "../../../context/ShopContext";
import { getFavoritesApi, addToCartApi } from "../../../../apis/Api";

const Wishlist = ({ darkMode }) => {
  const { favorites, toggleFavorite } = useShop();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts();
  }, [favorites]);

  const fetchProducts = async () => {
    try {
      const res = await getFavoritesApi();
      if (res.data.success) {
        setWishlistProducts(res.data.favorites);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await addToCartApi({
        productId: item.id,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 py-10 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"
      }`}
    >
      <h2 className="text-4xl font-extrabold mb-12 text-center">
        💖 My Wishlist
      </h2>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : wishlistProducts.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-6xl mb-4">💔</div>
          <p className="text-xl font-semibold">
            Your wishlist is empty
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistProducts.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl shadow-2xl overflow-hidden transition hover:-translate-y-3 duration-500 ${
                darkMode
                  ? "bg-white/10 border border-white/10"
                  : "bg-white/90 border"
              }`}
            >
              <div className="overflow-hidden">
                <img
                  src={`http://localhost:3002/uploads/${item.image}`}
                  alt={item.Product_name}
                  className="w-full h-60 object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg"
              >
                ❤️
              </button>

              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 truncate">
                  {item.Product_name}
                </h3>

                <p className="opacity-70 text-sm line-clamp-2">
                  {item.description}
                </p>

                <p className="text-green-500 font-extrabold text-xl mt-3">
                  ₹{Number(item.price).toFixed(2)}
                </p>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-2 w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:scale-105 transition"
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;