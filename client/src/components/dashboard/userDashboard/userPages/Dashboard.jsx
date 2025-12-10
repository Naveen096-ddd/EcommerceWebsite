import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,ArcElement,Title,Tooltip,Legend,} from "chart.js";
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,ArcElement,Title,Tooltip,Legend);
const DashboardHome = () => {
  const orderStatus = [
    {
      title: "Modern Chair",
      deliveryDate: "2025-12-12",
      cost: "$120",
      status: "On the Way",
    },
    {
      title: "Luxury Sofa",
      deliveryDate: "2025-12-15",
      cost: "$450",
      status: "Pending",
    },
    {
      title: "Wooden Table",
      deliveryDate: "2025-12-08",
      cost: "$220",
      status: "Delivered",
    },
  ];

  const metrics = [
    { title: "Wishlist Items", value: 4, color: "from-pink-400 to-pink-600" },
    { title: "Favorite Category", value: "Sofas", color: "from-orange-400 to-orange-600" },
    { title: "Total Orders", value: 10, color: "from-purple-400 to-purple-600" },
    { title: "Total Spent", value: "$1,200", color: "from-indigo-400 to-indigo-600" },
  ];

  const orderData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders Placed",
        data: [2, 4, 1, 5, 3, 6],
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ["Chairs", "Tables", "Sofas", "Beds"],
    datasets: [
      {
        data: [3, 2, 4, 1],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa", "#fbbf24"],
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "On the Way":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen w-full p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hello, John!</h1>
      </header>
      <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 shadow-xl rounded-xl p-4 sm:p-6 mb-6">
        <h2 className="text-2xl font-bold text-black mb-4 sm:mb-6">Your Orders</h2>
        <div className="overflow-x-auto lg:overflow-x-hidden rounded-lg shadow-md">
          <table className="min-w-[600px] w-full table-auto text-left border-separate border-spacing-0 rounded-2xl">
            <thead>
              <tr className="bg-white/20 backdrop-blur-md">
                <th className="px-3 sm:px-6 py-3 text-gray-800 font-semibold uppercase tracking-wide">Title</th>
                <th className="px-3 sm:px-6 py-3 text-gray-800 font-semibold uppercase tracking-wide">Delivery Date</th>
                <th className="px-3 sm:px-6 py-3 text-gray-800 font-semibold uppercase tracking-wide">Cost</th>
                <th className="px-3 sm:px-6 py-3 text-gray-800 font-semibold uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderStatus.map((order, index) => (
                <tr
                  key={index}
                  className={`transition transform hover:scale-105 hover:bg-white/10 ${
                    index % 2 === 0 ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <td className="px-3 sm:px-6 py-3 font-semibold text-black">{order.title}</td>
                  <td className="px-3 sm:px-6 py-3 text-black">{order.deliveryDate}</td>
                  <td className="px-3 sm:px-6 py-3 font-bold text-black">{order.cost}</td>
                  <td className="px-3 sm:px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-white/20 font-bold text-black">
                <td className="px-3 sm:px-6 py-3">Total Orders</td>
                <td className="px-3 sm:px-6 py-3" colSpan={2}></td>
                <td className="px-3 sm:px-6 py-3 text-cyan-800">{orderStatus.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {metrics.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} text-white shadow-lg rounded-lg p-5 text-center transform hover:scale-105 transition`}
          >
            <h2 className="text-gray-100 font-medium">{card.title}</h2>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 md:col-span-2">
          <h2 className="text-gray-700 mb-4 font-semibold">Orders Over Time</h2>
          <Line data={orderData} />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 mb-4 font-semibold">Orders by Category</h2>
          <Pie data={categoryData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
