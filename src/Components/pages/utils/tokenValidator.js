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
      return data.data?.isValid !== undefined ? data.data.isValid : false;  
    } catch (error) {
      return false;
    }
};
