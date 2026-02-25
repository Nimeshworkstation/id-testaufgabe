import React from "react";

export default function ManagementProfile({ user }) {
  return (
    <div>
      M<h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
