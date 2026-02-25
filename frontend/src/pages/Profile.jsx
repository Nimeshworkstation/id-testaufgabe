import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";

export default function Profile() {
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const setRole = useAuthStore((state) => state.setRole);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    const getProfile = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/users/profile/",
          {
            headers: { Authorization: `Token ${token}` },
          },
        );
        setUser(response.data);
        setRole(response.data.role);
      } catch (err) {
        setError("Failed to load profile.");
      }
    };
    getProfile();
  }, []);

  if (!token) return <p>Please login first.</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {role === "customer" && <div>CUSTOMER</div>}
      {role === "team" && <div>TEAM</div>}
      {role === "management" && <div>MANAGEMENT</div>}
    </div>
  );
}
