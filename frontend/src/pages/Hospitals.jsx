import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);

  const fetchHospitals = async () => {
    try {
        console.log(hospitals);  
      const res = await api.get("/hospitals");
      setHospitals(res.data);
    } catch (err) {
      console.error("Error fetching hospitals:", err.message);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-danger mb-4">Registered Hospitals</h2>
        <div className="row">
          {hospitals.map((h, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-danger">{h.name}</h5>
                  <p className="card-text">
                    <strong>Address:</strong> {h.address}<br />
                    <strong>City:</strong> {h.city}<br />
                    <strong>State:</strong> {h.state}<br />
                    <strong>Zip Code:</strong> {h.zipcode || "N/A"}<br />
                    <strong>Contact:</strong> {h.contact}<br />
                    <strong>Email:</strong> {h.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {hospitals.length === 0 && (
            <p className="text-muted">No hospitals registered yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Hospitals;
