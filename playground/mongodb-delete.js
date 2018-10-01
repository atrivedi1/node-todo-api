// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server: ', err)
	}

	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp')

	/*USERS*/
	//delete many
	// db.collection('Users')
	// 	.deleteMany({name: 'Aastha'})
	// 	.then((result) => {
	// 		console.log('Deleted user(s): ', JSON.stringify(result, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('Unable to delete user(s): ', err)
	// 	})	

	//find one and delete
	db.collection('Users')
		.findOneAndDelete({_id: new ObjectID("5bb1b646e7bc885fef199468")})
		.then((result) => {
			console.log('Deleted user: ', JSON.stringify(result, null, 2))
		})
		.catch((err) => {
			console.log('Unable to delete user: ', err)
		})	

	/*TODOS*/
	//delete one 
	// db.collection('Todos')
	// 	.deleteOne({text: 'Eat lunch'})
	// 	.then((result) => {
	// 		console.log('Deleted todo: ', JSON.stringify(result, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('Unable to delete todo: ', err)
	// 	})	

	//delete many
	// db.collection('Todos')
	// 	.deleteMany({text: 'Eat lunch'})
	// 	.then((result) => {
	// 		console.log('Deleted todo: ', JSON.stringify(result, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('Unable to delete todo(s): ', err)
	// 	})	

	//find one and delete
	// db.collection('Todos')
	// 	.findOneAndDelete({completed: false})
	// 	.then((result) => {
	// 		console.log('Deleted todo: ', JSON.stringify(result, null, 2))
	// 	})
	// 	.catch((err) => {
	// 		console.log('Unable to delete todo: ', err)
	// 	})	


	// client.close();
});