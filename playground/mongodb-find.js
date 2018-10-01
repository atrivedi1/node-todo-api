// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server: ', err)
	}

	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp')

	// db.collection('Todos')
	// 	.find({
	// 		_id: new ObjectID('5bb1acbfb91b365fae531e6f')
	// 	})
	// 	.toArray()
	// 	.then((docs) => {
	// 		console.log('All todos: ', JSON.stringify(docs, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('Unable to fetch todos: ', err)
	// 	})


	// db.collection('Todos')
	// 	.find({completed: false})
	// 	.count()
	// 	.then((count) => {
	// 		console.log(`Number of remaining todos: ${count}`)
	// 	})
	// 	.catch((err) => {
	// 		console.log('Unable to calculate count: ', err)
	// 	})

	db.collection('Users')
		.find({name: 'Aastha'})
		.toArray()
		.then((users) => {
			console.log('Matching users: ', JSON.stringify(users, null, 2))
		})
		.catch((err) => {
			console.log('Unable to find user(s): ', err)
		})	

	client.close();
});