"use strict";
var Abgabe10;
(function (Abgabe10) {
    //gibt den jeweiligen Buttons den passenden EventListener (html, json) bei Click:
    let buttonClickHTML = document.getElementById("htmlbutton");
    buttonClickHTML.addEventListener("click", handleClickHTML);
    let buttonClickJSON = document.getElementById("jsonbutton");
    buttonClickJSON.addEventListener("click", handleClickJSON);
    let pResponse = document.getElementById("pResponse");
    async function handleClickHTML() {
        //generiert FormData Objekt aus <form> im Dokument:
        let formData = new FormData(document.forms[0]);
        let url = "https://ultimategis2020.herokuapp.com";
        url = url + "/html";
        let query = new URLSearchParams(formData);
        url = url + "?" + query;
        console.log(url);
        let response = await fetch(url);
        let responseTEXT = await response.text();
        //füllt HTML auf der form.html Seite:
        pResponse.innerHTML = responseTEXT;
    }
    async function handleClickJSON() {
        //generiert FormData Objekt aus <form> im Dokument:
        let formData = new FormData(document.forms[0]);
        let url = "https://ultimategis2020.herokuapp.com";
        url = url + "/json";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let responseTEXT = await response.json();
        console.log(responseTEXT);
        pResponse.innerHTML = JSON.stringify(responseTEXT);
    }
})(Abgabe10 || (Abgabe10 = {}));
//# sourceMappingURL=start.js.map