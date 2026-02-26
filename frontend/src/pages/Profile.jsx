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
  const [requestdata, setRequestData] = useState(null);
  const [error, setError] = useState("");
  const getdata = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/request/", {
        headers: { Authorization: `Token ${token}` },
      });
      setRequestData(response.data);
    } catch (err) {
      setError("Failed to load data.");
    }
  };
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
  useEffect(() => {
    if (!token) return;

    getProfile();
    getdata();
  }, []);

  if (!token) return <p>Please login first.</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <>
      {role === "customer" && (
        <CustomerProfile
          user={user}
          requestdata={requestdata}
          getdata={getdata}
        />
      )}
      {role === "team" && (
        <TeamProfile user={user} requestdata={requestdata} getdata={getdata} />
      )}
      {role === "management" && (
        <ManagementProfile user={user} requestdata={requestdata} />
      )}
    </>
  );
}
