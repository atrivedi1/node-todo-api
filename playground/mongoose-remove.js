const {ObjectID} = require('mongodb')

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.deleteMany({}).then((result) => {
// 	console.log(result);
// });

// Todo.deleteOne({_id: "5bb5b0b0c39d2c7f9f45cdbb"}).then((todo) => {
// 	console.log(todo);
// });

Todo.findByIdAndDelete("5bb5b172c39d2c7f9f45cdc4").then((todo) => {
	console.log(todo);
});