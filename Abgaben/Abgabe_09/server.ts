//wird benötigt um Server zu bauen; * -sämtliche Funktionalität wird importiert
import * as Http from "http";
import * as Url from "url";

export namespace A08Server {

    console.log("Starting server");

    //process enviroment port = legt den port des Server für let port fest:
    let port: number = Number(process.env.PORT);

    //wenn es keinen Port gibt, setzt es den Port auf 8100:
    if (!port)
        port = 8100;

    console.log("Server starting on port: " + port);

    //erstellt neuen Server:
    let server: Http.Server = Http.createServer();
    //fügt ihm einen Listener bei Anfragen hinzu:
    server.addListener("request", handleRequest);
    //fügt ihm einen Listener bei Abhören hinzu:
    server.addListener("listening", handleListen);
    //verknüpft Server mit dem Port 8100:
    server.listen(port);

    //wird ausgeführt wenn etwas empfangen wird:
    function handleListen(): void {
        console.log("Listening");
    }

    //wird ausgeführt wenn etwas angefragt wird:
    //Parameter werden mitgegeben:http-Protokolle (für Anfrage und Anwort), kein Rückgabewert:
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        
        console.log("I hear voices!");

        //setzt den Header des http.ServerAntwort auf: (HTML mit Zeichecode UTF-8):
        _response.setHeader("content-type", "text/html; charset=utf-8");
        //erlaubt dem Browser Code anzufragen jeglichen Ursprungs um die Resource zu erreichen:
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {

            //verwandelt Query in ein assoziatives Array:
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let pathname: string = url.pathname!;

            //wenn /json (in url) empfangen wird, wird url.query in String umgewandelt, in Konsole ausgegeben und der Antwort mitgegeben:
            if (pathname == "/json") {
                let jsonString: string = JSON.stringify(url.query);
                console.log(jsonString);
                _response.write(jsonString);
        
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
}