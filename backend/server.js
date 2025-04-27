const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use("/api/query", require("./routes/QueryRunner"));
app.use("/api/donors", require("./routes/Donors"));
app.use("/api/requests", require("./routes/Requests"));
app.use("/api/hospitals", require("./routes/Hospitals"));
app.use("/api/bloodstock", require("./routes/BloodStock"));
app.use("/api/register", require("./routes/Register"));
app.get("/", (req, res) => {
  res.send("BBMS API Running");
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
