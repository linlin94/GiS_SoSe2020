"use strict";
var Abgabe06;
(function (Abgabe06) {
    artikelGenerieren();
    function artikelGenerieren() {
        // erstellt die Artikel:
        for (let index = 0; index < Abgabe06.alleArtikel.length; index++) {
            //erstellt übergeordnetes div für einen Artikel:
            let artikelcontainer = document.createElement("div");
            //erstellt ein img-Element, setzt die Attribute src und alt und hängt es an das Artikel-Div an:
            let artikelBild = document.createElement("img");
            artikelBild.setAttribute("src", Abgabe06.alleArtikel[index].bild);
            artikelBild.setAttribute("alt", "artikelbild");
            artikelcontainer.appendChild(artikelBild);
            //erstellt ein h3-Element, füllt es mit Produktnamen und hängt es an das Artikel-Div an:
            let produktName = document.createElement("h3");
            artikelcontainer.appendChild(produktName);
            produktName.innerHTML = Abgabe06.alleArtikel[index].name;
            //erstellt ein p-Element, füllt es mit der Produktbeschreibung und hängt es an das Artikel-Div an:
            let produktBeschreibung = document.createElement("p");
            artikelcontainer.appendChild(produktBeschreibung);
            produktBeschreibung.innerHTML = Abgabe06.alleArtikel[index].beschreibung;
            //erstellt ein strong in einem p-Element, füllt es mit dem Preis + €-Zeichen und hängt es an Artikel-Div an:
            let produktPreis = document.createElement("p");
            let produktPreisStrong = document.createElement("strong");
            artikelcontainer.appendChild(produktPreis);
            produktPreis.appendChild(produktPreisStrong);
            produktPreisStrong.innerHTML = Abgabe06.alleArtikel[index].preis + "€";
            //erstellt ein button, füllt es mit Text, setzt eine Klasse und hängt es an Artikel-Div an:
            let produktButton = document.createElement("button");
            produktButton.setAttribute("class", "inwarenkorb");
            //
            produktButton.setAttribute("artikelIndex", index.toString());
            artikelcontainer.appendChild(produktButton);
            produktButton.innerHTML = "In den Warenkorb";
            //selektiert die Kategorie und fügt es dem entsprechenende Div-Container zu:
            switch (Abgabe06.alleArtikel[index].kategorie) {
                case "gesundheit":
                    let getContainer1 = document.getElementById("container1");
                    getContainer1.appendChild(artikelcontainer);
                    break;
                case "mana":
                    let getContainer2 = document.getElementById("container2");
                    getContainer2.appendChild(artikelcontainer);
                    break;
                default:
                    break;
            }
        }
    }
    //Teilaufgabe 01:
    //Selektiert alle HTML-Elemente der Klasse .warenkorb und steckt sie in eine NodeList:
    let buttonKlasse = document.querySelectorAll(".inwarenkorb");
    //fügt jedem NodeList-Element den EventListener hinzu:
    for (let i = 0; i < buttonKlasse.length; i++) {
        buttonKlasse[i].addEventListener("click", buttonInWarenkorb);
    }
    let inhaltWarenkorb = 0;
    let gesamtpreis = 0;
    //Funktion des Buttons:
    function buttonInWarenkorb(_event) {
        if (inhaltWarenkorb == 0) {
            let zahlWarenkorbContainer = document.createElement("div");
            zahlWarenkorbContainer.setAttribute("id", "warenkorbIcon");
            let zahlWarenkorb = document.createElement("div");
            zahlWarenkorb.setAttribute("id", "zahlWarenkorb");
            zahlWarenkorbContainer.appendChild(zahlWarenkorb);
            //verbindet generierten HTML-Elemente mit li #hierWarenkorb in HTML-Dokument:
            let hierWarenkorb = document.getElementById("hierWarenkorb");
            hierWarenkorb.appendChild(zahlWarenkorbContainer);
            //CSS wird für die neuen HTML-Elemente generiert:
            //FRAGE: geht das auch schöner? Dass man direkt im CSS-Stylesheet was ändert und nicht alles über Inline-Styles im HTML erschafft?
            document.querySelector("#warenkorbIcon")?.setAttribute("style", "position:relative");
            document.querySelector("#zahlWarenkorb")?.setAttribute("style", "position: absolute; top: -2px; right: 33px; font-size: 13px; font-family: Arial, Helvetica, sans-serif; color: white; background-color: rgb(188, 141, 226); padding: 1px 6px 1px 6px; border: 2px solid white; border-radius: 12px");
        }
        inhaltWarenkorb = inhaltWarenkorb + 1;
        //fügt inhaltWarenkorb in das generierte HTML ein:
        document.querySelector("#zahlWarenkorb").innerHTML = String(inhaltWarenkorb);
        //nimmt den Preis des Artikels des geklickten Buttons:
        let target = _event.target;
        let artIndex = parseInt(target.getAttribute("artikelIndex"));
        let preisAktuellerArtikel = Abgabe06.alleArtikel[artIndex].preis;
        gesamtpreis = gesamtpreis + preisAktuellerArtikel;
        console.log(gesamtpreis);
    }
    //Teilaufgabe 2:
    //gibt jeder Kategorie das Click-Event mit der Funktion showCategorie:
    let linkCategorie = document.querySelectorAll(".navListe a");
    for (let i = 0; i < linkCategorie.length; i++) {
        linkCategorie[i].addEventListener("click", showCategorie);
    }
    function showCategorie(_show) {
        let targetCategorie = _show.target;
        //erstellt Variablen für die HTML-Elemente Div-Container und die Kategorieüberschrift:
        let hideMana = document.getElementById("container2");
        let hideManaTitel = document.getElementById("Mana");
        let hideGesundheit = document.getElementById("container1");
        let hideGesundheitTitel = document.getElementById("Gesundheit");
        //Je nach geklicktem Link werden die Div-Container & Überschriften ein- oder ausgeblendet:
        switch (targetCategorie) {
            case document.getElementById("linkGesundheit"):
                hideGesundheit.style.display = "flex";
                hideGesundheitTitel.style.display = "block";
                hideMana.style.display = "none";
                hideManaTitel.style.display = "none";
                break;
            case document.getElementById("linkMana"):
                hideMana.style.display = "flex";
                hideManaTitel.style.display = "block";
                hideGesundheit.style.display = "none";
                hideGesundheitTitel.style.display = "none";
                break;
            case document.getElementById("linkHome"):
                hideGesundheit.style.display = "flex";
                hideGesundheitTitel.style.display = "block";
                hideMana.style.display = "flex";
                hideManaTitel.style.display = "block";
            default:
                break;
        }
    }
})(Abgabe06 || (Abgabe06 = {}));
//# sourceMappingURL=function.js.map