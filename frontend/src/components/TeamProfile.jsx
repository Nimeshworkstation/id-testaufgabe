import React, { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";

export default function TeamProfile({ user, requestdata, getdata }) {
  if (!user) return <p>Loading...</p>;
  const token = useAuthStore((state) => state.token);

  const handleStatusChange = async (requestId, newStatus) => {
    await axios.patch(
      `http://127.0.0.1:8000/api/request/${requestId}/`,
      { status: newStatus },
      { headers: { Authorization: `Token ${token}` } },
    );
    await getdata();
  };

  const handleFileUpload = async (requestId, file) => {
    const formData = new FormData();
    formData.append("finished_file", file);
    await axios.patch(
      `http://127.0.0.1:8000/api/request/${requestId}/`,
      formData,
      { headers: { Authorization: `Token ${token}` } },
    );
    await getdata();
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <hr />
      <h2>Requests</h2>
      {requestdata && requestdata.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Title</th>
              <th>Description</th>
              <th>Stadium Screen</th>
              <th>Status</th>
              <th>Broadcast Date</th>
              <th>Final Product</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestdata.map((request, index) => (
              <tr key={request.id}>
                <td>{index + 1}</td>
                <td>
                  {" "}
                  {`${request.customer.first_name} ${request.customer.last_name}`}
                </td>
                <td>{request.title}</td>
                <td>{request.description}</td>
                <td>{request.stadium_screen}</td>
                <td>{request.status}</td>
                <td>{request.broadcast_date}</td>
                <td>
                  {request.finished_file ? (
                    <span>uploaded</span>
                  ) : (
                    "Yet to Upload"
                  )}
                </td>
                <td>{new Date(request.created_at).toLocaleDateString()}</td>
                <td>
                  <select
                    className=""
                    defaultValue={request.status}
                    onChange={(e) =>
                      handleStatusChange(request.id, e.target.value)
                    }
                  >
                    <option value="open">Offen</option>
                    <option value="in_progress">In Bearbeitung</option>
                    <option value="completed">Abgeschlossen</option>
                  </select>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileUpload(request.id, e.target.files[0])
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No requests yet.</p>
      )}
    </div>
  );
}
