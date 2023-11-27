require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const PORT = process.env.PORT;

app.use(require('body-parser').json());
app.use(require('morgan')('dev'));

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    req.userId = id;
  } catch (error) {
    req.userId = null;
  }
  next();
});

app.get('/', (req, res) => {
  res.send('working');
});

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is up and running and listening on port ${PORT}`);
  } else {
    console.log('Something went wrong');
  }
});