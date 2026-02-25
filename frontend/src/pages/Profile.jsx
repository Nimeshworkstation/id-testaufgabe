import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import CustomerProfile from "../components/CustomerProfile";
import TeamProfile from "../components/TeamProfile";
import ManagementProfile from "../components/ManagementProfile";

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
      {role === "customer" && <CustomerProfile user={user} />}
      {role === "team" && <TeamProfile user={user} />}
      {role === "management" && <ManagementProfile user={user} />}
    </div>
  );
}
