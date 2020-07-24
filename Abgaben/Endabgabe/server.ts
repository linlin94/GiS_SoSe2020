import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace endabgabeServer {

    interface User {
        username: string;
        password: string;
    }

    interface Message {
        username: string;
        text: string;
        chatroom: number;
    }

    //let _url: string = "mongodb://localhost:27017";
    let _url: string = "mongodb+srv://linlin94:gis2020@ultimategis2020-21b69.mongodb.net/simplechat?retryWrites=true&w=majority";
    
    let userCollection: Mongo.Collection;
    let messageCollection: Mongo.Collection;

    let port: number | string | undefined = Number(process.env.PORT);
    //Wenn dem Port noch keine Nr zugewiesen wurde, weist er ihm die 8100 zu:
    if (!port)
        port = 8100;
        //port = 5500;


    //benötigte globale Variablen:
    let allUsers: User[];
    let currentUser: User;
    let allMessages: Message[];


    startServer(port);
    connectDatabase();
    

    //erstellt den Server und weißt ihm einen Port zu:
    function startServer (_port: number | string): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.listen(port);
    }

    //stellt Verbindung zur Datenbank und Collections her:
    async function connectDatabase(): Promise <void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        userCollection = mongoClient.db("simplechat").collection("User");
        messageCollection = mongoClient.db("simplechat").collection("Messages");

        let allUsersMongo: Mongo.Cursor<string> = userCollection.find();
        let allUsersJSON: string = JSON.stringify(allUsersMongo);
        let allUsersFunc: User[] = JSON.parse(allUsersJSON);
        let allMessagesMongo: Mongo.Cursor<string> = messageCollection.find();
        let allMessagesJSON: string = JSON.stringify(allMessagesMongo);
        let allMessagesFunc: Message[] = JSON.parse(allMessagesJSON); 

        allUsers = allUsersFunc;
        allMessages = allMessagesFunc;
        console.log("IHRE MONGO DATEN SIND ANGERICHTET!");
    }

    //handelt die Anfrage je nach Pathname:
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            
            switch (url.pathname) {

                case "/login":
                    console.log("HIER BIN ICH BEI /LOGIN!");
                    let usernameLogin: string = <string>url.query["username"];
                    let passwordLogin: string = <string>url.query["password"];
                    
                    let usernameConfirmed: boolean = false;
                    let passwordConfirmed: boolean = false;
            
                    for (let i: number = 0; i < allUsers.length; i++) {
                        if (allUsers[i].username == usernameLogin) {
                            usernameConfirmed = true;
                            if (allUsers[i].password == passwordLogin) {
                                passwordConfirmed = true;
                                currentUser = {username: usernameLogin, password: passwordLogin};
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
                
                case "/registration":

                    let usernameRegistration: string = <string>url.query["username"];
                    let passwordRegistration: string = <string>url.query["password"];
            
                    let newUser: User = {username: usernameRegistration, password: passwordRegistration};
            
                    let userTaken: boolean = false;
            
                    //testet, ob es den Usernamen schon im Array (Datenbank) gibt:
                    for (let i: number = 0; i < allUsers.length; i++) {
                        if (newUser.username == allUsers[i].username) {
                            userTaken = true;
                        }
                    }
            
                    if (userTaken == false) {
                        userCollection.insert({username: usernameRegistration, password: passwordRegistration});
                        _response.write("success");
                        window.alert("Die Registration war erfolgreich. Logge dich nun ein.");
                    }

                case "/getAllMessages":

                    _response.write(JSON.stringify(allMessages));

                case "/sendMessage":

                    let newMessageText: string = <string>url.query["message"];
                    let currentChatroom: number = parseInt(<string>url.query["chatroom"]);
                    messageCollection.insert({username: currentUser.username, text: newMessageText, chatroom: currentChatroom});

                case "/logout":

                    delete currentUser.username;
                    delete currentUser.password;
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
}