const express = require("express");
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const { createTokens, validateToken } = require("../JWT");
const cookieParser = require('cookie-parser');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
recordRoutes.use(cookieParser());

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const cookieDomain = process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN : 'localhost';

// This section will help you get a list of all the records.
recordRoutes.route("/api/users").get(async function (req, res) {
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

recordRoutes.route('/api/profile').get(validateToken, async (req, res) => {
  if (req.authenticated)
    res.status(200).json(req.user);
  else
    res.status(405).json('your JWT is malformed');
});

// This section will help you get a single record by id
recordRoutes.route("/api/login").post(async (req, res) => {
  try {
    let db_connect = await dbo.getDb();

    const encryptedData = req.body.encryptedObject;
    const decryptedObject = JSON.parse(CryptoJS.AES.decrypt(encryptedData, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8));
    // const decryptedObject = req.body; //when testing with Postman
    let myquery = { userName: decryptedObject.userName };
    let records = await db_connect
      .collection("users")
      .findOne(myquery);
    let results = await bcrypt.compare(decryptedObject.password, records.password)
    if (results) {
      const accessToken = createTokens(records);
      const milisecondsInADay = 24 * 60 * 60 * 1000;
      let age = milisecondsInADay * 15; //we have to set age for 15 days thats why
      res.cookie('access-token', accessToken, {
        domain: `${cookieDomain}`,
        path: '/',
        maxAge: age,
        httpOnly: true
      });
      res.status(200).json(records);
    }
    else
      throw ('e')

  } catch (e) {
    res.status(401).json({ error: e, message: 'user not logged in!' });
  }

});

recordRoutes.route("/api/logout").post(async (req, res) => {
  try {
    // Clear the access token cookie
    res.clearCookie('access-token', {
      domain: `${cookieDomain}`,
      path: '/',
      httpOnly: true
    });
    console.log("cookie cleared successfully!");
    // Send a response indicating successful logout
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    // Handle any errors that occur during logout
    console.error('error while deleting cookie: ', error);
    res.status(500).json({ error: error.message });
  }
});

// This section will help you create a new record.
recordRoutes.route("/api/users/add").post(async (req, response) => {
  try {
    // const salt = await bcrypt.genSalt();
    const encryptedData = req.body.encryptedObject;
    const decryptedObject = JSON.parse(
      CryptoJS.AES.decrypt(encryptedData, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
    );
    const hashedPassword = await bcrypt.hash(decryptedObject.password, 10);
    let db_connect = await dbo.getDb();
    let myobj = {
      firstName: decryptedObject.firstName,
      userName: decryptedObject.userName,
      email: decryptedObject.email,
      password: hashedPassword
    };
    const res = await db_connect.collection('users').insertOne(myobj);
    response.json(res);
    //  db_connect.collection("records").insertOne(myobj, function (err, res) {
    //    if (err) throw err;
    //    response.json(res);
    //  });
  } catch (e) {
    console.log('error while adding users', e);
    response.json(e.message);
  }

});

recordRoutes.route("/api/users/:id/addTodos").post(async (req, response) => {
  let db_connect = dbo.getDb();
  const userId = req.params.id;
  const todoItem = req.body.todoItem;
  try {

    let myquery = { _id: new ObjectId(userId) };
    let record = await db_connect.collection("users").findOne(myquery);
    if (!record) return response.status(404).json({ message: "Error! User not found." });
    if (!record.todoItems) record.todoItems = [];
    record.todoItems.push(todoItem);
    await db_connect.collection("users").updateOne(myquery, { $set: { todoItems: record.todoItems } });
    response.status(200).json({ message: 'todo item saved successfully!' });

  } catch (e) {
    console.log('error while adding todos', e);
  }
});

recordRoutes.route("/api/users/:id/fetchTodos").get(async (req, response) => {
  let db_connect = dbo.getDb();
  const userId = req.params.id;
  try {
    let myquery = { _id: new ObjectId(userId) };
    let record = await db_connect.collection("users").findOne(myquery);
    if (!record) return response.status(404).json({ message: "Error! User not found." });
    if (!record.todoItems) return response.status(401).json({ message: 'No todos found' });
    response.status(200).json({ todos: record.todoItems });

  } catch (e) {
    console.log(e);
  }
});

recordRoutes.route("/api/users/:id/updateTodos").post(async (req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      todoItems: req.body.todoItems
    },
  };
  try {
    const record = await db_connect.collection("users").updateOne(myquery, newvalues);
    if (!record) return response.status(500).json({ message: "Error! todos cannot be updated at this time" });
    response.status(200).json({ message: 'todo item updated successfully!' });
  } catch (e) {
    response.status(501).json({ msg: 'error while updating the record, ', e });
  }

});

recordRoutes.route("/api/users/:id/deleteTodos").post(async (req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      todoItems: req.body.todoItems
    },
  };
  try {
    let userFound = await db_connect.collection("users").findOne(myquery);
    if (!userFound) return response.status(404).json({ message: "Error! User not found." });
    const record = await db_connect.collection("users").updateOne(myquery, newvalues);
    if (!record) return response.status(500).json({ message: "Error! todos cannot be deleted at this time" });
    response.status(200).json({ message: 'todo item deleted successfully!' });
  } catch (e) {
    response.status(501).json({ msg: 'error while deleting the record, ', e });
  }

});

// This section will help you update a record by id.
recordRoutes.route("/api/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      firstName: req.body.firstName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/api/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;