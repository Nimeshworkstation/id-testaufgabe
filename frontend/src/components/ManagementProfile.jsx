import React from "react";

export default function ManagementProfile({ user, requestdata }) {
  if (!user) return <p>Loading...</p>;
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-3">
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
          <p>
            Name: {user.first_name} {user.last_name}
          </p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
        <div className="col-9">
          <h2>All Requests</h2>
          {requestdata && requestdata.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Stadium Screen</th>
                  <th>Assets</th>
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
                    <td>{`${request.customer.first_name} ${request.customer.last_name}`}</td>
                    <td>{request.title}</td>
                    <td>{request.description}</td>
                    <td>{request.stadium_screen}</td>
                    <td>
                      {request.assets && request.assets.length > 0
                        ? `${request.assets.length} file(s)`
                        : "No assets"}
                    </td>
                    <td>
                      {request.status === "open" && (
                        <span className="badge bg-warning text-dark">
                          Offen
                        </span>
                      )}
                      {request.status === "in_progress" && (
                        <span className="badge bg-primary">In Bearbeitung</span>
                      )}
                      {request.status === "completed" && (
                        <span className="badge bg-success">Abgeschlossen</span>
                      )}
                    </td>
                    <td>{request.broadcast_date}</td>
                    <td>
                      {request.finished_file ? (
                        <span className="badge bg-success">Uploaded</span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Not Uploaded
                        </span>
                      )}
                    </td>
                    <td>{new Date(request.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
