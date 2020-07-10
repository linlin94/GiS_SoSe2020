"use strict";
//mongodb+srv://linlin94:gis2020@ultimategis2020-21b69.mongodb.net/<dbname>?retryWrites=true&w=majority
Object.defineProperty(exports, "__esModule", { value: true });
exports.A11 = void 0;
//wird benötigt um Server zu bauen; * -sämtliche Funktionalität wird importiert
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var A11;
(function (A11) {
    //let _url: string = "mongodb://localhost:27017";
    let _url = "mongodb+srv://linlin94:gis2020@ultimategis2020-21b69.mongodb.net/<dbname>?retryWrites=true&w=majority";
    let mongoCollection;
    let port = Number(process.env.PORT);
    //Wenn dem Port noch keine Nr zugewiesen wurde, weist er ihm die 8100 zu:
    if (!port)
        port = 8100;
    //port = 5500;
    startServer(port);
    connectDatabase();
    //erstellt den Server und weißt ihm einen Port zu:
    function startServer(_port) {
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.listen(port);
    }
    //stellt Verbindung zur Datenbank her:
    async function connectDatabase() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        mongoCollection = mongoClient.db("Test").collection("Students");
    }
    //handelt die Anfrage:
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/push") {
                mongoCollection.insert(url.query);
            }
            else if (url.pathname == "/pull") {
                let findings = mongoCollection.find();
                let findingsArray = await findings.toArray();
                _response.write(JSON.stringify(findingsArray));
            }
            else {
                console.log("Error - Daten nicht vorhanden");
            }
        }
        _response.end();
    }
})(A11 = exports.A11 || (exports.A11 = {}));
//# sourceMappingURL=server.js.map