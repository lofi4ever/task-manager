const bodyParser = require('body-parser');
const router = require('express').Router();

const Task = require('./task-model');

const jsonParser = bodyParser.json();

const TASKS = [
  {
    name: 'Task example 2',
    description: 'this is an example of created task',
    isComplete: true
  },
  {
    name: 'another task',
    description: 'this task is not complete yet'
  },
  {
    name: 'and task without description is here too'
  }
];

const getTasks = (req, res) => {
  res.send(TASKS);
}

const addTask = (req, res) => {
  let task = req.body;
  Task.create(task)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

router.get('/', getTasks);
router.post('/', jsonParser, addTask);

module.exports = router;