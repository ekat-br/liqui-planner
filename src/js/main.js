"use strict";

const haushaltsbuch = {
  gesamtbilanz: new Map(),

  eintraege: [],

  eintrag_erfassen() {
    let neuer_eintrag = new Map();
    neuer_eintrag.set("titel", prompt("Titel:").trim());
    neuer_eintrag.set("typ", prompt("Typ (Einnahme oder Ausgabe):").trim());
    neuer_eintrag.set(
      "betrag",
      prompt("Betrag (in Euro, ohne Euro-Zeichen):").trim()
    );
    neuer_eintrag.set("datum", new Date(prompt("Datum (jjjj-mm-tt):")).trim());
    neuer_eintrag.set("timestamp", Date.now());
    this.eintraege.push(neuer_eintrag);
  },

  betrag_verarbeiten(betrag) {
    if (this.betrag_validieren(betrag)) {
      return parseFloat(betrag.replace(",", ".")) * 100;
    } else {
      console.log(`Ungültiger Betrag: ${betrag} €`);
      return false;
    }
  },

  betrag_validieren(betrag) {
    if (betrag.match(/^\d+(?:(?:,|\.)\d\d?)?$/) !== null) {
      return true;
    } else {
      return false;
    }
  },

  gesamtbilanz_erstellen() {
    let neue_gesamtbilanz = new Map();
    neue_gesamtbilanz.set("einnahmen", 0);
    neue_gesamtbilanz.set("ausgaben", 0);
    neue_gesamtbilanz.set("bilanz", 0);
    this.eintraege.forEach(function (eintrag) {
      switch (eintrag.get("typ")) {
        case "Einnahme":
          neue_gesamtbilanz.set(
            "einnahmen",
            neue_gesamtbilanz.get("einnahmen") + eintrag.get("betrag")
          );
          neue_gesamtbilanz.set(
            "bilanz",
            neue_gesamtbilanz.get("bilanz") + eintrag.get("betrag")
          );
          break;
        case "Ausgabe":
          neue_gesamtbilanz.set(
            "ausgaben",
            neue_gesamtbilanz.get("ausgaben") + eintrag.get("betrag")
          );
          neue_gesamtbilanz.set(
            "bilanz",
            neue_gesamtbilanz.get("bilanz") - eintrag.get("betrag")
          );
          break;
        default:
          console.log(`Der Typ "${eintrag.get(typ)}" ist nicht bekannt.`);
          break;
      }
    });
    this.gesamtbilanz = neue_gesamtbilanz;
  },

  gesamtbilanz_ausgeben() {
    console.log(
      `Einnahmen: ${(this.gesamtbilanz.get("einnahmen") / 100).toFixed(
        2
      )} €\n` +
        `Ausgaben: ${(this.gesamtbilanz.get("ausgaben") / 100).toFixed(
          2
        )} €\n` +
        `Bilanz: ${(this.gesamtbilanz.get("bilanz") / 100).toFixed(2)} €\n` +
        `Bilanz ist positiv ${this.gesamtbilanz.get("bilanz") >= 0}`
    );
  },
  eintraege_sortieren() {
    this.eintraege.sort(function (eintrag_a, eintrag_b) {
      if (eintrag_a.get("datum") > eintrag_b.get("datum")) {
        return -1;
      } else if (eintrag_a.get("datum") < eintrag_b.get("datum")) {
        return 1;
      } else {
        return 0;
      }
    });
  },

  eintrag_hinzufuegen() {
    let weiterer_eintrag = true;
    while (weiterer_eintrag) {
      this.eintrag_erfassen();
      this.eintraege_sortieren;
      this.eintraege_ausgeben();
      this.gesamtbilanz_erstellen();
      this.gesamtbilanz_ausgeben();
      weiterer_eintrag = confirm("Weiteren Eintrag hinzufügen?");
    }

    //confirm
  },
};

haushaltsbuch.eintrag_hinzufuegen();
console.log(haushaltsbuch);
