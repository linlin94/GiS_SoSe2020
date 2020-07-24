"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endabgabeServer = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var endabgabeServer;
(function (endabgabeServer) {
    //let _url: string = "mongodb://localhost:27017";
    let _url = "mongodb+srv://linlin94:gis2020@ultimategis2020-21b69.mongodb.net/simplechat?retryWrites=true&w=majority";
    let userCollection;
    let messageCollection;
    let port = Number(process.env.PORT);
    //Wenn dem Port noch keine Nr zugewiesen wurde, weist er ihm die 8100 zu:
    if (!port)
        port = 8100;
    //port = 5500;
    //benötigte globale Variablen:
    let allUsers;
    let currentUser;
    let allMessages;
    startServer(port);
    connectDatabase();
    //erstellt den Server und weißt ihm einen Port zu:
    function startServer(_port) {
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.listen(port);
    }
    //stellt Verbindung zur Datenbank und Collections her:
    async function connectDatabase() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        userCollection = mongoClient.db("simplechat").collection("User");
        messageCollection = mongoClient.db("simplechat").collection("Messages");
        let allUsersFunc = await userCollection.find().toArray();
        let allMessagesFunc = await messageCollection.find().toArray();
        allUsers = allUsersFunc;
        allMessages = allMessagesFunc;
        console.log("IHRE MONGO DATEN SIND ANGERICHTET!");
    }
    //handelt die Anfrage je nach Pathname:
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            switch (url.pathname) {
                case "/login":
                    let usernameLogin = url.query["username"];
                    let passwordLogin = url.query["password"];
                    let usernameConfirmed = false;
                    let passwordConfirmed = false;
                    for (let i = 0; i < allUsers.length; i++) {
                        if (allUsers[i].username == usernameLogin) {
                            usernameConfirmed = true;
                            if (allUsers[i].password == passwordLogin) {
                                passwordConfirmed = true;
                                currentUser = { username: usernameLogin, password: passwordLogin };
                            }
                        }
                    }
                    if ((usernameConfirmed == true) && (passwordConfirmed == true)) {
                        _response.write(JSON.stringify(currentUser));
                    }
                    else {
                        _response.write("failure");
                    }
                    usernameConfirmed = false;
                    passwordConfirmed = false;
                    break;
                case "/registration":
                    let usernameRegistration = url.query["username"];
                    let passwordRegistration = url.query["password"];
                    let newUser = { username: usernameRegistration, password: passwordRegistration };
                    let userTaken = false;
                    //testet, ob es den Usernamen schon im Array (Datenbank) gibt:
                    for (let i = 0; i < allUsers.length; i++) {
                        if (newUser.username == allUsers[i].username) {
                            userTaken = true;
                        }
                    }
                    if (userTaken == false) {
                        userCollection.insert({ username: usernameRegistration, password: passwordRegistration });
                        _response.write("success");
                        window.alert("Die Registration war erfolgreich. Logge dich nun ein.");
                    }
                    break;
                case "/getAllMessages":
                    connectDatabase();
                    _response.write(JSON.stringify(allMessages));
                    break;
                case "/sendMessage":
                    let newMessageText = url.query["message"];
                    let currentChatroom = parseInt(url.query["chatroom"]);
                    messageCollection.insertOne({ username: currentUser.username, text: newMessageText, chatroom: currentChatroom });
                    break;
                case "/logout":
                    delete currentUser.username;
                    delete currentUser.password;
                    break;
            }
            /*if (url.pathname == "/insert") {
                mongoCollection.insert(url.query);
            }
            else if (url.pathname == "/pull") {
                    let findings: Mongo.Cursor<string> = mongoCollection.find();
                    let findingsArray: string[] = await findings.toArray();
                    _response.write(JSON.stringify(findingsArray));
                }
                else {
                    console.log("Error - Daten nicht vorhanden");
                }
                
            }*/
        }
        _response.end();
    }
})(endabgabeServer = exports.endabgabeServer || (exports.endabgabeServer = {}));
//# sourceMappingURL=server.js.map