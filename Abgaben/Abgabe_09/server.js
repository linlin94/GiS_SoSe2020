"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A09Server = void 0;
//wird benötigt um Server zu bauen; * -sämtliche Funktionalität wird importiert
const Http = require("http");
const Url = require("url");
var A09Server;
(function (A09Server) {
    console.log("Starting server");
    //process enviroment port = legt den port des Server für let port fest:
    let port = Number(process.env.PORT);
    //wenn es keinen Port gibt, setzt es den Port auf 8100:
    if (!port)
        port = 8100;
    console.log("Server starting on port: " + port);
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
    //wird ausgeführt wenn etwas angefragt wird:
    //Parameter werden mitgegeben:http-Protokolle (für Anfrage und Anwort), kein Rückgabewert:
    function handleRequest(_request, _response) {
        //setzt den Header des http.ServerAntwort auf: (HTML mit Zeichecode UTF-8):
        _response.setHeader("content-type", "text/html; charset=utf-8");
        //erlaubt dem Browser Code anzufragen jeglichen Ursprungs um die Resource zu erreichen:
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            //verwandelt Query in ein assoziatives Array:
            let url = Url.parse(_request.url, true);
            let pathname = url.pathname;
            //wenn /json (in url) empfangen wird, wird url.query in String umgewandelt, in Konsole ausgegeben und der Antwort mitgegeben:
            if (pathname == "/json") {
                let stringJSON = JSON.stringify(url.query);
                _response.write(stringJSON);
                console.log(stringJSON);
            }
            //wenn /html (in url) empfangen wird, werden Schüssel-Werte-Paare in Antwort geschrieben und in Konsole ausgegeben
            else if (pathname == "/html") {
                for (let key in url.query) {
                    _response.write(key + ":" + url.query[key] + "<br>");
                    console.log(_response);
                }
            }
        }
        //Ende & Verschicken der Antwort:
        _response.end();
    }
})(A09Server = exports.A09Server || (exports.A09Server = {}));
//# sourceMappingURL=server.js.map