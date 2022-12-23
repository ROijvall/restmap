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

async function getNextSequence(db, sequenceName) {
    const sequenceDocument = await db.collection("counters").findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { returnOriginal: false, upsert: true }
        );
        return sequenceDocument.value.sequence_value;
    }
    
    ruleRoutes.route("/rule/get/:rule").get(function (req, res) {
        let db_connect = dbo.getDb();   
        let ruleAsInt = parseInt(req.params.rule)         
        db_connect
        .collection(user + "_rules")
        .findOne( {_id:ruleAsInt}, function(err, result) {
            if (err) {
                res.send({ success: false, result: null, error: err });
            }
            res.send({ success: true, result: result, error: null });
        });
    });
    
    ruleRoutes.route("/rule/add/").post(async function (req, res) {
        let db_connect = dbo.getDb();   
        let myobj = {
            _id: await getNextSequence(db_connect, user+"_counters"),
            data: req.body
        };
        db_connect.collection(user + "_rules")
        .insertOne(myobj)
        .then(() => {
            body = myobj._id;
            res.send({ success: true, result: myobj._id, error: null });
          })
        .catch(function(e) {
            res.send({ success: false, result: null, error: e });
        });
    });
    
    module.exports = ruleRoutes