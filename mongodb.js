const { MongoClient } = require("mongodb");

// Connection URL
const connectionURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionURL);

// Database Name
const databaseName = "myProject";

async function main() {
	// Use connect method to connect to the server
	await client.connect();
	console.log("Connected successfully to server");
	const db = client.db(databaseName);
	const collection = db.collection("users");

	// the following code examples can be pasted here...

	return "done.";
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());
