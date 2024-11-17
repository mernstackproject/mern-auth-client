import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { resetPassword } from "./services/Api"; // Replace with your API call
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return toast.error("OTP must be 6 digits!");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const response = await resetPassword({ email, otp, newPassword });
      if (response.status) {
        toast.success("Password reset successfully!");
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
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter the OTP"
          maxLength="6"
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
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />
        <button type="submit" className="btn">Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
