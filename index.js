const express = require('express');
const cors = require('cors');
const componentRoute = require('./route');

// Creating express app instance
const app = express();
const port = 8080;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware for enabling CORS
app.use(cors());

// testing the server
app.get('/', function (req, res) {
  res.status(200).json({
    message: 'APP WORKING',
  });
});

// Using component route for /component endpoint
app.use('/component', componentRoute);

app.listen(port, function () {
  console.log(`Server is running on port number ${port}`);
});
