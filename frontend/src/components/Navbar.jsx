import React from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  let navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const handlelogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <Link to="/">ID App</Link>
      <div>
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {!isAuthenticated && <Link to="/signup">Signup</Link>}
        {isAuthenticated && <button onClick={handlelogout}>Logout</button>}
      </div>
    </nav>
  );
}
