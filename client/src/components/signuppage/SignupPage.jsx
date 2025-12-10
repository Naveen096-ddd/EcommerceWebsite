import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Header from "../pages/Home/header/Header";

const Admin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <>
    <Header/>
      <div className=" signup-3d-container min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-600 to-indigo-900 p-6">
        <form
          className="signup-3d-card bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 
          backdrop-blur-xl w-[32rem] p-8 rounded-2xl shadow-2xl shadow-blue-500/40 
          border border-white/20 h-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-extrabold text-white mb-6 flex justify-center">Signup</h2>

          <label className="text-xl text-white">Full Name:</label>
          <input
            type="text"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="text-xl text-white">Email:</label>
          <input
            type="email"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-xl text-white">Password:</label>
          <input
            type="password"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="text-xl text-white">Confirm Password:</label>
          <input
            type="password"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 w-full focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex justify-center mt-4">
            <p className="text-white text-lg">
                Already have an account?{" "}
                <a
                href="/login"
                className="text-[#00f7ff] font-semibold hover:underline"
                >
                Login
                </a>
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button className=" bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin;
