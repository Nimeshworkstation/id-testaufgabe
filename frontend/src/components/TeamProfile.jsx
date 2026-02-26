import React, { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";

export default function TeamProfile({ user, requestdata, getdata }) {
  const [error, setError] = useState("");
  if (!user) return <p>Loading...</p>;
  const token = useAuthStore((state) => state.token);
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/request/${requestId}/`,
        { status: newStatus },
        { headers: { Authorization: `Token ${token}` } },
      );
      await getdata();
    } catch (err) {
      setError("Failed to update status.");
    }
  };
  const handleFileUpload = async (requestId, file) => {
    try {
      const formData = new FormData();
      formData.append("finished_file", file);
      await axios.patch(
        `http://127.0.0.1:8000/api/request/${requestId}/`,
        formData,
        { headers: { Authorization: `Token ${token}` } },
      );
      await getdata();
    } catch (err) {
      setError("Failed to upload file.");
    }
  };
  const handleSubmit = () => {
    console.log("download");
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-2">
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
          <p>
            Name: {user.first_name} {user.last_name}
          </p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {error && <div className="alert alert-danger py-2">{error}</div>}
        </div>
        <div className="col-10">
          <h2>Requests</h2>
          {requestdata && requestdata.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Stadium Screen</th>
                  <th>Status</th>
                  <th>Assets</th>
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
                    <td>{`${request.customer.first_name} ${request.customer.last_name}`}</td>
                    <td>{request.title}</td>
                    <td>{request.description}</td>
                    <td>{request.stadium_screen}</td>
                    <td>
                      {request.status === "open" && (
                        <span className="badge bg-primary text-dark">
                          Offen
                        </span>
                      )}
                      {request.status === "in_progress" && (
                        <span className="badge bg-warning">In Bearbeitung</span>
                      )}
                      {request.status === "completed" && (
                        <span className="badge bg-success">Abgeschlossen</span>
                      )}
                    </td>
                    <td>
                      {request.assets && request.assets.length > 0
                        ? `${request.assets.length} file(s)`
                        : "No assets"}
                    </td>
                    <td>{request.broadcast_date}</td>
                    <td>
                      {request.finished_file ? (
                        <span className="badge bg-success">Uploaded</span>
                      ) : (
                        <span className="badge bg-warning">Yet to Upload</span>
                      )}
                    </td>
                    <td>{new Date(request.created_at).toLocaleDateString()}</td>
                    <td>
                      <select
                        className="form-select form-select-sm mb-1"
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
                        className="form-control form-control-sm"
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
      </div>
    </div>
  );
}
