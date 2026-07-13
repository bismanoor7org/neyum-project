import type { LocaleContentPack } from "../types";

export const itPack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "Pianificazione",
    Style: "Stile",
    Activities: "Attività",
  },
  guides: {
    "first-time-fiji": {
      title: "Prima Volta alle Figi",
      excerpt: "Tutto ciò che serve per la tua prima viaggio alle Figi.",
      category: "Pianificazione",
      overview:
        "Le Figi sono un'ottima prima destinazione — ingresso facile, persone accoglienti e 333 isole da esplorare. La maggior parte dei visitatori non ha bisogno di visto per fino a quattro mesi.",
      sections: [
        {
          title: "Prima del volo",
          body: "Assicurati che il passaporto sia valido per sei mesi oltre la data di viaggio. Sottoscrivi un'assicurazione di viaggio completa e scarica mappe offline per le isole remote.",
          items: ["Validità del passaporto", "Assicurazione di viaggio", "Valuta (FJD)", "Abbigliamento modesto per i villaggi"],
        },
        {
          title: "Arrivo e dogana",
          body: "L'aeroporto internazionale di Nadi è moderno ed efficiente. Organizza transfer privati in anticipo per evitare code e iniziare a rilassarti subito.",
          items: ["Transfer privato", "SIM all'aeroporto", "Accoglienza del resort"],
        },
        {
          title: "Etichetta sulle isole",
          body: "I fijiani sono tra le persone più accoglienti al mondo. Un cordiale 'Bula!' fa miracoli. Togli il cappello nei villaggi e accetta sempre il kava quando offerto.",
          items: ["Codice di abbigliamento nel villaggio", "Cerimonia del kava", "Consenso per le fotografie"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare la mia prima visita alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    "visa-guide": {
      title: "Visto e Requisiti di Viaggio",
      excerpt: "Passaporti, visti e regole di ingresso — spiegati in modo semplice.",
      category: "Pianificazione",
      overview:
        "La maggior parte delle persone non deve procurarsi un visto prima di volare alle Figi. Basta assicurarsi che passaporto e biglietto di ritorno soddisfino i requisiti dell'immigrazione.",
      sections: [
        {
          title: "Ingresso senza visto",
          body: "I cittadini della maggior parte dei paesi ricevono un permesso di visita fino a quattro mesi.",
          items: ["Passaporto valido 6+ mesi", "Biglietto di ritorno", "Prova dell'alloggio"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare visto e requisiti di viaggio?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    "best-time-to-visit": {
      title: "Periodo Migliore per Visitare le Figi",
      excerpt: "Meteo, stagioni e quando andremmo davvero.",
      category: "Pianificazione",
      overview:
        "Le Figi sono calde tutto l'anno. La stagione secca (maggio–ott) offre cieli più limpidi e resort affollati; la stagione umida (nov–apr) regala paesaggi rigogliosi, meno folla e prezzi più accessibili.",
      sections: [
        {
          title: "Stagione secca (maggio–ott)",
          body: "Meno umidità, ottimo per immersioni e vela. Popolare — prenota in anticipo.",
          items: ["Ideale per le immersioni", "Tariffe di punta nei resort", "Festival ed eventi"],
        },
        {
          title: "Stagione umida (nov–apr)",
          body: "Più caldo, con piogge pomeridiane. Interni verdi, spiagge più tranquille e buone offerte.",
          items: ["Tariffe più basse", "Cascate rigogliose", "Acqua calda"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare il periodo migliore per visitare le Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    "weather-guide": {
      title: "Meteo e Clima",
      excerpt: "Comprendere le stagioni tropicali delle Figi.",
      category: "Pianificazione",
      overview:
        "Le Figi si trovano nella fascia dei venti alisei del Pacifico meridionale — calde, umide e benedette dal sole per la maggior parte dell'anno.",
      sections: [
        {
          title: "Differenze regionali",
          body: "L'ovest (Denarau, Mamanuca) è più secco di Suva e Taveuni. Pianifica l'island hopping considerando i microclimi.",
          items: ["Costa occidentale più secca", "Suva più umida", "Stagione dei cicloni nov–apr"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare meteo e clima alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    "luxury-travel": {
      title: "Guida al Viaggio di Lusso",
      excerpt: "Resort esclusivi ed esperienze curate.",
      category: "Stile",
      overview:
        "Il segmento di lusso delle Figi rivaleggia con qualsiasi destinazione del Pacifico meridionale — isole private, bure sull'acqua, maggiordomi personali e transfer in elicottero come standard.",
      sections: [
        {
          title: "Dove alloggiare",
          body: "Likuliku Lagoon, Turtle Island, Vomo Island e Kokomo Private Island rappresentano il vertice assoluto.",
          items: ["Bure sull'acqua", "Isole private", "Opzioni all-inclusive"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare un viaggio di lusso alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    honeymoon: {
      title: "Guida alla Luna di Miele",
      excerpt: "Fughe romantiche per coppie.",
      category: "Stile",
      overview:
        "Le Figi sono l'indirizzo più romantico del Pacifico meridionale — cene private su banchi di sabbia, rituali spa per coppie e ritiri su isole riservate agli adulti.",
      sections: [
        {
          title: "Principali esperienze romantiche",
          body: "Vela al tramonto, picnic su isole private e cene sull'acqua definiscono la luna di miele alle Figi.",
          items: ["Soggiorno su isola privata", "Spa per coppie", "Crociera al tramonto"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare la luna di miele alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    "family-travel": {
      title: "Guida al Viaggio in Famiglia",
      excerpt: "Le Figi con i bambini — paradiso senza stress.",
      category: "Stile",
      overview:
        "La cultura fijiana celebra i bambini. Kids club, lagune poco profonde e ville familiari in stile bure rendono le Figi ideali per viaggi multigenerazionali.",
      sections: [
        {
          title: "Resort per famiglie",
          body: "I resort di Denarau e Coral Coast eccellono nei programmi per bambini mentre i genitori si concedono il tempo spa.",
          items: ["Kids club", "Lagune poco profonde", "Camere comunicanti"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare un viaggio in famiglia alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    adventure: {
      title: "Guida all'Avventura",
      excerpt: "Adrenalina ed esplorazione.",
      category: "Stile",
      overview:
        "Dalle immersioni con squali nella Beqa Lagoon alle escursioni alle cascate a Taveuni, le Figi offrono avventura di classe mondiale senza rinunciare al lusso.",
      sections: [
        {
          title: "Avventure imperdibili",
          body: "Immersioni con squali, rafting, zip-line e charter per il surf sono tra i migliori del Pacifico.",
          items: ["Immersione con squali", "Rafting", "Escursioni alle cascate"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare avventure alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    wellness: {
      title: "Guida al Benessere",
      excerpt: "Rigenera corpo e mente in paradiso.",
      category: "Stile",
      overview:
        "Yoga fronte oceano, massaggio tradizionale Bobo e ritiri di disintossicazione digitale fanno delle Figi una destinazione benessere in crescita.",
      sections: [
        {
          title: "Rituali di benessere",
          body: "Combina trattamenti spa con forest bathing e meditazione sulla barriera per un rinnovamento olistico.",
          items: ["Spa fronte oceano", "Ritiri yoga", "Programmi detox"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare il benessere alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    culture: {
      title: "Guida alla Cultura",
      excerpt: "Tradizioni fijiane autentiche.",
      category: "Stile",
      overview:
        "La cultura fijiana è viva e generosa — visite ai villaggi, danza meke e cerimonie del kava offrono connessione autentica oltre i muri del resort.",
      sections: [
        {
          title: "Esperienze culturali",
          body: "Visita sempre con una guida che mantiene rapporti con il villaggio e garantisce una partecipazione rispettosa.",
          items: ["Tour del villaggio", "Spettacolo meke", "Laboratori artigianali"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare esperienze culturali alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    "food-drink": {
      title: "Guida a Cibo e Bevande",
      excerpt: "Cosa mangiare e bere alle Figi.",
      category: "Stile",
      overview:
        "La cucina fijiana unisce sapori insulari a influenze indiane e cinesi — dalle feste lovo cotte sottoterra ai menu degustazione dei resort più raffinati.",
      sections: [
        {
          title: "Da provare assolutamente",
          body: "Kokoda, lovo, roti wrap e un lungo pranzo in un ottimo ristorante del resort.",
          items: ["Festa lovo", "Kokoda", "Degustazione al resort"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare cibo e bevande alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    transportation: {
      title: "Guida ai Trasporti",
      excerpt: "Voli, traghetti e spostamenti tra le isole.",
      category: "Pianificazione",
      overview:
        "Metà del divertimento è il viaggio — idrovolanti, motoscafi e voli domestici collegano le isole più velocemente di quanto pensi.",
      sections: [
        {
          title: "Viaggi inter-isola",
          body: "La marina di Denarau gestisce traghetti per Mamanuca e Yasawa. Gli idrovolanti raggiungono le destinazioni di lusso più remote.",
          items: ["Fiji Airways domestico", "Yasawa Flyer", "Transfer in idrovolante"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare i trasporti alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    "island-hopping": {
      title: "Guida all'Island Hopping",
      excerpt: "Come saltare da un'isola all'altra senza stress.",
      category: "Pianificazione",
      overview:
        "L'island hopping è ciò che le Figi fanno meglio. Tracciamo rotte attraverso Mamanuca, Yasawa e le tappe più tranquille — su misura per le tue date e il tuo budget.",
      sections: [
        {
          title: "Itinerari suggeriti",
          body: "Tre giorni a Mamanuca, una settimana a Yasawa o dieci giorni mescolando entrambe — tutto facile da personalizzare.",
          items: ["Express 3 giorni", "Explorer 7 giorni", "Ultimate 10 giorni"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare l'island hopping alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    diving: {
      title: "Guida alle Immersioni",
      excerpt: "Barriere, squali e siti subacquei di classe mondiale.",
      category: "Attività",
      overview:
        "Rainbow Reef, Beqa Lagoon e Great White Wall sono tra le immersioni migliori del pianeta.",
      sections: [
        {
          title: "Principali siti subacquei",
          body: "Immersione con squali a Beqa, Rainbow Reef e Namena — qualcosa per ogni livello.",
          items: ["Squali di Beqa", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare le immersioni alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    surfing: {
      title: "Guida al Surf",
      excerpt: "Le onde di cui tutti parlano.",
      category: "Attività",
      overview:
        "Cloudbreak, Restaurants e Frigates — onde serie, solitamente raggiunte in barca da Denarau o Mamanuca.",
      sections: [
        {
          title: "Principali spot",
          body: "Cloudbreak è la famosa sinistra delle Figi. Noleggia una barca da un resort vicino per sessioni all'alba.",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare il surf alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
    "travel-planning": {
      title: "Hub di Pianificazione del Viaggio",
      excerpt: "Il tuo centro per pianificare la fuga perfetta alle Figi.",
      category: "Pianificazione",
      overview:
        "Tutto ciò che serve in un unico posto — guide, strumenti, supporto concierge e creazione di itinerari su misura per viaggi di lusso alle Figi.",
      sections: [
        {
          title: "Inizia da qui",
          body: "Dicci date, stile e budget — il nostro concierge crea un itinerario su misura entro 24 ore.",
          items: ["Consulenza gratuita", "Itinerario personalizzato", "Garanzia del miglior prezzo"],
        },
      ],
      faqs: [
        {
          question: "Con quanto anticipo devo pianificare il mio viaggio alle Figi?",
          answer:
            "I resort di lusso si riempiono rapidamente in alta stagione (giugno–settembre). Prenota con 3–6 mesi di anticipo, se possibile — spesso troviamo ancora disponibilità presso partner dell'ultimo minuto.",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "Spiagge dorate e cultura fijiana autentica",
      overview:
        "La Coral Coast si estende lungo la costa meridionale di Viti Levu — una striscia di spiagge con palme, resort di lusso e villaggi tradizionali dove cerimonie di camminata sul fuoco e rituali del kava plasmano ancora la vita quotidiana.",
      highlights: ["Dune di Sigatoka", "Cerimonie nei villaggi", "Resort di lusso sulla spiaggia"],
      thingsToDo: ["Tour nei villaggi", "Safari fluviali", "Golf su campi da campionato", "Ritiri spa"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "Ville private sulla spiaggia"],
      tours: ["Giornata di immersione culturale", "Volo in elicottero costiero", "Crociera al tramonto in dhow"],
      beaches: ["Spiaggia di Natadola", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["Fine dining fronte mare", "Feste lovo", "Menu degustazione del resort"],
      transport: ["Aeroporto di Nadi 1h", "Transfer privati del resort", "Strada costiera panoramica"],
      culture: ["Spettacoli meke", "Villaggi di ceramica", "Mercati artigianali tradizionali"],
      weather: "Caldo tutto l'anno. Stagione secca mag–ott (26–30°C). Stagione umida nov–apr con piogge pomeridiane.",
      faqs: [
        {
          question: "Qual è il periodo migliore per visitare la Coral Coast?",
          answer:
            "Da maggio a ottobre offre tempo secco e soleggiato, ideale per spiagge e attività acquatiche. Da novembre ad aprile fa più caldo, con paesaggi rigogliosi e meno folla nei resort di lusso.",
        },
        {
          question: "Come si arriva alla Coral Coast?",
          answer:
            "I voli internazionali arrivano all'aeroporto internazionale di Nadi. Transfer privati, idrovolanti e barche del resort ti collegano alla destinazione finale in poche ore.",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "Porta d'accesso alle Isole Figi",
      overview:
        "Nadi è il tuo punto di arrivo in paradiso — un hub vivace che collega i viaggiatori internazionali alle isole Mamanuca e Yasawa, alla marina di Denarau e all'entroterra montuoso delle Figi.",
      highlights: ["Tempio Sri Siva Subramaniya", "Giardino del Gigante Addormentato", "Marina di Denarau"],
      thingsToDo: ["Escursioni giornaliere alle isole", "Visite ai templi", "Tour dei mercati", "Golf"],
      placesToStay: ["Resort di Denarau", "Hotel boutique a Nadi", "Alloggi di transito aeroporto"],
      tours: ["Crociera giornaliera a Mamanuca", "Pozze di fango e sorgenti di Sabeto", "Tour del villaggio montano"],
      beaches: ["Spiaggia di Denarau", "Spiaggia di Wailoaloa"],
      dining: ["Fusion indo-fijiana", "Ristoranti del resort", "Prodotti del mercato locale"],
      transport: ["Aeroporto internazionale di Nadi", "Terminal traghetti Denarau", "Transfer in elicottero"],
      culture: ["Architettura dei templi indu", "Mercati multiculturali", "Centri artigianali fijiani"],
      weather: "Tropicale e umido. Migliore visibilità per i salti tra isole mag–ott.",
      faqs: [
        {
          question: "Qual è il periodo migliore per visitare Nadi?",
          answer:
            "Da maggio a ottobre offre tempo secco e soleggiato, ideale per spiagge e attività acquatiche. Da novembre ad aprile fa più caldo, con paesaggi rigogliosi e meno folla nei resort di lusso.",
        },
        {
          question: "Come si arriva a Nadi?",
          answer:
            "I voli internazionali arrivano all'aeroporto internazionale di Nadi. Transfer privati, idrovolanti e barche del resort ti collegano alla destinazione finale in poche ore.",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "Marina di lusso e resort di classe mondiale",
      overview:
        "L'isola Denarau è l'indirizzo di lusso più prestigioso delle Figi — un enclave recintato di resort a cinque stelle, golf da campionato, fine dining e principale punto di partenza per crociere alle isole Mamanuca e Yasawa.",
      highlights: ["Port Denarau Marina", "Golf da campionato", "Shopping di lusso"],
      thingsToDo: ["Crociere al tramonto", "Safari in jet ski", "Rituali spa", "Island hopping"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "Residenze private"],
      tours: ["Charter di yacht privato", "Tour in elicottero delle isole", "Pacchetti golf e spa"],
      beaches: ["Spiaggia di Denarau", "Piscine laguna del resort"],
      dining: ["Ports O' Call", "Ristorante Nuku", "Ristorazione al beach club"],
      transport: ["10 min dall'aeroporto di Nadi", "Traghetti dalla marina", "Servizio auto privato"],
      culture: ["Serate meke nei resort", "Mercati artigianali", "Corsi di cucina fijiana"],
      weather: "Costa occidentale riparata — più secca di Suva. Ideale maggio–ottobre.",
      faqs: [
        {
          question: "Qual è il periodo migliore per visitare Denarau?",
          answer:
            "Da maggio a ottobre offre tempo secco e soleggiato, ideale per spiagge e attività acquatiche. Da novembre ad aprile fa più caldo, con paesaggi rigogliosi e meno folla nei resort di lusso.",
        },
        {
          question: "Come si arriva a Denarau?",
          answer:
            "I voli internazionali arrivano all'aeroporto internazionale di Nadi. Transfer privati, idrovolanti e barche del resort ti collegano alla destinazione finale in poche ore.",
        },
      ],
    },
    mamanuca: {
      title: "Isole Mamanuca",
      tagline: "Paradiso da naufrago e lagune cristalline",
      overview:
        "L'arcipelago Mamanuca è la catena di isole più iconica delle Figi — lagune turchesi, lusso a piedi nudi e location di innumerevoli sogni tropicali, raggiungibile in idrovolante o motoscafi da Denarau.",
      highlights: ["Castaway Island", "Bar galleggiante Cloud 9", "Snorkeling di classe mondiale"],
      thingsToDo: ["Snorkeling", "Surf a Cloudbreak", "Kayak", "Picnic privati"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["Safari snorkeling", "Vela al tramonto", "Immersione di scoperta"],
      beaches: ["Spiaggia di Monuriki", "Isola Modriki", "Spiagge private del resort"],
      dining: ["Cena sull'acqua", "BBQ in spiaggia", "Esperienze al bar galleggiante"],
      transport: ["Motoscafi da Denarau", "Transfer in idrovolante", "Barche private del resort"],
      culture: ["Serate culturali nei resort", "Visite ai villaggi nelle isole vicine"],
      weather: "Rinfrescato dai venti alisei. Stagione secca perfetta per la chiarezza dell'acqua.",
      faqs: [
        {
          question: "Qual è il periodo migliore per visitare le Isole Mamanuca?",
          answer:
            "Da maggio a ottobre offre tempo secco e soleggiato, ideale per spiagge e attività acquatiche. Da novembre ad aprile fa più caldo, con paesaggi rigogliosi e meno folla nei resort di lusso.",
        },
        {
          question: "Come si arriva alle Isole Mamanuca?",
          answer:
            "I voli internazionali arrivano all'aeroporto internazionale di Nadi. Transfer privati, idrovolanti e barche del resort ti collegano alla destinazione finale in poche ore.",
        },
      ],
    },
    yasawa: {
      title: "Isole Yasawa",
      tagline: "Isole remote e bellezza incontaminata",
      overview:
        "L'arcipelago Yasawa offre le Figi nella loro forma più cruda e romantica — picchi vulcanici drammatici, grotte blue hole, spiagge deserte e alcuni dei ritiri eco-lusso più esclusivi del Pacifico meridionale.",
      highlights: ["Grotte Sawa-i-Lau", "Blue Lagoon", "Lodge di lusso remoti"],
      thingsToDo: ["Nuoto nelle grotte", "Soggiorni in famiglia nei villaggi", "Escursionismo", "Immersioni"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "Lodge di lusso a piedi nudi"],
      tours: ["Gita giornaliera al Blue Lagoon", "Spedizione alle grotte", "Vela multi-isola"],
      beaches: ["Octopus Beach", "Nanuya Levu", "Calette private del resort"],
      dining: ["Feste in spiaggia", "Degustazione al resort", "BBQ del pescato del giorno"],
      transport: ["Traghetto Yasawa Flyer", "Idrovolante", "Yacht privato"],
      culture: ["Visite ai villaggi remoti", "Pesca tradizionale", "Serate di racconti"],
      weather: "Più secco del continente. Migliore visibilità giu–set.",
      faqs: [
        {
          question: "Qual è il periodo migliore per visitare le Isole Yasawa?",
          answer:
            "Da maggio a ottobre offre tempo secco e soleggiato, ideale per spiagge e attività acquatiche. Da novembre ad aprile fa più caldo, con paesaggi rigogliosi e meno folla nei resort di lusso.",
        },
        {
          question: "Come si arriva alle Isole Yasawa?",
          answer:
            "I voli internazionali arrivano all'aeroporto internazionale di Nadi. Transfer privati, idrovolanti e barche del resort ti collegano alla destinazione finale in poche ore.",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "Isola Giardino e terra delle cascate",
      overview:
        "Conosciuta come l'Isola Giardino, Taveuni è un paradiso ricco di patrimonio UNESCO di foresta pluviale, cascate e siti subacquei famosi — ideale per avventurieri e coppie in cerca di natura oltre il circuito dei resort.",
      highlights: ["Parco Nazionale Bouma", "Immersioni al Rainbow Reef", "Cascate Tavoro"],
      thingsToDo: ["Escursioni alle cascate", "Immersioni subacquee", "Birdwatching", "Kayak"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "Eco-lodge"],
      tours: ["Trek alle Cascate Bouma", "Immersione al Rainbow Reef", "Passeggiata Costiera Lavena"],
      beaches: ["Spiaggia di Lavena", "Spiaggia di Matei", "Calette nascoste"],
      dining: ["Ristorazione in stile plantation", "Prodotti tropicali freschi", "Menu fusion del resort"],
      transport: ["Volo domestico da Nadi/Suva", "Transfer del resort", "Charter in barca"],
      culture: ["Villaggio Wainibau", "Piantagioni tradizionali di taro", "Artigianato locale"],
      weather: "Regione più umida — rigogliosa tutto l'anno. Immersioni migliori apr–ott.",
      faqs: [
        {
          question: "Qual è il periodo migliore per visitare Taveuni?",
          answer:
            "Da maggio a ottobre offre tempo secco e soleggiato, ideale per spiagge e attività acquatiche. Da novembre ad aprile fa più caldo, con paesaggi rigogliosi e meno folla nei resort di lusso.",
        },
        {
          question: "Come si arriva a Taveuni?",
          answer:
            "I voli internazionali arrivano all'aeroporto internazionale di Nadi. Transfer privati, idrovolanti e barche del resort ti collegano alla destinazione finale in poche ore.",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "Capitale dell'avventura alle Figi",
      overview:
        "Pacific Harbour è l'indirizzo dell'adrenalina alle Figi — immersioni con squali nella Beqa Lagoon, rafting, zip-line e ville di lusso con vista sul Pacifico, tutto a portata di Suva.",
      highlights: ["Immersioni con squali", "Rafting", "Zip Fiji"],
      thingsToDo: ["Immersione con alimentazione squali", "Rafting sull'Upper Navua", "Golf", "Pesca d'altura"],
      placesToStay: ["The Pearl South Pacific", "Ville di lusso", "Lodge boutique"],
      tours: ["Incontro con squali a Beqa", "Giornata di rafting fluviale", "Charter di pesca"],
      beaches: ["Natadola (vicina)", "Calette nascoste", "Spiagge del resort"],
      dining: ["Ristoranti della marina", "Fine dining del resort", "Frutti di mare locali"],
      transport: ["2,5h da Nadi", "45 min da Suva", "Elicottero disponibile"],
      culture: ["Camminata sul fuoco a Beqa", "Spettacoli nei villaggi", "Mercati artigianali"],
      weather: "Leggermente più umido della costa occidentale. Sport d'avventura tutto l'anno.",
      faqs: [
        {
          question: "Qual è il periodo migliore per visitare Pacific Harbour?",
          answer:
            "Da maggio a ottobre offre tempo secco e soleggiato, ideale per spiagge e attività acquatiche. Da novembre ad aprile fa più caldo, con paesaggi rigogliosi e meno folla nei resort di lusso.",
        },
        {
          question: "Come si arriva a Pacific Harbour?",
          answer:
            "I voli internazionali arrivano all'aeroporto internazionale di Nadi. Transfer privati, idrovolanti e barche del resort ti collegano alla destinazione finale in poche ore.",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "Capitale della cultura e del commercio",
      overview:
        "Suva è il cuore pulsante delle Figi moderne — architettura coloniale, mercati vivaci, musei e una scena gastronomica in crescita, perfetta per chi vuole cultura prima della spiaggia.",
      highlights: ["Museo delle Figi", "Mercato Municipale", "Parlamento e Thurston Gardens"],
      thingsToDo: ["Tour dei mercati", "Visite ai musei", "Passeggiate coloniali", "Vita notturna"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "Hotel boutique in città"],
      tours: ["Passeggiata patrimoniale in città", "Nuoto nella foresta Colo-i-Suva", "Gita giornaliera nell'entroterra"],
      beaches: ["Nessuna spiaggia in città — gite giornaliere a Pacific Harbour"],
      dining: ["Fine dining", "Street food indiana", "Mercati del pesce"],
      transport: ["Aeroporto internazionale di Nausori", "Autobus per Coral Coast", "Voli domestici"],
      culture: ["Patrimonio fijiano, indiano e cinese", "Musica dal vivo", "Gallerie d'arte"],
      weather: "Città principale più umida. Porta equipaggiamento leggero per la pioggia tutto l'anno.",
      faqs: [
        {
          question: "Qual è il periodo migliore per visitare Suva?",
          answer:
            "Da maggio a ottobre offre tempo secco e soleggiato, ideale per spiagge e attività acquatiche. Da novembre ad aprile fa più caldo, con paesaggi rigogliosi e meno folla nei resort di lusso.",
        },
        {
          question: "Come si arriva a Suva?",
          answer:
            "I voli internazionali arrivano all'aeroporto internazionale di Nadi. Transfer privati, idrovolanti e barche del resort ti collegano alla destinazione finale in poche ore.",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "Snorkeling in Acque Cristalline",
      category: "Acqua",
      duration: "Mezza giornata",
      ages: "Tutte le età",
      overview:
        "Scivola su giardini di corallo arcobaleno nelle lagune più limpide di Mamanuca con guida privata, attrezzatura premium e picnic con champagne su un banco di sabbia deserta.",
      highlights: ["Guida privata", "Attrezzatura snorkeling premium", "Picnic con champagne", "Briefing con biologo marino"],
      included: ["Transfer in barca andata e ritorno", "Attrezzatura snorkeling", "Rinfreschi", "Tasse del parco marino"],
      itinerary: ["Partenza dalla marina di Denarau", "Due siti snorkeling", "Picnic sul banco di sabbia", "Ritorno al tramonto"],
      faqs: [
        { question: "Serve esperienza?", answer: "No — adatto ai principianti con capacità di nuoto di base." },
        { question: "Cosa portare?", answer: "Crema solare reef-safe, costume da bagno e un leggero copricostume." },
      ],
    },
    "sunset-cruises": {
      title: "Crociere al Tramonto",
      category: "Vela",
      duration: "2–3 ore",
      ages: "Tutte le età",
      overview:
        "Naviga verso un tramonto dorato sul Pacifico a bordo di un catamarano di lusso con canapé, drink premium e chitarra fijiana dal vivo mentre le silhouette di Mamanuca svaniscono nel crepuscolo.",
      highlights: ["Catamarano di lusso", "Canapé e drink", "Musica dal vivo", "Viste a 360° del tramonto"],
      included: ["Drink di benvenuto", "Selezione di canapé", "Opzione transfer di ritorno"],
      itinerary: ["Imbarco in marina", "Navigazione costiera", "Brindisi al tramonto", "Ritorno sotto le stelle"],
      faqs: [
        { question: "Dipende dal meteo?", answer: "Le crociere operano nella maggior parte delle condizioni; rimborso completo se annullate per sicurezza." },
      ],
    },
    "hiking-waterfalls": {
      title: "Escursioni e Cascate",
      category: "Avventura",
      duration: "Giornata intera",
      ages: "16+",
      overview:
        "Percorri il Parco Nazionale Bouma fino a cascate nascoste, nuota in piscine smeraldo e pranza con frutta tropicale nella foresta pluviale incontaminata dell'Isola Giardino.",
      highlights: ["Guida locale esperta", "Tre soste per nuotare alle cascate", "Ecologia della foresta pluviale", "Pranzo farm-to-table"],
      included: ["Tasse del parco", "Guida", "Pranzo", "Transfer dal resort"],
      itinerary: ["Trek mattutino nella foresta", "Nuoto alle cascate", "Pranzo nel villaggio", "Ritorno pomeridiano"],
      faqs: [
        { question: "Livello di forma fisica?", answer: "Moderato — 4–5 ore su sentieri irregolari con tratti ripidi." },
      ],
    },
    "village-tours": {
      title: "Tour nei Villaggi",
      category: "Cultura",
      duration: "Mezza giornata",
      ages: "Tutte le età",
      overview:
        "Vivi l'autentica ospitalità fijiana — cerimonia del kava, danza meke, dimostrazioni artigianali e festa lovo tradizionale preparata dalla famiglia del capo del villaggio.",
      highlights: ["Cerimonia del kava", "Spettacolo meke", "Festa lovo", "Laboratorio artigianale"],
      included: ["Donazione al villaggio", "Partecipazione alla cerimonia", "Pranzo tradizionale", "Trasporto"],
      itinerary: ["Benvenuto nel villaggio", "Kava e meke", "Dimostrazione artigianale", "Pranzo lovo"],
      faqs: [
        { question: "Cosa indossare?", answer: "Abbigliamento modesto che copra spalle e ginocchia. Togli il cappello nel villaggio." },
      ],
    },
    "island-hopping": {
      title: "Avventura di Island Hopping",
      category: "Multi-giorno",
      duration: "3–7 giorni",
      ages: "Tutte le età",
      overview:
        "Viaggio curato tra più isole in motoscafi privato o idrovolante — resort boutique, spiagge nascoste ed esperienze su misura definite dal tuo concierge.",
      highlights: ["Transfer privati", "Soggiorni in resort boutique", "Itinerario flessibile", "Concierge dedicato"],
      included: ["Transfer inter-isola", "Coordinamento resort", "Colazione giornaliera", "Supporto concierge"],
      itinerary: ["Giorno 1: arrivo a Mamanuca", "Giorni 2–3: esplorazione Yasawa", "Giorno 4+: estensioni personalizzate"],
      faqs: [
        { question: "Posso personalizzare?", answer: "Ogni island hop è su misura — il tuo concierge progetta l'itinerario con te." },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Pacchetto Resort Isola Denarau",
      description: "Suite con vista oceano per cinque notti, transfer privati aeroporto, colazione giornaliera e accesso alla marina.",
      includes: ["Transfer privato", "Suite con vista oceano", "Colazione giornaliera"],
    },
    "romantic-honeymoon-escape": {
      title: "Fuga Romantica di Luna di Miele",
      description: "Ritiro per coppie con cena privata su banco di sabbia, rituale spa per coppie e vela al tramonto.",
      includes: ["Cena privata", "Spa per coppie", "Crociera al tramonto"],
    },
    "mamanuca-island-escape": {
      title: "Fuga alle Isole Mamanuca",
      description: "Pacchetto fly-and-flop — transfer in idrovolante andata e ritorno, pranzo sull'acqua e attrezzatura snorkeling.",
      includes: ["Transfer in idrovolante", "Credito resort", "Noleggio snorkeling"],
    },
    "family-coral-coast-package": {
      title: "Pacchetto Famiglia Coral Coast",
      description: "Bure comunicanti, accesso al kids club e attività sulla Spiaggia di Natadola per tutta la famiglia.",
      includes: ["Kids club", "Bure familiare", "Attività in spiaggia"],
    },
    "private-island-buyout": {
      title: "Acquisto Esclusivo Isola Privata",
      description: "Uso esclusivo di un'isola Mamanuca — fino a 12 ospiti, chef, barca e team di maggiordomi inclusi.",
      includes: ["Isola esclusiva", "Chef privato", "Charter in barca"],
    },
    "stay-and-play-nadi": {
      title: "Pacchetto Soggiorna e Esplora Nadi",
      description: "Soggiorno al resort con escursioni giornaliere curate — visita al villaggio, pozze di fango e picnic sull'isola.",
      includes: ["Soggiorno al resort", "2 escursioni giornaliere", "Tutti i transfer"],
    },
    "luxury-overwater-bure": {
      title: "Soggiorno in Bure di Lusso sull'Acqua",
      description: "Dormi sopra acque cristalline — deck privato, servizio maggiordomo e cena nel bure.",
      includes: ["Bure sull'acqua", "Servizio maggiordomo", "Cena nel bure"],
    },
    "coral-coast-beach-escape": {
      title: "Fuga Spiaggia Coral Coast",
      description: "Resort sulla Spiaggia di Natadola con credito spa FJD 200 e cena degustazione curata.",
      includes: ["Camera fronte mare", "Credito spa", "Cena degustazione"],
    },
    "wellness-spa-retreat": {
      title: "Ritiro Benessere e Spa",
      description: "Yoga fronte oceano, massaggio tradizionale Bobo e ristorazione biologica farm-to-table.",
      includes: ["Yoga giornaliero", "Rituale spa", "Ristorazione wellness"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description: "Gli unici bure sull'acqua delle Figi — santuario riservato agli adulti con ristorazione all-inclusive.",
      includes: ["Bure sull'acqua", "All-inclusive", "Solo adulti"],
    },
    "mamanuca-island-hopping": {
      title: "Island Hopping Mamanuca",
      description: "Motoscafi privato, snorkeling sulla barriera e picnic con champagne su banco di sabbia deserta.",
      includes: ["Barca privata", "Snorkeling", "Picnic con champagne"],
    },
    "yasawa-adventure-package": {
      title: "Pacchetto Avventura Yasawa",
      description: "Escursioni guidate a cascate nascoste, kayak marino e cerimonia del kava nel villaggio.",
      includes: ["Escursione alle cascate", "Kayak", "Visita al villaggio"],
    },
    "beqa-shark-dive": {
      title: "Immersione con Squali Beqa Lagoon",
      description: "Famosa avventura con squali con attrezzatura, guida e transfer dal resort da Pacific Harbour.",
      includes: ["Immersione con squali", "Attrezzatura", "Transfer"],
    },
    "sunset-cruise-denarau": {
      title: "Crociera Privata al Tramonto",
      description: "Vela con champagne dalla Marina di Denarau — canapé, musica dal vivo e viste dell'ora dorata.",
      includes: ["Charter privato", "Canapé", "Champagne"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "L'unico resort delle Figi con bure sull'acqua, Likuliku unisce intimità riservata agli adulti a ristorazione di classe mondiale e una laguna che brilla al tramonto.",
      amenities: ["Bure sull'acqua", "Solo adulti", "Spa", "Spiaggia privata", "Fine dining"],
      experiences: ["Snorkeling", "Crociera al tramonto", "Rituali spa"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "Un'intima isola di 36 bure dove il lusso a piedi nudi incontra il calore fijiano — perfetta per lune di miele e celebrazioni speciali.",
      amenities: ["Bure fronte mare", "Spa", "Centro immersioni", "Cena privata"],
      experiences: ["Immersioni", "Picnic sull'isola", "Visita al villaggio"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "Il lusso familiare di riferimento a Denarau — piscine ampie, vicinanza a campi da campionato e accesso fluido alla marina per avventure sulle isole.",
      amenities: ["Piscine multiple", "Kids club", "Spa", "Accesso marina", "7 ristoranti"],
      experiences: ["Island hopping", "Golf", "Crociera al tramonto"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Lusso dal tocco francese sulla migliore spiaggia di Denarau — colazioni galleggianti, accesso alla barriera e la filosofia spa signature Sofitel.",
      amenities: ["Fronte mare", "Spa", "Snorkeling sulla barriera", "Kids club"],
      experiences: ["Snorkeling sulla barriera", "Giornata spa", "Serata culturale"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "Il gioiello della corona della Spiaggia di Natadola — golf da campionato, sabbie leggendarie di Natadola e cultura del villaggio a portata di mano.",
      amenities: ["Spiaggia di Natadola", "Campo da golf", "Spa", "Kids club", "Centro culturale"],
      experiences: ["Tour del villaggio", "Golf", "Equitazione in spiaggia"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "L'isola che ha definito le Figi per una generazione — family-friendly, circondata da barriere e autenticamente rilassata.",
      amenities: ["Isola privata", "Centro PADI", "Kids club", "Spiagge multiple"],
      experiences: ["Snorkeling", "Kayak", "Visita al villaggio"],
    },
  },
};
