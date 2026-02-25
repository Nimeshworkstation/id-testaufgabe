import React from "react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">ID App</Link>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}
