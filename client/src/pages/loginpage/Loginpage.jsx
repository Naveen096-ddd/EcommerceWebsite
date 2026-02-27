import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {TextField,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,} from "@mui/material";
import AlertMessage from "../../components/AlertMessage";
import {loginApi,forgotPasswordApi,verifyOtpApi,changePasswordApi,} from "../../apis/Api";
import Header from "../Home/header/Header";
const Loginpage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpValid, setOtpValid] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleAlertClose = () => setAlertOpen(false);
  const handleLogin = async () => {
    if (!email || !password) {
      setAlertSeverity("warning");
      setAlertMessage("Please fill in all fields");
      setAlertOpen(true);
      return;
    }
    try {
      setLoading(true);
      const res = await loginApi({ email, password });
      if (res.data.success) {
        setAlertSeverity("success");
        setAlertMessage("Login successful!");
        setAlertOpen(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", email);
        setTimeout(() => {
          if (res.data.role === "user") navigate("/userdash");
          else if (res.data.role === "admin") navigate("/admindash");
          else if (res.data.role === "manager") navigate("/managerdash");
          else navigate("/");
        }, 1500);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Invalid credentials");
        setAlertOpen(true);
        
      }
    } catch {
      setAlertSeverity("error");
      setAlertMessage("Login failed");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };
  const handleSendResetEmail = async () => {
    try {
      const res = await forgotPasswordApi(email);
      if (res.data.success) {
        setStep(2);
        setAlertSeverity("success");
        setAlertMessage("OTP sent to your email");
        setAlertOpen(true);
      }
    } catch {
      setAlertSeverity("error");
      setAlertMessage("Email not registered");
      setAlertOpen(true);
    }
  };
  const handleVerifyOTP = async () => {
    try {
      const res = await verifyOtpApi({ email, otp });
      if (res.data.success) {
        setOtpValid(true);
        setStep(3);
        setAlertSeverity("success");
        setAlertMessage("OTP verified successfully. Set new password.");
        setAlertOpen(true);
      } else {
        setOtpValid(false);
        setAlertSeverity("error");
        setAlertMessage("Invalid OTP");
        setAlertOpen(true);
      }
    } catch {
      setAlertSeverity("error");
      setAlertMessage("OTP verification failed");
      setAlertOpen(true);
    }
  };
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setAlertSeverity("error");
      setAlertMessage("Passwords do not match");
      setAlertOpen(true);
      return;
    }
    try {
      const res = await changePasswordApi({ email, newPassword });
      if (res.data.success) {
        setAlertSeverity("success");
        setAlertMessage("Password updated successfully. Please login.");
        setAlertOpen(true);
        setForgotPasswordOpen(false);
        setStep(1);
        setOtp("");
        setOtpValid(null);
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setAlertSeverity("error");
      setAlertMessage("Password update failed");
      setAlertOpen(true);
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-700 to-indigo-900 p-4">
        <div className="bg-white/10 backdrop-blur-xl w-full max-w-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Login
          </h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUserAlt className="absolute right-4 top-4 text-white/70" />
          </div>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white/70"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          <div className="flex justify-between text-sm text-white mb-6">
            <label className="flex gap-2 items-center">
              <input type="checkbox" /> Remember me
            </label>
            <button
              onClick={() => setForgotPasswordOpen(true)}
              className="text-cyan-300 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-white mt-4">
            Don’t have an account?{" "}
            <Link
              to="/Signup"
              className="text-cyan-300 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
        <AlertMessage
          open={alertOpen}
          severity={alertSeverity}
          message={alertMessage}
          handleClose={handleAlertClose}
        />
        <Dialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {step === 1 && "Enter your email to receive OTP"}
              {step === 2 && "Enter the OTP sent to your email"}
              {step === 3 && "Enter your new password"}
            </DialogContentText>
            {step === 1 && (
              <TextField fullWidth label="Email" margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} />
            )}
            {step === 2 && (
              <TextField fullWidth label="OTP" margin="dense" value={otp} onChange={(e) => setOtp(e.target.value)} error={otpValid === false} />
            )}
            {step === 3 && (
              <>
                <TextField fullWidth label="New Password" margin="dense" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <TextField fullWidth label="Confirm Password" margin="dense" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </>
            )}
          </DialogContent>
          <DialogActions>
            {step === 1 && <Button onClick={handleSendResetEmail}>Send OTP</Button>}
            {step === 2 && <Button onClick={handleVerifyOTP}>Verify OTP</Button>}
            {step === 3 && <Button onClick={handleChangePassword}>Change Password</Button>}
            <Button
              onClick={() => {
                setForgotPasswordOpen(false);
                setStep(1);
                setOtp("");
                setOtpValid(null);
                setNewPassword("");
                setConfirmPassword("");
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default Loginpage;
