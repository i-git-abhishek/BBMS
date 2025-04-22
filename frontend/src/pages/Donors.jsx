import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const Donors = () => {
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    userid: "",
    hospitalid: "",
    quantity: "",
  });

  const fetchDonations = async () => {
    try {
      const res = await api.get("/donors");
      setDonations(res.data);
    } catch (error) {
      console.error("Error fetching donations:", error.message);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/donors", formData);
      setFormData({ userid: "", hospitalid: "", quantity: "" });
      fetchDonations();
    } catch (err) {
      console.error("Error submitting form:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="mb-4">
          <h2 className="text-danger">Add Donation</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                name="userid"
                value={formData.userid}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Hospital ID</label>
              <input
                type="text"
                className="form-control"
                name="hospitalid"
                value={formData.hospitalid}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Quantity (ml)</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-danger">
                Add Donation
              </button>
            </div>
          </form>
        </div>

        <hr />

        <div>
          <h2 className="text-danger mb-4">Previous Donations</h2>
          <div className="row">
            {donations.map((d, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card shadow border-0">
                  <div className="card-body">
                    <h5 className="card-title">User ID: {d.userid}</h5>
                    <p className="card-text">
                      <strong>Hospital ID:</strong> {d.hospitalid}
                      <br />
                      <strong>Date:</strong>{" "}
                      {new Date(d.donatedat).toLocaleDateString()}
                      <br />
                      <strong>Quantity:</strong> {d.quantity} ml
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {donations.length === 0 && (
              <p className="text-muted">No donation records available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Donors;
