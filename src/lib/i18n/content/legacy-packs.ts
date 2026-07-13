import type { LocaleContentPack } from "./types";

/** Title/excerpt/tagline — merged under full locale packs */
export const legacyContentPacks: Partial<
  Record<string, Partial<LocaleContentPack>>
> = {
  fr: {
    guides: {
      "first-time-fiji": {
        title: "Première visite aux Fidji",
        excerpt: "Tout ce qu'il faut pour votre premier voyage aux Fidji.",
      },
      "visa-guide": {
        title: "Visa et exigences de voyage",
        excerpt: "Passeports, visas et règles d'entrée — expliqués simplement.",
      },
      "best-time-to-visit": {
        title: "Meilleure période pour visiter les Fidji",
        excerpt: "Météo, saisons et quand nous y allons vraiment.",
      },
      "weather-guide": {
        title: "Météo et climat",
        excerpt: "Comprendre les saisons tropicales des Fidji.",
      },
      "luxury-travel": {
        title: "Guide du voyage de luxe",
        excerpt: "Resorts exclusifs et expériences sur mesure.",
      },
      honeymoon: {
        title: "Guide lune de miel",
        excerpt: "Évasions romantiques pour les couples.",
      },
      "family-travel": {
        title: "Guide voyage en famille",
        excerpt: "Les Fidji avec des enfants — le paradis sans stress.",
      },
      adventure: {
        title: "Guide aventure",
        excerpt: "Adrénaline et exploration.",
      },
      wellness: {
        title: "Guide bien-être",
        excerpt: "Régénérez corps et esprit au paradis.",
      },
      culture: {
        title: "Guide culture",
        excerpt: "Traditions fidjiennes authentiques.",
      },
      "food-drink": {
        title: "Guide gastronomie",
        excerpt: "Que manger et boire aux Fidji.",
      },
      transportation: {
        title: "Guide des transports",
        excerpt: "Vols, ferries et déplacements entre les îles.",
      },
      "island-hopping": {
        title: "Guide island hopping",
        excerpt: "Comment sauter d'île en île sans prise de tête.",
      },
      diving: {
        title: "Guide plongée",
        excerpt: "Récifs, requins et sites de plongée de classe mondiale.",
      },
      surfing: {
        title: "Guide surf",
        excerpt: "Les spots dont tout le monde parle.",
      },
      "travel-planning": {
        title: "Centre de planification",
        excerpt: "Votre hub central pour planifier l'évasion fidjienne parfaite.",
      },
    },
    destinations: {
      "coral-coast": {
        title: "Côte de Corail",
        tagline: "Plages dorées et culture fidjienne authentique",
      },
      nadi: { title: "Nadi", tagline: "Porte d'entrée des îles Fidji" },
      denarau: {
        title: "Denarau",
        tagline: "Marina de luxe et resorts de classe mondiale",
      },
      mamanuca: {
        title: "Îles Mamanuca",
        tagline: "Paradis de Robinson et lagons cristallins",
      },
      yasawa: {
        title: "Îles Yasawa",
        tagline: "Îles reculées et beauté préservée",
      },
      taveuni: {
        title: "Taveuni",
        tagline: "Île Jardin et pays des cascades",
      },
      "pacific-harbour": {
        title: "Pacific Harbour",
        tagline: "Capitale de l'aventure aux Fidji",
      },
      suva: {
        title: "Suva",
        tagline: "Capitale de la culture et du commerce",
      },
    },
  },
  de: {
    guides: {
      "first-time-fiji": {
        title: "Erste Reise nach Fidschi",
        excerpt: "Alles für Ihre erste Fidschi-Reise.",
      },
      "visa-guide": {
        title: "Visum & Reiseanforderungen",
        excerpt: "Pässe, Visa und Einreise — einfach erklärt.",
      },
      "best-time-to-visit": {
        title: "Beste Reisezeit für Fidschi",
        excerpt: "Wetter, Jahreszeiten und wann wir wirklich hinfahren.",
      },
      "weather-guide": {
        title: "Wetter & Klima",
        excerpt: "Fidschis tropische Jahreszeiten verstehen.",
      },
      "luxury-travel": {
        title: "Luxusreise-Guide",
        excerpt: "Exklusive Resorts und kuratierte Erlebnisse.",
      },
      honeymoon: {
        title: "Flitterwochen-Guide",
        excerpt: "Romantische Auszeiten für Paare.",
      },
      "family-travel": {
        title: "Familienreise-Guide",
        excerpt: "Fidschi mit Kindern — stressfreies Paradies.",
      },
      adventure: {
        title: "Abenteuer-Guide",
        excerpt: "Adrenalin und Erkundung.",
      },
      wellness: {
        title: "Wellness-Guide",
        excerpt: "Körper und Geist im Paradies erholen.",
      },
      culture: {
        title: "Kultur-Guide",
        excerpt: "Authentische fidschianische Traditionen.",
      },
      "food-drink": {
        title: "Essen & Trinken",
        excerpt: "Was man in Fidschi essen und trinken sollte.",
      },
      transportation: {
        title: "Transport-Guide",
        excerpt: "Flüge, Fähren und Inselhopping.",
      },
      "island-hopping": {
        title: "Inselhopping-Guide",
        excerpt: "Zwischen Inseln wechseln — ohne Kopfschmerzen.",
      },
      diving: {
        title: "Tauch-Guide",
        excerpt: "Riffe, Haie und Weltklasse-Tauchspots.",
      },
      surfing: {
        title: "Surf-Guide",
        excerpt: "Die Breaks, über die alle sprechen.",
      },
      "travel-planning": {
        title: "Reiseplanungs-Hub",
        excerpt: "Ihr zentraler Hub für die perfekte Fidschi-Reise.",
      },
    },
    destinations: {
      "coral-coast": {
        title: "Coral Coast",
        tagline: "Goldene Strände & authentische fidschianische Kultur",
      },
      nadi: { title: "Nadi", tagline: "Tor zu den Fidschi-Inseln" },
      denarau: {
        title: "Denarau",
        tagline: "Luxusmarina & Weltklasse-Resorts",
      },
      mamanuca: {
        title: "Mamanuca-Inseln",
        tagline: "Castaway-Paradies & kristallklare Lagunen",
      },
      yasawa: {
        title: "Yasawa-Inseln",
        tagline: "Abgelegene Inseln & unberührte Schönheit",
      },
      taveuni: {
        title: "Taveuni",
        tagline: "Garteninsel & Wasserfall-Land",
      },
      "pacific-harbour": {
        title: "Pacific Harbour",
        tagline: "Abenteuerhauptstadt Fidschis",
      },
      suva: {
        title: "Suva",
        tagline: "Hauptstadt von Kultur & Handel",
      },
    },
  },
  es: {
    guides: {
      "first-time-fiji": {
        title: "Primera vez en Fiji",
        excerpt: "Todo lo que necesita para su primer viaje a Fiji.",
      },
      "visa-guide": {
        title: "Visa y requisitos de viaje",
        excerpt: "Pasaportes, visas y normas de entrada — explicados.",
      },
      "best-time-to-visit": {
        title: "Mejor época para visitar Fiji",
        excerpt: "Clima, estaciones y cuándo ir realmente.",
      },
      "weather-guide": {
        title: "Clima y tiempo",
        excerpt: "Entender las estaciones tropicales de Fiji.",
      },
      "luxury-travel": {
        title: "Guía de viaje de lujo",
        excerpt: "Resorts exclusivos y experiencias curadas.",
      },
      honeymoon: {
        title: "Guía de luna de miel",
        excerpt: "Escapadas románticas para parejas.",
      },
      "family-travel": {
        title: "Guía de viaje en familia",
        excerpt: "Fiji con niños — paraíso sin estrés.",
      },
      adventure: {
        title: "Guía de aventura",
        excerpt: "Adrenalina y exploración.",
      },
      wellness: {
        title: "Guía de bienestar",
        excerpt: "Restaure cuerpo y mente en el paraíso.",
      },
      culture: {
        title: "Guía cultural",
        excerpt: "Tradiciones fiyianas auténticas.",
      },
      "food-drink": {
        title: "Guía gastronómica",
        excerpt: "Qué comer y beber en Fiji.",
      },
      transportation: {
        title: "Guía de transporte",
        excerpt: "Vuelos, ferris y desplazamientos entre islas.",
      },
      "island-hopping": {
        title: "Guía de salto de islas",
        excerpt: "Cómo saltar entre islas sin complicaciones.",
      },
      diving: {
        title: "Guía de buceo",
        excerpt: "Arrecifes, tiburones y sitios de buceo de clase mundial.",
      },
      surfing: {
        title: "Guía de surf",
        excerpt: "Los breaks de los que todos hablan.",
      },
      "travel-planning": {
        title: "Centro de planificación",
        excerpt: "Su hub central para planificar la escapada perfecta a Fiji.",
      },
    },
    destinations: {
      "coral-coast": {
        title: "Costa de Coral",
        tagline: "Playas doradas y cultura fiyiana auténtica",
      },
      nadi: { title: "Nadi", tagline: "Puerta de entrada a las islas Fiji" },
      denarau: {
        title: "Denarau",
        tagline: "Marina de lujo y resorts de clase mundial",
      },
      mamanuca: {
        title: "Islas Mamanuca",
        tagline: "Paraíso de náufrago y lagunas cristalinas",
      },
      yasawa: {
        title: "Islas Yasawa",
        tagline: "Islas remotas y belleza intacta",
      },
      taveuni: {
        title: "Taveuni",
        tagline: "Isla Jardín y tierra de cascadas",
      },
      "pacific-harbour": {
        title: "Pacific Harbour",
        tagline: "Capital de la aventura en Fiji",
      },
      suva: {
        title: "Suva",
        tagline: "Capital de cultura y comercio",
      },
    },
  },
  zh: {
    guides: {
      "first-time-fiji": {
        title: "斐济初访指南",
        excerpt: "首次斐济之旅所需了解的一切。",
      },
      "visa-guide": {
        title: "签证与入境要求",
        excerpt: "护照、签证与入境规定——简明说明。",
      },
      "best-time-to-visit": {
        title: "斐济最佳旅行时间",
        excerpt: "天气、季节与我们实际推荐的出行时机。",
      },
      "weather-guide": {
        title: "天气与气候",
        excerpt: "了解斐济的热带季节。",
      },
      "luxury-travel": {
        title: "奢华旅行指南",
        excerpt: "独家度假村与精选体验。",
      },
      honeymoon: {
        title: "蜜月指南",
        excerpt: "为情侣打造的浪漫之旅。",
      },
      "family-travel": {
        title: "家庭旅行指南",
        excerpt: "带孩子游斐济——轻松惬意的天堂。",
      },
      adventure: {
        title: "冒险指南",
        excerpt: "肾上腺素与探索之旅。",
      },
      wellness: {
        title: "康养指南",
        excerpt: "在天堂恢复身心。",
      },
      culture: {
        title: "文化指南",
        excerpt: "地道的斐济传统。",
      },
      "food-drink": {
        title: "美食饮品指南",
        excerpt: "斐济吃什么、喝什么。",
      },
      transportation: {
        title: "交通指南",
        excerpt: "航班、渡轮与岛屿间交通。",
      },
      "island-hopping": {
        title: "跳岛指南",
        excerpt: "轻松串联各岛，省心不费力。",
      },
      diving: {
        title: "潜水指南",
        excerpt: "珊瑚礁、鲨鱼与世界级潜点。",
      },
      surfing: {
        title: "冲浪指南",
        excerpt: "人人谈论的浪点。",
      },
      "travel-planning": {
        title: "旅行规划中心",
        excerpt: "规划完美斐济之旅的一站式枢纽。",
      },
    },
    destinations: {
      "coral-coast": {
        title: "珊瑚海岸",
        tagline: "金色沙滩与地道斐济文化",
      },
      nadi: { title: "楠迪", tagline: "斐济群岛的门户" },
      denarau: {
        title: "德纳劳",
        tagline: "奢华码头与世界级度假村",
      },
      mamanuca: {
        title: "玛玛努卡群岛",
        tagline: "鲁滨逊式天堂与水晶泻湖",
      },
      yasawa: {
        title: "亚萨瓦群岛",
        tagline: "偏远岛屿与原始之美",
      },
      taveuni: {
        title: "塔韦乌尼",
        tagline: "花园之岛与瀑布之乡",
      },
      "pacific-harbour": {
        title: "太平洋港",
        tagline: "斐济冒险之都",
      },
      suva: {
        title: "苏瓦",
        tagline: "文化与商业之都",
      },
    },
  },
  ja: {
    guides: {
      "first-time-fiji": {
        title: "初めてのフィジー",
        excerpt: "初めてのフィジー旅行に必要なすべて。",
      },
      "visa-guide": {
        title: "ビザと入国要件",
        excerpt: "パスポート、ビザ、入国規則をわかりやすく。",
      },
      "best-time-to-visit": {
        title: "フィジーのベストシーズン",
        excerpt: "天気、季節、私たちが本当におすすめする時期。",
      },
      "weather-guide": {
        title: "天気と気候",
        excerpt: "フィジーの熱帯季節を理解する。",
      },
      "luxury-travel": {
        title: "ラグジュアリー旅行ガイド",
        excerpt: "特別なリゾートと厳選体験。",
      },
      honeymoon: {
        title: "ハネムーンガイド",
        excerpt: "カップル向けのロマンチックな旅。",
      },
      "family-travel": {
        title: "家族旅行ガイド",
        excerpt: "子ども連れのフィジー — ストレスフリーな楽園。",
      },
      adventure: {
        title: "アドベンチャーガイド",
        excerpt: "アドレナリンと探検。",
      },
      wellness: {
        title: "ウェルネスガイド",
        excerpt: "楽園で心身をリセット。",
      },
      culture: {
        title: "文化ガイド",
        excerpt: "本物のフィジー伝統。",
      },
      "food-drink": {
        title: "グルメ＆ドリンクガイド",
        excerpt: "フィジーで食べる・飲むべきもの。",
      },
      transportation: {
        title: "交通ガイド",
        excerpt: "フライト、フェリー、島間移動。",
      },
      "island-hopping": {
        title: "アイランドホッピングガイド",
        excerpt: "島々を巡る旅をスムーズに。",
      },
      diving: {
        title: "ダイビングガイド",
        excerpt: "リーフ、サメ、世界クラスのダイブサイト。",
      },
      surfing: {
        title: "サーフィンガイド",
        excerpt: "誰もが語る名波。",
      },
      "travel-planning": {
        title: "旅行プランニングハブ",
        excerpt: "完璧なフィジー旅行を計画する中心拠点。",
      },
    },
    destinations: {
      "coral-coast": {
        title: "コーラルコースト",
        tagline: "黄金のビーチと本格的なフィジー文化",
      },
      nadi: { title: "ナディ", tagline: "フィジー諸島への玄関口" },
      denarau: {
        title: "デナラウ",
        tagline: "ラグジュアリーマリーナと世界クラスのリゾート",
      },
      mamanuca: {
        title: "ママヌカ諸島",
        tagline: "無人島の楽園とクリスタルラグーン",
      },
      yasawa: {
        title: "ヤサワ諸島",
        tagline: "離島と手つかずの美しさ",
      },
      taveuni: {
        title: "タベウニ",
        tagline: "ガーデンアイランドと滝の国",
      },
      "pacific-harbour": {
        title: "パシフィックハーバー",
        tagline: "フィジーのアドベンチャー首都",
      },
      suva: {
        title: "スバ",
        tagline: "文化と商業の首都",
      },
    },
  },
  hi: {
    guides: {
      "first-time-fiji": {
        title: "फ़िजी में पहली बार",
        excerpt: "आपकी पहली फ़िजी यात्रा के लिए सब कुछ।",
      },
      "visa-guide": {
        title: "वीज़ा और यात्रा आवश्यकताएँ",
        excerpt: "पासपोर्ट, वीज़ा और प्रवेश नियम — सरल भाषा में।",
      },
      "best-time-to-visit": {
        title: "फ़िजी जाने का सबसे अच्छा समय",
        excerpt: "मौसम, मौसम और हम वास्तव में कब जाते हैं।",
      },
      "weather-guide": {
        title: "मौसम और जलवायु",
        excerpt: "फ़िजी के उष्णकटिबंधीय मौसम को समझें।",
      },
      "luxury-travel": {
        title: "लक्ज़री यात्रा गाइड",
        excerpt: "विशेष रिसॉर्ट और चुनिंदा अनुभव।",
      },
      honeymoon: {
        title: "हनीमून गाइड",
        excerpt: "जोड़ों के लिए रोमांटिक पलायन।",
      },
      "family-travel": {
        title: "परिवार यात्रा गाइड",
        excerpt: "बच्चों के साथ फ़िजी — तनावमुक्त स्वर्ग।",
      },
      adventure: {
        title: "एडवेंचर गाइड",
        excerpt: "रोमांच और खोज।",
      },
      wellness: {
        title: "वेलनेस गाइड",
        excerpt: "स्वर्ग में शरीर और मन को पुनर्स्थापित करें।",
      },
      culture: {
        title: "संस्कृति गाइड",
        excerpt: "प्रामाणिक फ़िजीयन परंपराएँ।",
      },
      "food-drink": {
        title: "भोजन और पेय गाइड",
        excerpt: "फ़िजी में क्या खाएँ और पिएँ।",
      },
      transportation: {
        title: "परिवहन गाइड",
        excerpt: "उड़ानें, फ़ेरी और द्वीपों के बीच यात्रा।",
      },
      "island-hopping": {
        title: "आइलैंड हॉपिंग गाइड",
        excerpt: "द्वीपों के बीच बिना झंझट के कैसे घूमें।",
      },
      diving: {
        title: "डाइविंग गाइड",
        excerpt: "रीफ़, शार्क और विश्वस्तरीय डाइव साइट।",
      },
      surfing: {
        title: "सर्फ़िंग गाइड",
        excerpt: "वे लहरें जिनकी सब बात करते हैं।",
      },
      "travel-planning": {
        title: "यात्रा योजना केंद्र",
        excerpt: "सही फ़िजी यात्रा की योजना के लिए आपका केंद्र।",
      },
    },
    destinations: {
      "coral-coast": {
        title: "कोरल कोस्ट",
        tagline: "सुनहरे समुद्र तट और प्रामाणिक फ़िजीयन संस्कृति",
      },
      nadi: { title: "नादी", tagline: "फ़िजी द्वीपों का प्रवेश द्वार" },
      denarau: {
        title: "डेनाराउ",
        tagline: "लक्ज़री मरीना और विश्वस्तरीय रिसॉर्ट",
      },
      mamanuca: {
        title: "मामानुका द्वीप",
        tagline: "कास्टअवे स्वर्ग और क्रिस्टल लैगून",
      },
      yasawa: {
        title: "यासावा द्वीप",
        tagline: "दूरस्थ द्वीप और अछूता सौंदर्य",
      },
      taveuni: {
        title: "तावेउनी",
        tagline: "गार्डन आइलैंड और झरने का देश",
      },
      "pacific-harbour": {
        title: "पैसिफ़िक हार्बर",
        tagline: "फ़िजी की एडवेंचर राजधानी",
      },
      suva: {
        title: "सुवा",
        tagline: "संस्कृति और वाणिज्य की राजधानी",
      },
    },
  },
};
