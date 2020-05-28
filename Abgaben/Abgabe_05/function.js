"use strict";
var Abgabe05;
(function (Abgabe05) {
    artikelGenerieren();
    function artikelGenerieren() {
        // erstellt die Artikel:
        for (let index = 0; index < Abgabe05.alleArtikel.length; index++) {
            //erstellt übergeordnetes div für einen Artikel:
            let artikelcontainer = document.createElement("div");
            //erstellt ein img-Element, setzt die Attribute src und alt und hängt es an das Artikel-Div an:
            let artikelBild = document.createElement("img");
            artikelBild.setAttribute("src", Abgabe05.alleArtikel[index].bild);
            artikelBild.setAttribute("alt", "artikelbild");
            artikelcontainer.appendChild(artikelBild);
            //erstellt ein h3-Element, füllt es mit Produktnamen und hängt es an das Artikel-Div an:
            let produktName = document.createElement("h3");
            artikelcontainer.appendChild(produktName);
            produktName.innerHTML = Abgabe05.alleArtikel[index].name;
            //erstellt ein p-Element, füllt es mit der Produktbeschreibung und hängt es an das Artikel-Div an:
            let produktBeschreibung = document.createElement("p");
            artikelcontainer.appendChild(produktBeschreibung);
            produktBeschreibung.innerHTML = Abgabe05.alleArtikel[index].beschreibung;
            //erstellt ein strong in einem p-Element, füllt es mit dem Preis + €-Zeichen und hängt es an Artikel-Div an:
            let produktPreis = document.createElement("p");
            let produktPreisStrong = document.createElement("strong");
            artikelcontainer.appendChild(produktPreis);
            produktPreis.appendChild(produktPreisStrong);
            produktPreisStrong.innerHTML = Abgabe05.alleArtikel[index].preis + "€";
            //erstellt ein button, füllt es mit Text, setzt eine Klasse und hängt es an Artikel-Div an:
            let produktButton = document.createElement("button");
            produktButton.setAttribute("class", "inwarenkorb");
            artikelcontainer.appendChild(produktButton);
            produktButton.innerHTML = "In den Warenkorb";
            //selektiert die Kategorie und fügt es dem entsprechenende Div-Container zu:
            switch (Abgabe05.alleArtikel[index].kategorie) {
                case 1:
                    let getContainer1 = document.getElementById("container1");
                    getContainer1.appendChild(artikelcontainer);
                    break;
                case 2:
                    let getContainer2 = document.getElementById("container2");
                    getContainer2.appendChild(artikelcontainer);
                    break;
                default:
                    break;
            }
        }
    }
})(Abgabe05 || (Abgabe05 = {}));
//# sourceMappingURL=function.js.map