const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.use('/api/query', require('./routes/QueryRunner'));

app.get('/', (req, res) => {
    res.send('BBMS API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});