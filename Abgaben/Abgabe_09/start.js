"use strict";
var Abgabe09;
(function (Abgabe09) {
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
        let query = new URLSearchParams(formData.toString());
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let responseTEXT = response.toString();
        let responseJSON = JSON.parse(responseTEXT);
        console.log(responseJSON);
        pResponse.innerHTML = responseTEXT;
    }
})(Abgabe09 || (Abgabe09 = {}));
//# sourceMappingURL=start.js.map