import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { sendOtp, resetPassword } from "./services/Api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await sendOtp({ email });
      if (response.status) {
        toast.success("OTP Sent Successfully!");
        setStep(2);
      } else {
        toast.error(response.message || "Error sending OTP");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }

    try {
      const response = await resetPassword({ email, otp, newPassword });
      if (response.status) {
        toast.success("Password Reset Successfully!");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      } else {
        toast.error(response.message || "Error resetting password");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {step === 1 && (
        <>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button onClick={handleSendOtp} className="btn">Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP"
            required
          />
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
          <button onClick={handleResetPassword} className="btn">
            Reset Password
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
