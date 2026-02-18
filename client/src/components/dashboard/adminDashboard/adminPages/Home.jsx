import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { ringtones } from "../../../../assets/Assets";
import {
  saveAdminLocationApi,
  getAdminDashApi,
  getOrdersApi,
  acceptOrderApi,
  getAdminLocationApi, // ✅ Added
} from "../../../../apis/Api";

const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});

function Admin() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);
  const [acceptedOrder, setAcceptedOrder] = useState(null);
  const [isAudioAllowed, setIsAudioAllowed] = useState(false);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [error, setError] = useState("");

  const [locationExists, setLocationExists] = useState(false); // ✅ NEW
  const [showLocationForm, setShowLocationForm] = useState(true); // ✅ NEW

  const audioRef = useRef(new Audio(ringtones[0]));

  /* ================= FETCH ADMIN + CHECK LOCATION ================= */
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getAdminDashApi();
        setAdmin(res.data);

        // 🔍 Check if location exists
        try {
          const locationRes = await getAdminLocationApi(res.data.username);

          if (locationRes.data) {
            setLocationExists(true);
            setShowLocationForm(false);
          }
        } catch (err) {
          // If 404 → location not found
          setLocationExists(false);
          setShowLocationForm(true);
        }

      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await getOrdersApi();
      setOrders(res.data); // 👈 set all DB orders
    } catch (err) {
      console.error("Fetch Orders Error:", err);
    }
  };

  fetchOrders();
}, []);

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!admin) return;

    socket.on("connect", () => {
      socket.emit("registerAdmin", admin.username);
    });

    socket.on("newOrder", (order) => {
      setOrders((prev) => [...prev, order]);

      if (isAudioAllowed) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {});
      }
    });

    socket.on("orderAccepted", (data) => {
      setOrders((prev) =>
        prev.filter((order) => order.id !== data.orderId)
      );

      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    });


    socket.on("orderRejected", (data) => {
      setOrders((prev) =>
        prev.filter((order) => order.orderId !== data.orderId)
      );
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    });

    socket.on("orderDetails", (order) => {
      setAcceptedOrder(order);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    });

    return () => {
      socket.off("connect");
      socket.off("newOrder");
      socket.off("orderAccepted");
      socket.off("orderRejected");
      socket.off("orderDetails");
    };
  }, [admin, isAudioAllowed]);

  /* ================= ENABLE SOUND ================= */
const enableSound = () => {
  setIsAudioAllowed(true);

  audioRef.current.play().then(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  });

  if (socket && admin) {
    console.log("Socket ID:", socket.id);

    socket.emit("registerAdmin", {
      username: admin.username,
      socketId: socket.id,
    });
  }
};


  /* ================= ORDER ACTIONS ================= */
const acceptOrder = async (order) => {
  try {
    await acceptOrderApi({
      orderId: order.id,
      adminUsername: admin.username,
    });
    socket.emit("acceptOrder", {
      orderId: order.id,
      adminUsername: admin.username,
    });
    alert('Order accepted successfully');

  } catch (err) {
    console.error("Accept Order Error:", err);
  }
};



  const rejectOrder = (order) => {
    socket.emit("rejectOrder", {
      orderId: order.orderId,
    });
  };

  /* ================= SAVE LOCATION ================= */
  const saveLocation = async () => {
    if (!latitude || !longitude) {
      alert("Please enter latitude and longitude");
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data?.display_name) {
        const address = data.display_name;
        setPlaceName(address);
        await saveAdminLocationApi({
          username: admin.username,
          latitude,
          longitude,
          address,
        });
        alert("Location saved successfully");
        setLocationExists(true);      
        setShowLocationForm(false);
        setLatitude("");
        setLongitude("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {admin?.username}
          </h1>
        </div>

        {/* ENABLE SOUND */}
        {!isAudioAllowed && (
          <button
            onClick={enableSound}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
          >
            Enable Notification Sound
          </button>
        )}

        {/* ADD NEW LOCATION BUTTON */}
        {locationExists && !showLocationForm && (
          <button
            onClick={() => setShowLocationForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
          >
            Add New Location
          </button>
        )}

        {/* LOCATION CARD */}
        {showLocationForm && (
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Set Your Location</h2>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setShowLocationForm(false)}
                className="text-red-500 font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="Enter longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              onClick={saveLocation}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
            >
              Save Location
            </button>

            {placeName && (
              <p className="mt-3 text-gray-600">
                <strong>Address:</strong> {placeName}
              </p>
            )}

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}


        {/* ORDERS */}
        <div className="text-black bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Incoming Orders</h2>

          {orders.length === 0 && (
            <p className="text-gray-500">No new orders</p>
          )}

          <div className="grid md:grid-cols-2 gap-6 text-black">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border text-black rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Pickup:</strong> {order.address}</p>
                <p><strong>Product ID:</strong> {order.product_id}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => acceptOrder(order)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => rejectOrder(order)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCEPTED ORDER */}
        {acceptedOrder && (
          <div className=" text-blackborder border-green-300 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-green-700 mb-3">
              Accepted Order
            </h2>
            <p>Order ID: {acceptedOrder.orderId}</p>
            <p>User ID: {acceptedOrder.userId}</p>
            <p>Product ID: {acceptedOrder.productId}</p>
            <p>Quantity: {acceptedOrder.quantity}</p>
            <p>Pickup Address: {acceptedOrder.pickupAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
