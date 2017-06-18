"use strict";
console.log("Server starting");
const Http = require("http");
const Url = require("url");
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
    console.log(_request.url);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let query = Url.parse(_request.url, true).query;
    console.log(query);
    _response.write("Hallo " + query["prename"] + ", <br> du erhaeltst von uns folgende Eissorten <br>");
    let key;
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
//# sourceMappingURL=NodeTest.js.map