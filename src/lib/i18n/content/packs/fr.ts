import type { LocaleContentPack } from "../types";

export const frPack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "Planification",
    Style: "Style de voyage",
    Activities: "Activités",
  },
  guides: {
    "first-time-fiji": {
      title: "Première fois aux Fidji",
      excerpt: "Tout ce qu'il faut savoir pour votre premier voyage aux Fidji.",
      category: "Planification",
      overview:
        "Les Fidji sont une première destination idéale — entrée facile, accueil chaleureux et 333 îles à explorer. La plupart des visiteurs n'ont pas besoin de visa jusqu'à quatre mois.",
      sections: [
        {
          title: "Avant le départ",
          body: "Assurez-vous que votre passeport est valide six mois au-delà de la date de voyage. Souscrivez une assurance voyage complète et téléchargez des cartes hors ligne pour les îles reculées.",
          items: ["Validité du passeport", "Assurance voyage", "Devise (FJD)", "Tenue modeste pour les villages"],
        },
        {
          title: "Arrivée et douanes",
          body: "L'aéroport international de Nadi est moderne et efficace. Prévoyez des transferts privés pour éviter les files d'attente et commencer à vous détendre immédiatement.",
          items: ["Transfert privé", "Carte SIM à l'aéroport", "Accueil par le resort"],
        },
        {
          title: "Étiquette insulaire",
          body: "Les Fidjiens comptent parmi les populations les plus accueillantes au monde. Un 'Bula!' chaleureux ouvre bien des portes. Retirez votre chapeau dans les villages et acceptez toujours le kava lorsqu'il vous est offert.",
          items: ["Code vestimentaire au village", "Cérémonie du kava", "Consentement pour les photos"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier ma première visite aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    "visa-guide": {
      title: "Visa et formalités d'entrée",
      excerpt: "Passeports, visas et règles d'entrée — expliqués simplement.",
      category: "Planification",
      overview:
        "La plupart des voyageurs n'ont pas besoin d'organiser un visa avant de voler vers les Fidji. Veillez seulement à ce que votre passeport et votre billet retour répondent aux exigences de l'immigration.",
      sections: [
        {
          title: "Entrée sans visa",
          body: "Les ressortissants de la plupart des pays obtiennent un permis de visiteur valable jusqu'à quatre mois.",
          items: ["Passeport valide 6 mois et plus", "Billet retour", "Justificatif d'hébergement"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier visa et formalités d'entrée ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    "best-time-to-visit": {
      title: "Meilleure période pour visiter les Fidji",
      excerpt: "Météo, saisons et le moment où nous y allons vraiment.",
      category: "Planification",
      overview:
        "Les Fidji sont chaudes toute l'année. La saison sèche (mai–oct.) offre un ciel plus dégagé et des resorts animés ; la saison humide (nov.–avr.) révèle des paysages luxuriants, moins de monde et des tarifs plus doux.",
      sections: [
        {
          title: "Saison sèche (mai–oct.)",
          body: "Moins d'humidité, idéale pour la plongée et la voile. Très prisée — réservez tôt.",
          items: ["Idéale pour la plongée", "Tarifs haute saison", "Festivals et événements"],
        },
        {
          title: "Saison humide (nov.–avr.)",
          body: "Plus chaude avec averses l'après-midi. Intérieurs verdoyants, plages paisibles, bonnes offres.",
          items: ["Tarifs plus bas", "Cascades luxuriantes", "Eau chaude"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier la meilleure période aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    "weather-guide": {
      title: "Météo et climat",
      excerpt: "Comprendre les saisons tropicales des Fidji.",
      category: "Planification",
      overview:
        "Les Fidji se situent dans la ceinture des alizés du Pacifique Sud — chaudes, humides et baignées de soleil la majeure partie de l'année.",
      sections: [
        {
          title: "Différences régionales",
          body: "L'ouest (Denarau, Mamanuca) est plus sec que Suva et Taveuni. Planifiez votre island-hopping en tenant compte des microclimats.",
          items: ["Côte ouest plus sèche", "Suva plus humide", "Saison cyclonique nov.–avr."],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier la météo aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    "luxury-travel": {
      title: "Guide du voyage de luxe",
      excerpt: "Resorts exclusifs et expériences sur mesure.",
      category: "Style de voyage",
      overview:
        "L'offre de luxe fidjienne rivalise avec les plus belles destinations du Pacifique Sud — îles privées, bures sur pilotis, majordomes personnels et transferts en hélicoptère comme standard.",
      sections: [
        {
          title: "Où séjourner",
          body: "Likuliku Lagoon, Turtle Island, Vomo Island et Kokomo Private Island représentent le summum.",
          items: ["Bures sur pilotis", "Îles privées", "Formules tout compris"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier un voyage de luxe aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    honeymoon: {
      title: "Guide lune de miel",
      excerpt: "Évasions romantiques pour les couples.",
      category: "Style de voyage",
      overview:
        "Les Fidji sont l'adresse la plus romantique du Pacifique Sud — dîners privés sur banc de sable, rituels spa en duo et retraites insulaires réservées aux adultes.",
      sections: [
        {
          title: "Expériences romantiques incontournables",
          body: "Voile au coucher du soleil, pique-niques sur île privée et dîners sur pilotis définissent la lune de miel aux Fidji.",
          items: ["Séjour sur île privée", "Spa en couple", "Croisière au coucher du soleil"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier ma lune de miel aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    "family-travel": {
      title: "Guide voyage en famille",
      excerpt: "Les Fidji avec des enfants — un paradis sans stress.",
      category: "Style de voyage",
      overview:
        "La culture fidjienne célèbre les enfants. Clubs enfants, lagons peu profonds et villas familiales de style bure font des Fidji un choix idéal pour les voyages multigénérationnels.",
      sections: [
        {
          title: "Resorts adaptés aux familles",
          body: "Les resorts de Denarau et de la Coral Coast excellent dans les programmes enfants pendant que les parents profitent du spa.",
          items: ["Clubs enfants", "Lagons peu profonds", "Chambres communicantes"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier un voyage en famille aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    adventure: {
      title: "Guide aventure",
      excerpt: "Adrénaline et exploration.",
      category: "Style de voyage",
      overview:
        "De la plongée avec les requins dans la lagune de Beqa aux randonnées vers les cascades de Taveuni, les Fidji offrent une aventure de classe mondiale sans renoncer au luxe.",
      sections: [
        {
          title: "Aventures incontournables",
          body: "Plongée avec requins, rafting, tyrolienne et charters de surf comptent parmi les meilleures du Pacifique.",
          items: ["Plongée avec requins", "Rafting", "Randonnées aux cascades"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier une aventure aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    wellness: {
      title: "Guide bien-être",
      excerpt: "Retrouver corps et esprit au paradis.",
      category: "Style de voyage",
      overview:
        "Yoga face à l'océan, massage traditionnel Bobo et retraites de déconnexion numérique font des Fidji une destination bien-être en plein essor.",
      sections: [
        {
          title: "Rituels bien-être",
          body: "Associez soins spa, bains de forêt et méditation sur le récif pour une renaissance holistique.",
          items: ["Spa face à l'océan", "Retraites yoga", "Programmes détox"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier un séjour bien-être aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    culture: {
      title: "Guide culture",
      excerpt: "Traditions fidjiennes authentiques.",
      category: "Style de voyage",
      overview:
        "La culture fidjienne est vivante et généreuse — visites de villages, danse meke et cérémonies du kava offrent une connexion authentique au-delà des murs du resort.",
      sections: [
        {
          title: "Expériences culturelles",
          body: "Visitez toujours avec un guide qui entretient les relations villageoises et garantit une participation respectueuse.",
          items: ["Visite de village", "Spectacle meke", "Ateliers artisanaux"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier des expériences culturelles aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    "food-drink": {
      title: "Guide gastronomie",
      excerpt: "Que manger et boire aux Fidji.",
      category: "Style de voyage",
      overview:
        "La cuisine fidjienne mêle traditions insulaires aux saveurs indiennes et chinoises — des festins lovo cuits dans la terre aux menus dégustation raffinés des resorts.",
      sections: [
        {
          title: "À ne pas manquer",
          body: "Kokoda, lovo, wraps de roti et un long déjeuner dans un bon restaurant de resort.",
          items: ["Festin lovo", "Kokoda", "Dégustation au resort"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier des expériences gastronomiques aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    transportation: {
      title: "Guide des transports",
      excerpt: "Vols, ferries et liaisons inter-îles.",
      category: "Planification",
      overview:
        "La moitié du plaisir réside dans le voyage — hydravions, speedboats et vols intérieurs relient les îles plus vite qu'on ne l'imagine.",
      sections: [
        {
          title: "Voyager entre les îles",
          body: "La marina de Denarau dessert les ferries vers Mamanuca et Yasawa. Les hydravions atteignent les spots de luxe les plus reculés.",
          items: ["Fiji Airways intérieur", "Yasawa Flyer", "Transferts en hydravion"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier les transports aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    "island-hopping": {
      title: "Guide island-hopping",
      excerpt: "Passer d'île en île sans tracas.",
      category: "Planification",
      overview:
        "L'island-hopping est la grande force des Fidji. Nous tracons des itinéraires à travers Mamanuca, Yasawa et les escales plus discrètes — adaptés à vos dates et à votre budget.",
      sections: [
        {
          title: "Itinéraires types",
          body: "Trois jours aux Mamanuca, une semaine aux Yasawa ou dix jours mêlant les deux — tout se personnalise facilement.",
          items: ["Express 3 jours", "Explorateur 7 jours", "Ultimate 10 jours"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier l'island-hopping aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    diving: {
      title: "Guide plongée",
      excerpt: "Récifs, requins et sites de classe mondiale.",
      category: "Activités",
      overview:
        "Rainbow Reef, Beqa Lagoon et Great White Wall comptent parmi les plus beaux sites de plongée de la planète.",
      sections: [
        {
          title: "Sites de plongée incontournables",
          body: "Plongée avec requins à Beqa, Rainbow Reef et Namena — pour tous les niveaux.",
          items: ["Requins de Beqa", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier la plongée aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    surfing: {
      title: "Guide surf",
      excerpt: "Les spots dont tout le monde parle.",
      category: "Activités",
      overview:
        "Cloudbreak, Restaurants et Frigates — des vagues sérieuses, généralement accessibles en bateau depuis Denarau ou les Mamanuca.",
      sections: [
        {
          title: "Spots incontournables",
          body: "Cloudbreak est la célèbre gauche des Fidji. Affrétez un bateau depuis un resort voisin pour des sessions à l'aube.",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier le surf aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
    "travel-planning": {
      title: "Hub planification voyage",
      excerpt: "Votre centre névralgique pour l'évasion parfaite aux Fidji.",
      category: "Planification",
      overview:
        "Tout au même endroit — guides, outils, conciergerie et création d'itinéraires sur mesure pour un voyage de luxe aux Fidji.",
      sections: [
        {
          title: "Commencez ici",
          body: "Indiquez-nous vos dates, votre style et votre budget — notre conciergerie élabore un itinéraire sur mesure sous 24 heures.",
          items: ["Consultation gratuite", "Itinéraire sur mesure", "Garantie du meilleur prix"],
        },
      ],
      faqs: [
        {
          question: "Combien de temps à l'avance dois-je planifier mon évasion aux Fidji ?",
          answer:
            "Les resorts de luxe se remplissent rapidement en haute saison (juin–septembre). Réservez 3 à 6 mois à l'avance si possible — nous trouvons souvent encore de la disponibilité chez nos partenaires en dernière minute.",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "Plages dorées et culture fidjienne authentique",
      overview:
        "La Coral Coast s'étend le long de la côte sud de Viti Levu — un ruban de plages bordées de palmiers, de resorts de luxe et de villages traditionnels où les cérémonies de marche sur le feu et les rituels du kava rythment encore la vie quotidienne.",
      highlights: ["Dunes de Sigatoka", "Cérémonies villageoises", "Resorts de plage de luxe"],
      thingsToDo: ["Visites de villages", "Safaris fluviaux", "Golf sur parcours de championnat", "Retraites spa"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "Villas privées en bord de mer"],
      tours: ["Journée d'immersion culturelle", "Vol hélicoptère côtier", "Croisière dhow au coucher du soleil"],
      beaches: ["Natadola Beach", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["Gastronomie en bord de mer", "Festins lovo", "Menus dégustation au resort"],
      transport: ["Aéroport de Nadi 1 h", "Transferts privés resort", "Route côtière panoramique"],
      culture: ["Spectacles meke", "Villages de potiers", "Marchés artisanaux traditionnels"],
      weather: "Chaud toute l'année. Saison sèche mai–oct. (26–30 °C). Saison humide nov.–avr. avec averses l'après-midi.",
      faqs: [
        {
          question: "Quelle est la meilleure période pour visiter la Coral Coast ?",
          answer:
            "De mai à octobre, le temps est sec et ensoleillé, idéal pour les plages et les activités nautiques. De novembre à avril, il fait plus chaud avec des paysages luxuriants et moins de monde dans les resorts de luxe.",
        },
        {
          question: "Comment se rendre à la Coral Coast ?",
          answer:
            "Les vols internationaux arrivent à l'aéroport international de Nadi. Transferts privés, hydravions et bateaux de resort vous mènent à destination en quelques heures.",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "Porte d'entrée des îles Fidji",
      overview:
        "Nadi est votre point d'arrivée au paradis — une escale vibrante reliant les voyageurs internationaux aux îles Mamanuca et Yasawa, à la marina de Denarau et à l'intérieur montagneux des Fidji.",
      highlights: ["Temple Sri Siva Subramaniya", "Garden of the Sleeping Giant", "Denarau Marina"],
      thingsToDo: ["Excursions d'une journée aux îles", "Visites de temples", "Tours de marchés", "Golf"],
      placesToStay: ["Resorts de Denarau", "Hôtels boutique à Nadi", "Hébergements de transit à l'aéroport"],
      tours: ["Croisière d'une journée aux Mamanuca", "Bains de boue et sources chaudes de Sabeto", "Visite de village dans les hauts plateaux"],
      beaches: ["Denarau Beach", "Wailoaloa Beach"],
      dining: ["Fusion indo-fidjienne", "Restaurants de resort", "Produits du marché local"],
      transport: ["Aéroport international de Nadi", "Terminal ferry de Denarau", "Transferts en hélicoptère"],
      culture: ["Architecture de temples hindous", "Marchés multiculturels", "Centres artisanaux fidjiens"],
      weather: "Tropical et humide. Meilleure visibilité pour l'island-hopping de mai à oct.",
      faqs: [
        {
          question: "Quelle est la meilleure période pour visiter Nadi ?",
          answer:
            "De mai à octobre, le temps est sec et ensoleillé, idéal pour les plages et les activités nautiques. De novembre à avril, il fait plus chaud avec des paysages luxuriants et moins de monde dans les resorts de luxe.",
        },
        {
          question: "Comment se rendre à Nadi ?",
          answer:
            "Les vols internationaux arrivent à l'aéroport international de Nadi. Transferts privés, hydravions et bateaux de resort vous mènent à destination en quelques heures.",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "Marina de luxe et resorts de classe mondiale",
      overview:
        "L'île de Denarau est l'adresse de luxe par excellence aux Fidji — une enclave sécurisée de resorts cinq étoiles, golf de championnat, gastronomie raffinée et principal point de départ pour les croisières vers Mamanuca et Yasawa.",
      highlights: ["Port Denarau Marina", "Golf de championnat", "Shopping de luxe"],
      thingsToDo: ["Croisières au coucher du soleil", "Safaris jet-ski", "Rituels spa", "Island-hopping"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "Résidences privées"],
      tours: ["Charter yacht privé", "Tour des îles en hélicoptère", "Forfaits golf et spa"],
      beaches: ["Denarau Beach", "Piscines lagons des resorts"],
      dining: ["Ports O' Call", "Nuku Restaurant", "Restaurants beach club"],
      transport: ["10 min de l'aéroport de Nadi", "Ferries de la marina", "Service de voiture privée"],
      culture: ["Soirées meke au resort", "Marchés artisanaux", "Cours de cuisine fidjienne"],
      weather: "Côte ouest abritée — plus sèche que Suva. Idéale de mai à octobre.",
      faqs: [
        {
          question: "Quelle est la meilleure période pour visiter Denarau ?",
          answer:
            "De mai à octobre, le temps est sec et ensoleillé, idéal pour les plages et les activités nautiques. De novembre à avril, il fait plus chaud avec des paysages luxuriants et moins de monde dans les resorts de luxe.",
        },
        {
          question: "Comment se rendre à Denarau ?",
          answer:
            "Les vols internationaux arrivent à l'aéroport international de Nadi. Transferts privés, hydravions et bateaux de resort vous mènent à destination en quelques heures.",
        },
      ],
    },
    mamanuca: {
      title: "Îles Mamanuca",
      tagline: "Paradis de naufrage et lagons cristallins",
      overview:
        "L'archipel Mamanuca est la chaîne insulaire la plus emblématique des Fidji — lagons turquoise, luxe pieds nus et décor de rêves tropicales, accessible en hydravion ou speedboat depuis Denarau.",
      highlights: ["Castaway Island", "Cloud 9 Floating Bar", "Snorkeling de classe mondiale"],
      thingsToDo: ["Snorkeling", "Surf à Cloudbreak", "Kayak", "Pique-niques privés"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["Safari snorkeling", "Voile au coucher du soleil", "Baptême de plongée"],
      beaches: ["Monuriki Beach", "Modriki Island", "Plages privées des resorts"],
      dining: ["Dîner sur pilotis", "BBQ sur la plage", "Expériences bar flottant"],
      transport: ["Speedboat depuis Denarau", "Transferts en hydravion", "Bateaux privés des resorts"],
      culture: ["Soirées culturelles au resort", "Visites de villages sur les îles voisines"],
      weather: "Rafraîchie par les alizés. Saison sèche idéale pour la clarté de l'eau.",
      faqs: [
        {
          question: "Quelle est la meilleure période pour visiter les îles Mamanuca ?",
          answer:
            "De mai à octobre, le temps est sec et ensoleillé, idéal pour les plages et les activités nautiques. De novembre à avril, il fait plus chaud avec des paysages luxuriants et moins de monde dans les resorts de luxe.",
        },
        {
          question: "Comment se rendre aux îles Mamanuca ?",
          answer:
            "Les vols internationaux arrivent à l'aéroport international de Nadi. Transferts privés, hydravions et bateaux de resort vous mènent à destination en quelques heures.",
        },
      ],
    },
    yasawa: {
      title: "Îles Yasawa",
      tagline: "Îles reculées et beauté préservée",
      overview:
        "L'archipel Yasawa offre les Fidji dans leur forme la plus brute et romantique — sommets volcaniques dramatiques, grottes blue hole, plages désertes et quelques-uns des retraites éco-luxe les plus exclusives du Pacifique Sud.",
      highlights: ["Grottes de Sawa-i-Lau", "Blue Lagoon", "Lodges de luxe reculés"],
      thingsToDo: ["Baignade en grotte", "Homestays villageois", "Randonnée", "Plongée"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "Lodges de luxe pieds nus"],
      tours: ["Excursion Blue Lagoon", "Expédition en grotte", "Voile multi-îles"],
      beaches: ["Octopus Beach", "Nanuya Levu", "Criques privées des resorts"],
      dining: ["Festins sur la plage", "Dégustation au resort", "BBQ du jour de pêche"],
      transport: ["Ferry Yasawa Flyer", "Hydravion", "Yacht privé"],
      culture: ["Visites de villages reculés", "Pêche traditionnelle", "Soirées contes"],
      weather: "Plus sec que le continent. Meilleure visibilité juin–sep.",
      faqs: [
        {
          question: "Quelle est la meilleure période pour visiter les îles Yasawa ?",
          answer:
            "De mai à octobre, le temps est sec et ensoleillé, idéal pour les plages et les activités nautiques. De novembre à avril, il fait plus chaud avec des paysages luxuriants et moins de monde dans les resorts de luxe.",
        },
        {
          question: "Comment se rendre aux îles Yasawa ?",
          answer:
            "Les vols internationaux arrivent à l'aéroport international de Nadi. Transferts privés, hydravions et bateaux de resort vous mènent à destination en quelques heures.",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "Île-jardin et royaume des cascades",
      overview:
        "Surnommée l'Île-Jardin, Taveuni est un paradis riche en sites UNESCO — forêts tropicales, cascades et spots de plongée mondialement célèbres — idéale pour les aventuriers et les couples en quête de nature hors des sentiers battus.",
      highlights: ["Bouma National Heritage Park", "Plongée Rainbow Reef", "Cascades de Tavoro"],
      thingsToDo: ["Randonnées aux cascades", "Plongée sous-marine", "Observation des oiseaux", "Kayak"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "Éco-lodges"],
      tours: ["Trek Bouma Falls", "Plongée Rainbow Reef", "Lavena Coastal Walk"],
      beaches: ["Lavena Beach", "Matei Beach", "Criques secrètes"],
      dining: ["Restauration style plantation", "Produits tropicaux frais", "Menus fusion au resort"],
      transport: ["Vol intérieur depuis Nadi/Suva", "Transferts resort", "Charters bateau"],
      culture: ["Village de Wainibau", "Plantations de taro traditionnelles", "Artisanat local"],
      weather: "Région la plus humide — luxuriante toute l'année. Plongée idéale avr.–oct.",
      faqs: [
        {
          question: "Quelle est la meilleure période pour visiter Taveuni ?",
          answer:
            "De mai à octobre, le temps est sec et ensoleillé, idéal pour les plages et les activités nautiques. De novembre à avril, il fait plus chaud avec des paysages luxuriants et moins de monde dans les resorts de luxe.",
        },
        {
          question: "Comment se rendre à Taveuni ?",
          answer:
            "Les vols internationaux arrivent à l'aéroport international de Nadi. Transferts privés, hydravions et bateaux de resort vous mènent à destination en quelques heures.",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "Capitale de l'aventure aux Fidji",
      overview:
        "Pacific Harbour est l'adresse adrénaline des Fidji — plongée avec requins dans la lagune de Beqa, rafting, tyrolienne et villas de luxe surplombant le Pacifique, le tout à portée de Suva.",
      highlights: ["Plongée avec requins", "Rafting", "Zip Fiji"],
      thingsToDo: ["Plongée nourrissage requins", "Rafting Upper Navua", "Golf", "Pêche hauturière"],
      placesToStay: ["The Pearl South Pacific", "Villas de luxe", "Lodges boutique"],
      tours: ["Rencontre requins Beqa", "Journée rafting", "Charter de pêche"],
      beaches: ["Natadola (à proximité)", "Criques secrètes", "Plages des resorts"],
      dining: ["Restaurants de marina", "Gastronomie au resort", "Fruits de mer locaux"],
      transport: ["2 h 30 de Nadi", "45 min de Suva", "Hélicoptère disponible"],
      culture: ["Marche sur le feu de Beqa", "Spectacles villageois", "Marchés artisanaux"],
      weather: "Légèrement plus humide que la côte ouest. Sports d'aventure toute l'année.",
      faqs: [
        {
          question: "Quelle est la meilleure période pour visiter Pacific Harbour ?",
          answer:
            "De mai à octobre, le temps est sec et ensoleillé, idéal pour les plages et les activités nautiques. De novembre à avril, il fait plus chaud avec des paysages luxuriants et moins de monde dans les resorts de luxe.",
        },
        {
          question: "Comment se rendre à Pacific Harbour ?",
          answer:
            "Les vols internationaux arrivent à l'aéroport international de Nadi. Transferts privés, hydravions et bateaux de resort vous mènent à destination en quelques heures.",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "Capitale de la culture et du commerce",
      overview:
        "Suva est le cœur battant des Fidji modernes — architecture coloniale, marchés animés, musées et scène gastronomique en plein essor, parfaite pour les voyageurs qui privilégient la culture avant la plage.",
      highlights: ["Fiji Museum", "Marché municipal", "Parlement et Thurston Gardens"],
      thingsToDo: ["Tours de marchés", "Visites de musées", "Promenades coloniales", "Vie nocturne"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "Hôtels boutique en ville"],
      tours: ["Balade patrimoine urbain", "Baignade en forêt Colo-i-Suva", "Excursion d'une journée dans les hauts plateaux"],
      beaches: ["Pas de plage en ville — excursions vers Pacific Harbour"],
      dining: ["Gastronomie raffinée", "Street food indienne", "Marchés aux poissons"],
      transport: ["Aéroport international de Nausori", "Bus vers Coral Coast", "Vols intérieurs"],
      culture: ["Héritage fidjien, indien et chinois", "Musique live", "Galeries d'art"],
      weather: "Grande ville la plus humide. Prévoyez un imperméable léger toute l'année.",
      faqs: [
        {
          question: "Quelle est la meilleure période pour visiter Suva ?",
          answer:
            "De mai à octobre, le temps est sec et ensoleillé, idéal pour les plages et les activités nautiques. De novembre à avril, il fait plus chaud avec des paysages luxuriants et moins de monde dans les resorts de luxe.",
        },
        {
          question: "Comment se rendre à Suva ?",
          answer:
            "Les vols internationaux arrivent à l'aéroport international de Nadi. Transferts privés, hydravions et bateaux de resort vous mènent à destination en quelques heures.",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "Snorkeling dans des eaux cristallines",
      category: "Eau",
      duration: "Demi-journée",
      ages: "Tous âges",
      overview:
        "Glissez au-dessus de jardins de corail arc-en-ciel dans les lagons les plus clairs des Mamanuca avec un guide privé, un équipement premium et un pique-nique champagne sur un banc de sable désert.",
      highlights: ["Guide privé", "Équipement snorkeling premium", "Pique-nique champagne", "Briefing biologiste marin"],
      included: ["Transfert bateau aller-retour", "Équipement snorkeling", "Rafraîchissements", "Droits parc marin"],
      itinerary: ["Départ marina de Denarau", "Deux sites de snorkeling", "Pique-nique sur banc de sable", "Retour croisière au coucher du soleil"],
      faqs: [
        { question: "Faut-il de l'expérience ?", answer: "Non — adapté aux débutants avec des bases de natation." },
        { question: "Que dois-je apporter ?", answer: "Crème solaire respectueuse des récifs, maillot de bain et vêtement léger." },
      ],
    },
    "sunset-cruises": {
      title: "Croisières au coucher du soleil",
      category: "Voile",
      duration: "2–3 heures",
      ages: "Tous âges",
      overview:
        "Naviguez vers un coucher de soleil doré sur le Pacifique à bord d'un catamaran de luxe avec canapés, boissons premium et guitare fidjienne live, tandis que les silhouettes Mamanuca s'estompent dans le crépuscule.",
      highlights: ["Catamaran de luxe", "Canapés et boissons", "Musique live", "Vues panoramiques au coucher du soleil"],
      included: ["Boisson de bienvenue", "Sélection de canapés", "Option transfert retour"],
      itinerary: ["Embarquement à la marina", "Navigation côtière", "Toast au coucher du soleil", "Retour sous les étoiles"],
      faqs: [
        {
          question: "Est-ce dépendant de la météo ?",
          answer: "Les croisières ont lieu dans la plupart des conditions ; remboursement intégral en cas d'annulation pour raisons de sécurité.",
        },
      ],
    },
    "hiking-waterfalls": {
      title: "Randonnée et cascades",
      category: "Aventure",
      duration: "Journée entière",
      ages: "16 ans et plus",
      overview:
        "Randonnez dans le Bouma National Heritage Park jusqu'à des cascades secrètes, baignez-vous dans des bassins émeraude et déjeunez de fruits tropicaux dans la forêt tropicale intacte de l'Île-Jardin.",
      highlights: ["Guide local expert", "Trois arrêts baignade aux cascades", "Écologie de la forêt tropicale", "Déjeuner farm-to-table"],
      included: ["Droits d'entrée au parc", "Guide", "Déjeuner", "Transferts depuis le resort"],
      itinerary: ["Trek matinal en forêt", "Baignades aux cascades", "Déjeuner au village", "Retour l'après-midi"],
      faqs: [
        {
          question: "Niveau de forme requis ?",
          answer: "Modéré — 4 à 5 heures sur sentiers irréguliers avec quelques sections escarpées.",
        },
      ],
    },
    "village-tours": {
      title: "Visites de villages",
      category: "Culture",
      duration: "Demi-journée",
      ages: "Tous âges",
      overview:
        "Vivez l'hospitalité fidjienne authentique — cérémonie du kava, danse meke, démonstrations artisanales et festin lovo traditionnel préparé par la famille du chef du village.",
      highlights: ["Cérémonie du kava", "Spectacle meke", "Festin lovo", "Atelier artisanal"],
      included: ["Don au village", "Participation à la cérémonie", "Déjeuner traditionnel", "Transport"],
      itinerary: ["Accueil au village", "Kava et meke", "Démonstration artisanale", "Déjeuner lovo"],
      faqs: [
        {
          question: "Que dois-je porter ?",
          answer: "Tenue modeste couvrant épaules et genoux. Retirez votre chapeau au village.",
        },
      ],
    },
    "island-hopping": {
      title: "Aventure island-hopping",
      category: "Plusieurs jours",
      duration: "3–7 jours",
      ages: "Tous âges",
      overview:
        "Voyage multi-îles sur mesure en speedboat privé ou hydravion — resorts boutique, plages secrètes et expériences personnalisées par votre conciergerie.",
      highlights: ["Transferts privés", "Séjours en resorts boutique", "Itinéraire flexible", "Conciergerie dédiée"],
      included: ["Transferts inter-îles", "Coordination resort", "Petit-déjeuner quotidien", "Support conciergerie"],
      itinerary: ["Jour 1 : arrivée Mamanuca", "Jours 2–3 : exploration Yasawa", "Jour 4+ : extensions sur mesure"],
      faqs: [
        {
          question: "Puis-je personnaliser ?",
          answer: "Chaque island-hopping est sur mesure — votre conciergerie conçoit l'itinéraire avec vous.",
        },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Forfait resort Denarau Island",
      description: "Cinq nuits en suite vue mer, transferts privés aéroport, petit-déjeuner quotidien et accès à la marina.",
      includes: ["Transfert privé", "Suite vue mer", "Petit-déjeuner quotidien"],
    },
    "romantic-honeymoon-escape": {
      title: "Évasion romantique lune de miel",
      description: "Retraite en couple avec dîner privé sur banc de sable, rituel spa en duo et voile au coucher du soleil.",
      includes: ["Dîner privé", "Spa en couple", "Croisière au coucher du soleil"],
    },
    "mamanuca-island-escape": {
      title: "Évasion îles Mamanuca",
      description: "Forfait fly-and-flop — transferts hydravion aller-retour, déjeuner sur pilotis et équipement snorkeling.",
      includes: ["Transfert hydravion", "Crédit resort", "Location snorkeling"],
    },
    "family-coral-coast-package": {
      title: "Forfait famille Coral Coast",
      description: "Bures communicantes, accès club enfants et activités plage à Natadola pour toute la famille.",
      includes: ["Club enfants", "Bure familial", "Activités plage"],
    },
    "private-island-buyout": {
      title: "Location exclusive d'île privée",
      description: "Usage exclusif d'une île Mamanuca — jusqu'à 12 convives, chef, bateau et équipe de majordomes inclus.",
      includes: ["Île exclusive", "Chef privé", "Charter bateau"],
    },
    "stay-and-play-nadi": {
      title: "Forfait Stay & Play Nadi",
      description: "Séjour resort avec excursions d'une journée — visite de village, bains de boue et pique-nique insulaire.",
      includes: ["Séjour resort", "2 excursions", "Tous les transferts"],
    },
    "luxury-overwater-bure": {
      title: "Séjour bure de luxe sur pilotis",
      description: "Dormez au-dessus d'eaux cristallines — terrasse privée, service majordome et room service en bure.",
      includes: ["Bure sur pilotis", "Service majordome", "Room service en bure"],
    },
    "coral-coast-beach-escape": {
      title: "Évasion plage Coral Coast",
      description: "Resort Natadola Beach avec crédit spa FJD 200 et dîner dégustation sur mesure.",
      includes: ["Chambre en bord de mer", "Crédit spa", "Dîner dégustation"],
    },
    "wellness-spa-retreat": {
      title: "Retraite bien-être et spa",
      description: "Yoga face à l'océan, massage traditionnel Bobo et cuisine bio farm-to-table.",
      includes: ["Yoga quotidien", "Rituel spa", "Restauration bien-être"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description: "Les seuls bures sur pilotis des Fidji — sanctuaire réservé aux adultes avec restauration tout compris.",
      includes: ["Bure sur pilotis", "Tout compris", "Adultes uniquement"],
    },
    "mamanuca-island-hopping": {
      title: "Island-hopping Mamanuca",
      description: "Speedboat privé, snorkeling sur récif et pique-nique champagne sur banc de sable désert.",
      includes: ["Bateau privé", "Snorkeling", "Pique-nique champagne"],
    },
    "yasawa-adventure-package": {
      title: "Forfait aventure Yasawa",
      description: "Randonnées guidées vers cascades secrètes, kayak de mer et cérémonie du kava au village.",
      includes: ["Randonnée aux cascades", "Kayak", "Visite de village"],
    },
    "beqa-shark-dive": {
      title: "Plongée requins Beqa Lagoon",
      description: "Rencontre requins mondialement célèbre avec équipement, guide et transfert resort depuis Pacific Harbour.",
      includes: ["Plongée requins", "Équipement", "Transfert"],
    },
    "sunset-cruise-denarau": {
      title: "Croisière privée au coucher du soleil",
      description: "Voile champagne depuis Port Denarau Marina — canapés, musique live et vues golden hour.",
      includes: ["Charter privé", "Canapés", "Champagne"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "Le seul resort des Fidji avec bures sur pilotis — Likuliku allie intimité réservée aux adultes, gastronomie de classe mondiale et une lagune qui s'illumine au coucher du soleil.",
      amenities: ["Bures sur pilotis", "Adultes uniquement", "Spa", "Plage privée", "Gastronomie raffinée"],
      experiences: ["Snorkeling", "Croisière au coucher du soleil", "Rituels spa"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "Une île intime de 36 bures où le luxe pieds nus rencontre la chaleur fidjienne — parfaite pour lunes de miel et célébrations marquantes.",
      amenities: ["Bures en bord de mer", "Spa", "Centre de plongée", "Dîner privé"],
      experiences: ["Plongée", "Pique-nique insulaire", "Visite de village"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "Le resort de luxe familial phare de Denarau — vastes piscines, golf de championnat à proximité et accès fluide à la marina pour vos aventures insulaires.",
      amenities: ["Piscines multiples", "Club enfants", "Spa", "Accès marina", "7 restaurants"],
      experiences: ["Island-hopping", "Golf", "Croisière au coucher du soleil"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Luxe au polish français sur la plus belle plage de Denarau — petits-déjeuners flottants, accès au récif et philosophie spa signature Sofitel.",
      amenities: ["En bord de mer", "Spa", "Snorkeling sur récif", "Club enfants"],
      experiences: ["Snorkeling sur récif", "Journée spa", "Soirée culturelle"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "Joyau couronné de Natadola Beach — golf de championnat, sables légendaires de Natadola et culture villageoise à votre porte.",
      amenities: ["Natadola Beach", "Parcours de golf", "Spa", "Club enfants", "Centre culturel"],
      experiences: ["Visite de village", "Golf", "Équitation sur la plage"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "L'île qui a défini les Fidji pour une génération — familiale, bordée de récif et authentiquement décontractée.",
      amenities: ["Île privée", "Centre PADI", "Club enfants", "Plages multiples"],
      experiences: ["Snorkeling", "Kayak", "Visite de village"],
    },
  },
};
