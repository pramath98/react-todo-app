const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: async function (callback) {
    try{
        await client.connect();
    }catch(e){
        console.log(e);
    }
    // client.connect(function (err, db) {
      // Verify we got a good "db" object
    //   if (db)
    //   {
        _db = client.db("todo_DB");
        // _db = db.db("sample_airbnb");
        console.log("Successfully connected to MongoDB."); 
    //   }
      return (_db === undefined ? false : true);
        //  });
  },
 
  getDb: function () {
    return _db;
  },
};