//mongodb+srv://linlin94:gis2020@ultimategis2020-21b69.mongodb.net/<dbname>?retryWrites=true&w=majority

//wird benötigt um Server zu bauen; * -sämtliche Funktionalität wird importiert
import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace A11 {
    //let _url: string = "mongodb://localhost:27017";
    let _url: string = "mongodb+srv://linlin94:gis2020@ultimategis2020-21b69.mongodb.net/<dbname>?retryWrites=true&w=majority";
    
    let mongoCollection: Mongo.Collection;
    let port: number | string | undefined = Number(process.env.PORT);
    //Wenn dem Port noch keine Nr zugewiesen wurde, weist er ihm die 8100 zu:
    if (!port)
        port = 8100;
        //port = 5500;

    startServer(port);
    connectDatabase();

    //erstellt den Server und weißt ihm einen Port zu:
    function startServer (_port: number | string): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.listen(port);
    }
    //stellt Verbindung zur Datenbank her:
    async function connectDatabase(): Promise <void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        mongoCollection = mongoClient.db("Test").collection("Students");
        
    }
    //handelt die Anfrage:
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
     
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            
            if (url.pathname == "/insert") {
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
                
            }

        _response.end();
    }
}