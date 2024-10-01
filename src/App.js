import ProtectedRoute from "./Components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home/Home";
import Books from "./Components/pages/Books/Books";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import BookingDetails from "./Components/pages/Books/BookingDetails";
import AuthContext  from "./Components/Context/AuthContext"
import Navbar from "./Components/pages/Navbar";
function App() {
  return (
     <>
    <AuthContext>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/booking-details/:id"
          element={<ProtectedRoute element={<BookingDetails />} />}
        />
        <Route path="/books" element={<ProtectedRoute element={<Books />} />} />
      </Routes> 
      </AuthContext>
      </>
  );
}

export default App;
