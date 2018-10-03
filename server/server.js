//library imports
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());


//add a todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//get a todo
app.get('/todos', (req,res) => {
	Todo.find()
		.then((todos) => {
			res.send({todos});
		}, (e) => {
			res.status(400).send(e);
		})

})

//get a todo by id
app.get('/todos/:id', (req,res) => {
	let id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send('id passed in is not in a valid format')
	}

	Todo.findById(req.params.id)
		.then((todo) => {
			if(!todo) {
				return res.status(404).send('todo with this id not found');
			}

			res.send({todo});
		})
		.catch((e) => {
			res.status(400).send();
		})
})


app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};