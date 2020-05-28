namespace Abgabe05 {

interface Artikel {
    name: string;
    beschreibung: string;
    bild: string;
    preis: number;
    kategorie: number;
}

//Auflistung der Artikel und dessen Inhalte
//Kategorie 1: Gesundheit, Kategorie 2: Mana

let artikel01: Artikel = {name: "Feuerkäfer des Erwachens", beschreibung: "Die erzeugte Hitze sorgt dafür, dass du nie wieder morgens verschläfst.", 
bild: "Artikelbilder/Artikel01.png", preis: 49.99, kategorie: 1};

let artikel02: Artikel = {name: "Freiheitstropfen des Lebens", beschreibung: "Befreit dich sofort von einer Krankheit oder Verletzung deiner Wahl.", 
bild: "Artikelbilder/Artikel02.png", preis: 119.99, kategorie: 1};

let artikel03: Artikel = {name: "Mondsichel-Messer", beschreibung: "Ein magisches Messer, welches deine Frisur bei Vollmond automatisch perfekt schneidet.", 
bild: "Artikelbilder/Artikel03.png", preis: 64.99, kategorie: 1};

let artikel04: Artikel = {name: "Herz der Lebenskraft", beschreibung: "Katzen haben sieben Leben? Mit diesem Medallion hast du nun zwei.", 
bild: "Artikelbilder/Artikel04.png", preis: 799.99, kategorie: 1};

let artikel05: Artikel = {name: "Totem der Verwandlung", beschreibung: "Verwandelt den Anwender für 24 Stunden in eine Katze. Rasse und Geschlecht wählbar.",
bild: "Artikelbilder/Artikel11.png", preis: 189.99, kategorie: 1};

let artikel06: Artikel = {name: "Auge der 4. Dimension", beschreibung: "Deine Sicht wird um 400% verbessert. Extreme Weitsicht, Nachtsicht & Wärmebildsicht inkl.",
bild: "Artikelbilder/Artikel06.png", preis: 419.99, kategorie: 1};

let artikel07: Artikel = {name: "Metallischer Mondorden", beschreibung: "Lädt deine Hände und Füße magnetisch auf, um an Metalwänden zu klettern.",
bild: "Artikelbilder/Artikel13.png", preis: 84.99, kategorie: 1};

let artikel08: Artikel = {name: "Shurikenstern der Vitalität", beschreibung: "Erhört für 72h deine Stärke, Flexibilität & Schnelligkeit um 300%. Wie ein Ninja.",
bild: "Artikelbilder/Artikel16.png", preis: 349.99, kategorie: 1};

let artikel09: Artikel = {name: "Kristall der wärmenden Sonne", beschreibung: "Verwandelt Pessimisten in Optimisten. Bis zu 5mal anwendbar.",
bild: "Artikelbilder/Artikel05.png", preis: 79.99, kategorie: 2};

let artikel10: Artikel = {name: "Golddiadem der Erlösung", beschreibung: "Hebt Hausarrest der Eltern auf. Kann nur einmal verwendet werden.",
bild: "Artikelbilder/Artikel07.png", preis: 49.99, kategorie: 2};

let artikel11: Artikel = {name: "Stein des Bildungserfolgs", beschreibung: "Lässt dich mit 100% jede Prüfung bestehen. Effekt verfliegt nach 365 Tagen.",
bild: "Artikelbilder/Artikel08.png", preis: 549.99, kategorie: 2};

let artikel12: Artikel = {name: "Vermächtnis der Lotusblüte", beschreibung: "Wäscht dein Gedächtnis rein von unbrauchbarem Wissen.",
bild: "Artikelbilder/Artikel09.png", preis: 34.99, kategorie: 2};

let artikel13: Artikel = {name: "Messertanz der Genauigkeit", beschreibung: "Nimmt einem Klugscheißer die Fähigkeit alles besser zu wissen.",
bild: "Artikelbilder/Artikel10.png", preis: 279.99, kategorie: 2};

let artikel14: Artikel = {name: "Ewiger Liebesrausch", beschreibung: "Kitsch-Faktor des Anwenders steigt um 300%. Effekt dauert 30 Tage an.",
bild: "Artikelbilder/Artikel12.png", preis: 154.99, kategorie: 2};

let artikel15: Artikel = {name: "Energie der Natur", beschreibung: "Zieht Energie aus Pflanzen und fügt sie dir hinzu. Weniger Schlaf notwendig.",
bild: "Artikelbilder/Artikel15.png", preis: 319.99, kategorie: 2};

let artikel16: Artikel = {name: "Lehre der Unendlichkeit", beschreibung: "Macht dich für immer ALLWISSEND. Und mich steinreich.",
bild: "Artikelbilder/Artikel17.png", preis: 99999999.99, kategorie: 2};



//Array mit allen Artikeln:

export let alleArtikel: Artikel[] = [artikel01, artikel02, artikel03, artikel04, artikel05, artikel06, artikel07,
artikel08, artikel09, artikel10, artikel11, artikel12, artikel13, artikel14, artikel15, artikel16];


/*
//greift auf die unten aufgeführte Methode zu:
artikelGenerieren();


//diese Methode meinte ich :D :
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
        switch(alleArtikel[index].kategorie) {
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
} */
}