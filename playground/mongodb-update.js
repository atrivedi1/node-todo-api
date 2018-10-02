// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server: ', err)
	}

	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp')

	//update todo
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('5bb1c81fc39d2c5de52d709c')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// })
	// .then((result) => {
	// 	console.log("Successfully updated record: ", result)
	// })
	// .catch((err) => {
	// 	console.log("Unable to update record: ", err)
	// })

	//update user
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5bb1ade45f83a75fb87a3e55')
	}, {
		$set: {
			name: "Shreyas",
			location: "San Francisco"
		},
		$inc: {
			age: -3
		}
	}, {
		returnOriginal: false
	})
	.then((result) => {
		console.log("Successfully updated record: ", result)
	})
	.catch((err) => {
		console.log("Unable to update record: ", err)
	})

	// client.close();
});