require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3005;

app.get("/", (req, res) => {
  res.send('working');
});

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is up and running and listening on port ${PORT}`);
  } else {
    console.log(`Something went wrong`);
  }
});