import { BaseURL } from "../../Baseurl";
export const validateToken = async (token) => {  
    if (!token) {
      return false;  
    }
    try {
      const response = await fetch(`${BaseURL}/validateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  
        }
      });
      if (!response.ok) { 
        return false;
      }
      const data = await response.json();
      if (data?.data?.isValid === false) {
        if (data?.data?.message === "Token has expired") {
          return { isValid: false, expired: true };
        }
        return { isValid: false, expired: false };
      }
  
      return { isValid: true, expired: false };  
    } catch (error) {
      return false;
    }
};
