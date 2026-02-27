import React, { useState, useEffect } from "react";
import { getOrderDetailsApi } from "../../../../apis/Api";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL); // make sure backend socket running

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrderDetailsApi();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();

    // 🔥 Real-time listener
    socket.on("orderUpdated", () => {
      fetchOrders();
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, []);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Qty</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">{order.order_id}</td>
                <td className="py-4 px-6">{order.Product_name}</td>
                <td className="py-4 px-6">{order.quantity}</td>
                <td className="py-4 px-6">
                  {formatPrice(order.price * order.quantity)}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl p-4 border"
          >
            <p className="font-semibold">Order: {order.order_id}</p>
            <p>Product: {order.Product_name}</p>
            <p>Quantity: {order.quantity}</p>
            <p className="font-semibold">
              Total: {formatPrice(order.price * order.quantity)}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === "accepted"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;