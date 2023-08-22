require("../src/db/mongoose");
const Task = require("../src/models/task");

//PROMISE CHAINING
Task.findByIdAndRemove("64e4131f6b3355dba4049a3c")
	.then((task) => {
		console.log(task);
		return Task.countDocuments({ completed: false });
	})
	.then((result) => {
		console.log(result);
	})
	.catch((e) => {
		console.log(e);
	});

//ASYNC AWAIT
const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndRemove(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
};

deleteTaskAndCount("64e417bdf6134e33f4bf3249")
	.then((count) => {
		console.log(count);
	})
	.catch((e) => {
		console.log(e);
	});
