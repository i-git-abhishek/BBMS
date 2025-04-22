const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.use('/api/query', require('./routes/QueryRunner'));
app.use('/api/donors', require('./routes/Donors'));
app.use('/api/requests', require('./routes/Requests'));
const hospitalsRoute = require('./routes/Hospitals');
console.log("Loaded hospitals route:", hospitalsRoute);
app.use('/api/hospitals', hospitalsRoute);
// app.use('/api/bloodstock', require('./routes/BloodStock'));

app.get('/', (req, res) => {
    res.send('BBMS API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});