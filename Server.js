"use strict";
/**
 * Simple server managing between client and database
 * @author: Jirka Dell'Oro-Friedl
 */
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
console.log("Server starting");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    let query = Url.parse(_request.url, true).query;
    console.log(query);
    var command = query["command"];
    switch (command) {
        case "insert":
            let student = {
                name: query["name"],
                firstname: query["firstname"],
                matrikel: parseInt(query["matrikel"])
            };
            Database.insert(student);
            respond(_response, "storing data");
            break;
        case "find":
            Database.findAll(function (json) {
                respond(_response, json);
            });
            break;
        case "search":
            let search;
            if (query["matrikel"] == "" && query["name"] == "") {
                Database.findAll(function (json) {
                    respond(_response, json);
                });
                break;
            }
            else {
                if (query["matrikel"] != "" && query["name"] != "") {
                    search = { name: query["name"], matrikel: parseInt(query["matrikel"]) };
                }
                else {
                    if (query["matrikel"] == "") {
                        search = { name: query["name"] };
                    }
                    if (query["name"] == "") {
                        search = { matrikel: parseInt(query["matrikel"]) };
                    }
                }
                Database.findSpecific(search, function (json) {
                    respond(_response, json);
                });
                break;
            }
        case "del":
            let del;
            if (query["matrikel"] == "" && query["name"] == "" && query["firstname"] == "") {
                respond(_response, "No Data deleted");
                break;
            }
            else {
                if (query["matrikel"] != "" && query["name"] != "" && query["firstname"] != "") {
                    del = { name: query["name"], firstname: query["firstname"], matrikel: parseInt(query["matrikel"]) };
                    Database.del(del);
                    respond(_response, "Data successfully deleted");
                }
                else {
                    respond(_response, "Value missing or wrong");
                }
            }
            break;
        default:
            respond(_response, "unknown command: " + command);
            break;
    }
}
function respond(_response, _text) {
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map