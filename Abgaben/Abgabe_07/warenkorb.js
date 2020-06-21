"use strict";
var Abgabe07;
(function (Abgabe07) {
    let artikelWarenkorb = JSON.parse(localStorage.getItem("gekaufteArtikel"));
    generateWarenkorb();
    function generateWarenkorb() {
        //entfernt Satz "keine Artikel im Warenkorb", wenn der Array min. 1 Artikel aufweist:
        if (artikelWarenkorb.length > 0) {
            let noArticles = document.getElementById("keineArtikel");
            noArticles.remove();
        }
        //greift auf den übergeordneten Div-Container im HTML zu:
        let artikelImWarenkorb = document.getElementById("artikelimWarenkorb");
        for (let i = 0; i < artikelWarenkorb.length; i++) {
            //erstellt übergeordnetes div für einen Artikel:
            let artikelcontainerWarenkorb = document.createElement("div");
            //erstellt ein img-Element, setzt die Attribute src und alt und hängt es an das Artikel-Div an:
            let artikelBildWarenkorb = document.createElement("img");
            artikelBildWarenkorb.setAttribute("src", artikelWarenkorb[i].bild);
            artikelBildWarenkorb.setAttribute("alt", "artikelbild");
            artikelcontainerWarenkorb.appendChild(artikelBildWarenkorb);
            //erstellt ein h3-Element, füllt es mit Produktnamen und hängt es an das Artikel-Div an:
            let produktNameWarenkorb = document.createElement("h3");
            artikelcontainerWarenkorb.appendChild(produktNameWarenkorb);
            produktNameWarenkorb.innerHTML = artikelWarenkorb[i].name;
            //erstellt ein p-Element, füllt es mit der Produktbeschreibung und hängt es an das Artikel-Div an:
            let produktBeschreibungWarenkorb = document.createElement("p");
            artikelcontainerWarenkorb.appendChild(produktBeschreibungWarenkorb);
            produktBeschreibungWarenkorb.innerHTML = artikelWarenkorb[i].beschreibung;
            //erstellt ein strong in einem p-Element, füllt es mit dem Preis + €-Zeichen und hängt es an Artikel-Div an:
            let produktPreisWarenkorb = document.createElement("p");
            let produktPreisStrongWarenkorb = document.createElement("strong");
            artikelcontainerWarenkorb.appendChild(produktPreisWarenkorb);
            produktPreisWarenkorb.appendChild(produktPreisStrongWarenkorb);
            produktPreisStrongWarenkorb.innerHTML = artikelWarenkorb[i].preis + "€";
            //erstellt ein button, füllt es mit Text, setzt eine Klasse und hängt es an Artikel-Div an:
            let produktButtonWarenkorb = document.createElement("button");
            produktButtonWarenkorb.setAttribute("class", "inwarenkorb");
            //
            produktButtonWarenkorb.setAttribute("artikelIndex", i.toString());
            artikelcontainerWarenkorb.appendChild(produktButtonWarenkorb);
            produktButtonWarenkorb.innerHTML = "Artikel entfernen";
            artikelImWarenkorb.appendChild(artikelcontainerWarenkorb);
        }
    }
    function showPrice() {
        //sollte den Gesamtpreis in ein HTML-Element packen und anzeigen lassen:
        let gesamtPreisWarenkorb = document.createElement("h2");
        gesamtPreisWarenkorb.setAttribute("id", "gesamtpreiswarenkorb");
        gesamtPreisWarenkorb.setAttribute("style", "border-top: solid 1px grey; font-family: Arial, Helvetica, sans-serif; font-size: 20px; margin: 10px 50px 10px 50px; padding-top: 20px;");
        gesamtPreisWarenkorb.innerHTML = "Gesamtpreis: " + localStorage.getItem("gesamtPreis") + " €";
        let sonstigesWarenkorbContainer = document.getElementById("sonstigesWarenkorb");
        sonstigesWarenkorbContainer.appendChild(gesamtPreisWarenkorb);
    }
    showPrice();
    //gibt den Entfernen-Buttons den Eventlistener:
    generateDelete();
    //gibt allen generierten Buttons die erfoderliche -Artikel-Entfernen-Funktion:
    function generateDelete() {
        //Selektiert alle HTML-Elemente der Klasse .warenkorb und steckt sie in eine NodeList:
        let buttonKlasse = document.querySelectorAll(".inwarenkorb");
        //fügt jedem NodeList-Element den EventListener hinzu:
        for (let i = 0; i < buttonKlasse.length; i++) {
            buttonKlasse[i].addEventListener("click", removeArticle);
        }
    }
    //sollte einen Artikel aus Array löschen:
    function removeArticle(_eventRemove) {
        let targetRemove = _eventRemove.target;
        let artIndexRemove = parseInt(targetRemove.getAttribute("artikelIndex"));
        //zieht den Preis des entfernten Artikels vom Gesamtpreis ab und speichert den neuen Wert im LocalStorage wo der alte Wert war:
        artikelWarenkorb.splice(artIndexRemove, 1);
        localStorage.setItem("gekaufteArtikel", JSON.stringify(artikelWarenkorb));
        //berechnet neuen Gesamtpreis mit dem Array:
        let localGesamtpreis = 0;
        if (artikelWarenkorb.length > 0) {
            for (let i = 0; i < artikelWarenkorb.length; i++) {
                localGesamtpreis = localGesamtpreis + artikelWarenkorb[i].preis;
                Abgabe07.gesamtpreis = localGesamtpreis;
            }
        }
        else {
            deleteAllArticles();
        }
        localStorage.setItem("gesamtPreis", Abgabe07.gesamtpreis.toString());
        let oldPrice = document.getElementById("gesamtpreiswarenkorb");
        document.removeChild(oldPrice);
        showPrice();
    }
    //alles-Löschen-Button:
    let deleteAllButton = document.getElementById("deleteAll");
    deleteAllButton.addEventListener("click", deleteAllArticles);
    function deleteAllArticles() {
        localStorage.clear();
    }
})(Abgabe07 || (Abgabe07 = {}));
//# sourceMappingURL=warenkorb.js.map