const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const ruleRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
//const ObjectId = require("mongodb").ObjectId;
const user = process.env.user;

ruleRoutes.route("/rule/get/:name").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { name: req.params.name }
    db_connect
        .collection(user + "_rules")
        .find(myquery, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});

ruleRoutes.route("/rule/add/").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        data: req.body.data
    }
    db_connect
        .collection(user + "_rules").insertOne(myobj, function (err, result) {
            if (err) throw err;
            res.json(result);
          });
});
 
module.exports = ruleRoutes