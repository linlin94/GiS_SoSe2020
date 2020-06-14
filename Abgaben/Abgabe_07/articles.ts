namespace Abgabe07 {

    export interface Artikel {
        name: string;
        beschreibung: string;
        bild: string;
        preis: number;
        kategorie: string;
    }
    
    let urlData: string = "data_items.json";
    communicateArticles(urlData);
    
    //Array für alle Artikel:
    export let alleArtikel: Artikel[];
    
    
    //frägt Daten aus JSON an:
    export async function communicateArticles(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
    //füllt sie zwischenzeitlich in Array:
        let jSONalleArtikel: JSON = await response.json();
    //wenn alle Daten übertragen worden sind, füllt er sie in den Array alleArtikel:
        alleArtikel = await JSON.parse(JSON.stringify(jSONalleArtikel));
    //Artikel müssen hier generiert werden, da die Daten nach der Funktion gelöscht werden:
        artikelGenerieren();
        generateClick();
    }
}