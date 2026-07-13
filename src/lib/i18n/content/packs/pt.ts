import type { LocaleContentPack } from "../types";

export const ptPack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "Planejamento",
    Style: "Estilo",
    Activities: "Atividades",
  },
  guides: {
    "first-time-fiji": {
      title: "Primeira Vez em Fiji",
      excerpt: "Tudo o que você precisa para sua primeira viagem a Fiji.",
      category: "Planejamento",
      overview:
        "Fiji é uma excelente primeira viagem — entrada fácil, pessoas acolhedoras e 333 ilhas para explorar. A maioria dos visitantes não precisa de visto por até quatro meses.",
      sections: [
        {
          title: "Antes de embarcar",
          body: "Certifique-se de que seu passaporte seja válido por seis meses além da data de viagem. Contrate um seguro de viagem abrangente e baixe mapas offline para ilhas remotas.",
          items: ["Validade do passaporte", "Seguro de viagem", "Moeda (FJD)", "Vestimenta modesta para aldeias"],
        },
        {
          title: "Chegada e alfândega",
          body: "O Aeroporto Internacional de Nadi é moderno e eficiente. Agende transfer privado com antecedência para evitar filas e começar a relaxar imediatamente.",
          items: ["Transfer privado", "Chip no aeroporto", "Recepção do resort"],
        },
        {
          title: "Etiqueta nas ilhas",
          body: "Os fijianos estão entre as pessoas mais acolhedoras do mundo. Um 'Bula!' amigável faz toda a diferença. Retire o chapéu nas aldeias e aceite sempre o kava quando oferecido.",
          items: ["Código de vestimenta na aldeia", "Cerimônia do kava", "Consentimento para fotografias"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar minha primeira viagem a Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    "visa-guide": {
      title: "Visto e Requisitos de Viagem",
      excerpt: "Passaportes, vistos e regras de entrada — de forma simples.",
      category: "Planejamento",
      overview:
        "A maioria das pessoas não precisa providenciar visto antes de voar para Fiji. Basta garantir que seu passaporte e bilhete de retorno atendam aos requisitos da imigração.",
      sections: [
        {
          title: "Entrada sem visto",
          body: "Cidadãos da maioria dos países recebem permissão de visitante por até quatro meses.",
          items: ["Passaporte válido por 6+ meses", "Bilhete de retorno", "Comprovante de hospedagem"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar visto e requisitos de viagem?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    "best-time-to-visit": {
      title: "Melhor Época para Visitar Fiji",
      excerpt: "Clima, estações e quando realmente iríamos.",
      category: "Planejamento",
      overview:
        "Fiji é quente o ano todo. A estação seca (maio–out) traz céus mais claros e resorts cheios; a estação chuvosa (nov–abr) oferece paisagens exuberantes, menos multidões e preços mais suaves.",
      sections: [
        {
          title: "Estação seca (maio–out)",
          body: "Menos umidade, ótimo para mergulho e velejar. Popular — reserve com antecedência.",
          items: ["Ideal para mergulho", "Tarifas de pico nos resorts", "Festivais e eventos"],
        },
        {
          title: "Estação chuvosa (nov–abr)",
          body: "Mais quente, com chuvas à tarde. Interiores verdes, praias mais tranquilas e boas ofertas.",
          items: ["Tarifas mais baixas", "Cachoeiras exuberantes", "Água morna"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar a melhor época para visitar Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    "weather-guide": {
      title: "Clima e Tempo",
      excerpt: "Entenda as estações tropicais de Fiji.",
      category: "Planejamento",
      overview:
        "Fiji está na faixa dos ventos alísios do Pacífico Sul — quente, úmido e abençoada com sol a maior parte do ano.",
      sections: [
        {
          title: "Diferenças regionais",
          body: "O oeste (Denarau, Mamanuca) é mais seco que Suva e Taveuni. Planeje o island hopping considerando os microclimas.",
          items: ["Costa oeste mais seca", "Suva mais úmida", "Temporada de ciclones nov–abr"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar clima e tempo em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    "luxury-travel": {
      title: "Guia de Viagem de Luxo",
      excerpt: "Resorts exclusivos e experiências curadas.",
      category: "Estilo",
      overview:
        "O segmento de luxo de Fiji rivaliza com qualquer destino do Pacífico Sul — ilhas privadas, bures sobre a água, mordomos pessoais e transfers de helicóptero como padrão.",
      sections: [
        {
          title: "Onde ficar",
          body: "Likuliku Lagoon, Turtle Island, Vomo Island e Kokomo Private Island representam o ápice.",
          items: ["Bures sobre a água", "Ilhas privadas", "Opções all-inclusive"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar viagem de luxo a Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    honeymoon: {
      title: "Guia de Lua de Mel",
      excerpt: "Escapadas românticas para casais.",
      category: "Estilo",
      overview:
        "Fiji é o endereço mais romântico do Pacífico Sul — jantares privados em bancos de areia, rituais de spa para casais e retiros em ilhas exclusivas para adultos.",
      sections: [
        {
          title: "Principais experiências românticas",
          body: "Velejar ao pôr do sol, piqueniques em ilhas privadas e jantares sobre a água definem a lua de mel em Fiji.",
          items: ["Estadia em ilha privada", "Spa para casais", "Cruzeiro ao pôr do sol"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar a lua de mel em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    "family-travel": {
      title: "Guia de Viagem em Família",
      excerpt: "Fiji com crianças — paraíso sem estresse.",
      category: "Estilo",
      overview:
        "A cultura fijiana celebra as crianças. Clubes infantis, lagoas rasas e villas familiares estilo bure tornam Fiji ideal para viagens multigeracionais.",
      sections: [
        {
          title: "Resorts familiares",
          body: "Os resorts de Denarau e Coral Coast se destacam em programas infantis enquanto os pais aproveitam o spa.",
          items: ["Clubes infantis", "Lagoas rasas", "Quartos interligados"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar viagem em família a Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    adventure: {
      title: "Guia de Aventura",
      excerpt: "Adrenalina e exploração.",
      category: "Estilo",
      overview:
        "Do mergulho com tubarões na Beqa Lagoon às trilhas de cachoeiras em Taveuni, Fiji oferece aventura de classe mundial sem abrir mão do luxo.",
      sections: [
        {
          title: "Aventuras imperdíveis",
          body: "Mergulho com tubarões, rafting, tirolesa e charters de surf estão entre os melhores do Pacífico.",
          items: ["Mergulho com tubarões", "Rafting", "Trilhas de cachoeiras"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar aventuras em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    wellness: {
      title: "Guia de Bem-Estar",
      excerpt: "Restaure corpo e mente no paraíso.",
      category: "Estilo",
      overview:
        "Yoga à beira-mar, massagem tradicional Bobo e retiros de desintoxicação digital fazem de Fiji um destino de bem-estar em ascensão.",
      sections: [
        {
          title: "Rituais de bem-estar",
          body: "Combine tratamentos de spa com banho de floresta e meditação no recife para uma renovação holística.",
          items: ["Spa à beira-mar", "Retiros de yoga", "Programas de detox"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar bem-estar em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    culture: {
      title: "Guia Cultural",
      excerpt: "Tradições fijianas autênticas.",
      category: "Estilo",
      overview:
        "A cultura fijiana é viva e generosa — visitas a aldeias, dança meke e cerimônias de kava oferecem conexão genuína além dos muros do resort.",
      sections: [
        {
          title: "Experiências culturais",
          body: "Visite sempre com um guia que mantém relações com a aldeia e garante participação respeitosa.",
          items: ["Tour pela aldeia", "Apresentação meke", "Oficinas de artesanato"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar experiências culturais em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    "food-drink": {
      title: "Guia de Gastronomia",
      excerpt: "O que comer e beber em Fiji.",
      category: "Estilo",
      overview:
        "A culinária fijiana combina cozinha insular com sabores indianos e chineses — de festas lovo cozidas na terra a menus degustação de resorts de alto nível.",
      sections: [
        {
          title: "Imperdíveis",
          body: "Kokoda, lovo, wraps de roti e um longo almoço em um bom restaurante de resort.",
          items: ["Festa lovo", "Kokoda", "Degustação no resort"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar gastronomia em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    transportation: {
      title: "Guia de Transporte",
      excerpt: "Voos, ferries e deslocamentos entre ilhas.",
      category: "Planejamento",
      overview:
        "Metade da diversão é a jornada — hidroaviões, lanchas rápidas e voos domésticos ligam as ilhas mais rápido do que você imagina.",
      sections: [
        {
          title: "Viagem entre ilhas",
          body: "A Marina de Denarau opera ferries para Mamanuca e Yasawa. Hidroaviões alcançam os destinos de luxo mais remotos.",
          items: ["Fiji Airways doméstico", "Yasawa Flyer", "Transfers de hidroavião"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar transporte em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    "island-hopping": {
      title: "Guia de Island Hopping",
      excerpt: "Como saltar de ilha em ilha sem dor de cabeça.",
      category: "Planejamento",
      overview:
        "Island hopping é o que Fiji faz de melhor. Mapeamos rotas por Mamanuca, Yasawa e paradas mais tranquilas — adaptadas às suas datas e orçamento.",
      sections: [
        {
          title: "Rotas sugeridas",
          body: "Três dias em Mamanuca, uma semana em Yasawa ou dez dias misturando ambas — tudo fácil de ajustar.",
          items: ["Expresso de 3 dias", "Explorador de 7 dias", "Ultimate de 10 dias"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar island hopping em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    diving: {
      title: "Guia de Mergulho",
      excerpt: "Recifes, tubarões e sites de mergulho de classe mundial.",
      category: "Atividades",
      overview:
        "Rainbow Reef, Beqa Lagoon e Great White Wall estão entre os melhores mergulhos do planeta.",
      sections: [
        {
          title: "Principais sites de mergulho",
          body: "Mergulho com tubarões em Beqa, Rainbow Reef e Namena — algo para todos os níveis.",
          items: ["Tubarões de Beqa", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar mergulho em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    surfing: {
      title: "Guia de Surf",
      excerpt: "As ondas de que todos falam.",
      category: "Atividades",
      overview:
        "Cloudbreak, Restaurants e Frigates — ondas sérias, geralmente alcançadas de barco a partir de Denarau ou Mamanuca.",
      sections: [
        {
          title: "Principais picos",
          body: "Cloudbreak é a famosa esquerda de Fiji. Alugue um barco de um resort próximo para sessões ao amanhecer.",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar surf em Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
    "travel-planning": {
      title: "Centro de Planejamento de Viagem",
      excerpt: "Seu hub central para planejar a escapada perfeita a Fiji.",
      category: "Planejamento",
      overview:
        "Tudo o que você precisa em um só lugar — guias, ferramentas, suporte de concierge e criação de itinerários sob medida para viagens de luxo a Fiji.",
      sections: [
        {
          title: "Comece aqui",
          body: "Conte-nos suas datas, estilo e orçamento — nosso concierge monta um itinerário sob medida em até 24 horas.",
          items: ["Consulta gratuita", "Itinerário personalizado", "Garantia de melhor preço"],
        },
      ],
      faqs: [
        {
          question: "Com quanta antecedência devo planejar minha viagem a Fiji?",
          answer:
            "Os resorts de luxo enchem rapidamente na alta temporada (junho–setembro). Reserve com 3–6 meses de antecedência, se possível — muitas vezes ainda encontramos disponibilidade em parceiros de última hora.",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "Praias douradas e cultura fijiana autêntica",
      overview:
        "A Coral Coast se estende ao longo da costa sul de Viti Levu — uma faixa de praias com palmeiras, resorts de luxo e aldeias tradicionais onde cerimônias de caminhada sobre brasas e rituais de kava ainda moldam a vida diária.",
      highlights: ["Dunas de Sigatoka", "Cerimônias aldeãs", "Resorts de praia de luxo"],
      thingsToDo: ["Tours pela aldeia", "Safaris fluviais", "Golfe em campos de campeonato", "Retiros de spa"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "Villas privadas na praia"],
      tours: ["Dia de imersão cultural", "Voo de helicóptero costeiro", "Cruzeiro ao pôr do sol de dhow"],
      beaches: ["Praia de Natadola", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["Fine dining à beira-mar", "Festas lovo", "Menus degustação de resort"],
      transport: ["Aeroporto de Nadi 1h", "Transfers privados do resort", "Estrada costeira panorâmica"],
      culture: ["Apresentações meke", "Aldeias de cerâmica", "Mercados de artesanato tradicional"],
      weather: "Quente o ano todo. Estação seca mai–out (26–30°C). Estação chuvosa nov–abr com chuvas à tarde.",
      faqs: [
        {
          question: "Qual é a melhor época para visitar a Coral Coast?",
          answer:
            "De maio a outubro oferece tempo seco e ensolarado, ideal para praias e atividades aquáticas. De novembro a abril é mais quente, com paisagens exuberantes e menos multidões nos resorts de luxo.",
        },
        {
          question: "Como chego à Coral Coast?",
          answer:
            "Voos internacionais chegam ao Aeroporto Internacional de Nadi. Transfers privados, hidroaviões e barcos dos resorts ligam você ao destino final em poucas horas.",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "Porta de entrada para as Ilhas Fiji",
      overview:
        "Nadi é seu ponto de chegada ao paraíso — um hub vibrante que conecta viajantes internacionais às ilhas Mamanuca e Yasawa, à Marina de Denarau e ao interior montanhoso de Fiji.",
      highlights: ["Templo Sri Siva Subramaniya", "Jardim do Gigante Adormecido", "Marina de Denarau"],
      thingsToDo: ["Passeios de um dia às ilhas", "Visitas a templos", "Tours de mercado", "Golfe"],
      placesToStay: ["Resorts de Denarau", "Hotéis boutique em Nadi", "Pousadas de trânsito no aeroporto"],
      tours: ["Cruzeiro de um dia a Mamanuca", "Poças de lama e hot springs de Sabeto", "Tour pela aldeia nas montanhas"],
      beaches: ["Praia de Denarau", "Praia de Wailoaloa"],
      dining: ["Fusão indo-fijiana", "Restaurantes de resort", "Produtos do mercado local"],
      transport: ["Aeroporto Internacional de Nadi", "Terminal de ferry de Denarau", "Transfers de helicóptero"],
      culture: ["Arquitetura de templo hindu", "Mercados multiculturais", "Centros de artesanato fijiano"],
      weather: "Tropical e úmido. Melhor visibilidade para saltos de ilha mai–out.",
      faqs: [
        {
          question: "Qual é a melhor época para visitar Nadi?",
          answer:
            "De maio a outubro oferece tempo seco e ensolarado, ideal para praias e atividades aquáticas. De novembro a abril é mais quente, com paisagens exuberantes e menos multidões nos resorts de luxo.",
        },
        {
          question: "Como chego a Nadi?",
          answer:
            "Voos internacionais chegam ao Aeroporto Internacional de Nadi. Transfers privados, hidroaviões e barcos dos resorts ligam você ao destino final em poucas horas.",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "Marina de luxo e resorts de classe mundial",
      overview:
        "A Ilha Denarau é o endereço de luxo mais prestigiado de Fiji — um enclave fechado de resorts cinco estrelas, golfe de campeonato, fine dining e principal ponto de partida para cruzeiros às ilhas Mamanuca e Yasawa.",
      highlights: ["Port Denarau Marina", "Golfe de campeonato", "Compras de luxo"],
      thingsToDo: ["Cruzeiros ao pôr do sol", "Safaris de jet ski", "Rituais de spa", "Island hopping"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "Residências privadas"],
      tours: ["Charter de iate privado", "Tour de helicóptero pelas ilhas", "Pacotes de golfe e spa"],
      beaches: ["Praia de Denarau", "Piscinas de lagoa dos resorts"],
      dining: ["Ports O' Call", "Restaurante Nuku", "Gastronomia no beach club"],
      transport: ["10 min do aeroporto de Nadi", "Ferries da marina", "Serviço de carro privado"],
      culture: ["Noites meke nos resorts", "Mercados de artesanato", "Aulas de culinária fijiana"],
      weather: "Costa oeste abrigada — mais seca que Suva. Ideal mai–outubro.",
      faqs: [
        {
          question: "Qual é a melhor época para visitar Denarau?",
          answer:
            "De maio a outubro oferece tempo seco e ensolarado, ideal para praias e atividades aquáticas. De novembro a abril é mais quente, com paisagens exuberantes e menos multidões nos resorts de luxo.",
        },
        {
          question: "Como chego a Denarau?",
          answer:
            "Voos internacionais chegam ao Aeroporto Internacional de Nadi. Transfers privados, hidroaviões e barcos dos resorts ligam você ao destino final em poucas horas.",
        },
      ],
    },
    mamanuca: {
      title: "Ilhas Mamanuca",
      tagline: "Paraíso de náufrago e lagoas cristalinas",
      overview:
        "O arquipélago Mamanuca é a cadeia de ilhas mais icônica de Fiji — lagoas turquesa, luxo descalço e cenário de incontáveis sonhos tropicais, alcançável de hidroavião ou lancha rápida a partir de Denarau.",
      highlights: ["Castaway Island", "Bar flutuante Cloud 9", "Snorkel de classe mundial"],
      thingsToDo: ["Snorkel", "Surf em Cloudbreak", "Caiaque", "Piqueniques privados"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["Safari de snorkel", "Velejar ao pôr do sol", "Mergulho de descoberta"],
      beaches: ["Praia de Monuriki", "Ilha Modriki", "Praias privadas dos resorts"],
      dining: ["Jantar sobre a água", "Churrasco na praia", "Experiências no bar flutuante"],
      transport: ["Lancha rápida de Denarau", "Transfers de hidroavião", "Barcos privados dos resorts"],
      culture: ["Noites culturais nos resorts", "Visitas a aldeias em ilhas próximas"],
      weather: "Resfriado pelos ventos alísios. Estação seca perfeita para clareza da água.",
      faqs: [
        {
          question: "Qual é a melhor época para visitar as Ilhas Mamanuca?",
          answer:
            "De maio a outubro oferece tempo seco e ensolarado, ideal para praias e atividades aquáticas. De novembro a abril é mais quente, com paisagens exuberantes e menos multidões nos resorts de luxo.",
        },
        {
          question: "Como chego às Ilhas Mamanuca?",
          answer:
            "Voos internacionais chegam ao Aeroporto Internacional de Nadi. Transfers privados, hidroaviões e barcos dos resorts ligam você ao destino final em poucas horas.",
        },
      ],
    },
    yasawa: {
      title: "Ilhas Yasawa",
      tagline: "Ilhas remotas e beleza intocada",
      overview:
        "O arquipélago Yasawa oferece Fiji em sua forma mais crua e romântica — picos vulcânicos dramáticos, grutas blue hole, praias desertas e alguns dos retiros eco-luxo mais exclusivos do Pacífico Sul.",
      highlights: ["Grutas Sawa-i-Lau", "Blue Lagoon", "Lodges de luxo remotos"],
      thingsToDo: ["Natação nas grutas", "Homestays na aldeia", "Trilhas", "Mergulho"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "Lodges de luxo descalço"],
      tours: ["Passeio de um dia ao Blue Lagoon", "Expedição às grutas", "Velejar por várias ilhas"],
      beaches: ["Octopus Beach", "Nanuya Levu", "Enseadas privadas dos resorts"],
      dining: ["Festas na praia", "Degustação no resort", "Churrasco do pescado do dia"],
      transport: ["Ferry Yasawa Flyer", "Hidroavião", "Iate privado"],
      culture: ["Visitas a aldeias remotas", "Pesca tradicional", "Noites de contação de histórias"],
      weather: "Mais seco que o continente. Melhor visibilidade jun–set.",
      faqs: [
        {
          question: "Qual é a melhor época para visitar as Ilhas Yasawa?",
          answer:
            "De maio a outubro oferece tempo seco e ensolarado, ideal para praias e atividades aquáticas. De novembro a abril é mais quente, com paisagens exuberantes e menos multidões nos resorts de luxo.",
        },
        {
          question: "Como chego às Ilhas Yasawa?",
          answer:
            "Voos internacionais chegam ao Aeroporto Internacional de Nadi. Transfers privados, hidroaviões e barcos dos resorts ligam você ao destino final em poucas horas.",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "Ilha Jardim e terra das cachoeiras",
      overview:
        "Conhecida como a Ilha Jardim, Taveuni é um paraíso rico em patrimônio UNESCO de floresta tropical, cachoeiras e sites de mergulho famosos — ideal para aventureiros e casais que buscam natureza além do circuito de resorts.",
      highlights: ["Parque Nacional Bouma", "Mergulho no Rainbow Reef", "Cachoeiras Tavoro"],
      thingsToDo: ["Trilhas de cachoeiras", "Mergulho", "Observação de aves", "Caiaque"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "Eco-lodges"],
      tours: ["Trilha às Cachoeiras Bouma", "Mergulho no Rainbow Reef", "Caminhada Costeira Lavena"],
      beaches: ["Praia de Lavena", "Praia de Matei", "Enseadas escondidas"],
      dining: ["Gastronomia estilo plantation", "Produtos tropicais frescos", "Menus fusion nos resorts"],
      transport: ["Voo doméstico de Nadi/Suva", "Transfers do resort", "Charters de barco"],
      culture: ["Aldeia Wainibau", "Plantações tradicionais de taro", "Artesanato local"],
      weather: "Região mais úmida — exuberante o ano todo. Mergulho melhor abr–out.",
      faqs: [
        {
          question: "Qual é a melhor época para visitar Taveuni?",
          answer:
            "De maio a outubro oferece tempo seco e ensolarado, ideal para praias e atividades aquáticas. De novembro a abril é mais quente, com paisagens exuberantes e menos multidões nos resorts de luxo.",
        },
        {
          question: "Como chego a Taveuni?",
          answer:
            "Voos internacionais chegam ao Aeroporto Internacional de Nadi. Transfers privados, hidroaviões e barcos dos resorts ligam você ao destino final em poucas horas.",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "Capital da aventura em Fiji",
      overview:
        "Pacific Harbour é o endereço da adrenalina em Fiji — mergulho com tubarões na Beqa Lagoon, rafting, tirolesa e villas de luxo com vista para o Pacífico, tudo a alcance de Suva.",
      highlights: ["Mergulho com tubarões", "Rafting", "Zip Fiji"],
      thingsToDo: ["Mergulho com alimentação de tubarões", "Rafting no Upper Navua", "Golfe", "Pesca em alto-mar"],
      placesToStay: ["The Pearl South Pacific", "Villas de luxo", "Lodges boutique"],
      tours: ["Encontro com tubarões em Beqa", "Dia de rafting no rio", "Charter de pesca"],
      beaches: ["Natadola (próxima)", "Enseadas escondidas", "Praias dos resorts"],
      dining: ["Restaurantes na marina", "Fine dining no resort", "Frutos do mar locais"],
      transport: ["2,5h de Nadi", "45 min de Suva", "Helicóptero disponível"],
      culture: ["Caminhada sobre brasas em Beqa", "Apresentações aldeãs", "Mercados de artesãos"],
      weather: "Ligeiramente mais úmido que a costa oeste. Esportes de aventura o ano todo.",
      faqs: [
        {
          question: "Qual é a melhor época para visitar Pacific Harbour?",
          answer:
            "De maio a outubro oferece tempo seco e ensolarado, ideal para praias e atividades aquáticas. De novembro a abril é mais quente, com paisagens exuberantes e menos multidões nos resorts de luxo.",
        },
        {
          question: "Como chego a Pacific Harbour?",
          answer:
            "Voos internacionais chegam ao Aeroporto Internacional de Nadi. Transfers privados, hidroaviões e barcos dos resorts ligam você ao destino final em poucas horas.",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "Capital da cultura e do comércio",
      overview:
        "Suva é o coração pulsante da Fiji moderna — arquitetura colonial, mercados vibrantes, museus e uma cena gastronômica em ascensão, perfeita para viajantes que querem cultura antes da praia.",
      highlights: ["Museu de Fiji", "Mercado Municipal", "Parlamento e Thurston Gardens"],
      thingsToDo: ["Tours de mercado", "Visitas a museus", "Passeios coloniais", "Vida noturna"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "Hotéis boutique na cidade"],
      tours: ["Passeio patrimonial pela cidade", "Natação na floresta Colo-i-Suva", "Passeio de um dia às montanhas"],
      beaches: ["Sem praia na cidade — passeios de um dia a Pacific Harbour"],
      dining: ["Fine dining", "Comida de rua indiana", "Mercados de frutos do mar"],
      transport: ["Aeroporto Internacional de Nausori", "Ônibus para Coral Coast", "Voos domésticos"],
      culture: ["Herança fijiana, indiana e chinesa", "Música ao vivo", "Galerias de arte"],
      weather: "Cidade principal mais úmida. Leve equipamento de chuva leve o ano todo.",
      faqs: [
        {
          question: "Qual é a melhor época para visitar Suva?",
          answer:
            "De maio a outubro oferece tempo seco e ensolarado, ideal para praias e atividades aquáticas. De novembro a abril é mais quente, com paisagens exuberantes e menos multidões nos resorts de luxo.",
        },
        {
          question: "Como chego a Suva?",
          answer:
            "Voos internacionais chegam ao Aeroporto Internacional de Nadi. Transfers privados, hidroaviões e barcos dos resorts ligam você ao destino final em poucas horas.",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "Snorkel em Águas Cristalinas",
      category: "Água",
      duration: "Meio dia",
      ages: "Todas as idades",
      overview:
        "Deslize sobre jardins de coral arco-íris nas lagoas mais claras de Mamanuca com guia privado, equipamento premium e piquenique com champanhe em um banco de areia deserta.",
      highlights: ["Guia privado", "Equipamento premium de snorkel", "Piquenique com champanhe", "Briefing com biólogo marinho"],
      included: ["Transfer de barco ida e volta", "Equipamento de snorkel", "Refrigerantes", "Taxas do parque marinho"],
      itinerary: ["Partida da marina de Denarau", "Dois sites de snorkel", "Piquenique no banco de areia", "Retorno ao pôr do sol"],
      faqs: [
        { question: "Preciso de experiência?", answer: "Não — adequado para iniciantes com habilidade básica de natação." },
        { question: "O que devo levar?", answer: "Protetor solar seguro para recifes, roupa de banho e uma peça leve de cobertura." },
      ],
    },
    "sunset-cruises": {
      title: "Cruzeiros ao Pôr do Sol",
      category: "Velejar",
      duration: "2–3 horas",
      ages: "Todas as idades",
      overview:
        "Navegue em direção a um pôr do sol dourado no Pacífico a bordo de um catamarã de luxo com canapés, bebidas premium e violão fijiano ao vivo enquanto as silhuetas de Mamanuca desaparecem no crepúsculo.",
      highlights: ["Catamarã de luxo", "Canapés e bebidas", "Música ao vivo", "Vistas de 360° do pôr do sol"],
      included: ["Drink de boas-vindas", "Seleção de canapés", "Opção de transfer de retorno"],
      itinerary: ["Embarque na marina", "Navegação costeira", "Brinde ao pôr do sol", "Retorno sob as estrelas"],
      faqs: [
        { question: "Depende do clima?", answer: "Os cruzeiros operam na maioria das condições; reembolso integral se cancelado por segurança." },
      ],
    },
    "hiking-waterfalls": {
      title: "Trilhas e Cachoeiras",
      category: "Aventura",
      duration: "Dia inteiro",
      ages: "16+",
      overview:
        "Trilhe pelo Parque Nacional Bouma até cachoeiras escondidas, nade em piscinas esmeralda e almoce com frutas tropicais na floresta tropical intocada da Ilha Jardim.",
      highlights: ["Guia local especialista", "Três paradas para nadar nas cachoeiras", "Ecologia da floresta tropical", "Almoço farm-to-table"],
      included: ["Taxas do parque", "Guia", "Almoço", "Transfers do resort"],
      itinerary: ["Trilha matinal na floresta", "Natação nas cachoeiras", "Almoço na aldeia", "Retorno à tarde"],
      faqs: [
        { question: "Nível de condicionamento?", answer: "Moderado — 4–5 horas em trilhas irregulares com trechos íngremes." },
      ],
    },
    "village-tours": {
      title: "Tours pela Aldeia",
      category: "Cultura",
      duration: "Meio dia",
      ages: "Todas as idades",
      overview:
        "Experimente a hospitalidade fijiana autêntica — cerimônia de kava, dança meke, demonstrações de artesanato e festa lovo tradicional preparada pela família do chefe da aldeia.",
      highlights: ["Cerimônia de kava", "Apresentação meke", "Festa lovo", "Oficina de artesanato"],
      included: ["Doação à aldeia", "Participação na cerimônia", "Almoço tradicional", "Transporte"],
      itinerary: ["Boas-vindas na aldeia", "Kava e meke", "Demonstração de artesanato", "Almoço lovo"],
      faqs: [
        { question: "O que devo vestir?", answer: "Roupas modestas cobrindo ombros e joelhos. Retire o chapéu na aldeia." },
      ],
    },
    "island-hopping": {
      title: "Aventura de Island Hopping",
      category: "Vários dias",
      duration: "3–7 dias",
      ages: "Todas as idades",
      overview:
        "Jornada curada por várias ilhas de lancha rápida privada ou hidroavião — resorts boutique, praias escondidas e experiências sob medida definidas pelo seu concierge.",
      highlights: ["Transfers privados", "Estadias em resorts boutique", "Itinerário flexível", "Concierge dedicado"],
      included: ["Transfers entre ilhas", "Coordenação de resort", "Café da manhã diário", "Suporte de concierge"],
      itinerary: ["Dia 1: chegada em Mamanuca", "Dias 2–3: exploração de Yasawa", "Dia 4+: extensões personalizadas"],
      faqs: [
        { question: "Posso personalizar?", answer: "Cada island hop é sob medida — seu concierge projeta a rota com você." },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Pacote Resort Ilha Denarau",
      description: "Suíte com vista para o oceano por cinco noites, transfers privados do aeroporto, café da manhã diário e acesso à marina.",
      includes: ["Transfer privado", "Suíte com vista para o oceano", "Café da manhã diário"],
    },
    "romantic-honeymoon-escape": {
      title: "Escapada Romântica de Lua de Mel",
      description: "Retiro para casais com jantar privado em banco de areia, ritual de spa para casais e velejar ao pôr do sol.",
      includes: ["Jantar privado", "Spa para casais", "Cruzeiro ao pôr do sol"],
    },
    "mamanuca-island-escape": {
      title: "Escapada às Ilhas Mamanuca",
      description: "Pacote fly-and-flop — transfers de hidroavião ida e volta, almoço sobre a água e equipamento de snorkel.",
      includes: ["Transfer de hidroavião", "Crédito no resort", "Aluguel de snorkel"],
    },
    "family-coral-coast-package": {
      title: "Pacote Familiar Coral Coast",
      description: "Bures interligados, acesso ao clube infantil e atividades na Praia de Natadola para toda a família.",
      includes: ["Clube infantil", "Bure familiar", "Atividades na praia"],
    },
    "private-island-buyout": {
      title: "Compra Exclusiva de Ilha Privada",
      description: "Uso exclusivo de uma ilha Mamanuca — até 12 hóspedes, chef, barco e equipe de mordomos incluídos.",
      includes: ["Ilha exclusiva", "Chef privado", "Charter de barco"],
    },
    "stay-and-play-nadi": {
      title: "Pacote Fique e Explore Nadi",
      description: "Estadia no resort com passeios de um dia curados — visita à aldeia, poças de lama e piquenique na ilha.",
      includes: ["Estadia no resort", "2 passeios de um dia", "Todos os transfers"],
    },
    "luxury-overwater-bure": {
      title: "Estadia em Bure de Luxo sobre a Água",
      description: "Durma sobre águas cristalinas — deck privado, serviço de mordomo e jantar no bure.",
      includes: ["Bure sobre a água", "Serviço de mordomo", "Jantar no bure"],
    },
    "coral-coast-beach-escape": {
      title: "Escapada à Praia Coral Coast",
      description: "Resort na Praia de Natadola com crédito de FJD 200 no spa e jantar degustação curado.",
      includes: ["Quarto à beira-mar", "Crédito no spa", "Jantar degustação"],
    },
    "wellness-spa-retreat": {
      title: "Retiro de Bem-Estar e Spa",
      description: "Yoga à beira-mar, massagem tradicional Bobo e gastronomia orgânica farm-to-table.",
      includes: ["Yoga diário", "Ritual de spa", "Gastronomia wellness"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description: "Os únicos bures sobre a água de Fiji — santuário exclusivo para adultos com gastronomia all-inclusive.",
      includes: ["Bure sobre a água", "All-inclusive", "Somente adultos"],
    },
    "mamanuca-island-hopping": {
      title: "Island Hopping Mamanuca",
      description: "Lancha rápida privada, snorkel no recife e piquenique com champanhe em banco de areia deserta.",
      includes: ["Barco privado", "Snorkel", "Piquenique com champanhe"],
    },
    "yasawa-adventure-package": {
      title: "Pacote de Aventura Yasawa",
      description: "Trilhas guiadas a cachoeiras escondidas, caiaque marinho e cerimônia de kava na aldeia.",
      includes: ["Trilha de cachoeiras", "Caiaque", "Visita à aldeia"],
    },
    "beqa-shark-dive": {
      title: "Mergulho com Tubarões Beqa Lagoon",
      description: "Encontro famoso com tubarões com equipamento, guia e transfer do resort a partir de Pacific Harbour.",
      includes: ["Mergulho com tubarões", "Equipamento", "Transfer"],
    },
    "sunset-cruise-denarau": {
      title: "Cruzeiro Privado ao Pôr do Sol",
      description: "Velejar com champanhe da Marina de Denarau — canapés, música ao vivo e vistas da hora dourada.",
      includes: ["Charter privado", "Canapés", "Champanhe"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "O único resort de Fiji com bures sobre a água, Likuliku combina intimidade exclusiva para adultos com gastronomia de classe mundial e uma lagoa que brilha ao pôr do sol.",
      amenities: ["Bures sobre a água", "Somente adultos", "Spa", "Praia privada", "Fine dining"],
      experiences: ["Snorkel", "Cruzeiro ao pôr do sol", "Rituais de spa"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "Uma ilha íntima de 36 bures onde o luxo descalço encontra o calor fijiano — perfeita para luas de mel e celebrações especiais.",
      amenities: ["Bures à beira-mar", "Spa", "Centro de mergulho", "Jantar privado"],
      experiences: ["Mergulho", "Piquenique na ilha", "Visita à aldeia"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "O luxo familiar de referência em Denarau — piscinas amplas, proximidade a campos de campeonato e acesso fluido à marina para aventuras nas ilhas.",
      amenities: ["Várias piscinas", "Clube infantil", "Spa", "Acesso à marina", "7 restaurantes"],
      experiences: ["Island hopping", "Golfe", "Cruzeiro ao pôr do sol"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Luxo com polimento francês na melhor praia de Denarau — cafés da manhã flutuantes, acesso ao recife e a filosofia de spa assinatura Sofitel.",
      amenities: ["À beira-mar", "Spa", "Snorkel no recife", "Clube infantil"],
      experiences: ["Snorkel no recife", "Dia de spa", "Noite cultural"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "A joia da coroa da Praia de Natadola — golfe de campeonato, areias lendárias de Natadola e cultura aldeã à sua porta.",
      amenities: ["Praia de Natadola", "Campo de golfe", "Spa", "Clube infantil", "Centro cultural"],
      experiences: ["Tour pela aldeia", "Golfe", "Cavalgada na praia"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "A ilha que definiu Fiji para uma geração — familiar, cercada por recifes e autenticamente descontraída.",
      amenities: ["Ilha privada", "Centro PADI", "Clube infantil", "Várias praias"],
      experiences: ["Snorkel", "Caiaque", "Visita à aldeia"],
    },
  },
};
