const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
	// const task = await Task.findById("64e6a11eacdf4b69578de235");
	// await task.populate('owner');
	// console.log(task);

	const user = await User.findById("64e6a0446eeff66c31d22cae");
	await user.populate('tasks');
	console.log(user.tasks)
};
// main();
