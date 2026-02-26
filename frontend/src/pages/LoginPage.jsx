import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import useAuthStore from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        formData,
      );
      login(response.data.token, response.data.user.role);
      navigate("/");
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
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm p-4">
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  Login
                </button>
              </form>
              <p className="text-center mt-3 mb-0">
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
