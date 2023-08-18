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

	const userCollection = db.collection("users");

	//insertOne user
	try {
		const doc = { name: "foo", age: 30 };

		const result = await userCollection.insertOne(doc);
		console.log(result);
	} catch (e) {
		console.log(e);
	}

	//insertMany users
	try {
		const docs = [
			{ name: "Joe", age: 45 },
			{ name: "Baz", age: 12 },
			{ name: "Tar", age: 23 },
			{ name: "Liz", age: 45 },
		];

		// this option prevents additional documents from being inserted if one fails
		const options = { ordered: true };

		const insertManyresult = await userCollection.insertMany(docs, options);

		let ids = insertManyresult.insertedIds;

		console.log(
			`${insertManyresult.insertedCount} documents were inserted.`
		);

		for (let id of Object.values(ids)) {
			console.log(`Inserted a document with id ${id}`);
		}
	} catch (e) {
		console.log(
			`A MongoBulkWriteException occurred, but there are successfully processed documents.`
		);
		let ids = e.result.result.insertedIds;
		for (let id of Object.values(ids)) {
			console.log(`Processed a document with id ${id._id}`);
		}
		console.log(
			`Number of documents inserted: ${e.result.result.nInserted}`
		);
	}

	//insertMany task
	const taskCollection = db.collection("task");
	try {
		const docs = [
			{ _id: 1, description: "Clean the house", completed: true },
			{ _id: 2, description: "Clean the house", completed: true },
			{ _id: 1, description: "Go pick up mail", completed: false },
			{ _id: 4, description: "Check email", completed: false },
			{ _id: 4, description: "Check email", completed: false },
			{ _id: 2, description: "Clean the house", completed: true },
			{ _id: 45, description: "Check email", completed: false },
		];

		//Will still execute if one fails
		const options = { ordered: false };

		const insertManyresult = await taskCollection.insertMany(docs, options);
		let ids = insertManyresult.insertedIds;

		console.log(
			`${insertManyresult.insertedCount} documents were inserted`
		);

		for (let id of Object.values(ids)) {
			console.log(`Inserted a document with id ${id}`);
		}
	} catch (e) {
		console.log(
			`A MongoBulkWriteException occurred, but there are successfully processed documents.`
		);
		console.log(e.result.result);
		for (let obj of Object.values(e.result.result.writeErrors)) {
			console.log(obj.err);
		}
	}

	return "done.";
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());
