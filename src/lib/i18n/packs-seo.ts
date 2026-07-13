import type { Messages } from "./en";

type SeoPageMeta = {
  title: string;
  description: string;
};

type LocaleSeoPack = {
  seo: {
    [K in keyof Messages["seo"]]: SeoPageMeta;
  };
};

/** Page meta titles & descriptions — merged into locale packs */
export const localeSeo: Partial<Record<string, LocaleSeoPack>> = {
  fr: {
    seo: {
      home: {
        title: "Voyage de luxe aux Fidji — Vacances insulaires et séjours sur mesure",
        description:
          "Découvrez les Fidji avec des vacances insulaires, resorts premium, lune de miel, plongée et expériences culturelles.",
      },
      destinations: {
        title: "Meilleures destinations aux Fidji — Guides insulaires",
        description:
          "Explorez Nadi, Denarau, Coral Coast, Mamanuca, Yasawa, Taveuni et plus encore.",
      },
      tours: {
        title: "Activités aux Fidji — Aventure, culture et expériences de luxe",
        description:
          "Plongée, snorkeling, saut d'île, visites de villages et retraites bien-être aux Fidji.",
      },
      placesToStay: {
        title: "Resorts de luxe et hébergements aux Fidji",
        description:
          "Resorts, bures sur l'eau, îles privées et villas en bord de mer sélectionnés par notre concierge.",
      },
      guides: {
        title: "Guides de voyage Fidji — Planifiez votre séjour",
        description:
          "Visas, coutumes, meilleure période, santé, voyage de luxe et transports.",
      },
      deals: {
        title: "Offres Fidji — Forfaits de luxe sélectionnés",
        description:
          "Forfaits exclusifs, tarifs resorts et offres saisonnières vérifiés par notre concierge.",
      },
      faq: {
        title: "FAQ Voyage Fidji",
        description:
          "Réponses sur les visas, transferts, resorts et activités aux Fidji.",
      },
      contact: {
        title: "Contactez notre concierge Fidji",
        description:
          "Itinéraires sur mesure, disponibilité des resorts et logistique insulaire.",
      },
      about: {
        title: "À propos de Fiji Luxury Experiences",
        description:
          "Voyages sur mesure aux Fidji conçus par des planificateurs qui connaissent chaque île.",
      },
      explore: {
        title: "Explorer le monde — Inspiration voyage de luxe",
        description:
          "Découvrez des destinations au-delà des Fidji avec notre explorateur interactif.",
      },
      privacy: {
        title: "Déclaration de confidentialité",
        description:
          "Comment Fiji Luxury Experiences collecte, utilise et protège vos données.",
      },
      sitemap: {
        title: "Plan du site",
        description: "Parcourez toutes les pages de Fiji Luxury Experiences.",
      },
      tripPlanner: {
        title: "Planifiez votre voyage aux Fidji",
        description:
          "Partagez vos envies — nos planificateurs créent des itinéraires sur mesure.",
      },
      visaChecker: {
        title: "Vérificateur de visa Fidji",
        description:
          "Vérifiez les exigences de visa Fidji selon votre nationalité.",
      },
      tools: {
        title: "Outils de voyage",
        description:
          "Visa, heure, météo, devise et planification de voyage pour les Fidji.",
      },
      events: {
        title: "Événements et festivals aux Fidji",
        description: "Festivals culturels, régates et événements saisonniers.",
      },
      itineraries: {
        title: "Itinéraires Fidji — Parcours insulaires",
        description: "Itinéraires de lune de miel aux aventures familiales.",
      },
      thingsToKnow: {
        title: "À savoir avant de visiter les Fidji",
        description: "Argent, coutumes, santé, sécurité et étiquette locale.",
      },
    },
  },
  de: {
    seo: {
      home: {
        title: "Fiji Luxusreisen — Inselurlaub, Resorts & maßgeschneiderte Reisen",
        description:
          "Entdecken Sie Fiji mit kuratierten Inselurlauben, Premium-Resorts und kulturellen Erlebnissen.",
      },
      destinations: {
        title: "Die besten Reiseziele in Fiji — Inselführer",
        description:
          "Nadi, Denarau, Coral Coast, Mamanuca, Yasawa, Taveuni und mehr erkunden.",
      },
      tours: {
        title: "Aktivitäten in Fiji — Abenteuer, Kultur & Luxus",
        description:
          "Tauchen, Schnorcheln, Inselhopping, Dorfbesuche und Wellness auf Fiji.",
      },
      placesToStay: {
        title: "Luxusresorts & Unterkünfte in Fiji",
        description:
          "Handverlesene Resorts, Overwater-Bures, Privatinseln und Strandvillen.",
      },
      guides: {
        title: "Fiji-Reiseführer — Planen Sie Ihre Reise",
        description:
          "Visa, Bräuche, beste Reisezeit, Gesundheit und Anreise.",
      },
      deals: {
        title: "Fiji-Angebote — Kuratierte Luxuspakete",
        description:
          "Exklusive Pakete und Resorttarife, geprüft von unserem Concierge.",
      },
      faq: {
        title: "Fiji-Reise FAQ",
        description:
          "Antworten zu Visa, Transfers, Resorts und Aktivitäten.",
      },
      contact: {
        title: "Kontaktieren Sie unseren Fiji-Concierge",
        description:
          "Maßgeschneiderte Reiserouten und Resortverfügbarkeit.",
      },
      about: {
        title: "Über Fiji Luxury Experiences",
        description:
          "Maßgeschneiderte Fiji-Reisen von Planern, die jede Insel kennen.",
      },
      explore: {
        title: "Die Welt entdecken — Luxusreise-Inspiration",
        description:
          "Luxusziele jenseits von Fiji mit unserem interaktiven Explorer.",
      },
      privacy: {
        title: "Datenschutzerklärung",
        description:
          "Wie Fiji Luxury Experiences Ihre Daten schützt.",
      },
      sitemap: {
        title: "Sitemap",
        description: "Alle Seiten von Fiji Luxury Experiences.",
      },
      tripPlanner: {
        title: "Planen Sie Ihre Fiji-Reise",
        description:
          "Teilen Sie Ihre Reiseträume — wir gestalten maßgeschneiderte Routen.",
      },
      visaChecker: {
        title: "Fiji-Visumprüfer",
        description:
          "Visumanforderungen für Fiji nach Staatsangehörigkeit prüfen.",
      },
      tools: {
        title: "Reisetools",
        description:
          "Visum, Uhrzeit, Wetter, Währung und Reiseplanung für Fiji.",
      },
      events: {
        title: "Fiji-Events & Festivals",
        description: "Kulturelle Festivals und saisonale Veranstaltungen.",
      },
      itineraries: {
        title: "Fiji-Reiserouten — Kuratierte Inselrouten",
        description: "Von Flitterwochen bis Familien-Island-Hopping.",
      },
      thingsToKnow: {
        title: "Wissenswertes vor der Fiji-Reise",
        description: "Geld, Bräuche, Gesundheit, Sicherheit und Etikette.",
      },
    },
  },
  es: {
    seo: {
      home: {
        title: "Viajes de lujo a Fiji — Vacaciones isleñas y resorts",
        description:
          "Descubre Fiji con vacaciones isleñas, resorts premium y experiencias culturales.",
      },
      destinations: {
        title: "Mejores destinos en Fiji — Guías de islas",
        description:
          "Explora Nadi, Denarau, Coral Coast, Mamanuca, Yasawa y Taveuni.",
      },
      tours: {
        title: "Qué hacer en Fiji — Aventura, cultura y lujo",
        description:
          "Buceo, snorkel, salto de islas, visitas a aldeas y bienestar.",
      },
      placesToStay: {
        title: "Resorts de lujo y alojamiento en Fiji",
        description:
          "Resorts, bures sobre el agua, islas privadas y villas frente al mar.",
      },
      guides: {
        title: "Guías de viaje Fiji — Planifica tu viaje",
        description:
          "Visados, costumbres, mejor época, salud y cómo llegar.",
      },
      deals: {
        title: "Ofertas Fiji — Paquetes de lujo seleccionados",
        description:
          "Paquetes exclusivos y tarifas de resort verificadas por nuestro concierge.",
      },
      faq: {
        title: "FAQ de viaje a Fiji",
        description:
          "Respuestas sobre visados, traslados, resorts y actividades.",
      },
      contact: {
        title: "Contacta a nuestro concierge de Fiji",
        description:
          "Itinerarios a medida y disponibilidad de resorts.",
      },
      about: {
        title: "Sobre Fiji Luxury Experiences",
        description:
          "Viajes a medida a Fiji diseñados por planificadores locales.",
      },
      explore: {
        title: "Explorar el mundo — Inspiración de viaje de lujo",
        description:
          "Destinos de lujo más allá de Fiji con nuestro explorador.",
      },
      privacy: {
        title: "Declaración de privacidad",
        description:
          "Cómo Fiji Luxury Experiences protege tu información.",
      },
      sitemap: {
        title: "Mapa del sitio",
        description: "Todas las páginas de Fiji Luxury Experiences.",
      },
      tripPlanner: {
        title: "Planifica tu viaje a Fiji",
        description:
          "Comparte tus sueños de viaje — creamos itinerarios a medida.",
      },
      visaChecker: {
        title: "Verificador de visa Fiji",
        description:
          "Requisitos de visa para Fiji según tu nacionalidad.",
      },
      tools: {
        title: "Herramientas de viaje",
        description:
          "Visa, hora, clima, moneda y planificación para viajes a Fiji.",
      },
      events: {
        title: "Eventos y festivales en Fiji",
        description: "Festivales culturales y eventos de temporada.",
      },
      itineraries: {
        title: "Itinerarios Fiji — Rutas isleñas",
        description: "De lunas de miel a aventuras familiares.",
      },
      thingsToKnow: {
        title: "Qué saber antes de visitar Fiji",
        description: "Dinero, costumbres, salud, seguridad y etiqueta.",
      },
    },
  },
  zh: {
    seo: {
      home: {
        title: "斐济奢华旅行 — 海岛度假与定制旅程",
        description:
          "探索斐济奢华旅行，精选海岛度假、高端度假村、蜜月套餐与文化体验。",
      },
      destinations: {
        title: "斐济最佳目的地 — 岛屿指南",
        description:
          "探索楠迪、丹娜努、珊瑚海岸、马马努卡、亚萨瓦和塔韦乌尼。",
      },
      tours: {
        title: "斐济活动 — 冒险、文化与奢华体验",
        description:
          "潜水、浮潜、跳岛游、村庄参观与健康疗养。",
      },
      placesToStay: {
        title: "斐济奢华度假村与住宿",
        description:
          "精选度假村、水上屋、私人岛屿与海滨别墅。",
      },
      guides: {
        title: "斐济旅行指南 — 规划您的旅程",
        description:
          "签证、习俗、最佳时间、健康与交通指南。",
      },
      deals: {
        title: "斐济优惠 — 精选奢华套餐",
        description:
          "专属套餐与度假村价格，由礼宾团队审核。",
      },
      faq: {
        title: "斐济旅行常见问题",
        description:
          "关于签证、交通、度假村与活动的解答。",
      },
      contact: {
        title: "联系斐济礼宾团队",
        description:
          "定制行程、度假村空房与岛屿物流咨询。",
      },
      about: {
        title: "关于 Fiji Luxury Experiences",
        description:
          "由熟悉每座岛屿的礼宾策划师打造的斐济定制旅程。",
      },
      explore: {
        title: "探索世界 — 奢华旅行灵感",
        description:
          "通过互动探索器发现斐济以外的奢华目的地。",
      },
      privacy: {
        title: "隐私声明",
        description:
          "Fiji Luxury Experiences 如何收集和保护您的信息。",
      },
      sitemap: {
        title: "网站地图",
        description: "浏览 Fiji Luxury Experiences 所有页面。",
      },
      tripPlanner: {
        title: "规划您的斐济之旅",
        description:
          "分享您的旅行梦想 — 我们设计定制行程。",
      },
      visaChecker: {
        title: "斐济签证查询",
        description:
          "根据您的国籍查询斐济签证要求。",
      },
      tools: {
        title: "旅行工具",
        description:
          "签证、时间、天气、货币和斐济旅行规划工具。",
      },
      events: {
        title: "斐济活动与节日",
        description: "文化节庆与季节性活动。",
      },
      itineraries: {
        title: "斐济行程 — 精选岛屿路线",
        description: "从蜜月到家庭跳岛冒险。",
      },
      thingsToKnow: {
        title: "访问斐济前须知",
        description: "货币、习俗、健康、安全与礼仪。",
      },
    },
  },
};
