namespace Abgabe05 {

artikelGenerieren();

function artikelGenerieren(): void {

// erstellt die Artikel:

for (let index: number = 0; index < alleArtikel.length; index++) {

    
        //erstellt übergeordnetes div für einen Artikel:
        let artikelcontainer: HTMLElement = document.createElement("div");

        //erstellt ein img-Element, setzt die Attribute src und alt und hängt es an das Artikel-Div an:
        let artikelBild: HTMLElement = document.createElement("img");
        artikelBild.setAttribute("src", alleArtikel[index].bild);
        artikelBild.setAttribute("alt", "artikelbild");
        artikelcontainer.appendChild(artikelBild);

        //erstellt ein h3-Element, füllt es mit Produktnamen und hängt es an das Artikel-Div an:
        let produktName: HTMLElement = document.createElement("h3");
        artikelcontainer.appendChild(produktName);
        produktName.innerHTML = alleArtikel[index].name;

        //erstellt ein p-Element, füllt es mit der Produktbeschreibung und hängt es an das Artikel-Div an:
        let produktBeschreibung: HTMLElement = document.createElement("p");
        artikelcontainer.appendChild(produktBeschreibung);
        produktBeschreibung.innerHTML = alleArtikel[index].beschreibung;

        //erstellt ein strong in einem p-Element, füllt es mit dem Preis + €-Zeichen und hängt es an Artikel-Div an:
        let produktPreis: HTMLElement = document.createElement("p");
        let produktPreisStrong: HTMLElement = document.createElement("strong");
        artikelcontainer.appendChild(produktPreis);
        produktPreis.appendChild(produktPreisStrong);
        produktPreisStrong.innerHTML = alleArtikel[index].preis + "€";

        //erstellt ein button, füllt es mit Text, setzt eine Klasse und hängt es an Artikel-Div an:
        let produktButton: HTMLElement = document.createElement("button");
        produktButton.setAttribute("class", "inwarenkorb");
        artikelcontainer.appendChild(produktButton);
        produktButton.innerHTML = "In den Warenkorb";

        //selektiert die Kategorie und fügt es dem entsprechenende Div-Container zu:
        switch (alleArtikel[index].kategorie) {
            case 1:
                let getContainer1: HTMLElement = document.getElementById("container1")!;
                getContainer1.appendChild(artikelcontainer);
                break;
            case 2:
                let getContainer2: HTMLElement = document.getElementById("container2")!;
                getContainer2.appendChild(artikelcontainer);
                break;
            default:
                break;
        }
}
}
}
