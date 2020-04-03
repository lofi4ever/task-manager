const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const tasksRouter = require('./tasks/router');

const handler = express();

handler
  .use('/api/tasks', tasksRouter);

mongoose.connect('mongodb://localhost:27017/tasks-manager-db', {useNewUrlParser: true}, (err) => {
  if(err) return console.log(err);
  http.createServer(handler)
  .listen(3000, () => console.log('run'));
});