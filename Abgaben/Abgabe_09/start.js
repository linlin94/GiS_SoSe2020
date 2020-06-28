"use strict";
var Abgabe08;
(function (Abgabe08) {
    //gibt den jeweiligen Buttons den passenden EventListener (html, json) bei Click:
    let buttonClickHTML = document.getElementById("htmlbutton");
    buttonClickHTML.addEventListener("click", handleClickHTML);
    let buttonClickJSON = document.getElementById("jsonbutton");
    buttonClickJSON.addEventListener("click", handleClickJSON);
    let pResponse = document.getElementById("pResponse");
    async function handleClickHTML() {
        //generiert FormData Objekt aus <form> im Dokument:
        let formData = new FormData(document.forms[0]);
        let url = "https://ultimategis2020.herokuapp.com/";
        url = url + "/html";
        let query = new URLSearchParams(formData.toString());
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let responseText = await response.text();
        //füllt HTML auf der form.html Seite:
        pResponse.innerHTML = responseText;
    }
    async function handleClickJSON() {
        //generiert FormData Objekt aus <form> im Dokument:
        let formData = new FormData(document.forms[0]);
        let url = "https://ultimategis2020.herokuapp.com/";
        url = url + "/json";
        let query = new URLSearchParams(formData.toString());
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let responseText = await response.text();
        let responseJSON = JSON.parse(responseText);
        console.log(responseJSON);
        console.log(responseText);
        pResponse.innerHTML = responseText;
    }
})(Abgabe08 || (Abgabe08 = {}));
//# sourceMappingURL=start.js.map