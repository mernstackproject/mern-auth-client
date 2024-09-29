import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const navigate = useNavigate();
  const isAuthenticated =
    localStorage.getItem("auth") !== null  && localStorage.getItem("auth") !== "undefined"
    
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? Component : null;
};

export default ProtectedRoute;
    