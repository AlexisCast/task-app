const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const User = mongoose.model("User", {
	name: {
		type: String,
	},
	age: {
		type: Number,
	},
});

const user = new User({ name: "Fo123o", age: 552 });
user.save()
	.then(() => {
		console.log("user: ", user);
	})
	.catch((error) => {
		console.log("Error", error);
	});

const Task = mongoose.model("Task", {
	description: {
		type: String,
	},
	completed: {
		type: Boolean,
	},
});
const task = new Task({ description: "Check email", completed: false });

task.save()
	.then(() => {
		console.log("task: ", task);
	})
	.catch((error) => {
		console.log("Error", error);
	});
