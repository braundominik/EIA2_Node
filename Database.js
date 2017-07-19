"use strict";
/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 */
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://localhost:27017/Test";
let db;
let accounts;
if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://braund:sfd@ds161022.mlab.com:61022/sfd";
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        accounts = _db.collection("accounts");
    }
}
function insert(_doc) {
    accounts.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function del(_del) {
    accounts.remove(_del, handleDel);
}
exports.del = del;
function handleDel(_e) {
    console.log("Database deletion returned -> " + _e);
}
function findAll(_callback) {
    var cursor = accounts.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, account) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(account));
    }
}
exports.findAll = findAll;
function findSpecific(_s, _callback) {
    var cursor = accounts.find(_s);
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, account) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(account));
    }
}
exports.findSpecific = findSpecific;
function update(_s, _u) {
    accounts.update(_s, _u, handleUpdate);
}
exports.update = update;
function handleUpdate(_e) {
    console.log("Database insertion returned -> " + _e);
}
//# sourceMappingURL=Database.js.map