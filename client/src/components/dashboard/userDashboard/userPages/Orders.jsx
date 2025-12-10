import React from "react";

const orders = [
  {
    id: "1001",
    date: "2025-12-10",
    status: "Delivered",
    total: "$120.00",
  },
  {
    id: "1002",
    date: "2025-12-09",
    status: "Processing",
    total: "$80.00",
  },
  {
    id: "1003",
    date: "2025-12-08",
    status: "Cancelled",
    total: "$50.00",
  },
];

const OrdersTable = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-6 text-gray-600 font-medium uppercase tracking-wider">Order ID</th>
              <th className="text-left py-3 px-6 text-gray-600 font-medium uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-6 text-gray-600 font-medium uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-6 text-gray-600 font-medium uppercase tracking-wider">Total</th>
              <th className="text-left py-3 px-6 text-gray-600 font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">{order.date}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6">{order.total}</td>
                <td className="py-4 px-6">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
