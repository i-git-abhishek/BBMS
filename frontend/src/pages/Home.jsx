import React, { useState } from "react";
import api from "../api";  
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    bloodgroup: "",
    contact: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    medical_conditions: "",
    eligible: true, 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", formData);
      console.log("User Registered:", res.data);
      setFormData({
        name: "",
        dob: "",
        gender: "",
        bloodgroup: "",
        contact: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        medical_conditions: "",
        eligible: true,
      });
    } catch (err) {
      console.error("Error registering user:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="text-danger">Welcome to Blood Bank Management System</h1>
          <p className="text-muted">
            A centralized platform to manage blood stocks, requests, and donors across hospitals.
          </p>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">View Blood Groups</h5>
                <p className="card-text">Check availability, view requests, and find donors.</p>
                <Link to="/bloodstock" className="btn btn-outline-primary">
                  Explore Blood Groups
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h5 className="card-title text-success">Registered Hospitals</h5>
                <p className="card-text">Browse all registered hospitals and their details.</p>
                <Link to="/hospitals" className="btn btn-outline-success">
                  View Hospitals
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h5 className="card-title text-danger">Blood Requests</h5>
                <p className="card-text">See active blood requests across hospitals.</p>
                <Link to="/requests" className="btn btn-outline-danger">
                  View Requests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container my-5">
        <h2 className="text-center mb-5">Register New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Blood Group</label>
            <select
              className="form-control"
              name="bloodgroup"
              value={formData.bloodgroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Zip Code</label>
            <input
              type="text"
              className="form-control"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Medical Conditions</label>
            <textarea
              className="form-control"
              name="medical_conditions"
              value={formData.medical_conditions}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="eligible"
                checked={formData.eligible}
                onChange={(e) => setFormData({ ...formData, eligible: e.target.checked })}
              />
              I am eligible to donate blood
            </label>
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </>
  );
};

export default RegisterUser;
