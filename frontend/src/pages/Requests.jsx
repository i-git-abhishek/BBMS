import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";

const Requests = () => {
  const [requests, setRequest] = useState([]);
  const [formData, setFormData] = useState({
    userid: "",
    hospitalid: "",
    quantity: "",
  });

  const fetchrequests = async () =>{
    try{
      const res = await api.get("/requests");
      setRequest(res.data);
    } catch(error){
      console.error("Error Fetching Transfusion Details: ", error.message);
    }
  };

  useEffect(()=>{
    fetchrequests();
  }, []);

  const handleChange = (e) => 
    setFormData({...formData, [e.target.name]: e.target.value});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await api.post("/requests", formData);
      setFormData({ userid: "", hospitalid: "", quantity: ""});
      fetchrequests();
    } catch(err){
      console.error("Error submitting form:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="mb-4">
          <h2 className="text-danger">Add Transfusion Request</h2>
          <form onSubmit={handleSubmit}
          className="row g-3">
            <div className="col-md-3">
              <label className="form-label">
                User ID
              </label>
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
              <button className="btn btn-danger" type="submit"
              >Add Request</button>
            </div>
          </form>
          </div>

          <hr />

          <div>
            <h2 className="text-danger mb-4">Previous Transfusion Requests</h2>
            <div className="row">
              {requests.map((r, idx) => (
                <div className="col-md-4 mb-4" key={idx}>
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <h5 className="card-title">
                        User ID: {r.userid}
                      </h5>
                      <p className="card-text">
                      <strong>Hospital ID:</strong> {r.hospitalid}
                      <br />
                      <strong>Date:</strong>{" "}
                      {new Date(r.requestedat).toLocaleDateString()}
                      <br />
                      <strong>Quantity:</strong> {r.quantity} ml
                    </p>
                    </div>
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
              <p className="text-muted">No records available.</p>
            )}
            </div>
          </div>
        </div>
    </>
  );
};
export default Requests;
