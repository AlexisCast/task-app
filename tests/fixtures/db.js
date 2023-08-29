const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
	_id: userOneId,
	name: "Mike",
	email: "mike@example.com",
	password: "123456789",
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN),
		},
	],
};

const setupDatabase = async () => {
	await User.deleteMany();
	await new User(userOne).save();
};

module.exports = {
	userOneId,
	userOne,
	setupDatabase,
};
