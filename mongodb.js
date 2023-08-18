const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const connectionURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionURL);

// Database Name
const databaseName = "task-manager";

async function main() {
	// Use connect method to connect to the server
	await client.connect();
	console.log("Connected successfully to server");

	const db = client.db(databaseName);

	const usersCollection = db.collection("users");

	await usersCollection
		.updateOne({ name: "123" }, { $set: { name: "Mike" } })
		.then(
			(res) => console.log(res),
			(err) => console.log(err)
		);

	await usersCollection
		.updateOne(
			{ _id: new ObjectId("64dfd9c9b85984398a5d32bd") },
			{ $inc: { age: 1 } }
		)
		.then(
			(res) => console.log(res),

			(err) => console.log(err)
		);

	return "done.";
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());
