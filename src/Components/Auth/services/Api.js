import { BaseURL } from "../../Baseurl";
import axios from "axios";
import { toast } from "react-toastify";

export const register = async (rest) => {
  const { email, password, name, mobileNumber } = rest.formData;
  try {
    const response = await axios.post(
      `${BaseURL}/register`,
      { name, email, password, mobileNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message };
  }
};
export const login = async (rest) => {
  const { email, password } = rest.loginForm;
  try {
    const response = await axios.post(
      `${BaseURL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message };
  }
};
export const googleAuth = async (res, navigate) => {
  try {
    const data = await axios.post(
      `${BaseURL}/OauthGoogleLogin`,
      {
        token: res.credential,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data?.data?.status) {
      toast.success(data?.data?.message);
      localStorage.setItem("auth", data.data.data.token);
      setTimeout(() => {
        navigate("/books");
      }, 3000);
    }
  } catch (e) {
    console.log(e.response?.data?.message);
  }
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const response = await axios.post(
      `${BaseURL}/change-password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`, // Ensure token is sent
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error changing password");
    return { error: error.response?.data?.message };
  }
};
export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await axios.post(
      `${BaseURL}/verify-otp`,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid OTP");
    return { error: error.response?.data?.message };
  }
};
export const resendOtp = async (email) => {
  try {
    const response = await axios.post(
      `${BaseURL}/resend-otp`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error resending OTP");
    return { error: error.response?.data?.message };
  }
};
export const resetPassword = async ({ email, otp, newPassword }) => {
  try {
    const response = await axios.post(
      `${BaseURL}/reset-password`,
      { email, otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error resetting password");
    return { error: error.response?.data?.message };
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${BaseURL}/forgot-password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error sending OTP");
    return { error: error.response?.data?.message };
  }
};
