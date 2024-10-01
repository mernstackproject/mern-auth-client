import { createContext, useEffect, useState } from "react";
import { BaseURL } from "../Baseurl";
import axios from "axios";
export const authContext = createContext(null);
const AuthContext = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("auth");
        if (!token) {
          throw new Error("Authorization token is missing");
        }
        const response = await axios.get(`${BaseURL}/found-user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
        setData(response.data);
      } catch (e) {
        setError(e.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <authContext.Provider value={{ data, loading, error, setData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
