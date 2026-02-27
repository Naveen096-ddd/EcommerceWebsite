import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../apis/axiosInstancs";
import { getProductsApi, loginApi,saveUserLocationApi,getUserDashApi,placeOrderApi,addToCartApi,addToFavoriteApi,removeFromFavoriteApi,getFavoritesApi } from "../../apis/Api";
const ShopContext = createContext();
import {jwtDecode} from "jwt-decode";
export const useShop = () => useContext(ShopContext);
export const ShopProvider = ({ children }) => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [furnitureProducts, setFurnitureProducts] = useState([]);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHoveredHovered2, setIsHovered2] = useState(false);
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [selectedUPI, setSelectedUPI] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProductsApi();
        const data = res.data.products || res.data;
        const normalized = data.map((p) => ({
          ...p,
          id: p._id || p.id,
          imageUrl: p.imageUrl || p.image,
        }));
        setFurnitureProducts(normalized);
        const q = {};
        normalized.forEach((p) => (q[p.id] = 0));
        setQuantities(q);
      } catch (err) {
        console.error("Fetch products failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in UserDashboard:", token);
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
      setRole(decoded.role);
      getUserDashApi()
        .then((res) => {
          console.log("UserDash API response:", res.data);
          console.log("Username before saving:", username);

          if (res.data?.success) {
            setUsername(res.data.username);
          }
          
        })
        .catch((err) => {
          console.error("UserDash API failed:", err);
          if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem("token");
          }
        });
    } catch (err) {
      console.error("JWT decode failed:", err);
      localStorage.removeItem("token");
    }
  }, []);
  useEffect(() => {
  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // don't fetch if not logged in

      const res = await getFavoritesApi();

      if (res.data.success) {
        // since backend returns full products
        const favIds = res.data.favorites.map((item) => item.id);
        setFavorites(favIds);
      }
    } catch (error) {
      console.error("Load favorites error:", error);
    }
  };

  fetchFavorites();
}, []);
  const increment = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const decrement = (id) =>
    setQuantities((prev) =>
      prev[id] > 0 ? { ...prev, [id]: prev[id] - 1 } : prev
    );
  const addToCart = async (product) => {
    const quantity = quantities[product.id];

    if (!quantity || quantity <= 0) {
      alert("Select quantity first");
      return;
    }

    try {
      await addToCartApi({
        productId: product.id,
        quantity: quantity,
      });

      setCartCount((prev) => prev + quantity);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
      setIsOpen(true);
      alert("Added to cart!");

    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };
  const getCurrentLocation = () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const decoded = jwtDecode(token);   // ✅ decode here

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await response.json();

          if (data?.display_name) {

            const currentAddress = data.display_name;

            setAddress(currentAddress);

            await saveUserLocationApi({
              username: decoded.username,   // ✅ now defined
              latitude: lat,
              longitude: lon,
              address: currentAddress,
            });

            console.log("User location saved successfully");
          }

        } catch (error) {
          console.error("Location fetch error:", error);
        }
      },
      (error) => {
        alert("Location permission denied.");
        console.error(error);
      }
    );
  };
  const handleBuy = (product) => {
    setSelectedProduct(product);
    setBuyQuantity(1);
    setPaymentStep(1);
    setBuyOpen(true);
  };
  const toggleFavorite = async (productId) => {
  try {
    if (favorites.includes(productId)) {
      await removeFromFavoriteApi(productId);
      setFavorites(prev => prev.filter(id => id !== productId));
    } else {
      await addToFavoriteApi(productId);
      setFavorites(prev => [...prev, productId]);
    }
  } catch (error) {
    console.error("Favorite toggle error:", error);
  }
};
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginApi({ email, password });
      setIsLoggedIn(true);
      setLoggedInUser(res.data.user);
      setShowLogin(false);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };
  const validateOrderDetails = () => {
    if (!buyQuantity || buyQuantity < 1) return alert("Select quantity");
    if (!address.trim()) return alert("Enter address");
    if (!handling) return alert("Select handling option");
    if (!assembly) return alert("Select assembly option");
    if (!deliveryDate) return alert("Select delivery date");
    if (!paymentMethod) return alert("Select payment method");
    return true;
  };
const placeOrder = async () => {
const token = localStorage.getItem("token");
  if (!validateOrderDetails()) return;
const orderData = {
  productId: selectedProduct?.id,
  quantity: buyQuantity,
  address,
  paymentMethod,
  handling,
  assembly,
  deliveryDate,
  status: "PENDING",
};
  try {
    const res = await placeOrderApi(orderData);
    console.log("Order success:", res.data);
    alert("Order placed successfully!");
    setBuyOpen(false);
    setPaymentStep(1);
    setSelectedProduct(null);
    setBuyQuantity(1);
    setAddress("");
    setPaymentMethod("");
    setHandling("");
    setAssembly("");
    setDeliveryDate("");
    setSelectedUPI("");
    setSelectedCard("");
  } catch (error) {
    console.error("Order failed:", error.response?.data || error.message);
    alert("Order failed");

  }
};
  return (
    <ShopContext.Provider
      value={{
        scrollRef1,
        scrollRef2,
        furnitureProducts,
        isHovered1,
        setIsHovered1,
        isHoveredHovered2,
        setIsHovered2,
        isOpen,
        setIsOpen,
        buyOpen,
        setBuyOpen,
        paymentStep,
        setPaymentStep,
        selectedProduct,
        buyQuantity,
        setBuyQuantity,
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
        handling,
        setHandling,
        assembly,
        setAssembly,
        deliveryDate,
        setDeliveryDate,
        quantities,
        getCurrentLocation,
        increment,
        decrement,
        addToCart,
        handleBuy,
        placeOrder,
        showLogin,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        loading,
        selectedUPI,
        setSelectedUPI,
        selectedCard,
        setSelectedCard,
        validateOrderDetails,
        cartCount,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
