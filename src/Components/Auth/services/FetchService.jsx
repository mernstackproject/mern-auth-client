import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../../Baseurl";

const FetchService = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const response = await axios.get(`${BaseURL}${url}`, { // Use the passed URL here
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

  useEffect(() => {
    fetchData(); 
  }, [url]); 

  return { data, loading, error, refetch: fetchData }; // Return fetchData as a reference
};

export default FetchService;
