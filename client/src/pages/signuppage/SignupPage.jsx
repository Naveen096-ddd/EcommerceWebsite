import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Header from "../Home/header/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../app/slices/authSlice";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

const handleSubmit = async (e) => {
  e.preventDefault();

  let newErrors = {};
  if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
  if (!passwordRegex.test(password))
    newErrors.password = "Password must be strong";
  if (password !== confirmPassword)
    newErrors.confirmPassword = "Passwords do not match!";
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  const result = await dispatch(
    signupUser({ username, email, password, role, phonenumber })
  );

  if (signupUser.fulfilled.match(result)) {
    alert(result.payload.message || "Signup successful 🎉");
    navigate("/login"); // ✅ redirect after success
  }
};


  // ✅ Navigate after successful signup
  useEffect(() => {
    if (successMessage) {
      alert(successMessage || "Signup successful 🎉");
      navigate("/login");
    }
  }, [successMessage, navigate]);

  return (
    <>
      <Header />
      <div className=" h-full signup-3d-container min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-600 to-indigo-900 p-6">
        <form
          className="signup-3d-card bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 
          backdrop-blur-xl w-[32rem] p-8 rounded-2xl shadow-2xl shadow-blue-500/40 
          border border-white/20 h-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-extrabold text-white mb-6 flex justify-center">
            Signup
          </h2>

          <label className="text-xl text-white">Full Name:</label>
          <input
            type="text"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="text-xl text-white">Email:</label>
          <input
            type="email"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 w-full focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-300 text-sm mb-4">{errors.email}</p>
          )}

          <label className="text-xl text-white">Phone Number:</label>
          <input
            type="text"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full focus:outline-none"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />

          <label className="text-xl text-white">Role:</label>
          <select
            className="border border-white/40 bg-black/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="manager">SuperAdmin</option>
            <option value="admin">Admin</option>
            <option value="user">Customer</option>
          </select>

          <label className="text-xl text-white">Password:</label>
          <input
            type="password"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 w-full focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-300 text-sm mb-4">{errors.password}</p>
          )}

          <label className="text-xl text-white">Confirm Password:</label>
          <input
            type="password"
            className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 w-full focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-300 text-sm mb-4">
              {errors.confirmPassword}
            </p>
          )}
           <div className="flex justify-center items-center gap-2 mt-4">
            <span className="text-white text-lg">
              Already have an account?
            </span>
            <span
              className="text-cyan-300 cursor-pointer hover:underline"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login here
            </span>
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200">
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>


          {error && <p className="text-red-300 text-center mt-4">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default SignupPage;
