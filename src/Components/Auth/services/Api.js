import { BaseURL } from "../../Baseurl";
import axios from "axios";
import { toast } from "react-toastify";

export const register = async (rest) => {
  const { email, password, name } = rest.formData;
  try {
    const response = await axios.post(
      `${BaseURL}/register`,
      { name, email, password },
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
