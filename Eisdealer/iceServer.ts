/// <reference path="../node.d.ts" />

console.log("Server starting");

import Http = require("http");
import url = require("url");



let server: Http.Server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(process.env.port || 8100);

function handleListen(): void {
    console.log("Hello, Im your server today. \n Im listening on port " + process.env.port);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Request received");
    console.log(_request.url);
    let rawData: {} = url.parse(_request.url, true).query;
    let data: MyData = {
        number: parseInt(rawData["number"]),
        selection: rawData["selection"]
    };
    
    console.log(data);
}

interface MyData {
    number: number;
    selection: string;
}

