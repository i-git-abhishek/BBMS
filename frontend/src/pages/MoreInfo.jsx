import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";

const MoreInfo = () => {
  const { group } = useParams();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        const res = await api.get(`/bloodstock/${bloodGroup}`);
        setData(res.data.hospitals); 
        setTotal(res.data.totalQuantity); 
      } catch (err) {
        console.error("Error fetching group info:", err.message);
      }
    };
    fetchGroupInfo();
  }, [group]);
  

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-danger">{group} Blood Group</h2>
        <h5 className="text-secondary mb-4">Total Available: {Math.floor(total)} mL</h5>
        {data.length === 0 ? (
          <p className="text-muted">No hospitals currently have this blood group.</p>
        ) : (
          <div className="row">
            {data.map((h, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-danger">{h.name}</h5>
                    <p className="card-text">
                      <strong>Quantity:</strong> {Math.floor(h.quantity)}<br />
                      <strong>Address:</strong> {h.address}, {h.city}, {h.state}, {h.zipcode}<br />
                      <strong>Contact:</strong> {h.contact}<br />
                      <strong>Email:</strong> {h.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MoreInfo;
