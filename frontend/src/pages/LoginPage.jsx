import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function LoginPage() {
  let navigate = useNavigate();

  const initialForm = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        formData,
      );

      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/profile");
    } catch (requestError) {
      const apiError = requestError.response?.data;
      if (typeof apiError === "string") setError(apiError);
      else if (apiError && typeof apiError === "object") {
        const firstMessage = Object.values(apiError).flat()[0];
        setError(firstMessage || "Login failed.");
      } else setError("Login failed. Check server connection.");
    }
  };

  return (
    <section>
      <div>
        <h1>Login</h1>

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
          {success ? <p>{success}</p> : null}

          <button type="submit">Login</button>
        </form>

        <p>
          Don&apos;t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </section>
  );
}
