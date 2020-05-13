const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

//middlewares
const jwt = require('./middlewares/jwt');
const errorHandler = require('./helpers/error-handler');

const tasksRouter = require('./tasks/router');
const userRouter = require('./user/user.router');

const handler = express();

handler
  .use(jwt())
  .use(function(req, res, next) {
    console.log('logger');
    next();
  })
  .use('/api/tasks', tasksRouter)
  .use('/api/user', userRouter);

handler.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/tasks-manager-db', {useNewUrlParser: true}, (err) => {
  if(err) return console.log(err);
  http.createServer(handler)
  .listen(3000, () => console.log('run'));
});