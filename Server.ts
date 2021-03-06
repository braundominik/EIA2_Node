/**
 * Simple server managing between client and database
 * Original Author
 * @author Jirka Dell'Oro-Friedl
 * Modified by
 * @author Dominik Braun
 */
import Http = require("http");
import Url = require("url");
import Database = require("./Database");

console.log("Server starting");

let port: number = process.env.PORT;
if (port == undefined)
    port = 8100;

let server: Http.Server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);



function handleListen(): void {
    console.log("Listening on port: " + port);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Request received");
    let query: AssocStringString = Url.parse(_request.url, true).query;
    console.log(query);
    var command: string = query["command"];


    switch (command) {
        case "insert":
            let account: AccountData = {
                user: query["user"],
                password: query["password"],
                wave: parseInt(query["wave"]),
                level: parseInt(query["level"]),
                game: parseInt(query["game"]),
                gold: parseFloat(query["gold"]),
                swordlvl: parseInt(query["swordlvl"]),
                rotationlvl: parseInt(query["rotationlvl"]),
                creepHealth: parseFloat(query["creepHealth"]),
                lastHealth: parseFloat(query["lastHealth"]),
                creepValue: parseFloat(query["creepValue"]),
                lastValue: parseFloat(query["lastValue"]),
                tower: query["tower"],
                ncDeactivated: parseInt(query["ncDeactivated"]),
                ncActivated: parseInt(query["ncActivated"])
            };


            Database.insert(account);
            respond(_response, "storing data");
            break;
        case "find":
            Database.findAll(function(json: string): void {
                respond(_response, json);
            });
            break;
        case "search":
            let search: Object;

            if (query["user"] == "" || query["password"] == "") {
                respond(_response, "Please insert your Username and Password");
                break;
            }

            else {
                search = { user: query["user"], password: query["password"] };
                Database.findSpecific(search, function(json: string): void {
                    respond(_response, json);
                });
                break;
            }

        case "del":
            let del: Object;

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

        case "update":
            let searchUpdate: Object;
            let changeUpdate: Object;

            searchUpdate = { user: query["user"] };

            changeUpdate = {
                user: query["user"],
                password: query["password"],
                wave: parseInt(query["wave"]),
                level: parseInt(query["level"]),
                game: parseInt(query["game"]),
                gold: parseFloat(query["gold"]),
                swordlvl: parseInt(query["swordlvl"]),
                rotationlvl: parseInt(query["rotationlvl"]),
                creepHealth: parseFloat(query["creepHealth"]),
                lastHealth: parseFloat(query["lastHealth"]),
                creepValue: parseFloat(query["creepValue"]),
                lastValue: parseFloat(query["lastValue"]),
                tower: query["tower"],
                ncDeactivated: parseInt(query["ncDeactivated"]),
                ncActivated: parseInt(query["ncActivated"])
            };


            if (query["user"] == "") {
                respond(_response, "You are not logged in");
                break;
            }

            else {
                Database.update(searchUpdate, changeUpdate);
                respond(_response, "Game saved");
                break;
            }

        default:
            respond(_response, "unknown command: " + command);
            break;
    }
}

function respond(_response: Http.ServerResponse, _text: string): void {
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}