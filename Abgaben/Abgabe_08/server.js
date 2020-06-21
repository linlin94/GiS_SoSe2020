"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A08Server = void 0;
//wird benötigt um Server zu bauen; * -sämtliche Funktionalität wird importiert
const Http = require("http");
var A08Server;
(function (A08Server) {
    console.log("Starting server");
    //process enviroment port = legt den port des Server für let port fest:
    let port = Number(process.env.PORT);
    //wenn es keinen Port gibt, setzt es den Port auf 8100:
    if (!port)
        port = 8100;
    //erstellt neuen Server:
    let server = Http.createServer();
    //fügt ihm einen Listener bei Anfragen hinzu:
    server.addListener("request", handleRequest);
    //fügt ihm einen Listener bei Abhören hinzu:
    server.addListener("listening", handleListen);
    //verknüpft Server mit dem Port 8100:
    server.listen(port);
    //wird ausgeführt wenn etwas empfangen wird:
    function handleListen() {
        console.log("Listening");
    }
    //wird ausgeführt wenn etwas angefrag wird:
    //Parameter werden mitgegeben:http-Protokolle (für Anfrage und Anwort), kein Rückgabewert:
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        //setzt den Header des http.ServerAntwort auf: (HTML mit Zeichecode UTF-8):
        _response.setHeader("content-type", "text/html; charset=utf-8");
        //erlaubt dem Browser Code anzufragen jeglichen Ursprungs um die Resource zu erreichen:
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //Serverantwort = AnfragenURL:
        _response.write(_request.url);
        //Ende der Anfrage:
        _response.end();
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
//# sourceMappingURL=server.js.map