const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect to DB
connectDB();

app.get('/', (req, res) => res.send('API RUNNING')); //testing endpoint

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
