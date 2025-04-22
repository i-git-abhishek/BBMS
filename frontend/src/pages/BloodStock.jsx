import React from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const bloodGroups = [
  { group: "A+", color: "#ff4d4f" },
  { group: "A-", color: "#ff7a45" },
  { group: "B+", color: "#ffa940" },
  { group: "B-", color: "#ffc53d" },
  { group: "O+", color: "#73d13d" },
  { group: "O-", color: "#36cfc9" },
  { group: "AB+", color: "#40a9ff" },
  { group: "AB-", color: "#9254de" },
];

const BloodGroups = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-danger mb-4">Blood Groups</h2>
        <div className="row">
          {bloodGroups.map((bg, idx) => (
            <div className="col-md-3 mb-4" key={idx}>
              <div className="card shadow border-0 text-center" style={{ backgroundColor: bg.color, color: "white" }}>
                <div className="card-body">
                  <h3 className="card-title">{bg.group}</h3>
                  <p className="card-text">View stock, requests & donors</p>
                  <button className="btn btn-light btn-sm">More Info</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BloodGroups;
