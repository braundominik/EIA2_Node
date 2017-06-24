/// <reference path="../node.d.ts" />
"use strict";
console.log("Server starting");
const Http = require("http");
const url = require("url");
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(process.env.port || 8100);
function handleListen() {
    console.log("Hello, Im your server today. \n Im listening on port " + process.env.port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    console.log(_request.url);
    let rawData = url.parse(_request.url, true).query;
    let data = {
        number: parseInt(rawData["number"]),
        selection: rawData["selection"]
    };
    console.log(data);
}
//# sourceMappingURL=iceServer.js.map