const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/users").get(async function (req, res) {
  //  let db_connect = dbo.getDb("sample_airbnb");
  let db_connect = dbo.getDb();
  try {
    // console.log(db_connect);
    var records = await db_connect
      .collection("users")
      .find({})
      .toArray();
    res.status(200).json(records);
  } catch (e) {
    console.log('error while viewing records:', e);
  }
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  console.log(req.params.id);
  let myquery = { _id: req.params.id };
  db_connect
    .collection("listingsAndReviews")
    .findOne(myquery).then(result => res.status(200).json(result));
});

// This section will help you create a new record.
recordRoutes.route("/users/add").post(async (req, response)=> {
  try{
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
    };
    const res = await db_connect.collection('users').insertOne(myobj);
    response.json(res);
    //  db_connect.collection("records").insertOne(myobj, function (err, res) {
    //    if (err) throw err;
    //    response.json(res);
    //  });
  }catch(e){
    console.log(e);
    response.json(e.message);
  }
  
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;