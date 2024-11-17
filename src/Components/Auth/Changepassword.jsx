import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { changePassword } from "./services/Api"; // Replace with your API call

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters long!");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const response = await changePassword({ currentPassword, newPassword });
      if (response.status) {
        toast.success("Password changed successfully!");
      } else {
        toast.error(response.message || "Error changing password");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }finally{
        
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
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
        <button type="submit" className="btn">Change Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
