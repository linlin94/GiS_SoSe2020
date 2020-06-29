
namespace Abgabe09 {

  //gibt den jeweiligen Buttons den passenden EventListener (html, json) bei Click:
  let buttonClickHTML: HTMLElement = <HTMLElement> document.getElementById("htmlbutton");
  buttonClickHTML.addEventListener("click", handleClickHTML);
  let buttonClickJSON: HTMLElement = <HTMLElement> document.getElementById("jsonbutton");
  buttonClickJSON.addEventListener("click", handleClickJSON);

  let pResponse: HTMLElement = document.getElementById("pResponse")!;
    
  async function handleClickHTML(): Promise<void> {

    //generiert FormData Objekt aus <form> im Dokument:
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://ultimategis2020.herokuapp.com";
    url = url + "/html";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query;
    console.log(url);
    let response: Response = await fetch(url);
    let responseTEXT: string = await response.text();

    //füllt HTML auf der form.html Seite:
    pResponse.innerHTML = responseTEXT;

  }

  async function handleClickJSON(): Promise<void> {

    //generiert FormData Objekt aus <form> im Dokument:
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://ultimategis2020.herokuapp.com";
    url = url + "/json";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    let responseTEXT: string = await response.json();

    console.log(responseTEXT);
    pResponse.innerHTML = JSON.stringify(responseTEXT);
       
    }
  }
