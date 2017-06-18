console.log("Server starting");

import Http = require("http");
import Url = require("url");

interface AssocStringString {
    [key: string]: string;
}

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
    console.log(_request.url);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let query: AssocStringString = Url.parse(_request.url, true).query;
    console.log(query);
    _response.write("Hallo " + query["prename"] + ", <br> du erhaeltst von uns folgende Eissorten <br>");
    let key: string;
    for (key in query) {
        if (key != "toppings" && key != "prename" && key != "lastname" && key != "address" && key != "mail" && key != "Behaelter") {
            _response.write(key + "<br>");
        }
    }

    _response.write("Als Behaelter hast du " + query["Behaelter"] + " gewaehlt und als Topping " + query["toppings"] + "<br>");
    _response.write("Die Bestellung wird an " + query["address"] + " gesendet <br>");
    _response.write("Diese Bestelluebersicht wurde dir ebenfalls per Mail an " + query["mail"] + " zugesandt (nicht wirklich :( )");


    _response.end();
}