// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server: ', err)
	}

	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp')

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to insert todo: ', err)
	// 	}

	// 	console.log(JSON.stringify(result.ops, null, 2))
	// })

	// db.collection('Users').insertOne({
	// 	name: 'Neha',
	// 	age: 33,
	// 	location: 'San Francisco'
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to add user: ', err)
	// 	}

	// 	console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), null, 2));
	// })

	client.close();
});