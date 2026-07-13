import type { LocaleContentPack } from "../types";

export const nlPack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "Planning",
    Style: "Stijl",
    Activities: "Activiteiten",
  },
  guides: {
    "first-time-fiji": {
      title: "Eerste reis naar Fiji",
      excerpt: "Alles wat u nodig heeft voor uw eerste reis naar Fiji.",
      category: "Planning",
      overview:
        "Fiji is een briljante eerste reis — gemakkelijke toegang, warme mensen en 333 eilanden om te verkennen. De meeste bezoekers hebben geen visum nodig tot vier maanden.",
      sections: [
        {
          title: "Vóór u vliegt",
          body: "Zorg dat uw paspoort zes maanden na de reisdatum geldig is. Regel uitgebreide reisverzekering en download offline kaarten voor afgelegen eilanden.",
          items: ["Paspoortgeldigheid", "Reisverzekering", "Valuta (FJD)", "Bescheiden kleding voor dorpen"],
        },
        {
          title: "Aankomst & douane",
          body: "Nadi International Airport is modern en efficiënt. Regel privétransfers vooraf om wachtrijen te vermijden en meteen te ontspannen.",
          items: ["Privétransfer", "SIM-kaart op de luchthaven", "Resort meet & greet"],
        },
        {
          title: "Eilandetiquette",
          body: "Fijianen behoren tot de meest gastvrije mensen ter wereld. Een vriendelijke 'Bula!' helpt enorm. Verwijder hoeden in dorpen en accepteer kava wanneer aangeboden.",
          items: ["Kledingvoorschrift in dorpen", "Kavaceremonie", "Toestemming voor fotografie"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik mijn eerste reis naar Fiji plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    "visa-guide": {
      title: "Visum & reisvereisten",
      excerpt: "Paspoorten, visa en toegangsregels — eenvoudig uitgelegd.",
      category: "Planning",
      overview:
        "De meeste mensen hoeven geen visum te regelen vóór hun vlucht naar Fiji. Zorg dat paspoort en retourticket voldoen aan de immigratie-eisen.",
      sections: [
        {
          title: "Visumvrije toegang",
          body: "Burgers van de meeste landen krijgen een bezoekersvergunning tot vier maanden.",
          items: ["Geldig paspoort 6+ maanden", "Retourticket", "Bewijs van accommodatie"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik visum & reisvereisten plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    "best-time-to-visit": {
      title: "Beste reistijd voor Fiji",
      excerpt: "Weer, seizoenen en wanneer wij echt gaan.",
      category: "Planning",
      overview:
        "Fiji is het hele jaar warm. Het droge seizoen (mei–okt) betekent helderdere luchten en drukke resorts; het natte seizoen (nov–apr) brengt weelderige landschappen, minder drukte en zachtere prijzen.",
      sections: [
        {
          title: "Droog seizoen (mei–okt)",
          body: "Minder vochtigheid, geweldig duiken en zeilen. Populair — boek vroeg.",
          items: ["Beste voor duiken", "Piekresorttarieven", "Festivals & evenementen"],
        },
        {
          title: "Nat seizoen (nov–apr)",
          body: "Warmer met middagbuien. Groen binnenland, rustigere stranden, goede deals.",
          items: ["Lagere tarieven", "Weelderige watervallen", "Warm water"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik de beste reistijd voor Fiji plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    "weather-guide": {
      title: "Weer & klimaat",
      excerpt: "Begrijp Fiji's tropische seizoenen.",
      category: "Planning",
      overview:
        "Fiji ligt in de Zuid-Pacifische passaatwindgordel — warm, vochtig en het grootste deel van het jaar gezegend met zonneschijn.",
      sections: [
        {
          title: "Regionale verschillen",
          body: "Het westen (Denarau, Mamanuca) is droger dan Suva en Taveuni. Plan eilandhoppen rond microklimaten.",
          items: ["Westkust droger", "Suva natter", "Cycloonseizoen nov–apr"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik weer & klimaat plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    "luxury-travel": {
      title: "Luxe reisgids",
      excerpt: "Exclusieve resorts en gecureerde ervaringen.",
      category: "Stijl",
      overview:
        "Fiji's luxeniveau kan tippen aan overal in de Zuid-Pacifische regio — privé-eilanden, overwater bures, persoonlijke butlers en helikoptertransfers als standaard.",
      sections: [
        {
          title: "Waar te verblijven",
          body: "Likuliku Lagoon, Turtle Island, Vomo Island en Kokomo Private Island vertegenwoordigen het toppunt.",
          items: ["Overwater bures", "Privé-eilanden", "All-inclusive opties"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik luxe reizen plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    honeymoon: {
      title: "Huwelijksreisgids",
      excerpt: "Romantische ontsnappingen voor koppels.",
      category: "Stijl",
      overview:
        "Fiji is het meest romantische adres in de Zuid-Pacifische regio — privédiners op zandbanken, spa-rituelen voor koppels en adults-only eilandretreats.",
      sections: [
        {
          title: "Top romantische ervaringen",
          body: "Zeilen bij zonsondergang, privé-eilandpicknicks en dineren boven het water definiëren de Fiji-huwelijksreis.",
          items: ["Verblijf op privé-eiland", "Spa voor koppels", "Zonsondergangscruise"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik een huwelijksreis plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    "family-travel": {
      title: "Familiereisgids",
      excerpt: "Fiji met kinderen — stressvrij paradijs.",
      category: "Stijl",
      overview:
        "Fijische cultuur viert kinderen. Kids clubs, ondiepe lagunes en bure-villa's voor gezinnen maken Fiji ideaal voor meer-generatiereizen.",
      sections: [
        {
          title: "Gezinsvriendelijke resorts",
          body: "Resorts in Denarau en Coral Coast blinken uit in kinderprogramma's terwijl ouders spa-tijd genieten.",
          items: ["Kids clubs", "Ondiepe lagunes", "Verbindingskamers"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik een familiereis plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    adventure: {
      title: "Avonturengids",
      excerpt: "Adrenaline en verkenning.",
      category: "Stijl",
      overview:
        "Van haaienduiken in Beqa Lagoon tot watervalwandelingen op Taveuni — Fiji levert wereldklasse avontuur zonder luxe op te offeren.",
      sections: [
        {
          title: "Must-do avonturen",
          body: "Haaienduiken, wildwaterraften, zip-linen en surfcharters behoren tot het beste in de Stille Oceaan.",
          items: ["Haaienduik", "Raften", "Watervalwandelingen"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik avontuur plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    wellness: {
      title: "Wellnessgids",
      excerpt: "Herstel lichaam en geest in het paradijs.",
      category: "Stijl",
      overview:
        "Yoga aan zee, traditionele Bobo-massage en digital-detox retreats maken Fiji een opkomende wellnessbestemming.",
      sections: [
        {
          title: "Wellnessrituelen",
          body: "Combineer spa-behandelingen met bosbaden en rifmeditatie voor holistische vernieuwing.",
          items: ["Spa aan zee", "Yogaretreats", "Detoxprogramma's"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik wellness plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    culture: {
      title: "Cultuurgids",
      excerpt: "Authentieke Fijische tradities.",
      category: "Stijl",
      overview:
        "Fijische cultuur is levend en gul — dorpsbezoeken, meke-dans en kavaceremonies bieden echte verbinding buiten de resortmuren.",
      sections: [
        {
          title: "Culturele ervaringen",
          body: "Bezoek altijd met een gids die dorpsrelaties onderhoudt en respectvolle deelname waarborgt.",
          items: ["Dorpsrondleiding", "Meke-optreden", "Ambachtworkshops"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik culturele ervaringen plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    "food-drink": {
      title: "Eten & drinken gids",
      excerpt: "Wat te eten en drinken in Fiji.",
      category: "Stijl",
      overview:
        "Fijisch eten combineert eilandkoken met Indiase en Chinese smaken — van lovo-feesten in de aarde tot serieuze degustatiemenu's in resorts.",
      sections: [
        {
          title: "Moet proberen",
          body: "Kokoda, lovo, roti wraps en een lange lunch in een goed resortrestaurant.",
          items: ["Lovo-feest", "Kokoda", "Resortdegustatie"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik eten & drinken plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    transportation: {
      title: "Vervoersgids",
      excerpt: "Vluchten, veerboten en reizen tussen eilanden.",
      category: "Planning",
      overview:
        "De helft van het plezier is de reis — watervliegtuigen, speedboten en binnenlandse vluchten verbinden de eilanden sneller dan u denkt.",
      sections: [
        {
          title: "Inter-eiland reizen",
          body: "Denarau Marina vaart naar Mamanuca en Yasawa. Watervliegtuigen bereiken de afgelegen luxe plekken.",
          items: ["Fiji Airways binnenlands", "Yasawa Flyer", "Watervliegtuigtransfers"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik vervoer plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    "island-hopping": {
      title: "Eilandhoppen gids",
      excerpt: "Hoe tussen eilanden te springen zonder hoofdpijn.",
      category: "Planning",
      overview:
        "Eilandhoppen is waar Fiji het beste in is. Wij plannen routes door Mamanuca, Yasawa en rustigere stops — afgestemd op uw data en budget.",
      sections: [
        {
          title: "Voorbeeldroutes",
          body: "Drie dagen in Mamanuca, een week in Yasawa, of tien dagen beide combineren — alles eenvoudig aan te passen.",
          items: ["3-daagse express", "7-daagse ontdekker", "10-daagse ultieme"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik eilandhoppen plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    diving: {
      title: "Duikgids",
      excerpt: "Riffen, haaien en duikplekken van wereldklasse.",
      category: "Activiteiten",
      overview:
        "Rainbow Reef, Beqa Lagoon en Great White Wall behoren tot het beste duiken op aarde.",
      sections: [
        {
          title: "Top duikplekken",
          body: "Beqa-haaienduik, Rainbow Reef en Namena — voor elk niveau.",
          items: ["Beqa-haaien", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik duiken plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    surfing: {
      title: "Surfgids",
      excerpt: "De breaks waar iedereen over praat.",
      category: "Activiteiten",
      overview:
        "Cloudbreak, Restaurants en Frigates — serieuze golven, meestal per boot bereikbaar vanuit Denarau of de Mamanucas.",
      sections: [
        {
          title: "Top breaks",
          body: "Cloudbreak is Fiji's beroemde left. Huur een boot van een nabijgelegen resort voor dageraadsessies.",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik surfen plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
    "travel-planning": {
      title: "Reisplanningshub",
      excerpt: "Uw centrale hub voor de perfecte Fiji-ontsnapping.",
      category: "Planning",
      overview:
        "Alles op één plek — gidsen, tools, conciërge-ondersteuning en op maat gemaakte reisplanning voor luxe Fiji-reizen.",
      sections: [
        {
          title: "Begin hier",
          body: "Vertel ons uw data, stijl en budget — onze conciërge stelt binnen 24 uur een bespoke reisplan op.",
          items: ["Gratis consult", "Bespoke reisplan", "Beste prijsgarantie"],
        },
      ],
      faqs: [
        {
          question: "Hoe ver van tevoren moet ik mijn reis plannen?",
          answer:
            "Luxe resorts raken snel vol in het hoogseizoen (juni–september). Boek 3–6 maanden van tevoren indien mogelijk — we vinden vaak nog last-minute kamers bij partneraccommodaties.",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "Gouden stranden & authentieke Fijische cultuur",
      overview:
        "De Coral Coast strekt zich uit langs de zuidkust van Viti Levu — een lint van palmenstranden, luxe resorts en traditionele dorpen waar vuurlopen en kavarituelen het dagelijks leven vormen.",
      highlights: ["Sigatoka-zandduinen", "Dorpsceremonies", "Luxe strandresorts"],
      thingsToDo: ["Dorpsrondleidingen", "Rivier safari's", "Golf op championshipbanen", "Spa-retreats"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "Privé strandvilla's"],
      tours: ["Culturele immersiedag", "Kusthelikoptervlucht", "Zonsondergang dhow-cruise"],
      beaches: ["Natadola Beach", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["Fine dining aan het strand", "Lovo-feesten", "Resortdegustatiemenu's"],
      transport: ["Nadi-luchthaven 1 uur", "Privé resorttransfers", "Schilderachtige kustrit"],
      culture: ["Meke-optredens", "Pottenbakkersdorpen", "Traditionele ambachtmarkten"],
      weather: "Het hele jaar warm. Droog seizoen mei–okt (26–30°C). Nat seizoen nov–apr met middagbuien.",
      faqs: [
        {
          question: "Wat is de beste tijd om de Coral Coast te bezoeken?",
          answer:
            "Mei tot oktober biedt droog, zonnig weer ideaal voor stranden en wateractiviteiten. November tot april is warmer met weelderige landschappen en minder drukte bij luxe resorts.",
        },
        {
          question: "Hoe kom ik bij de Coral Coast?",
          answer:
            "Internationale vluchten komen aan op Nadi International Airport. Privétransfers, watervliegtuigen en resortboten brengen u binnen enkele uren naar uw eindbestemming.",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "Poort naar de Fiji-eilanden",
      overview:
        "Nadi is uw aankomstpunt in het paradijs — een bruisend knooppunt dat internationale reizigers verbindt met de Mamanuca- en Yasawa-eilanden, Denarau Marina en Fiji's binnenland.",
      highlights: ["Sri Siva Subramaniya-tempel", "Garden of the Sleeping Giant", "Denarau Marina"],
      thingsToDo: ["Dagtrips naar eilanden", "Tempelbezoeken", "Marktrondleidingen", "Golf"],
      placesToStay: ["Denarau-resorts", "Boutiquehotels Nadi", "Luchthaventransitverblijven"],
      tours: ["Mamanuca-dagcruise", "Sabeto modderpoel & warmwaterbronnen", "Hooglanddorprondleiding"],
      beaches: ["Denarau Beach", "Wailoaloa Beach"],
      dining: ["Indiaans-Fijische fusion", "Resortrestaurants", "Lokale marktproducten"],
      transport: ["Nadi International Airport", "Denarau veerterminal", "Helikoptertransfers"],
      culture: ["Hindoetempelarchitectuur", "Multiculturele markten", "Fijische ambachtencentra"],
      weather: "Tropisch en vochtig. Beste zicht voor eilandhoppen mei–okt.",
      faqs: [
        {
          question: "Wat is de beste tijd om Nadi te bezoeken?",
          answer:
            "Mei tot oktober biedt droog, zonnig weer ideaal voor stranden en wateractiviteiten. November tot april is warmer met weelderige landschappen en minder drukte bij luxe resorts.",
        },
        {
          question: "Hoe kom ik bij Nadi?",
          answer:
            "Internationale vluchten komen aan op Nadi International Airport. Privétransfers, watervliegtuigen en resortboten brengen u binnen enkele uren naar uw eindbestemming.",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "Luxe marina & resorts van wereldklasse",
      overview:
        "Denarau Island is Fiji's voornaamste luxeadres — een omheind gebied van vijfsterrenresorts, championshipgolf, fine dining en het belangrijkste vertrekpunt voor Mamanuca- en Yasawa-eilandcruises.",
      highlights: ["Port Denarau Marina", "Championshipgolf", "Luxe winkelen"],
      thingsToDo: ["Zonsondergangcruises", "Jetski-safari's", "Spa-rituelen", "Eilandhoppen"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "Privéresidenties"],
      tours: ["Privé jachtcharter", "Helikopter-eilandtour", "Golf & spa-pakketten"],
      beaches: ["Denarau Beach", "Resortlagunezwembaden"],
      dining: ["Ports O' Call", "Nuku-restaurant", "Beachclub dining"],
      transport: ["10 min van Nadi-luchthaven", "Marinaveerboten", "Privéautoservice"],
      culture: ["Resort meke-avonden", "Ambachtmarkten", "Fijische kooklessen"],
      weather: "Beschutte westkust — droger dan Suva. Ideaal mei–oktober.",
      faqs: [
        {
          question: "Wat is de beste tijd om Denarau te bezoeken?",
          answer:
            "Mei tot oktober biedt droog, zonnig weer ideaal voor stranden en wateractiviteiten. November tot april is warmer met weelderige landschappen en minder drukte bij luxe resorts.",
        },
        {
          question: "Hoe kom ik bij Denarau?",
          answer:
            "Internationale vluchten komen aan op Nadi International Airport. Privétransfers, watervliegtuigen en resortboten brengen u binnen enkele uren naar uw eindbestemming.",
        },
      ],
    },
    mamanuca: {
      title: "Mamanuca-eilanden",
      tagline: "Castaway-paradijs & kristalheldere lagunes",
      overview:
        "De Mamanuca-groep is Fiji's meest iconische eilandenketen — turquoise lagunes, luxe op blote voeten en de filmlocatie van talloze tropische dromen, bereikbaar per watervliegtuig of speedboot vanuit Denarau.",
      highlights: ["Castaway Island", "Cloud 9 drijvende bar", "Snorkelen van wereldklasse"],
      thingsToDo: ["Snorkelen", "Surfen Cloudbreak", "Kajakken", "Privépicknicks"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["Snorkelsafari", "Zonsondergangzeilen", "Introductieduik"],
      beaches: ["Monuriki Beach", "Modriki Island", "Privé resortstranden"],
      dining: ["Dineren boven water", "Strand-BBQ", "Drijvende bar-ervaringen"],
      transport: ["Speedboot vanuit Denarau", "Watervliegtuigtransfers", "Privé resortboten"],
      culture: ["Resort culturele avonden", "Dorpsbezoeken op nabije eilanden"],
      weather: "Passaatwind-gekoeld. Droog seizoen perfect voor waterhelderheid.",
      faqs: [
        {
          question: "Wat is de beste tijd om de Mamanuca-eilanden te bezoeken?",
          answer:
            "Mei tot oktober biedt droog, zonnig weer ideaal voor stranden en wateractiviteiten. November tot april is warmer met weelderige landschappen en minder drukte bij luxe resorts.",
        },
        {
          question: "Hoe kom ik bij de Mamanuca-eilanden?",
          answer:
            "Internationale vluchten komen aan op Nadi International Airport. Privétransfers, watervliegtuigen en resortboten brengen u binnen enkele uren naar uw eindbestemming.",
        },
      ],
    },
    yasawa: {
      title: "Yasawa-eilanden",
      tagline: "Afgelegen eilanden & ongerepte schoonheid",
      overview:
        "De Yasawa-archipel biedt Fiji op zijn meest rauwe en romantische — dramatische vulkanische pieken, blue-hole grotten, verlaten stranden en enkele van de meest exclusieve eco-luxe retreats in de Zuid-Pacifische regio.",
      highlights: ["Sawa-i-Lau grotten", "Blue Lagoon", "Afgelegen luxe lodges"],
      thingsToDo: ["Zwemmen in grotten", "Dorps homestays", "Wandelen", "Duiken"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "Luxe lodges op blote voeten"],
      tours: ["Blue Lagoon dagtrip", "Grotexpeditie", "Multi-eiland zeilen"],
      beaches: ["Octopus Beach", "Nanuya Levu", "Privé resortbaaien"],
      dining: ["Strandfeesten", "Resortdegustatie", "BBQ van de vangst van de dag"],
      transport: ["Yasawa Flyer veerboot", "Watervliegtuig", "Privé jacht"],
      culture: ["Afgelegen dorpsbezoeken", "Traditioneel vissen", "Verhaalavonden"],
      weather: "Droger dan het vasteland. Beste zicht jun–sep.",
      faqs: [
        {
          question: "Wat is de beste tijd om de Yasawa-eilanden te bezoeken?",
          answer:
            "Mei tot oktober biedt droog, zonnig weer ideaal voor stranden en wateractiviteiten. November tot april is warmer met weelderige landschappen en minder drukte bij luxe resorts.",
        },
        {
          question: "Hoe kom ik bij de Yasawa-eilanden?",
          answer:
            "Internationale vluchten komen aan op Nadi International Airport. Privétransfers, watervliegtuigen en resortboten brengen u binnen enkele uren naar uw eindbestemming.",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "Tuineiland & watervalregio",
      overview:
        "Bekend als het Tuineiland is Taveuni een UNESCO-rijk paradijs van regenwoud, watervallen en wereldberoemde duikplekken — ideaal voor avonturiers en koppels die natuur buiten het resortcircuit zoeken.",
      highlights: ["Bouma National Heritage Park", "Rainbow Reef duiken", "Tavoro-watervallen"],
      thingsToDo: ["Watervalwandelingen", "Scubaduiken", "Vogelspotten", "Kajakken"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "Eco-lodges"],
      tours: ["Bouma Falls trek", "Rainbow Reef duik", "Lavena Coastal Walk"],
      beaches: ["Lavena Beach", "Matei Beach", "Verborgen baaien"],
      dining: ["Plantage-stijl dineren", "Vers tropisch fruit", "Resort fusionmenu's"],
      transport: ["Binnenlandse vlucht vanuit Nadi/Suva", "Resorttransfers", "Bootcharters"],
      culture: ["Wainibau-dorp", "Traditionele taro-boerderijen", "Lokaal ambacht"],
      weather: "Natste regio — het hele jaar weelderig. Duiken het beste apr–okt.",
      faqs: [
        {
          question: "Wat is de beste tijd om Taveuni te bezoeken?",
          answer:
            "Mei tot oktober biedt droog, zonnig weer ideaal voor stranden en wateractiviteiten. November tot april is warmer met weelderige landschappen en minder drukte bij luxe resorts.",
        },
        {
          question: "Hoe kom ik bij Taveuni?",
          answer:
            "Internationale vluchten komen aan op Nadi International Airport. Privétransfers, watervliegtuigen en resortboten brengen u binnen enkele uren naar uw eindbestemming.",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "Avonturenhoofdstad van Fiji",
      overview:
        "Pacific Harbour is Fiji's adrenaline-adres — haaienduiken in Beqa Lagoon, wildwaterraften, zip-linen en luxe villa's met uitzicht op de Stille Oceaan, allemaal binnen bereik van Suva.",
      highlights: ["Haaienduiken", "Wildwaterraften", "Zip Fiji"],
      thingsToDo: ["Haaienvoerduik", "Raften Upper Navua", "Golf", "Diepzeevissen"],
      placesToStay: ["The Pearl South Pacific", "Luxe villa's", "Boutique lodges"],
      tours: ["Beqa-haaienontmoeting", "Rivierraftdag", "Vischarter"],
      beaches: ["Natadola (nabij)", "Verborgen baaien", "Resortstranden"],
      dining: ["Marinarestaurants", "Resort fine dining", "Lokale zeevruchten"],
      transport: ["2,5 uur van Nadi", "45 min van Suva", "Helikopter beschikbaar"],
      culture: ["Beqa vuurlopen", "Dorpsoptredens", "Ambachtmarkten"],
      weather: "Iets natter dan de westkust. Avontuursporten het hele jaar.",
      faqs: [
        {
          question: "Wat is de beste tijd om Pacific Harbour te bezoeken?",
          answer:
            "Mei tot oktober biedt droog, zonnig weer ideaal voor stranden en wateractiviteiten. November tot april is warmer met weelderige landschappen en minder drukte bij luxe resorts.",
        },
        {
          question: "Hoe kom ik bij Pacific Harbour?",
          answer:
            "Internationale vluchten komen aan op Nadi International Airport. Privétransfers, watervliegtuigen en resortboten brengen u binnen enkele uren naar uw eindbestemming.",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "Hoofdstad van cultuur & handel",
      overview:
        "Suva is het kloppende hart van modern Fiji — koloniale architectuur, bruisende markten, musea en een groeiende fine dining-scene, perfect voor reizigers die cultuur vóór het strand willen.",
      highlights: ["Fiji Museum", "Gemeentelijke markt", "Parlement & Thurston Gardens"],
      thingsToDo: ["Marktrondleidingen", "Museumbezoeken", "Koloniale wandelingen", "Nachtleven"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "Boutique stadshotels"],
      tours: ["Stadserfgoedwandeling", "Colo-i-Suva boszwemmen", "Hoogland dagtrip"],
      beaches: ["Geen stadstrand — dagtrips naar Pacific Harbour"],
      dining: ["Fine dining", "Indiaas straateten", "Zeevruchtenmarkten"],
      transport: ["Nausori International Airport", "Bus naar Coral Coast", "Binnenlandse vluchten"],
      culture: ["Fijisch, Indiaas & Chinees erfgoed", "Live muziek", "Kunstgaleries"],
      weather: "Natste grote stad. Neem het hele jaar lichte regenkleding mee.",
      faqs: [
        {
          question: "Wat is de beste tijd om Suva te bezoeken?",
          answer:
            "Mei tot oktober biedt droog, zonnig weer ideaal voor stranden en wateractiviteiten. November tot april is warmer met weelderige landschappen en minder drukte bij luxe resorts.",
        },
        {
          question: "Hoe kom ik bij Suva?",
          answer:
            "Internationale vluchten komen aan op Nadi International Airport. Privétransfers, watervliegtuigen en resortboten brengen u binnen enkele uren naar uw eindbestemming.",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "Snorkelen in kristalhelder water",
      category: "Water",
      duration: "Halve dag",
      ages: "Alle leeftijden",
      overview:
        "Glij over regenboogkoraaltuinen in de helderste lagunes van de Mamanucas met een privégids, premium uitrusting en een champagnepicknick op een verlaten zandbank.",
      highlights: ["Privégids", "Premium snorkeluitrusting", "Champagnepicknick", "Marinebioloog briefing"],
      included: ["Retour boottransfer", "Snorkeluitrusting", "Verfrissingen", "Marineparkkosten"],
      itinerary: ["Vertrek Denarau marina", "Twee snorkelplekken", "Zandbankpicknick", "Retour zonsondergangcruise"],
      faqs: [
        { question: "Heb ik ervaring nodig?", answer: "Nee — geschikt voor beginners met basiszwemvaardigheid." },
        { question: "Wat moet ik meenemen?", answer: "Rifvriendelijke zonnebrandcrème, zwemkleding en een lichte cover-up." },
      ],
    },
    "sunset-cruises": {
      title: "Zonsondergangcruises",
      category: "Zeilen",
      duration: "2–3 uur",
      ages: "Alle leeftijden",
      overview:
        "Zeil naar een gouden Pacifische zonsondergang aan boord van een luxe catamaran met canapés, premium drankjes en live Fijische gitaar terwijl de Mamanuca-silhouetten in de schemering vervagen.",
      highlights: ["Luxe catamaran", "Canapés & drankjes", "Live muziek", "360° zonsondergangzicht"],
      included: ["Welkomstdrankje", "Canapéselectie", "Retourtransfer optie"],
      itinerary: ["Instappen marina", "Kustzeilen", "Zonsondergangtoast", "Terug onder de sterren"],
      faqs: [
        { question: "Is het weerafhankelijk?", answer: "Cruises varen in de meeste omstandigheden; volledige terugbetaling bij annulering om veiligheidsredenen." },
      ],
    },
    "hiking-waterfalls": {
      title: "Wandelen & watervallen",
      category: "Avontuur",
      duration: "Hele dag",
      ages: "16+",
      overview:
        "Trek door Bouma National Heritage Park naar verborgen watervallen, zwem in smaragdgroene poelen en lunch met tropisch fruit in het ongerepte regenwoud van het Tuineiland.",
      highlights: ["Deskundige lokale gids", "Drie watervalzwemstops", "Regenwoudecologie", "Farm-to-table lunch"],
      included: ["Parkkosten", "Gids", "Lunch", "Transfers vanuit resort"],
      itinerary: ["Ochtend boswandeling", "Watervalzwemmen", "Dorpslunch", "Namiddag terugkeer"],
      faqs: [
        { question: "Conditieniveau?", answer: "Gemiddeld — 4–5 uur op oneffen paden met enkele steile stukken." },
      ],
    },
    "village-tours": {
      title: "Dorpsrondleidingen",
      category: "Cultuur",
      duration: "Halve dag",
      ages: "Alle leeftijden",
      overview:
        "Ervaar authentieke Fijische gastvrijheid — kavaceremonie, meke-dans, ambachtsdemonstraties en een traditioneel lovo-feest bereid door de familie van het dorpshoofd.",
      highlights: ["Kavaceremonie", "Meke-optreden", "Lovo-feest", "Ambachtworkshop"],
      included: ["Dorpsdonatie", "Ceremoniedeelname", "Traditionele lunch", "Vervoer"],
      itinerary: ["Dorpswelkom", "Kava & meke", "Ambachtdemo", "Lovo-lunch"],
      faqs: [
        { question: "Wat moet ik dragen?", answer: "Bescheiden kleding die schouders en knieën bedekt. Verwijder hoeden in het dorp." },
      ],
    },
    "island-hopping": {
      title: "Eilandhop-avontuur",
      category: "Meerdere dagen",
      duration: "3–7 dagen",
      ages: "Alle leeftijden",
      overview:
        "Gecureerde multi-eilandreis per privéspeedboot of watervliegtuig — boutique resorts, verborgen stranden en bespoke ervaringen op maat van uw conciërge.",
      highlights: ["Privétransfers", "Boutique resortverblijven", "Flexibel reisplan", "Toegewijde conciërge"],
      included: ["Inter-eiland transfers", "Resortcoördinatie", "Dagelijks ontbijt", "Conciërge-ondersteuning"],
      itinerary: ["Dag 1: Aankomst Mamanuca", "Dag 2–3: Yasawa-verkenning", "Dag 4+: Aangepaste verlengingen"],
      faqs: [
        { question: "Kan ik aanpassen?", answer: "Elke eilandhop is bespoke — uw conciërge ontwerpt de route met u." },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Denarau Island Resort-pakket",
      description: "Vijf nachten oceaanzicht suite met privéluchthaventransfers, dagelijks ontbijt en marinatoegang.",
      includes: ["Privétransfer", "Oceaanzicht suite", "Dagelijks ontbijt"],
    },
    "romantic-honeymoon-escape": {
      title: "Romantische huwelijksreis",
      description: "Koppelretreat met privé zandbankdiner, spa-ritueel voor koppels en zonsondergangzeilen.",
      includes: ["Privédiner", "Spa voor koppels", "Zonsondergangcruise"],
    },
    "mamanuca-island-escape": {
      title: "Mamanuca-eilandontsnapping",
      description: "Fly-and-flop pakket — retour watervliegtuigtransfers, lunch boven water en snorkeluitrusting.",
      includes: ["Watervliegtuigtransfer", "Resortkrediet", "Snorkelhuur"],
    },
    "family-coral-coast-package": {
      title: "Familie Coral Coast-pakket",
      description: "Verbindingsbures, kids club-toegang en Natadola Beach-activiteiten voor het hele gezin.",
      includes: ["Kids club", "Familiebure", "Strandactiviteiten"],
    },
    "private-island-buyout": {
      title: "Privé-eiland volledig gehuurd",
      description: "Exclusief gebruik van een Mamanuca-eiland — tot 12 gasten, chef, boot en butlerteam inbegrepen.",
      includes: ["Exclusief eiland", "Privéchef", "Bootcharter"],
    },
    "stay-and-play-nadi": {
      title: "Stay & Play Nadi-pakket",
      description: "Resortverblijf met gecureerde dagtrips — dorpsbezoek, modderpoelen en eilandpicknick.",
      includes: ["Resortverblijf", "2 dagtrips", "Alle transfers"],
    },
    "luxury-overwater-bure": {
      title: "Luxe overwater bure-verblijf",
      description: "Slapen boven kristalhelder water — privéterras, butlerservice en dineren in de bure.",
      includes: ["Overwater bure", "Butlerservice", "Dineren in bure"],
    },
    "coral-coast-beach-escape": {
      title: "Coral Coast strandontsnapping",
      description: "Natadola Beach resort met FJD 200 spakrediet en gecureerd degustatiediner.",
      includes: ["Strandkamer", "Spakrediet", "Degustatiediner"],
    },
    "wellness-spa-retreat": {
      title: "Wellness & spa-retreat",
      description: "Yoga aan zee, traditionele Bobo-massage en biologische farm-to-table dining.",
      includes: ["Dagelijkse yoga", "Spa-ritueel", "Wellness dining"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description: "Fiji's enige overwater bures — adults-only toevluchtsoord met all-inclusive dining.",
      includes: ["Overwater bure", "All-inclusive", "Alleen volwassenen"],
    },
    "mamanuca-island-hopping": {
      title: "Mamanuca eilandhoppen",
      description: "Privéspeedboot, rifsnorkelen en champagnepicknick op een verlaten zandbank.",
      includes: ["Privéboot", "Snorkelen", "Champagnepicknick"],
    },
    "yasawa-adventure-package": {
      title: "Yasawa avonturenpakket",
      description: "Begeleide wandelingen naar verborgen watervallen, zeekajakken en dorpskavaceremonie.",
      includes: ["Watervalwandeling", "Kajakken", "Dorpsbezoek"],
    },
    "beqa-shark-dive": {
      title: "Beqa Lagoon haaienduik",
      description: "Wereldberoemde haaienontmoeting met uitrusting, gids en resorttransfer vanuit Pacific Harbour.",
      includes: ["Haaienduik", "Uitrusting", "Transfer"],
    },
    "sunset-cruise-denarau": {
      title: "Privé zonsondergangcruise",
      description: "Champagnezeilen vanuit Denarau Marina — canapés, live muziek en golden-hour uitzichten.",
      includes: ["Privécharter", "Canapés", "Champagne"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "Fiji's enige resort met overwater bures — Likuliku combineert adults-only intimiteit met wereldklasse dining en een lagune die gloeit bij zonsondergang.",
      amenities: ["Overwater bures", "Alleen volwassenen", "Spa", "Privéstrand", "Fine dining"],
      experiences: ["Snorkelen", "Zonsondergangcruise", "Spa-rituelen"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "Een intiem eiland met 36 bures waar luxe op blote voeten Fijische warmte ontmoet — perfect voor huwelijksreizen en mijlpaalvieringen.",
      amenities: ["Strandbures", "Spa", "Duikcentrum", "Privédineren"],
      experiences: ["Duiken", "Eilandpicknick", "Dorpsbezoek"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "Denarau's toonaangevende gezinsvriendelijke luxe — uitgestrekte zwembaden, nabij championshipgolf en naadloze marinatoegang voor eilandavonturen.",
      amenities: ["Meerdere zwembaden", "Kids club", "Spa", "Marinatoegang", "7 restaurants"],
      experiences: ["Eilandhoppen", "Golf", "Zonsondergangcruise"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Frans gepolijste luxe op Denarau's beste strand — drijvend ontbijt, rif toegang en Sofitel's kenmerkende spafilosofie.",
      amenities: ["Aan het strand", "Spa", "Rifsnorkelen", "Kids club"],
      experiences: ["Rifsnorkelen", "Spadag", "Culturele avond"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "De kroon op Natadola Beach — championshipgolf, het legendarische zand en dorpscultuur voor de deur.",
      amenities: ["Natadola Beach", "Golfbaan", "Spa", "Kids club", "Cultureel centrum"],
      experiences: ["Dorpsrondleiding", "Golf", "Paardrijden op het strand"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "Het eiland dat Fiji voor een generatie definieerde — gezinsvriendelijk, rifomzoomd en moeiteloos authentiek.",
      amenities: ["Privé-eiland", "PADI-centrum", "Kids club", "Meerdere stranden"],
      experiences: ["Snorkelen", "Kajakken", "Dorpsbezoek"],
    },
  },
};
