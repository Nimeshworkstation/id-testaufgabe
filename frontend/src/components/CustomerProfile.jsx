import React, { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import RequestForm from "./RequestForm";

export default function CustomerProfile({ user, requestdata, getdata }) {
  const token = useAuthStore((state) => state.token);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stadium_screen: "screen_main",
    broadcast_date: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [files, setFiles] = useState(null);

  const handleDownload = () => {
    console.log("download");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("stadium_screen", formData.stadium_screen);
      data.append("broadcast_date", formData.broadcast_date);
      data.append("notes", formData.notes);
      if (files) {
        for (let file of files) {
          data.append("files", file);
        }
      }
      await axios.post("http://127.0.0.1:8000/api/request/", data, {
        headers: { Authorization: `Token ${token}` },
      });
      setShowForm(false);
      setFiles(null);
      await getdata();
      setFormData({
        title: "",
        description: "",
        stadium_screen: "screen_main",
        broadcast_date: "",
        notes: "",
      });
    } catch (err) {
      setError("Failed to submit request.");
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

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
          <hr />
          <button
            className="btn btn-primary w-100"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "New Request"}
          </button>
          {showForm && (
            <RequestForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleFileChange={handleFileChange}
              error={error}
              formData={formData}
            />
          )}
        </div>
        <div className="col-9">
          <h2>Submitted Requests</h2>
          {requestdata && requestdata.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
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
                    <td>{request.title}</td>
                    <td>{request.description}</td>
                    <td>{request.stadium_screen}</td>
                    <td>
                      {request.assets && request.assets.length > 0
                        ? `${request.assets.length} file(s)`
                        : "No assets"}
                    </td>
                    <td>{request.status}</td>
                    <td>{request.broadcast_date}</td>
                    <td className="text-center">
                      {request.finished_file ? (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={handleDownload}
                        >
                          Download
                        </button>
                      ) : (
                        <span className="text-warning text-center fw-bold">
                          --------
                        </span>
                      )}
                    </td>
                    <td>{new Date(request.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
