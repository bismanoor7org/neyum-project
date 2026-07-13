import type { LocaleContentPack } from "../types";

export const dePack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "Planung",
    Style: "Reisestil",
    Activities: "Aktivitäten",
  },
  guides: {
    "first-time-fiji": {
      title: "Erstes Mal Fidschi",
      excerpt: "Alles, was Sie für Ihre erste Fidschi-Reise brauchen.",
      category: "Planung",
      overview:
        "Fidschi ist ein brillantes Erstes — einfache Einreise, herzliche Menschen und 333 Inseln zu entdecken. Die meisten Besucher benötigen kein Visum für bis zu vier Monate.",
      sections: [
        {
          title: "Vor dem Abflug",
          body: "Stellen Sie sicher, dass Ihr Reisepass noch sechs Monate über die Reise hinaus gültig ist. Schließen Sie eine umfassende Reiseversicherung ab und laden Sie Offline-Karten für abgelegene Inseln herunter.",
          items: ["Passgültigkeit", "Reiseversicherung", "Währung (FJD)", "Zurückhaltende Kleidung fürs Dorf"],
        },
        {
          title: "Ankunft & Zoll",
          body: "Der internationale Flughafen Nadi ist modern und effizient. Organisieren Sie private Transfers im Voraus, um Warteschlangen zu vermeiden und sofort zu entspannen.",
          items: ["Privater Transfer", "SIM-Karte am Flughafen", "Resort-Meet & Greet"],
        },
        {
          title: "Inseletikette",
          body: "Fidschianer gehören zu den gastfreundlichsten Menschen der Welt. Ein freundliches 'Bula!' kommt weit. Nehmen Sie in Dörfern den Hut ab und nehmen Sie Kava immer an, wenn es angeboten wird.",
          items: ["Kleiderordnung im Dorf", "Kava-Zeremonie", "Einwilligung zur Fotografie"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich mein erstes Mal Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    "visa-guide": {
      title: "Visum & Einreisebestimmungen",
      excerpt: "Reisepässe, Visa und Einreise — einfach erklärt.",
      category: "Planung",
      overview:
        "Die meisten Reisenden müssen kein Visum vor dem Flug nach Fidschi beantragen. Achten Sie nur darauf, dass Reisepass und Rückflugticket den Anforderungen der Einreisebehörde entsprechen.",
      sections: [
        {
          title: "Visafreie Einreise",
          body: "Staatsangehörige der meisten Länder erhalten eine Besuchserlaubnis für bis zu vier Monate.",
          items: ["Gültiger Pass 6+ Monate", "Rückflugticket", "Unterkunftsnachweis"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich Visum und Einreise planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    "best-time-to-visit": {
      title: "Beste Reisezeit für Fidschi",
      excerpt: "Wetter, Jahreszeiten und wann wir wirklich hinfahren.",
      category: "Planung",
      overview:
        "Fidschi ist das ganze Jahr warm. Die Trockenzeit (Mai–Okt.) bedeutet klareren Himmel und volle Resorts; die Regenzeit (Nov.–Apr.) bringt üppige Landschaften, weniger Andrang und günstigere Preise.",
      sections: [
        {
          title: "Trockenzeit (Mai–Okt.)",
          body: "Weniger Feuchtigkeit, ideal zum Tauchen und Segeln. Beliebt — früh buchen.",
          items: ["Ideal zum Tauchen", "Hochsaisonpreise", "Festivals & Events"],
        },
        {
          title: "Regenzeit (Nov.–Apr.)",
          body: "Wärmer mit Nachmittagsschauern. Grünes Inland, ruhigere Strände, gute Angebote.",
          items: ["Niedrigere Preise", "Üppige Wasserfälle", "Warmes Wasser"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich die beste Reisezeit für Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    "weather-guide": {
      title: "Wetter & Klima",
      excerpt: "Fidschis tropische Jahreszeiten verstehen.",
      category: "Planung",
      overview:
        "Fidschi liegt im Passatgürtel des Südpazifiks — warm, feucht und das meiste Jahr über sonnenverwöhnt.",
      sections: [
        {
          title: "Regionale Unterschiede",
          body: "Der Westen (Denarau, Mamanuca) ist trockener als Suva und Taveuni. Planen Sie Inselhopping unter Berücksichtigung der Mikroklimata.",
          items: ["Westküste trockener", "Suva feuchter", "Zyklonsaison Nov.–Apr."],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich Wetter und Klima in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    "luxury-travel": {
      title: "Luxusreise-Guide",
      excerpt: "Exklusive Resorts und kuratierte Erlebnisse.",
      category: "Reisestil",
      overview:
        "Fidschis Luxussegment rivalisiert mit jedem Ziel im Südpazifik — Privatinseln, Overwater-Bures, persönliche Butler und Helikoptertransfers als Standard.",
      sections: [
        {
          title: "Wo übernachten",
          body: "Likuliku Lagoon, Turtle Island, Vomo Island und Kokomo Private Island repräsentieren den Gipfel.",
          items: ["Overwater-Bures", "Privatinseln", "All-inclusive-Optionen"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich eine Luxusreise nach Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    honeymoon: {
      title: "Flitterwochen-Guide",
      excerpt: "Romantische Auszeiten für Paare.",
      category: "Reisestil",
      overview:
        "Fidschi ist die romantischste Adresse im Südpazifik — private Abendessen auf Sandbänken, Spa-Rituale für Paare und Inselretreats nur für Erwachsene.",
      sections: [
        {
          title: "Top romantische Erlebnisse",
          body: "Sonnenuntergangssegeln, private Inselpicknicks und Overwater-Dining prägen die Fidschi-Flitterwochen.",
          items: ["Aufenthalt auf Privatinsel", "Paar-Spa", "Sonnenuntergangskreuzfahrt"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich meine Flitterwochen in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    "family-travel": {
      title: "Familienreise-Guide",
      excerpt: "Fidschi mit Kindern — stressfreies Paradies.",
      category: "Reisestil",
      overview:
        "Die fidschianische Kultur feiert Kinder. Kids' Clubs, flache Lagunen und Familienvillen im Bure-Stil machen Fidschi ideal für mehrgenerationen Reisen.",
      sections: [
        {
          title: "Familienfreundliche Resorts",
          body: "Resorts in Denarau und an der Coral Coast bieten hervorragende Kinderprogramme, während Eltern Spa-Zeit genießen.",
          items: ["Kids' Clubs", "Flache Lagunen", "Verbindungszimmer"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich eine Familienreise nach Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    adventure: {
      title: "Abenteuer-Guide",
      excerpt: "Adrenalin und Entdeckung.",
      category: "Reisestil",
      overview:
        "Vom Hai-Tauchen in der Beqa-Lagune bis zu Wasserfall-Wanderungen auf Taveuni — Fidschi bietet Abenteuer auf Weltklasse-Niveau ohne Luxusverzicht.",
      sections: [
        {
          title: "Must-do-Abenteuer",
          body: "Hai-Tauchen, Wildwasser-Rafting, Zip-Lining und Surf-Charter gehören zu den besten im Pazifik.",
          items: ["Hai-Tauchen", "Rafting", "Wasserfall-Wanderungen"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich ein Abenteuer in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    wellness: {
      title: "Wellness-Guide",
      excerpt: "Körper und Geist im Paradies erholen.",
      category: "Reisestil",
      overview:
        "Yoga am Meer, traditionelle Bobo-Massage und Digital-Detox-Retreats machen Fidschi zu einem aufstrebenden Wellness-Ziel.",
      sections: [
        {
          title: "Wellness-Rituale",
          body: "Kombinieren Sie Spa-Behandlungen mit Waldbaden und Riff-Meditation für ganzheitliche Erneuerung.",
          items: ["Spa am Meer", "Yoga-Retreats", "Detox-Programme"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich einen Wellness-Aufenthalt in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    culture: {
      title: "Kultur-Guide",
      excerpt: "Authentische fidschianische Traditionen.",
      category: "Reisestil",
      overview:
        "Die fidschianische Kultur ist lebendig und großzügig — Dorfbesuche, Meke-Tanz und Kava-Zeremonien bieten echte Verbindung jenseits der Resort-Mauern.",
      sections: [
        {
          title: "Kulturelle Erlebnisse",
          body: "Besuchen Sie immer mit einem Guide, der Dorfbeziehungen pflegt und respektvolle Teilnahme gewährleistet.",
          items: ["Dorf-Tour", "Meke-Aufführung", "Handwerks-Workshops"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich kulturelle Erlebnisse in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    "food-drink": {
      title: "Essen & Trinken Guide",
      excerpt: "Was man in Fidschi essen und trinken sollte.",
      category: "Reisestil",
      overview:
        "Fidschianische Küche verbindet Inselkochen mit indischen und chinesischen Aromen — von Lovo-Festen in der Erde bis zu anspruchsvollen Degustationsmenüs in Resorts.",
      sections: [
        {
          title: "Unbedingt probieren",
          body: "Kokoda, Lovo, Roti-Wraps und ein langes Mittagessen in einem guten Resort-Restaurant.",
          items: ["Lovo-Fest", "Kokoda", "Resort-Degustation"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich kulinarische Erlebnisse in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    transportation: {
      title: "Transport-Guide",
      excerpt: "Flüge, Fähren und Inselübergänge.",
      category: "Planung",
      overview:
        "Die Hälfte des Vergnügens ist die Reise — Wasserflugzeuge, Speedboote und Inlandsflüge verbinden die Inseln schneller als man denkt.",
      sections: [
        {
          title: "Inselübergreifende Reise",
          body: "Die Denarau Marina betreibt Fähren nach Mamanuca und Yasawa. Wasserflugzeuge erreichen abgelegene Luxus-Spots.",
          items: ["Fiji Airways Inland", "Yasawa Flyer", "Wasserflugzeug-Transfers"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich Transport in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    "island-hopping": {
      title: "Inselhopping-Guide",
      excerpt: "Von Insel zu Insel ohne Kopfschmerzen.",
      category: "Planung",
      overview:
        "Inselhopping ist Fidschis Stärke. Wir planen Routen durch Mamanuca, Yasawa und ruhigere Stopps — abgestimmt auf Ihre Termine und Ihr Budget.",
      sections: [
        {
          title: "Beispielrouten",
          body: "Drei Tage in Mamanuca, eine Woche in Yasawa oder zehn Tage mit beiden — alles leicht anpassbar.",
          items: ["3-Tage-Express", "7-Tage-Explorer", "10-Tage-Ultimate"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich Inselhopping in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    diving: {
      title: "Tauch-Guide",
      excerpt: "Riffe, Haie und Tauchplätze der Weltklasse.",
      category: "Aktivitäten",
      overview:
        "Rainbow Reef, Beqa Lagoon und Great White Wall gehören zu den besten Tauchplätzen der Welt.",
      sections: [
        {
          title: "Top-Tauchplätze",
          body: "Beqa-Hai-Tauchen, Rainbow Reef und Namena — für jedes Niveau.",
          items: ["Beqa-Haie", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich Tauchen in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    surfing: {
      title: "Surf-Guide",
      excerpt: "Die Breaks, über die alle sprechen.",
      category: "Aktivitäten",
      overview:
        "Cloudbreak, Restaurants und Frigates — ernsthafte Wellen, meist per Boot von Denarau oder den Mamanucas erreichbar.",
      sections: [
        {
          title: "Top-Breaks",
          body: "Cloudbreak ist Fidschis berühmte Linkswelle. Chartern Sie ein Boot von einem nahegelegenen Resort für Sessions bei Tagesanbruch.",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich Surfen in Fidschi planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
    "travel-planning": {
      title: "Reiseplanungs-Hub",
      excerpt: "Ihr zentraler Hub für die perfekte Fidschi-Auszeit.",
      category: "Planung",
      overview:
        "Alles an einem Ort — Guides, Tools, Concierge-Support und maßgeschneiderte Reiseplanung für Luxusreisen nach Fidschi.",
      sections: [
        {
          title: "Hier starten",
          body: "Nennen Sie uns Ihre Termine, Ihren Stil und Ihr Budget — unser Concierge erstellt innerhalb von 24 Stunden eine maßgeschneiderte Reiseroute.",
          items: ["Kostenlose Beratung", "Maßgeschneiderte Reiseroute", "Bestpreisgarantie"],
        },
      ],
      faqs: [
        {
          question: "Wie weit im Voraus sollte ich meine Fidschi-Auszeit planen?",
          answer:
            "Luxusresorts sind in der Hochsaison (Juni–September) schnell ausgebucht. Buchen Sie wenn möglich 3–6 Monate im Voraus — oft finden wir auch kurzfristig noch Zimmer bei Partnerresorts.",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "Goldene Strände & authentische fidschianische Kultur",
      overview:
        "Die Coral Coast erstreckt sich entlang der Südküste von Viti Levu — ein Band aus palmenumsäumten Stränden, Luxusresorts und traditionellen Dörfern, in denen Feuerlauf-Zeremonien und Kava-Rituale noch den Alltag prägen.",
      highlights: ["Sigatoka Sanddünen", "Dorfzeremonien", "Luxus-Strandresorts"],
      thingsToDo: ["Dorf-Touren", "Flusssafaris", "Golf auf Meisterschaftsplätzen", "Spa-Retreats"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "Private Strandvillen"],
      tours: ["Kultureller Immersionstag", "Küsten-Helikopterflug", "Sonnenuntergangs-Dhow-Kreuzfahrt"],
      beaches: ["Natadola Beach", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["Strand-Fine-Dining", "Lovo-Feste", "Resort-Degustationsmenüs"],
      transport: ["Flughafen Nadi 1 Std.", "Private Resort-Transfers", "Panoramische Küstenfahrt"],
      culture: ["Meke-Aufführungen", "Töpferdörfer", "Traditionelle Handwerksmärkte"],
      weather: "Ganzjährig warm. Trockenzeit Mai–Okt. (26–30 °C). Regenzeit Nov.–Apr. mit Nachmittagsschauern.",
      faqs: [
        {
          question: "Wann ist die beste Reisezeit für die Coral Coast?",
          answer:
            "Mai bis Oktober bietet trockenes, sonniges Wetter, ideal für Strände und Wasseraktivitäten. November bis April ist wärmer mit üppigen Landschaften und weniger Andrang in Luxusresorts.",
        },
        {
          question: "Wie komme ich zur Coral Coast?",
          answer:
            "Internationale Flüge landen am internationalen Flughafen Nadi. Private Transfers, Wasserflugzeuge und Resort-Boote bringen Sie innerhalb weniger Stunden ans Ziel.",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "Tor zu den Fidschi-Inseln",
      overview:
        "Nadi ist Ihr Einstieg ins Paradies — ein lebendiges Drehkreuz, das internationale Reisende mit den Mamanuca- und Yasawa-Inseln, der Denarau Marina und Fidschis Hochland verbindet.",
      highlights: ["Sri Siva Subramaniya Tempel", "Garden of the Sleeping Giant", "Denarau Marina"],
      thingsToDo: ["Tagesausflüge auf Inseln", "Tempelbesuche", "Markttouren", "Golf"],
      placesToStay: ["Denarau-Resorts", "Boutique-Hotels in Nadi", "Flughafen-Transitunterkünfte"],
      tours: ["Mamanuca-Tageskreuzfahrt", "Sabeto Schlammbad & heiße Quellen", "Hochland-Dorf-Tour"],
      beaches: ["Denarau Beach", "Wailoaloa Beach"],
      dining: ["Indo-fidschianische Fusion", "Resort-Restaurants", "Produkte vom lokalen Markt"],
      transport: ["Internationaler Flughafen Nadi", "Denarau-Fährterminal", "Helikoptertransfers"],
      culture: ["Hindu-Tempelarchitektur", "Multikulturelle Märkte", "Fidschianische Handwerkszentren"],
      weather: "Tropisch und feucht. Beste Sicht für Inselhops Mai–Okt.",
      faqs: [
        {
          question: "Wann ist die beste Reisezeit für Nadi?",
          answer:
            "Mai bis Oktober bietet trockenes, sonniges Wetter, ideal für Strände und Wasseraktivitäten. November bis April ist wärmer mit üppigen Landschaften und weniger Andrang in Luxusresorts.",
        },
        {
          question: "Wie komme ich nach Nadi?",
          answer:
            "Internationale Flüge landen am internationalen Flughafen Nadi. Private Transfers, Wasserflugzeuge und Resort-Boote bringen Sie innerhalb weniger Stunden ans Ziel.",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "Luxus-Marina & Resorts der Weltklasse",
      overview:
        "Denarau Island ist Fidschis führende Luxusadresse — eine abgeschlossene Enklave aus Fünf-Sterne-Resorts, Meisterschaftsgolf, Fine Dining und Hauptabfahrtspunkt für Mamanuca- und Yasawa-Kreuzfahrten.",
      highlights: ["Port Denarau Marina", "Meisterschaftsgolf", "Luxus-Shopping"],
      thingsToDo: ["Sonnenuntergangskreuzfahrten", "Jet-Ski-Safaris", "Spa-Rituale", "Inselhopping"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "Private Residenzen"],
      tours: ["Private Yacht-Charter", "Helikopter-Inseltour", "Golf- & Spa-Pakete"],
      beaches: ["Denarau Beach", "Resort-Lagunenpools"],
      dining: ["Ports O' Call", "Nuku Restaurant", "Beach-Club-Dining"],
      transport: ["10 Min. vom Flughafen Nadi", "Marina-Fähren", "Privater Fahrservice"],
      culture: ["Resort-Meke-Abende", "Handwerksmärkte", "Fidschianische Kochkurse"],
      weather: "Geschützte Westküste — trockener als Suva. Ideal Mai–Oktober.",
      faqs: [
        {
          question: "Wann ist die beste Reisezeit für Denarau?",
          answer:
            "Mai bis Oktober bietet trockenes, sonniges Wetter, ideal für Strände und Wasseraktivitäten. November bis April ist wärmer mit üppigen Landschaften und weniger Andrang in Luxusresorts.",
        },
        {
          question: "Wie komme ich nach Denarau?",
          answer:
            "Internationale Flüge landen am internationalen Flughafen Nadi. Private Transfers, Wasserflugzeuge und Resort-Boote bringen Sie innerhalb weniger Stunden ans Ziel.",
        },
      ],
    },
    mamanuca: {
      title: "Mamanuca-Inseln",
      tagline: "Castaway-Paradies & kristallklare Lagunen",
      overview:
        "Die Mamanuca-Gruppe ist Fidschis ikonischste Inselkette — türkisfarbene Lagunen, barfuß Luxus und Schauplatz unzähliger tropischer Träume, erreichbar per Wasserflugzeug oder Speedboat von Denarau.",
      highlights: ["Castaway Island", "Cloud 9 Floating Bar", "Weltklasse-Schnorcheln"],
      thingsToDo: ["Schnorcheln", "Surf bei Cloudbreak", "Kajakfahren", "Private Picknicks"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["Schnorchel-Safari", "Sonnenuntergangssegeln", "Schnuppertauchen"],
      beaches: ["Monuriki Beach", "Modriki Island", "Private Resort-Strände"],
      dining: ["Overwater-Dining", "Strand-BBQ", "Floating-Bar-Erlebnisse"],
      transport: ["Speedboat von Denarau", "Wasserflugzeug-Transfers", "Private Resort-Boote"],
      culture: ["Resort-Kulturabende", "Dorfbesuche auf nahegelegenen Inseln"],
      weather: "Passatgekühlt. Trockenzeit perfekt für Wasserklarheit.",
      faqs: [
        {
          question: "Wann ist die beste Reisezeit für die Mamanuca-Inseln?",
          answer:
            "Mai bis Oktober bietet trockenes, sonniges Wetter, ideal für Strände und Wasseraktivitäten. November bis April ist wärmer mit üppigen Landschaften und weniger Andrang in Luxusresorts.",
        },
        {
          question: "Wie komme ich zu den Mamanuca-Inseln?",
          answer:
            "Internationale Flüge landen am internationalen Flughafen Nadi. Private Transfers, Wasserflugzeuge und Resort-Boote bringen Sie innerhalb weniger Stunden ans Ziel.",
        },
      ],
    },
    yasawa: {
      title: "Yasawa-Inseln",
      tagline: "Abgelegene Inseln & unberührte Schönheit",
      overview:
        "Der Yasawa-Archipel bietet Fidschi in seiner rohesten und romantischsten Form — dramatische Vulkangipfel, Blue-Hole-Höhlen, verlassene Strände und einige der exklusivsten Öko-Luxus-Retreats im Südpazifik.",
      highlights: ["Sawa-i-Lau-Höhlen", "Blue Lagoon", "Abgelegene Luxus-Lodges"],
      thingsToDo: ["Höhlenschwimmen", "Dorf-Homestays", "Wandern", "Tauchen"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "Barfuß-Luxus-Lodges"],
      tours: ["Blue-Lagoon-Tagesausflug", "Höhlenexpedition", "Multi-Insel-Segeln"],
      beaches: ["Octopus Beach", "Nanuya Levu", "Private Resort-Buchten"],
      dining: ["Strandfeste", "Resort-Degustation", "Fang-des-Tages-BBQ"],
      transport: ["Yasawa Flyer Fähre", "Wasserflugzeug", "Private Yacht"],
      culture: ["Abgelegene Dorfbesuche", "Traditionelles Fischen", "Geschichtenabende"],
      weather: "Trockener als das Festland. Beste Sicht Jun–Sep.",
      faqs: [
        {
          question: "Wann ist die beste Reisezeit für die Yasawa-Inseln?",
          answer:
            "Mai bis Oktober bietet trockenes, sonniges Wetter, ideal für Strände und Wasseraktivitäten. November bis April ist wärmer mit üppigen Landschaften und weniger Andrang in Luxusresorts.",
        },
        {
          question: "Wie komme ich zu den Yasawa-Inseln?",
          answer:
            "Internationale Flüge landen am internationalen Flughafen Nadi. Private Transfers, Wasserflugzeuge und Resort-Boote bringen Sie innerhalb weniger Stunden ans Ziel.",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "Garteninsel & Wasserfall-Land",
      overview:
        "Als Garteninsel bekannt, ist Taveuni ein UNESCO-reiches Paradies aus Regenwald, Wasserfällen und weltberühmten Tauchplätzen — ideal für Abenteurer und Paare, die Natur abseits der Resort-Routen suchen.",
      highlights: ["Bouma National Heritage Park", "Rainbow Reef Tauchen", "Tavoro-Wasserfälle"],
      thingsToDo: ["Wasserfall-Wanderungen", "Tauchen", "Vogelbeobachtung", "Kajakfahren"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "Öko-Lodges"],
      tours: ["Bouma Falls Trek", "Rainbow Reef Tauchgang", "Lavena Coastal Walk"],
      beaches: ["Lavena Beach", "Matei Beach", "Versteckte Buchten"],
      dining: ["Plantagen-Stil Dining", "Frische Tropenfrüchte", "Fusion-Menüs im Resort"],
      transport: ["Inlandsflug von Nadi/Suva", "Resort-Transfers", "Bootscharter"],
      culture: ["Dorf Wainibau", "Traditionelle Taro-Farmen", "Lokales Handwerk"],
      weather: "Feuchteste Region — ganzjährig üppig. Tauchen am besten Apr.–Okt.",
      faqs: [
        {
          question: "Wann ist die beste Reisezeit für Taveuni?",
          answer:
            "Mai bis Oktober bietet trockenes, sonniges Wetter, ideal für Strände und Wasseraktivitäten. November bis April ist wärmer mit üppigen Landschaften und weniger Andrang in Luxusresorts.",
        },
        {
          question: "Wie komme ich nach Taveuni?",
          answer:
            "Internationale Flüge landen am internationalen Flughafen Nadi. Private Transfers, Wasserflugzeuge und Resort-Boote bringen Sie innerhalb weniger Stunden ans Ziel.",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "Abenteuerhauptstadt Fidschis",
      overview:
        "Pacific Harbour ist Fidschis Adrenalin-Adresse — Hai-Tauchen in der Beqa-Lagune, Wildwasser-Rafting, Zip-Lining und Luxusvillen mit Blick auf den Pazifik, alles in Reichweite von Suva.",
      highlights: ["Hai-Tauchen", "Wildwasser-Rafting", "Zip Fiji"],
      thingsToDo: ["Hai-Fütterungstauchen", "Rafting Upper Navua", "Golf", "Hochseefischen"],
      placesToStay: ["The Pearl South Pacific", "Luxusvillen", "Boutique-Lodges"],
      tours: ["Beqa-Hai-Begegnung", "Rafting-Tag", "Fischcharter"],
      beaches: ["Natadola (in der Nähe)", "Versteckte Buchten", "Resort-Strände"],
      dining: ["Marina-Restaurants", "Resort-Fine-Dining", "Lokale Meeresfrüchte"],
      transport: ["2,5 Std. von Nadi", "45 Min. von Suva", "Helikopter verfügbar"],
      culture: ["Beqa Feuerlauf", "Dorfaufführungen", "Handwerkermärkte"],
      weather: "Etwas feuchter als die Westküste. Abenteuersport ganzjährig.",
      faqs: [
        {
          question: "Wann ist die beste Reisezeit für Pacific Harbour?",
          answer:
            "Mai bis Oktober bietet trockenes, sonniges Wetter, ideal für Strände und Wasseraktivitäten. November bis April ist wärmer mit üppigen Landschaften und weniger Andrang in Luxusresorts.",
        },
        {
          question: "Wie komme ich nach Pacific Harbour?",
          answer:
            "Internationale Flüge landen am internationalen Flughafen Nadi. Private Transfers, Wasserflugzeuge und Resort-Boote bringen Sie innerhalb weniger Stunden ans Ziel.",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "Hauptstadt der Kultur & des Handels",
      overview:
        "Suva ist das pulsierende Herz des modernen Fidschi — Kolonialarchitektur, lebendige Märkte, Museen und eine wachsende Fine-Dining-Szene, perfekt für Reisende, die Kultur vor dem Strand wollen.",
      highlights: ["Fidschi-Museum", "Stadtmarkt", "Parlament & Thurston Gardens"],
      thingsToDo: ["Markttouren", "Museumsbesuche", "Kolonial-Spaziergänge", "Nachtleben"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "Boutique-Stadthotels"],
      tours: ["Stadterbe-Spaziergang", "Colo-i-Suva Waldbad", "Hochland-Tagesausflug"],
      beaches: ["Kein Stadtstrand — Tagesausflüge nach Pacific Harbour"],
      dining: ["Fine Dining", "Indisches Street Food", "Fischmärkte"],
      transport: ["Internationaler Flughafen Nausori", "Bus zur Coral Coast", "Inlandsflüge"],
      culture: ["Fidschianisches, indisches & chinesisches Erbe", "Live-Musik", "Kunstgalerien"],
      weather: "Feuchteste Großstadt. Leichte Regenkleidung ganzjährig mitnehmen.",
      faqs: [
        {
          question: "Wann ist die beste Reisezeit für Suva?",
          answer:
            "Mai bis Oktober bietet trockenes, sonniges Wetter, ideal für Strände und Wasseraktivitäten. November bis April ist wärmer mit üppigen Landschaften und weniger Andrang in Luxusresorts.",
        },
        {
          question: "Wie komme ich nach Suva?",
          answer:
            "Internationale Flüge landen am internationalen Flughafen Nadi. Private Transfers, Wasserflugzeuge und Resort-Boote bringen Sie innerhalb weniger Stunden ans Ziel.",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "Schnorcheln in kristallklarem Wasser",
      category: "Wasser",
      duration: "Halbtags",
      ages: "Alle Altersgruppen",
      overview:
        "Gleiten Sie über Regenbogen-Korallengärten in den klarsten Lagunen der Mamanucas mit privatem Guide, Premium-Ausrüstung und einem Champagner-Picknick auf einem verlassenen Sandbank.",
      highlights: ["Privater Guide", "Premium-Schnorchelausrüstung", "Champagner-Picknick", "Briefing durch Meeresbiologen"],
      included: ["Bootstransfer hin & zurück", "Schnorchelausrüstung", "Erfrischungen", "Meeresparkgebühren"],
      itinerary: ["Abfahrt Denarau Marina", "Zwei Schnorchelplätze", "Sandbank-Picknick", "Rückfahrt Sonnenuntergangskreuzfahrt"],
      faqs: [
        { question: "Brauche ich Erfahrung?", answer: "Nein — geeignet für Anfänger mit Grundschwimmkenntnissen." },
        { question: "Was soll ich mitbringen?", answer: "Riff-sichere Sonnencreme, Badekleidung und leichte Überkleidung." },
      ],
    },
    "sunset-cruises": {
      title: "Sonnenuntergangskreuzfahrten",
      category: "Segeln",
      duration: "2–3 Stunden",
      ages: "Alle Altersgruppen",
      overview:
        "Segeln Sie in einen goldenen Pazifik-Sonnenuntergang an Bord eines Luxus-Katamarans mit Canapés, Premium-Getränken und live fidschianischer Gitarre, während die Mamanuca-Silhouetten in die Dämmerung verschwinden.",
      highlights: ["Luxus-Katamaran", "Canapés & Getränke", "Live-Musik", "360°-Sonnenuntergangsblick"],
      included: ["Willkommensgetränk", "Canapé-Auswahl", "Optionale Rückfahrt"],
      itinerary: ["Einschiffung Marina", "Küstensegeln", "Sonnenuntergangs-Toast", "Rückfahrt unter Sternen"],
      faqs: [
        {
          question: "Ist es wetterabhängig?",
          answer: "Kreuzfahrten finden bei den meisten Bedingungen statt; volle Rückerstattung bei Sicherheitsstornierung.",
        },
      ],
    },
    "hiking-waterfalls": {
      title: "Wandern & Wasserfälle",
      category: "Abenteuer",
      duration: "Ganztägig",
      ages: "16+",
      overview:
        "Wandern Sie durch den Bouma National Heritage Park zu versteckten Wasserfällen, schwimmen Sie in smaragdgrünen Becken und lunchen Sie mit Tropenfrüchten im unberührten Regenwald der Garteninsel.",
      highlights: ["Erfahrener lokaler Guide", "Drei Wasserfall-Schwimmstopps", "Regenwald-Ökologie", "Farm-to-Table-Mittagessen"],
      included: ["Parkgebühren", "Guide", "Mittagessen", "Transfers vom Resort"],
      itinerary: ["Morgendlicher Wald-Trek", "Wasserfall-Schwimmen", "Dorf-Mittagessen", "Nachmittags-Rückkehr"],
      faqs: [
        {
          question: "Fitnesslevel?",
          answer: "Mittel — 4–5 Stunden auf unebenen Pfaden mit einigen steilen Abschnitten.",
        },
      ],
    },
    "village-tours": {
      title: "Dorf-Touren",
      category: "Kultur",
      duration: "Halbtags",
      ages: "Alle Altersgruppen",
      overview:
        "Erleben Sie authentische fidschianische Gastfreundschaft — Kava-Zeremonie, Meke-Tanz, Handwerksvorführungen und ein traditionelles Lovo-Fest, zubereitet von der Familie des Dorfchefs.",
      highlights: ["Kava-Zeremonie", "Meke-Aufführung", "Lovo-Fest", "Handwerks-Workshop"],
      included: ["Dorfspende", "Zeremonie-Teilnahme", "Traditionelles Mittagessen", "Transport"],
      itinerary: ["Dorf-Willkommen", "Kava & Meke", "Handwerks-Demo", "Lovo-Mittagessen"],
      faqs: [
        {
          question: "Was soll ich tragen?",
          answer: "Zurückhaltende Kleidung, die Schultern und Knie bedeckt. Hut im Dorf abnehmen.",
        },
      ],
    },
    "island-hopping": {
      title: "Inselhopping-Abenteuer",
      category: "Mehrtägig",
      duration: "3–7 Tage",
      ages: "Alle Altersgruppen",
      overview:
        "Kuratierte Multi-Insel-Reise per privatem Speedboat oder Wasserflugzeug — Boutique-Resorts, versteckte Strände und maßgeschneiderte Erlebnisse von Ihrem Concierge.",
      highlights: ["Private Transfers", "Boutique-Resort-Aufenthalte", "Flexibler Reiseplan", "Dedizierter Concierge"],
      included: ["Inselübergreifende Transfers", "Resort-Koordination", "Tägliches Frühstück", "Concierge-Support"],
      itinerary: ["Tag 1: Ankunft Mamanuca", "Tag 2–3: Yasawa-Erkundung", "Tag 4+: Individuelle Verlängerungen"],
      faqs: [
        {
          question: "Kann ich anpassen?",
          answer: "Jedes Inselhopping ist maßgeschneidert — Ihr Concierge gestaltet die Route mit Ihnen.",
        },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Denarau Island Resort-Paket",
      description: "Fünf Nächte Suite mit Meerblick, private Flughafentransfers, tägliches Frühstück und Marina-Zugang.",
      includes: ["Privater Transfer", "Suite mit Meerblick", "Tägliches Frühstück"],
    },
    "romantic-honeymoon-escape": {
      title: "Romantische Flitterwochen-Auszeit",
      description: "Paar-Retreat mit privatem Sandbank-Dinner, Paar-Spa-Ritual und Sonnenuntergangssegeln.",
      includes: ["Privates Dinner", "Paar-Spa", "Sonnenuntergangskreuzfahrt"],
    },
    "mamanuca-island-escape": {
      title: "Mamanuca-Insel-Auszeit",
      description: "Fly-and-Flop-Paket — Wasserflugzeug-Transfers hin & zurück, Overwater-Mittagessen und Schnorchelausrüstung.",
      includes: ["Wasserflugzeug-Transfer", "Resort-Guthaben", "Schnorchelverleih"],
    },
    "family-coral-coast-package": {
      title: "Familienpaket Coral Coast",
      description: "Verbundene Bures, Kids' Club-Zugang und Natadola-Beach-Aktivitäten für die ganze Familie.",
      includes: ["Kids' Club", "Familien-Bure", "Strandaktivitäten"],
    },
    "private-island-buyout": {
      title: "Private Insel-Exklusivmiete",
      description: "Exklusive Nutzung einer Mamanuca-Insel — bis zu 12 Gäste, Koch, Boot und Butler-Team inklusive.",
      includes: ["Exklusive Insel", "Privatkoch", "Bootscharter"],
    },
    "stay-and-play-nadi": {
      title: "Stay & Play Nadi-Paket",
      description: "Resort-Aufenthalt mit kuratierten Tagesausflügen — Dorfbesuch, Schlammbäder und Inselpicknick.",
      includes: ["Resort-Aufenthalt", "2 Tagesausflüge", "Alle Transfers"],
    },
    "luxury-overwater-bure": {
      title: "Luxus-Overwater-Bure-Aufenthalt",
      description: "Schlafen Sie über kristallklarem Wasser — private Terrasse, Butler-Service und In-Bure-Dining.",
      includes: ["Overwater-Bure", "Butler-Service", "In-Bure-Dining"],
    },
    "coral-coast-beach-escape": {
      title: "Coral Coast Strand-Auszeit",
      description: "Natadola-Beach-Resort mit FJD 200 Spa-Guthaben und kuratiertem Degustationsdinner.",
      includes: ["Strandzimmer", "Spa-Guthaben", "Degustationsdinner"],
    },
    "wellness-spa-retreat": {
      title: "Wellness- & Spa-Retreat",
      description: "Yoga am Meer, traditionelle Bobo-Massage und biologische Farm-to-Table-Küche.",
      includes: ["Tägliches Yoga", "Spa-Ritual", "Wellness-Dining"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description: "Fidschis einzige Overwater-Bures — Adults-only-Sanctuary mit All-inclusive-Dining.",
      includes: ["Overwater-Bure", "All-inclusive", "Nur Erwachsene"],
    },
    "mamanuca-island-hopping": {
      title: "Mamanuca Inselhopping",
      description: "Privates Speedboat, Riff-Schnorcheln und Champagner-Picknick auf verlassener Sandbank.",
      includes: ["Privates Boot", "Schnorcheln", "Champagner-Picknick"],
    },
    "yasawa-adventure-package": {
      title: "Yasawa-Abenteuerpaket",
      description: "Geführte Wanderungen zu versteckten Wasserfällen, Meereskajak und Dorf-Kava-Zeremonie.",
      includes: ["Wasserfall-Wanderung", "Kajakfahren", "Dorfbesuch"],
    },
    "beqa-shark-dive": {
      title: "Beqa Lagoon Hai-Tauchen",
      description: "Weltberühmte Hai-Begegnung mit Ausrüstung, Guide und Resort-Transfer von Pacific Harbour.",
      includes: ["Hai-Tauchen", "Ausrüstung", "Transfer"],
    },
    "sunset-cruise-denarau": {
      title: "Private Sonnenuntergangskreuzfahrt",
      description: "Champagner-Segeln von Port Denarau Marina — Canapés, Live-Musik und Golden-Hour-Blick.",
      includes: ["Private Charter", "Canapés", "Champagner"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "Fidschis einziges Resort mit Overwater-Bures — Likuliku verbindet Adults-only-Intimität mit Weltklasse-Dining und einer Lagune, die bei Sonnenuntergang leuchtet.",
      amenities: ["Overwater-Bures", "Nur Erwachsene", "Spa", "Privatstrand", "Fine Dining"],
      experiences: ["Schnorcheln", "Sonnenuntergangskreuzfahrt", "Spa-Rituale"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "Eine intime 36-Bure-Insel, wo barfuß Luxus auf fidschianische Wärme trifft — perfekt für Flitterwochen und besondere Anlässe.",
      amenities: ["Strand-Bures", "Spa", "Tauchzentrum", "Privates Dining"],
      experiences: ["Tauchen", "Inselpicknick", "Dorfbesuch"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "Denaraus führendes familienfreundliches Luxusresort — weitläufige Pools, Meisterschaftsgolf in der Nähe und nahtloser Marina-Zugang für Inselabenteuer.",
      amenities: ["Mehrere Pools", "Kids' Club", "Spa", "Marina-Zugang", "7 Restaurants"],
      experiences: ["Inselhopping", "Golf", "Sonnenuntergangskreuzfahrt"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Französisch polierter Luxus am besten Strand von Denarau — Floating Breakfasts, Riffzugang und Sofitels Signature-Spa-Philosophie.",
      amenities: ["Strandlage", "Spa", "Riff-Schnorcheln", "Kids' Club"],
      experiences: ["Riff-Schnorcheln", "Spa-Tag", "Kulturabend"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "Kronjuwel von Natadola Beach — Meisterschaftsgolf, legendäre Natadola-Sande und Dorfkultur vor der Haustür.",
      amenities: ["Natadola Beach", "Golfplatz", "Spa", "Kids' Club", "Kulturzentrum"],
      experiences: ["Dorf-Tour", "Golf", "Reiten am Strand"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "Die Insel, die Fidschi für eine Generation definierte — familienfreundlich, riffumrandet und mühelos authentisch.",
      amenities: ["Privatinsel", "PADI-Zentrum", "Kids' Club", "Mehrere Strände"],
      experiences: ["Schnorcheln", "Kajakfahren", "Dorfbesuch"],
    },
  },
};
