import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [step, setStep] = useState(1); 
  const [showForgot, setShowForgot] = useState(false);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const emailIsValid = email.trim() !== "";
    const passwordIsValid = password.trim() !== "";
    if (emailIsValid && passwordIsValid) {
      setStep(2);
    }
  };
  const handleForgotEmailSubmit = (e) => {
    e.preventDefault();
    const forgotEmailIsValid = forgotEmail.trim() !== "";
    if (forgotEmailIsValid) {
      setStep(2);
    }
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();

    const otpIsValid = otp.trim() !== "";

    if (otpIsValid) {
      setStep(3);
    }
  };
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const newPasswordIsValid = newPassword.trim() !== "";
    const confirmNewPasswordIsValid = confirmNewPassword.trim() !== "";
    if (newPasswordIsValid && confirmNewPasswordIsValid) {
      alert("Password Reset Successfully!");
      setShowForgot(false);
      setStep(1);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-600 to-indigo-900 p-6">
        <form
          className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 
          backdrop-blur-xl w-[32rem] p-8 rounded-2xl shadow-2xl shadow-blue-500/40 
          border border-white/20 h-auto"
        >
          <h2 className="text-4xl font-extrabold text-white mb-6 flex justify-center">
            {showForgot ? "Forgot Password" : "Login"}
          </h2>
          {!showForgot && (
            <>
              <label className="text-xl text-white">Email:</label>
              <input
                type="email"
                className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="text-xl text-white">Password:</label>
              <input
                type="password"
                className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-[#00f7ff] text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="flex justify-center mt-2">
                <p className="text-white text-lg">
                  Don’t have an account?{" "}
                  <a
                    href="/signup"
                    className="text-[#00f7ff] font-semibold hover:underline"
                  >
                    Signup
                  </a>
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoginSubmit}
                  className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200"
                >
                  Login
                </button>
              </div>
            </>
          )}
          {showForgot && (
            <>
              {step === 1 && (
                <>
                  <label className="text-xl text-white">Enter Your Email:</label>
                  <input
                    type="email"
                    className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleForgotEmailSubmit}
                      className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200"
                    >
                      Send OTP
                    </button>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <label className="text-xl text-white">Enter OTP:</label>
                  <input
                    type="text"
                    className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleOtpSubmit}
                      className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200"
                    >
                      Verify OTP
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <label className="text-xl text-white">New Password:</label>
                  <input
                    type="password"
                    className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />

                  <label className="text-xl text-white">Confirm Password:</label>
                  <input
                    type="password"
                    className="border border-white/40 bg-white/20 text-white rounded px-4 py-3 mt-2 mb-4 w-full"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleResetPasswordSubmit}
                      className="bg-gradient-to-br from-[#00f7ff]/70 via-[#0066ff]/70 to-[#8a2be2]/70 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition duration-200"
                    >
                      Reset Password
                    </button>
                  </div>
                </>
              )}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(false);
                    setStep(1);
                  }}
                  className="text-[#00f7ff] font-semibold hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
