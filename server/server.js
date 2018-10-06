require('./config/config.js')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Id provided is not valid');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('Unable to find todo');
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send('Error processing request: ', e);
  });
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Id provided is not valid');
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('Unable to find todo');
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send('Error processing request: ', e);
  });
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Id provided is not valid');
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) {
        return res.status(404).send('Unable to find todo');
      }

      res.send({todo});
    })
    .catch((e) => {
      res.status(400).send('Error processing update')
    })
})

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};