import React, { useState } from "react";
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
          <textarea
            className="input-box"
            rows="4"
            cols="60"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter SQL command (e.g. SELECT * FROM users);"
          />
        </div>
      </div>
      <div className="div4">
        <button className="Run-btn" onClick={runQuery}>
          Run
        </button>
      </div>
      <div className="div5">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {result && result.length > 0 && (
          <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                {Object.keys(result[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val !== null ? val.toString() : "NULL"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {result && result.length === 0 && <p>No rows returned.</p>}
      </div>
    </>
  );
};

export default CustomQuery;
