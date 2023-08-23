require("../src/db/mongoose");
const User = require("../src/models/user");

//PROMISE CHAINING
User.findByIdAndUpdate("64e4236cf60a09e0e867b33f", { age: 1 })
	.then((user) => {
		console.log(user);
		return User.countDocuments({ age: 1 });
	})
	.then((result) => {
		console.log(result);
	})
	.catch((e) => {
		console.log(e);
	});

//ASYNC AWAIT
const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });
	return count;
};

updateAgeAndCount("64e4236cf60a09e0e867b33f", 2)
	.then((count) => {
		console.log(count);
	})
	.catch((e) => {
		console.log(e);
	});
