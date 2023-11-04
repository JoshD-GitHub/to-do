require('dotenv').config();
const express = require('express');

const app = express();
const PORT = 3005;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is up and running and listening on port ${PORT}`);
  } else {
    console.log(`Something went wrong`);
  }
});