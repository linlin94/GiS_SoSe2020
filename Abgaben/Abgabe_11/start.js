"use strict";
var A11;
(function (A11) {
    //gibt den Buttons die Eventlistener:
    let datenAnlegen = document.getElementById("datenAnlegen");
    datenAnlegen.addEventListener("click", handleDatenAnlegen);
    let datenAnfragen = document.getElementById("datenAnfragen");
    datenAnfragen.addEventListener("click", handleDatenAnfragen);
    let ausgabeForm = document.getElementById("pResponse");
    async function handleDatenAnlegen() {
        //form - Tags auswerten:
        let form = new FormData(document.forms[0]);
        let query = new URLSearchParams(form);
        let url = "https://ultimategis2020.herokuapp.com";
        url = url + "/insert?" + query.toString();
        //response fetchen
        await fetch(url);
        console.log("Daten wurden angelegt");
    }
    async function handleDatenAnfragen() {
        let url = "https://ultimategis2020.herokuapp.com";
        let form = new FormData(document.forms[0]);
        let query = new URLSearchParams(form);
        url = url + "/get?" + query.toString();
        let serverResponse = await fetch(url);
        let stringResponse = await serverResponse.text();
        ausgabeForm.innerHTML = stringResponse;
        console.log("Daten wurden abgefragt");
    }
})(A11 || (A11 = {}));
//# sourceMappingURL=start.js.map