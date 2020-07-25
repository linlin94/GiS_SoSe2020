"use strict";
var endabgabe;
(function (endabgabe) {
    //Buttonfunktionen der Login und Registration-Buttons:
    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", handleLogin);
    let registrationButton = document.getElementById("registration");
    registrationButton.addEventListener("click", handleRegistration);
    async function handleLogin() {
        let myForm = document.getElementById("myForm");
        let formData = new FormData(myForm);
        let query = new URLSearchParams(formData);
        let url = "https://ultimategis2020.herokuapp.com";
        url = url + "/login?" + query.toString();
        //response fetchen
        let responseLogin = await fetch(url);
        let responseLoginText = await responseLogin.text();
        if (responseLoginText == "failure") {
            window.alert("Anmeldung fehlgeschlagen.");
        }
        else {
            localStorage.setItem("currentUser", responseLoginText);
            window.alert("Du hast dich erfolgreich eingeloggt.");
            window.location.href = "chat.html";
        }
    }
    async function handleRegistration() {
        let myForm = document.getElementById("myForm");
        let formData = new FormData(myForm);
        let query = new URLSearchParams(formData);
        let url = "https://ultimategis2020.herokuapp.com";
        url = url + "/registration?" + query.toString();
        let responseRegistration = await fetch(url);
        let responseRegistrationText = await responseRegistration.text();
        console.log(responseRegistrationText);
        if (responseRegistrationText == "success") {
            window.alert("Die Registration war erfolgreich. Logge dich nun ein.");
        }
        else {
            window.alert("Dieser Username ist bereits vergeben.");
        }
    }
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=login.js.map