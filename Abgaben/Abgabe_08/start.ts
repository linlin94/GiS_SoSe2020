
namespace Abgabe08 {

  //gibt dem Submit-Button einen Eventlistener bei Click:
  let buttonClick: HTMLElement = <HTMLElement> document.getElementById("submitbutton");
  buttonClick.addEventListener("click", handleClick);

  async function handleClick(): Promise<void> {

    //greift auf die Daten des forms im HTML Dokument zurück und packt sie in FormData:
    let formData: FormData = new FormData(document.forms[0]);

    //ServerURL als String
    let url: string = "https://ultimategis2020.herokuapp.com/";

    //Query (Daten aus fromData) als String:
    let query: URLSearchParams = new URLSearchParams(formData.toString());

    //url + query zusammenfügen:
    url = url + "?" + query.toString();
    console.log("url: " + url);

    //Antwort des Servers (zusammengesetztes url+query):
    let response: Response = await fetch(url);

    console.log(response);

  }

}