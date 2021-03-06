/**
 * Simple database insertion and query for MongoDB
 * Original Author
 * @author Jirka Dell'Oro-Friedl
 * Modified by
 * @author Dominik Braun
 */
import Mongo = require("mongodb");
console.log("Database starting");

let databaseURL: string = "mongodb://localhost:27017/Test";
let db: Mongo.Db;
let accounts: Mongo.Collection;

if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://braund:sfd@ds161022.mlab.com:61022/sfd";

Mongo.MongoClient.connect(databaseURL, handleConnect);

function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        accounts = _db.collection("accounts");
    }
}

export function insert(_doc: AccountData): void {
    accounts.insertOne(_doc, handleInsert);
}

function handleInsert(_e: Mongo.MongoError): void {
    console.log("Database insertion returned -> " + _e);
}

export function del(_del: Object): void {
    accounts.remove(_del, handleDel);
}

function handleDel(_e: Mongo.MongoError): void {
    console.log("Database deletion returned -> " + _e);
}


export function findAll(_callback: Function): void {
    var cursor: Mongo.Cursor = accounts.find();
    cursor.toArray(prepareAnswer);

    function prepareAnswer(_e: Mongo.MongoError, account: AccountData[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(account));
    }
}

export function findSpecific(_s: Object, _callback: Function): void {
    var cursor: Mongo.Cursor = accounts.find(_s);
    cursor.toArray(prepareAnswer);

    function prepareAnswer(_e: Mongo.MongoError, account: AccountData[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(account));
    }
}

export function update(_s: Object, _u: Object): void {
    accounts.update(_s, _u, handleUpdate);
}

function handleUpdate(_e: Mongo.MongoError): void {
    console.log("Database insertion returned -> " + _e);
}

