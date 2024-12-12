const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI; // MongoDB connection string from environment variables
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db; // Variable to hold the database connection

module.exports = {
  /**
   * Connects to the MongoDB server and sets the _db variable to the connected database.
   * @returns {boolean} - Returns true if the connection is successful, false otherwise.
   */
  connectToServer: async function () {
    try {
      await client.connect();
      _db = client.db("todo_DB"); // Replace with your database name
      console.log("Successfully connected to MongoDB.");
      return true;
    } catch (e) {
      console.error("Error connecting to MongoDB:", e);
      return false;
    }
  },

  /**
   * Returns the connected database object.
   * Throws an error if the connection has not been established.
   * @returns {Db} - The MongoDB database object.
   */
  getDb: function () {
    if (!_db) {
      throw new Error("Database not connected. Call connectToServer first.");
    }
    return _db;
  },
};
