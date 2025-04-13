import React, {useState} from "react";
import Navbar from "../components/Navbar";
import "./CustomQuery.css";
import api from "../api";

const CustomQuery = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const runQuery = async () => {
    try {
      const res = await api.post("/query", { query });
      setResult(res.data.rows);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.error || "Unknown error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="div1">
        <h2 className="title"> Run Custom Queries </h2>
      </div>

      <div className="div2">
        <div className="div3">
          {/* <div className="div4"> */}
          <input type="text" className="input-box" required size="100" />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default CustomQuery;
