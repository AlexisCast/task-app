require("dotenv").config({ path: "./config/test.env" });
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

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

beforeEach(async () => {
	await User.deleteMany();
	await new User(userOne).save();
});

test("Should signup a new user", async () => {
	const response = await request(app)
		.post("/users")
		.send({
			name: "alexis1prod",
			password: "1234567890",
			email: "castellanos.alexis@hotmail.com",
		})
		.expect(201);

	//Assert that the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	//Assertions about the response
	expect(response.body).toMatchObject({
		user: {
			name: "alexis1prod",
			email: "castellanos.alexis@hotmail.com",
		},
		token: user.tokens[0].token,
	});
	expect(user.password).not.toBe("1234567890");
});

test("Should login existing user", async () => {
	const response = await request(app)
		.post("/users/login")
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);

	//Assert that token in response matches users second token
	const user = await User.findById(userOneId);
	expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistent user", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: userOne,
			password: "otherPassword!!!",
		})
		.expect(400);
});

test("Should get profile for user", async () => {
	await request(app)
		.get("/users/me")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test("Should not get profile for unathenticated user", async () => {
	await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
	const response = await request(app)
		.delete("/users/me")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	//Assert null response
	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test("Should not delete account for unauthenicated user", async () => {
	await request(app).delete("/users/me").send().expect(401);
});
