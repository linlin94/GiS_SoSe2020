"use strict";
var Abgabe07;
(function (Abgabe07) {
    let urlData = "data_items.json";
    communicateArticles(urlData);
    //frägt Daten aus JSON an:
    async function communicateArticles(_url) {
        let response = await fetch(_url);
        //füllt sie zwischenzeitlich in Array:
        let jSONalleArtikel = await response.json();
        //wenn alle Daten übertragen worden sind, füllt er sie in den Array alleArtikel:
        Abgabe07.alleArtikel = await JSON.parse(JSON.stringify(jSONalleArtikel));
        //Artikel müssen hier generiert werden, da die Daten nach der Funktion gelöscht werden:
        Abgabe07.artikelGenerieren();
        Abgabe07.generateClick();
    }
    Abgabe07.communicateArticles = communicateArticles;
})(Abgabe07 || (Abgabe07 = {}));
//# sourceMappingURL=articles.js.map