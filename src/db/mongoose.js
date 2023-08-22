const mongoose = require("mongoose");
const validator = require("validator");

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid", Error);
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes("password")) {
				throw new Error("Password cannot contain 'password'");
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error("Age must be a positive number");
			}
		},
	},
});

const user = new User({
	name: "  Foo   ",
	password: "1231sa23",
	email: "goofle@gmail.com",
});

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
		trim: true,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const task = new Task({ description: "eat lunch" });

task.save()
	.then(() => {
		console.log("task: ", task);
	})
	.catch((error) => {
		console.log("Error", error);
	});
