
namespace A11 {

  //gibt den Buttons die Eventlistener:
  let datenAnlegen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("datenAnlegen");
  datenAnlegen.addEventListener("click", handleDatenAnlegen);
  let datenAnfragen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("datenAnfragen");
  datenAnfragen.addEventListener("click", handleDatenAnfragen);
  let ausgabeForm: HTMLElement = <HTMLElement>document.getElementById("pResponse");

  
  async function handleDatenAnlegen(): Promise<void> {

      //form - Tags auswerten:
      let form: FormData = new FormData(document.forms[0]);
      let query: URLSearchParams = new URLSearchParams(<any>form);
      let url: string = "https://ultimategis2020.herokuapp.com";
      url += "/push?" + query.toString();
      //response fetchen
      await fetch(url);
      console.log("Daten wurden angelegt");
      
  }
  async function handleDatenAnfragen(): Promise<void> {
      let url: string = "https://ultimategis2020.herokuapp.com";
      let serverResponse: Response = await fetch(url);
      let stringResponse: string = await serverResponse.text();
      ausgabeForm.innerHTML = stringResponse;
      console.log("Daten wurden abgefragt");
  }
}
