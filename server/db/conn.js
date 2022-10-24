const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

let database;

function connectToServer() {
    try {
        database = client.db("Database001");
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
}

const getDb = () => {
    return database;
};

module.exports = { connectToServer, getDb };
