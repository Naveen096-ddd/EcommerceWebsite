import React, { useState } from 'react';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Changes saved successfully!');
  };

  return (
    <div className="min-h-screen p-6  text-black">
      <h2 className="text-3xl font-bold mb-6">Account Settings</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 rounded-2xl shadow-lg bg-white"
      >
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            placeholder="Your Name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            placeholder="Your Email"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            placeholder="Your Phone Number"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            placeholder="New Password"
          />
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg shadow-lg transition transform hover:scale-105"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
