const mongoose = require('mongoose');

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost:27017/TodoApp');


//Todo model
let Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// let newTodo2 = new Todo({
// 	text: 'Find a gf',
// });

// newTodo2.save()
// 	.then((doc) => {
// 		console.log("saved new todo ", JSON.stringify(doc, null, 2))
// 	})
// 	.catch((err) => {
// 		console.log("unable to save todo ", err)
// 	})

//User Model
let User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	}
});

let newUser = new User({
	email: ' akash@gmail.com      '
});

newUser.save()
	.then((doc) => {
		console.log("saved new user ", doc)
	})
	.catch((err) => {
		console.log("unable to save user ", err)
	})


