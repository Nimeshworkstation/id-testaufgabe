import React from "react";

export default function ManagementProfile({ user, requestdata }) {
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
      <h2>All Requests</h2>
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
            </tr>
          </thead>
          <tbody>
            {requestdata.map((request, index) => (
              <tr key={request.id}>
                <td>{index + 1}</td>
                <td>
                  {`${request.customer.first_name} ${request.customer.last_name}`}
                </td>
                <td>{request.title}</td>
                <td>{request.description}</td>
                <td>{request.stadium_screen}</td>
                <td>{request.status}</td>
                <td>{request.broadcast_date}</td>
                <td>{request.finished_file ? "Uploaded" : "Not Uploaded"}</td>
                <td>{new Date(request.created_at).toLocaleDateString()}</td>
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
