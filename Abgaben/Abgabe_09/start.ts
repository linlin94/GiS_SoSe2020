
namespace Abgabe08 {

  //gibt den jeweiligen Buttons den passenden EventListener (html, json) bei Click:
  let buttonClickHTML: HTMLElement = <HTMLElement> document.getElementById("htmlbutton");
  buttonClickHTML.addEventListener("click", handleClickHTML);
  let buttonClickJSON: HTMLElement = <HTMLElement> document.getElementById("jsonbutton");
  buttonClickJSON.addEventListener("click", handleClickJSON);


    
  async function handleClickHTML(): Promise<void> {

    //generiert FormData Objekt aus <form> im Dokument:
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://ultimategis2020.herokuapp.com/";
    url = url + "/html";
    let query: URLSearchParams = new URLSearchParams(formData.toString());
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    let responseText: string = await response.text();

    //generiert HTML auf der form.html Seite:
    let pResponse: HTMLElement = document.getElementById("pResponse")!;
    pResponse.innerHTML = responseText;

  }

  async function handleClickJSON(): Promise<void> {

    //generiert FormData Objekt aus <form> im Dokument:
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://ultimategis2020.herokuapp.com/";
    url = url + "/json";
    let query: URLSearchParams = new URLSearchParams(formData.toString());
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    let responseText: string = await response.text();
    let responseJSON: JSON = JSON.parse(responseText);
    console.log(responseJSON);
    console.log(responseText);
       
    }

  }
