import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { verifyOtp, resendOtp } from "./services/Api"; // Replace with your API call
import { useNavigate } from "react-router-dom";
import { handleOtp } from "./services/OnchangeService";
const OtpVerification = () => {

  const [otp, setOtp] = useState("");
  const [otpperror, setOtpError] = useState("")
  const [email, setEmail] = useState("");
  const [disableResend, setDisableResend] = useState(false);
  const [disableVerify, setDisableVerify] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes countdown
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;

    if (disableResend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [disableResend, timer]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return toast.error("OTP must be 6 digits!");
    }

    setDisableVerify(true); // Disable verify button after click

    try {
      const response = await verifyOtp({ email, otp });
      if (response.status) {
        toast.success("OTP Verified!");
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      } else {
        toast.error(response.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setDisableVerify(false); // Re-enable after process is done
    }
  };

  const handleResendOtp = async () => {
    setDisableResend(true); // Disable resend button
    setTimer(120); // Reset the timer to 2 minutes

    try {
      const response = await resendOtp({ email });
      if (response.status) {
        toast.success("OTP Resent Successfully!");
      } else {
        toast.error(response.message || "Error resending OTP");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setTimeout(() => {
        setDisableResend(false); // Re-enable resend button after the timer expires
      }, 120000); // 2 minutes in milliseconds
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <label htmlFor="otp">Enter OTP</label>
        <input
          type="text"
          id="otp"
          placeholder="Enter 6-digit OTP"
          maxLength="6"
          value={otp}
          onChange={(e)=> handleOtp(e, setOtp, setOtpError)}
          required
        />
        <button type="submit" className="btn" disabled={disableVerify}>
          {disableVerify ? "Verifying..." : "Verify"}
        </button>
      </form>

      <button
        onClick={handleResendOtp}
        className="btn resend-btn"
        disabled={disableResend}
      >
        {disableResend ? `Wait ${timer}s` : "Resend OTP"}
      </button>

      <ToastContainer />
    </div>
  );
};

export default OtpVerification;
