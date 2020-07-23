namespace endabgabe {

    //Buttonfunktionen der Login und Registration-Buttons:
    let loginButton: HTMLElement = document.getElementById("login")!;
    loginButton.addEventListener("click", handleLogin);

    let registrationButton: HTMLElement = document.getElementById("registration")!;
    registrationButton.addEventListener("click", handleRegistration);


    async function handleLogin(): Promise<void> {

        let myForm: HTMLFormElement = <HTMLFormElement>document.getElementById("myForm")!;
        let formData: FormData = new FormData(myForm);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let url: string = "https://ultimategis2020.herokuapp.com";
        url = url + "/login?" + query.toString();
         //response fetchen
        let responseLogin: Response = await fetch(url);
        let responseLoginText: string = responseLogin.toString();
        let responseLoginSuccess: JSON = await responseLogin.json();

        if (responseLoginText == "failure") {
            window.alert("Anmeldung fehlgeschlagen.");
        }
        else {
            localStorage.setItem("currentUser", JSON.stringify(responseLoginSuccess));
            window.alert("Du hast dich erfolgreich eingeloggt.");
            window.location.href = "chat.html";
        }
    }


    async function handleRegistration(): Promise<void> {
        let myForm: HTMLFormElement = <HTMLFormElement>document.getElementById("myForm")!;
        let formData: FormData = new FormData(myForm);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let url: string = "https://ultimategis2020.herokuapp.com";
        url = url + "/registration?" + query.toString();
        let responseRegistration: Response = await fetch(url);
        let responseRegistrationText: string = responseRegistration.toString();

        if (responseRegistrationText == "success") {
            window.alert("Die Registration war erfolgreich. Logge dich nun ein.");
        }
        else {
            window.alert("Dieser Username ist bereits vergeben.");
        }
    }
}