const bodyParser = require('body-parser');
const router = require('express').Router();

const Task = require('./task-model');

const jsonParser = bodyParser.json();

const getTask = (req, res) => {
  let {id} = req.params;
  Task.findOne({id})
    .then(task => {
      res.send(task);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

const getTasks = (req, res) => {
  Task.find({})
    .then(tasks => {
      res.send(tasks);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

const addTask = (req, res) => {
  let task = req.body;
  Task.find({})
    .then(tasks => {
      let maxId = Math.max(...tasks.map(task => task.id));
      let id = isFinite(maxId) ? maxId + 1 : 0;
      task.id = id;
      new Task(task).save()
        .then(() => {
          res.status(200).json(task);
        })
        .catch((err) => {
          res.sendStatus(500);
        })
    })
    .catch(err => {
      res.sendStatus(500);
    })
}

const deleteAll = (req, res) => {
  Task.deleteMany({})
    .then(() => {
      res.status(200).json({success: true});
    })
    .catch((err) => {
      res.sendStatus(500);
    })
}

const deleteTask = (req, res) => {
  let {id} = req.params;
  Task.findOneAndDelete({id: +id})
    .then(task => {
      res.status(200).send(task);
    })
    .catch(err => {
      res.sendStatus(500);
    })
}

router.get('/', getTasks);
router.post('/', jsonParser, addTask);
router.delete('/', deleteAll);
router.get('/:id', getTask);
router.delete('/:id', deleteTask);

module.exports = router;