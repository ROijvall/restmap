const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const ruleRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const user = process.env.user;

async function getNextSequence(db, sequenceName) {
    const sequenceDocument = await db.collection("counters").findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { returnOriginal: false, upsert: true }
        );
        return sequenceDocument.value.sequence_value;
    }
async function getRuleByValue(db, data) {
    const document = await db.collection(user + "_rules").findOne({ data: data });
    return document._id;
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
        let insert = false;
        db_connect.collection(user + "_rules")
        .updateOne(
            {
                data : req.body
            },
            {
                $setOnInsert: { _id: myobj._id, data: myobj.data }
            },
            {upsert: true}
        )
        .then(async (update) => {
        
            if (update.upsertedCount === 1) {
                res.send({ success: true, result: myobj._id, error: null });
            } else {
                let ruleId = await getRuleByValue(db_connect, myobj.data)
                res.send({ success: false, result: ruleId, error: null });
            }
        })
        .catch(function(e) {
            res.send({ success: false, result: null, error: e });
        });
    });
    
    ruleRoutes.route("/rule/delete/:id").get(async function (req, res) {
        let db_connect = dbo.getDb();   
        db_connect.collection(user + "_rules")
        .deleteOne({_id: parseInt(req.params.id)}).then((rsp) => {
            res.send({ success: true, error: null, result: rsp.deletedCount });
        })
        .catch(e => {
            res.send({ success: false, error: e, result: 0 });
        });
    });
    
    ruleRoutes.route("/rules/get/:rules").get(async function (req, res) {
        let db_connect = dbo.getDb();
        let limit = parseInt(req.params.rules)     
        let cursor = await db_connect
        .collection(user + "_rules")
        .find().limit(limit)
        const array = await cursor.toArray() 
        const json = JSON.stringify(array)
        res.send({ success: true, result: json, error: null });
    });
    
    module.exports = ruleRoutes