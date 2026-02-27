import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Header from "../Home/header/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../app/slices/authSlice";
import AlertMessage from "../../components/AlertMessage";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!emailRegex.test(email))
      newErrors.email = "Invalid email format";
    if (!passwordRegex.test(password))
      newErrors.password ="Password must contain 8+ chars, uppercase, lowercase, number & symbol";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const result = await dispatch(
      signupUser({ username, email, password, role, phonenumber })
    );
    if (signupUser.fulfilled.match(result)) {
      setAlertSeverity("success");
      setAlertMessage(result.payload.message || "Signup successful 🎉");
      setAlertOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
    if (signupUser.rejected.match(result)) {
      setAlertSeverity("error");
      setAlertMessage(
        result.payload?.message || "Something went wrong"
      );
      setAlertOpen(true);
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-600 to-indigo-900 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 
          backdrop-blur-xl w-[32rem] p-8 rounded-2xl shadow-2xl shadow-blue-500/40 
          border border-white/20"
        >
          <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
            Signup
          </h2>
          <label className="text-white">Full Name:</label>
          <input
            type="text"
            className="border bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="text-white">Email:</label>
          <input
            type="email"
            className="border bg-white/20 text-white rounded px-4 py-3 mt-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-300 text-sm mb-4">{errors.email}</p>
          )}
          <label className="text-white">Phone Number:</label>
          <input
            type="text"
            className="border bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
          <label className="text-white">Role:</label>
          <select
            className="border bg-black/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="manager">SuperAdmin</option>
            <option value="admin">Admin</option>
            <option value="user">Customer</option>
          </select>
          <label className="text-white">Password:</label>
          <input
            type="password"
            className="border bg-white/20 text-white rounded px-4 py-3 mt-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-300 text-sm mb-4">{errors.password}</p>
          )}
          <label className="text-white">Confirm Password:</label>
          <input
            type="password"
            className="border bg-white/20 text-white rounded px-4 py-3 mt-2 w-full"
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
            <span className="text-white">
              Already have an account?
            </span>
            <span
              className="text-cyan-300 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 
              text-white font-bold py-2 px-6 rounded hover:opacity-90 transition"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
      <AlertMessage
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={handleCloseAlert}
      />
    </>
  );
};

export default SignupPage;