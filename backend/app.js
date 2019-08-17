const express = require('express');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts');
const mongoose = require('mongoose');


mongoose
  .connect(
    'mongodb+srv://vishal:oFLxiRmpyaVU3zI9@cluster0-3jljk.mongodb.net/node-angular?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch(() => {
    console.log('Connection falied!');
  });

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/posts', postsRoutes);

module.exports = app;