import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
const initialForm = {
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: "",
  role: "customer",
};

export default function SignupPage() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await axios.post("http://127.0.0.1:8000/api/users/register/", formData);
      navigate("/login");
    } catch (requestError) {
      const apiError = requestError.response?.data;
      if (typeof apiError === "string") setError(apiError);
      else if (apiError && typeof apiError === "object") {
        const firstMessage = Object.values(apiError).flat()[0];
        setError(firstMessage || "Signup failed.");
      } else setError("Signup failed. Check server connection.");
    }
  };

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="customer">Customer</option>
          <option value="team">Creative Team</option>
          <option value="management">Management</option>
        </select>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error ? <p>{error}</p> : null}

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
