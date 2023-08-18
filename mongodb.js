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

	const result = await usersCollection.findOne({ name: "Tar" });
	if (!result) {
		console.log(`No documents found`);
	} else {
		console.log(result);
	}

	const findResult = await usersCollection.find({ name: "Tar" });
	const test = await findResult.toArray();
	console.log(test);
	console.log(test.length);

	const taskCollection = db.collection("task");

	const findResultTask = await taskCollection.find({ completed: false });
	console.log(await findResultTask.toArray());

	return "done.";
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());
