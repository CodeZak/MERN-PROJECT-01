const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database

const { getDb } = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const { ObjectId } = require("mongodb");

// This section will help you get a list of all the records.
recordRoutes.get("/record", (req, res) => {
    let db_connect = getDb();
    db_connect
        .collection("records001")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        });
});

// This section will help you get a single record by id
recordRoutes.get("/record/:id", (req, res) => {
    let db_connect = getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("records001")
        .findOne(myquery)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            throw new Error(error);
        });
});

// This section will help you create a new record.
recordRoutes.post("/record/add", (req, response) => {
    let db_connect = getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect
        .collection("records001")
        .insertOne(myobj)
        .then(() => {
            response.status(201).send();
        })
        .catch((error) => {
            throw new Error(error);
        });
});

// This section will help you update a record by id.
recordRoutes.post("/update/:id", (req, response) => {
    let db_connect = getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
        .collection("records001")
        .updateOne(myquery, newvalues)
        .then(() => {
            response.status(201).send();
        })
        .catch((error) => {
            throw new Error(error);
        });
});

// This section will help you delete a record

recordRoutes.delete("/:id", (req, response) => {
    let db_connect = getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("records001")
        .deleteOne(myquery)
        .then(() => response.send());
});

module.exports = recordRoutes;
