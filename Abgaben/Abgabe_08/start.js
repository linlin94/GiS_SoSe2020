"use strict";
var Abgabe08;
(function (Abgabe08) {
    //gibt dem Submit-Button einen Eventlistener bei Click:
    let buttonClick = document.getElementById("submitbutton");
    buttonClick.addEventListener("click", handleClick);
    async function handleClick() {
        //greift auf die Daten des forms im HTML Dokument zurück und packt sie in FormData:
        let formData = new FormData(document.forms[0]);
        //ServerURL als String
        let url = "https://ultimategis2020.herokuapp.com/";
        //Query (Daten aus fromData) als String:
        let query = new URLSearchParams(formData.toString());
        //url + query zusammenfügen:
        url = url + "?" + query.toString();
        console.log("url: " + url);
        //Antwort des Servers (zusammengesetztes url+query):
        let response = await fetch(url);
        console.log("Antwort des Servers:" + response.toString());
    }
})(Abgabe08 || (Abgabe08 = {}));
//# sourceMappingURL=start.js.map