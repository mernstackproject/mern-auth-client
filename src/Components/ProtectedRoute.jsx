import { useEffect , useContext} from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {

  const navigate = useNavigate();
  const isAuthenticated =
    localStorage.getItem("auth") !== null  && localStorage.getItem("auth") !== "undefined"
   
  useEffect(() => {
    if (!isAuthenticated ||localStorage.getItem("auth") === "" ) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? Component : null;
};

export default ProtectedRoute;
    