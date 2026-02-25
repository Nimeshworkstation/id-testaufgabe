import React from "react";
import { Link } from "react-router";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <nav className="navbar">
      <Link to="/">ID App</Link>
      <div>
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {!isAuthenticated && <Link to="/signup">Signup</Link>}
      </div>
    </nav>
  );
}
