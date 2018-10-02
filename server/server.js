//library imports
const express = require('express');
const bodyParser = require('body-parser');

//custom/local imports
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

//init express instance + set up middleware
let app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text
	});

	todo.save()
		.then((doc) => {
			res.status(200).send(doc);
		})
		.catch((e) => {
			res.status(400).send(e);
		})
});

app.listen(3000, () => {
	console.log('Started on port 3000')
})