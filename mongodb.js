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
		.deleteMany({
			age: 33,
		})
		.then((result) => {
			if (result.deletedCount === 0) {
				console.log("Nothing was deleted!");
			}
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
		});

	const taskCollection = db.collection("task");
	await taskCollection
		.deleteOne({
			description: "Check email",
		})
		.then((result) => {
			if (result.deletedCount === 0) {
				console.log("Nothing was deleted!");
			}
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
		});

	return "done.";
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());
