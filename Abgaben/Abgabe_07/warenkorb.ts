namespace Abgabe07 {

let artikelWarenkorb: Artikel[] = JSON.parse(localStorage.getItem("gekaufteArtikel")!);

generateWarenkorb();

function generateWarenkorb(): void {

    //entfernt Satz "keine Artikel im Warenkorb", wenn der Array min. 1 Artikel aufweist:
    if (artikelWarenkorb.length > 0) {
    let noArticles: HTMLElement = document.getElementById("keineArtikel")!;
    noArticles.remove();
    }
    
    //greift auf den übergeordneten Div-Container im HTML zu:
    let artikelImWarenkorb: HTMLElement = document.getElementById("artikelimWarenkorb")!;

    for (let i: number = 0; i < artikelWarenkorb.length; i++) {

        //erstellt übergeordnetes div für einen Artikel:
        let artikelcontainerWarenkorb: HTMLElement = document.createElement("div");

        //erstellt ein img-Element, setzt die Attribute src und alt und hängt es an das Artikel-Div an:
        let artikelBildWarenkorb: HTMLElement = document.createElement("img");
        artikelBildWarenkorb.setAttribute("src", artikelWarenkorb[i].bild);
        artikelBildWarenkorb.setAttribute("alt", "artikelbild");
        artikelcontainerWarenkorb.appendChild(artikelBildWarenkorb);

        //erstellt ein h3-Element, füllt es mit Produktnamen und hängt es an das Artikel-Div an:
        let produktNameWarenkorb: HTMLElement = document.createElement("h3");
        artikelcontainerWarenkorb.appendChild(produktNameWarenkorb);
        produktNameWarenkorb.innerHTML = artikelWarenkorb[i].name;

        //erstellt ein p-Element, füllt es mit der Produktbeschreibung und hängt es an das Artikel-Div an:
        let produktBeschreibungWarenkorb: HTMLElement = document.createElement("p");
        artikelcontainerWarenkorb.appendChild(produktBeschreibungWarenkorb);
        produktBeschreibungWarenkorb.innerHTML = artikelWarenkorb[i].beschreibung;

        //erstellt ein strong in einem p-Element, füllt es mit dem Preis + €-Zeichen und hängt es an Artikel-Div an:
        let produktPreisWarenkorb: HTMLElement = document.createElement("p");
        let produktPreisStrongWarenkorb: HTMLElement = document.createElement("strong");
        artikelcontainerWarenkorb.appendChild(produktPreisWarenkorb);
        produktPreisWarenkorb.appendChild(produktPreisStrongWarenkorb);
        produktPreisStrongWarenkorb.innerHTML = artikelWarenkorb[i].preis + "€";

        //erstellt ein button, füllt es mit Text, setzt eine Klasse und hängt es an Artikel-Div an:
        let produktButtonWarenkorb: HTMLElement = document.createElement("button");
        produktButtonWarenkorb.setAttribute("class", "inwarenkorb");
        //
        produktButtonWarenkorb.setAttribute("artikelIndex", i.toString());
        artikelcontainerWarenkorb.appendChild(produktButtonWarenkorb);
        produktButtonWarenkorb.innerHTML = "Artikel entfernen";

        artikelImWarenkorb.appendChild(artikelcontainerWarenkorb);

}

//sollte den Gesamtpreis in ein HTML-Element packen und anzeigen lassen:
    let gesamtPreisWarenkorb: HTMLElement = document.createElement("h2");
    gesamtPreisWarenkorb.setAttribute("style", "border-top: solid 1px grey; font-family: Arial, Helvetica, sans-serif; font-size: 20px; margin: 10px 50px 10px 50px; padding-top: 20px;");
    gesamtPreisWarenkorb.innerHTML = "Gesamtpreis: " + localStorage.getItem("gesamtPreis") + " €";
    let sonstigesWarenkorbContainer: HTMLElement = document.getElementById("sonstigesWarenkorb")!;
    sonstigesWarenkorbContainer.appendChild(gesamtPreisWarenkorb);


}

//gibt den Entfernen-Buttons den Eventlistener:

generateDelete();

//gibt allen generierten Buttons die erfoderliche Funktion:
function generateDelete(): void {
    //Selektiert alle HTML-Elemente der Klasse .warenkorb und steckt sie in eine NodeList:
    let buttonKlasse: NodeList = document.querySelectorAll(".inwarenkorb");
    
    //fügt jedem NodeList-Element den EventListener hinzu:
    for (let i: number = 0; i < buttonKlasse.length; i++) {
    buttonKlasse[i].addEventListener("click", removeArticle);
    }
}


//sollte Artikel aus Array löschen:
function removeArticle(_eventRemove: Event): void {

    let targetRemove: HTMLElement = (<HTMLElement>_eventRemove.target);
    let artIndexRemove: number = parseInt(targetRemove.getAttribute("artikelIndex")!);
    artikelWarenkorb = artikelWarenkorb.splice(artIndexRemove, 1);

    
}

//alles-Löschen-Button:
let deleteAllButton: HTMLElement = document.getElementById("deleteAll")!;
deleteAllButton.addEventListener("click", deleteAllArticles);

function deleteAllArticles(): void {
    localStorage.clear();
}

}