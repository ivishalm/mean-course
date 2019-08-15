const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added Successfully!'
    });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asfkj232',
      title: 'First server side post',
      content: 'This is coming from the server'
    },
    {
      id: 'asfkjsdfas',
      title: 'Second server side post',
      content: 'This is coming from the server'
    },
    {
      id: 'shdf23j232',
      title: 'Third server side post',
      content: 'This is coming from the server'
    }
  ];

  res.status(200).json({
    message: 'Posts fetched successfuly!',
    posts: posts
  });
});

module.exports = app;
