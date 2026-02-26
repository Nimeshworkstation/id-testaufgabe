import React from "react";

export default function RequestForm({
  handleChange,
  handleSubmit,
  handleFileChange,
  error,
  formData,
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-3">
        {error && <p className="text-danger">{error}</p>}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stadium Screen</label>
          <select
            className="form-select"
            name="stadium_screen"
            value={formData.stadium_screen}
            onChange={handleChange}
            required
          >
            <option value="screen_main">Main Screen</option>
            <option value="screen_a">Screen A - North</option>
            <option value="screen_b">Screen B - South</option>
            <option value="screen_c">Screen C - East</option>
            <option value="screen_d">Screen D - West</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Broadcast Date</label>
          <input
            className="form-control"
            type="date"
            name="broadcast_date"
            value={formData.broadcast_date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Assets</label>
          <input
            className="form-control"
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </>
  );
}
