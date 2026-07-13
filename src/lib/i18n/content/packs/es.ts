import type { LocaleContentPack } from "../types";

export const esPack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "Planificación",
    Style: "Estilo de viaje",
    Activities: "Actividades",
  },
  guides: {
    "first-time-fiji": {
      title: "Primera vez en Fiyi",
      excerpt: "Todo lo que necesita para su primer viaje a Fiyi.",
      category: "Planificación",
      overview:
        "Fiyi es un destino ideal para un primer viaje — entrada sencilla, gente cálida y 333 islas por explorar. La mayoría de visitantes no necesitan visado hasta cuatro meses.",
      sections: [
        {
          title: "Antes del vuelo",
          body: "Asegúrese de que su pasaporte sea válido seis meses después del viaje. Contrate un seguro de viaje completo y descargue mapas sin conexión para islas remotas.",
          items: ["Validez del pasaporte", "Seguro de viaje", "Moneda (FJD)", "Ropa modesta para aldeas"],
        },
        {
          title: "Llegada y aduanas",
          body: "El aeropuerto internacional de Nadi es moderno y eficiente. Reserve traslados privados para evitar colas y empezar a relajarse de inmediato.",
          items: ["Traslado privado", "Tarjeta SIM en el aeropuerto", "Recepción del resort"],
        },
        {
          title: "Etiqueta isleña",
          body: "Los fijianos están entre la gente más acogedora del mundo. Un «Bula!» amable abre muchas puertas. Quítese el sombrero en las aldeas y acepte siempre el kava cuando se le ofrezca.",
          items: ["Código de vestimenta en aldeas", "Ceremonia del kava", "Consentimiento para fotografías"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar mi primera visita a Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    "visa-guide": {
      title: "Visado y requisitos de entrada",
      excerpt: "Pasaportes, visados y normas de entrada — explicados de forma sencilla.",
      category: "Planificación",
      overview:
        "La mayoría de viajeros no necesitan gestionar un visado antes de volar a Fiyi. Solo asegúrese de que su pasaporte y billete de regreso cumplan los requisitos de inmigración.",
      sections: [
        {
          title: "Entrada sin visado",
          body: "Ciudadanos de la mayoría de países obtienen un permiso de visitante de hasta cuatro meses.",
          items: ["Pasaporte válido 6+ meses", "Billete de regreso", "Prueba de alojamiento"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar visado y requisitos de entrada?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    "best-time-to-visit": {
      title: "Mejor época para visitar Fiyi",
      excerpt: "Clima, estaciones y cuándo iríamos nosotros.",
      category: "Planificación",
      overview:
        "Fiyi es cálida todo el año. La temporada seca (may–oct.) trae cielos más despejados y resorts concurridos; la húmeda (nov.–abr.) ofrece paisajes exuberantes, menos gente y precios más suaves.",
      sections: [
        {
          title: "Temporada seca (may–oct.)",
          body: "Menos humedad, buen buceo y vela. Muy popular — reserve pronto.",
          items: ["Ideal para buceo", "Tarifas altas en resorts", "Festivales y eventos"],
        },
        {
          title: "Temporada húmeda (nov.–abr.)",
          body: "Más calor con chubascos por la tarde. Interior verde, playas tranquilas, buenas ofertas.",
          items: ["Tarifas más bajas", "Cascadas exuberantes", "Agua cálida"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar la mejor época para visitar Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    "weather-guide": {
      title: "Clima y tiempo",
      excerpt: "Comprenda las estaciones tropicales de Fiyi.",
      category: "Planificación",
      overview:
        "Fiyi se sitúa en el cinturón de vientos alisios del Pacífico Sur — cálida, húmeda y con sol la mayor parte del año.",
      sections: [
        {
          title: "Diferencias regionales",
          body: "El oeste (Denarau, Mamanuca) es más seco que Suva y Taveuni. Planifique el salto entre islas según los microclimas.",
          items: ["Costa oeste más seca", "Suva más húmeda", "Temporada de ciclones nov.–abr."],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar el clima en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    "luxury-travel": {
      title: "Guía de viaje de lujo",
      excerpt: "Resorts exclusivos y experiencias seleccionadas.",
      category: "Estilo de viaje",
      overview:
        "El segmento de lujo de Fiyi rivaliza con cualquier destino del Pacífico Sur — islas privadas, bures sobre el agua, mayordomos personales y traslados en helicóptero como estándar.",
      sections: [
        {
          title: "Dónde alojarse",
          body: "Likuliku Lagoon, Turtle Island, Vomo Island y Kokomo Private Island representan la cima.",
          items: ["Bures sobre el agua", "Islas privadas", "Opciones todo incluido"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar un viaje de lujo a Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    honeymoon: {
      title: "Guía de luna de miel",
      excerpt: "Escapadas románticas para parejas.",
      category: "Estilo de viaje",
      overview:
        "Fiyi es la dirección más romántica del Pacífico Sur — cenas privadas en bancos de arena, rituales spa en pareja y retiros isleños solo para adultos.",
      sections: [
        {
          title: "Experiencias románticas imprescindibles",
          body: "Navegación al atardecer, picnics en isla privada y cenas sobre el agua definen la luna de miel en Fiyi.",
          items: ["Estancia en isla privada", "Spa en pareja", "Crucero al atardecer"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar mi luna de miel en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    "family-travel": {
      title: "Guía de viaje en familia",
      excerpt: "Fiyi con niños — paraíso sin estrés.",
      category: "Estilo de viaje",
      overview:
        "La cultura fijiana celebra a los niños. Clubs infantiles, lagunas poco profundas y villas familiares tipo bure hacen de Fiyi ideal para viajes multigeneracionales.",
      sections: [
        {
          title: "Resorts familiares",
          body: "Los resorts de Denarau y Coral Coast destacan en programas infantiles mientras los padres disfrutan del spa.",
          items: ["Clubs infantiles", "Lagunas poco profundas", "Habitaciones comunicadas"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar un viaje en familia a Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    adventure: {
      title: "Guía de aventura",
      excerpt: "Adrenalina y exploración.",
      category: "Estilo de viaje",
      overview:
        "Desde buceo con tiburones en la laguna de Beqa hasta senderismo a cascadas en Taveuni, Fiyi ofrece aventura de clase mundial sin renunciar al lujo.",
      sections: [
        {
          title: "Aventuras imprescindibles",
          body: "Buceo con tiburones, rafting, tirolina y charters de surf están entre los mejores del Pacífico.",
          items: ["Buceo con tiburones", "Rafting", "Senderismo a cascadas"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar una aventura en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    wellness: {
      title: "Guía de bienestar",
      excerpt: "Restaure cuerpo y mente en el paraíso.",
      category: "Estilo de viaje",
      overview:
        "Yoga frente al océano, masaje tradicional Bobo y retiros de desconexión digital convierten a Fiyi en un destino wellness en auge.",
      sections: [
        {
          title: "Rituales de bienestar",
          body: "Combine tratamientos spa con baños de bosque y meditación en el arrecife para una renovación holística.",
          items: ["Spa frente al océano", "Retiros de yoga", "Programas detox"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar un retiro de bienestar en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    culture: {
      title: "Guía cultural",
      excerpt: "Tradiciones fijianas auténticas.",
      category: "Estilo de viaje",
      overview:
        "La cultura fijiana es viva y generosa — visitas a aldeas, danza meke y ceremonias del kava ofrecen conexión genuina más allá de los muros del resort.",
      sections: [
        {
          title: "Experiencias culturales",
          body: "Visite siempre con un guía que mantenga relaciones con las aldeas y garantice una participación respetuosa.",
          items: ["Tour de aldea", "Espectáculo meke", "Talleres artesanales"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar experiencias culturales en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    "food-drink": {
      title: "Guía gastronómica",
      excerpt: "Qué comer y beber en Fiyi.",
      category: "Estilo de viaje",
      overview:
        "La cocina fijiana mezcla tradiciones isleñas con sabores indios y chinos — desde festines lovo cocinados en la tierra hasta menús degustación en grandes resorts.",
      sections: [
        {
          title: "Imprescindibles",
          body: "Kokoda, lovo, wraps de roti y un largo almuerzo en un buen restaurante de resort.",
          items: ["Festín lovo", "Kokoda", "Degustación en resort"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar la gastronomía en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    transportation: {
      title: "Guía de transporte",
      excerpt: "Vuelos, ferris y desplazamientos entre islas.",
      category: "Planificación",
      overview:
        "La mitad del placer es el viaje — hidroaviones, lanchas rápidas y vuelos domésticos conectan las islas más rápido de lo que cree.",
      sections: [
        {
          title: "Viaje entre islas",
          body: "La marina de Denarau opera ferris a Mamanuca y Yasawa. Los hidroaviones llegan a los spots de lujo más remotos.",
          items: ["Fiji Airways doméstico", "Yasawa Flyer", "Traslados en hidroavión"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar el transporte en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    "island-hopping": {
      title: "Guía de salto entre islas",
      excerpt: "Cómo saltar de isla en isla sin complicaciones.",
      category: "Planificación",
      overview:
        "El salto entre islas es lo que Fiyi hace mejor. Trazamos rutas por Mamanuca, Yasawa y paradas más tranquilas — adaptadas a sus fechas y presupuesto.",
      sections: [
        {
          title: "Rutas de ejemplo",
          body: "Tres días en Mamanuca, una semana en Yasawa o diez días combinando ambas — todo fácil de ajustar.",
          items: ["Express 3 días", "Explorador 7 días", "Ultimate 10 días"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar el salto entre islas en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    diving: {
      title: "Guía de buceo",
      excerpt: "Arrecifes, tiburones y sitios de buceo de clase mundial.",
      category: "Actividades",
      overview:
        "Rainbow Reef, la laguna de Beqa y Great White Wall están entre los mejores buceos del planeta.",
      sections: [
        {
          title: "Mejores sitios de buceo",
          body: "Buceo con tiburones en Beqa, Rainbow Reef y Namena — para todos los niveles.",
          items: ["Tiburones de Beqa", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar el buceo en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    surfing: {
      title: "Guía de surf",
      excerpt: "Los breaks de los que todos hablan.",
      category: "Actividades",
      overview:
        "Cloudbreak, Restaurants y Frigates — olas serias, normalmente accesibles en barco desde Denarau o las Mamanuca.",
      sections: [
        {
          title: "Mejores breaks",
          body: "Cloudbreak es la famosa izquierda de Fiyi. Alquile un barco desde un resort cercano para sesiones al amanecer.",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar el surf en Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
    "travel-planning": {
      title: "Centro de planificación de viaje",
      excerpt: "Su hub central para planificar la escapada perfecta a Fiyi.",
      category: "Planificación",
      overview:
        "Todo en un solo lugar — guías, herramientas, conserjería y creación de itinerarios a medida para viajes de lujo a Fiyi.",
      sections: [
        {
          title: "Empiece aquí",
          body: "Indíquenos sus fechas, estilo y presupuesto — nuestro conserje elabora un itinerario a medida en 24 horas.",
          items: ["Consulta gratuita", "Itinerario a medida", "Garantía del mejor precio"],
        },
      ],
      faqs: [
        {
          question: "¿Con cuánta antelación debo planificar mi escapada a Fiyi?",
          answer:
            "Los resorts de lujo se llenan rápido en temporada alta (junio–septiembre). Reserve con 3–6 meses de antelación si puede — a menudo aún encontramos disponibilidad en socios de última hora.",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "Playas doradas y cultura fijiana auténtica",
      overview:
        "La Coral Coast se extiende a lo largo de la costa sur de Viti Levu — una franja de playas con palmeras, resorts de lujo y aldeas tradicionales donde las ceremonias de caminar sobre el fuego y los rituales del kava aún marcan la vida diaria.",
      highlights: ["Dunas de arena de Sigatoka", "Ceremonias en aldeas", "Resorts de playa de lujo"],
      thingsToDo: ["Tours de aldeas", "Safaris fluviales", "Golf en campos de campeonato", "Retiros spa"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "Villas privadas en la playa"],
      tours: ["Día de inmersión cultural", "Vuelo en helicóptero costero", "Crucero en dhow al atardecer"],
      beaches: ["Playa Natadola", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["Gastronomía frente al mar", "Festines lovo", "Menús degustación en resort"],
      transport: ["Aeropuerto Nadi 1 h", "Traslados privados al resort", "Ruta costera panorámica"],
      culture: ["Espectáculos meke", "Aldeas de alfareros", "Mercados artesanales tradicionales"],
      weather: "Cálido todo el año. Temporada seca may–oct. (26–30 °C). Temporada húmeda nov.–abr. con chubascos por la tarde.",
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar la Coral Coast?",
          answer:
            "De mayo a octubre ofrece clima seco y soleado ideal para playas y actividades acuáticas. De noviembre a abril hace más calor con paisajes exuberantes y menos gente en resorts de lujo.",
        },
        {
          question: "¿Cómo llego a la Coral Coast?",
          answer:
            "Los vuelos internacionales llegan al aeropuerto internacional de Nadi. Traslados privados, hidroaviones y barcos del resort le llevan a destino en pocas horas.",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "Puerta de entrada a las islas Fiyi",
      overview:
        "Nadi es su punto de llegada al paraíso — un hub vibrante que conecta a viajeros internacionales con las islas Mamanuca y Yasawa, la marina de Denarau y el interior montañoso de Fiyi.",
      highlights: ["Templo Sri Siva Subramaniya", "Garden of the Sleeping Giant", "Marina de Denarau"],
      thingsToDo: ["Excursiones de un día", "Visitas a templos", "Tours de mercados", "Golf"],
      placesToStay: ["Resorts de Denarau", "Hoteles boutique en Nadi", "Alojamientos de tránsito en aeropuerto"],
      tours: ["Crucero de un día Mamanuca", "Piscinas de barro y aguas termales de Sabeto", "Tour de aldea en tierras altas"],
      beaches: ["Playa Denarau", "Playa Wailoaloa"],
      dining: ["Fusión indo-fijiana", "Restaurantes de resort", "Productos de mercados locales"],
      transport: ["Aeropuerto internacional de Nadi", "Terminal de ferris Denarau", "Traslados en helicóptero"],
      culture: ["Arquitectura de templos hindúes", "Mercados multiculturales", "Centros artesanales fijianos"],
      weather: "Tropical y húmedo. Mejor visibilidad para saltos entre islas de mayo a octubre.",
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar Nadi?",
          answer:
            "De mayo a octubre ofrece clima seco y soleado ideal para playas y actividades acuáticas. De noviembre a abril hace más calor con paisajes exuberantes y menos gente en resorts de lujo.",
        },
        {
          question: "¿Cómo llego a Nadi?",
          answer:
            "Los vuelos internacionales llegan al aeropuerto internacional de Nadi. Traslados privados, hidroaviones y barcos del resort le llevan a destino en pocas horas.",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "Marina de lujo y resorts de clase mundial",
      overview:
        "Denarau Island es la dirección de lujo por excelencia en Fiyi — un enclave cerrado de resorts cinco estrellas, golf de campeonato, gastronomía refinada y punto principal de salida para cruceros a Mamanuca y Yasawa.",
      highlights: ["Port Denarau Marina", "Golf de campeonato", "Compras de lujo"],
      thingsToDo: ["Cruceros al atardecer", "Safaris en jet ski", "Rituales spa", "Salto entre islas"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "Residencias privadas"],
      tours: ["Charter de yate privado", "Tour en helicóptero por islas", "Paquetes golf y spa"],
      beaches: ["Playa Denarau", "Lagunas de resort"],
      dining: ["Ports O' Call", "Restaurante Nuku", "Restaurantes beach club"],
      transport: ["10 min del aeropuerto Nadi", "Ferris de marina", "Servicio de coche privado"],
      culture: ["Noches meke en resort", "Mercados artesanales", "Clases de cocina fijiana"],
      weather: "Costa oeste protegida — más seca que Suva. Ideal de mayo a octubre.",
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar Denarau?",
          answer:
            "De mayo a octubre ofrece clima seco y soleado ideal para playas y actividades acuáticas. De noviembre a abril hace más calor con paisajes exuberantes y menos gente en resorts de lujo.",
        },
        {
          question: "¿Cómo llego a Denarau?",
          answer:
            "Los vuelos internacionales llegan al aeropuerto internacional de Nadi. Traslados privados, hidroaviones y barcos del resort le llevan a destino en pocas horas.",
        },
      ],
    },
    mamanuca: {
      title: "Islas Mamanuca",
      tagline: "Paraíso náufrago y lagunas cristalinas",
      overview:
        "El archipiélago Mamanuca es la cadena isleña más icónica de Fiyi — lagunas turquesas, lujo descalzo y escenario de innumerables sueños tropicales, accesible en hidroavión o lancha rápida desde Denarau.",
      highlights: ["Castaway Island", "Bar flotante Cloud 9", "Snorkel de clase mundial"],
      thingsToDo: ["Snorkel", "Surf en Cloudbreak", "Kayak", "Picnics privados"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["Safari de snorkel", "Navegación al atardecer", "Bautismo de buceo"],
      beaches: ["Playa Monuriki", "Isla Modriki", "Playas privadas de resort"],
      dining: ["Cena sobre el agua", "BBQ en la playa", "Experiencias en bar flotante"],
      transport: ["Lancha rápida desde Denarau", "Traslados en hidroavión", "Barcos privados del resort"],
      culture: ["Noches culturales en resort", "Visitas a aldeas en islas cercanas"],
      weather: "Refrigerado por alisios. Temporada seca perfecta para claridad del agua.",
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar las islas Mamanuca?",
          answer:
            "De mayo a octubre ofrece clima seco y soleado ideal para playas y actividades acuáticas. De noviembre a abril hace más calor con paisajes exuberantes y menos gente en resorts de lujo.",
        },
        {
          question: "¿Cómo llego a las islas Mamanuca?",
          answer:
            "Los vuelos internacionales llegan al aeropuerto internacional de Nadi. Traslados privados, hidroaviones y barcos del resort le llevan a destino en pocas horas.",
        },
      ],
    },
    yasawa: {
      title: "Islas Yasawa",
      tagline: "Islas remotas y belleza intacta",
      overview:
        "El archipiélago Yasawa ofrece Fiyi en su estado más crudo y romántico — picos volcánicos dramáticos, cuevas blue hole, playas desiertas y algunos de los retiros eco-lujo más exclusivos del Pacífico Sur.",
      highlights: ["Cuevas Sawa-i-Lau", "Blue Lagoon", "Lodges de lujo remotos"],
      thingsToDo: ["Baño en cuevas", "Estancias en aldeas", "Senderismo", "Buceo"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "Lodges de lujo descalzo"],
      tours: ["Excursión Blue Lagoon", "Expedición a cuevas", "Navegación multi-isla"],
      beaches: ["Octopus Beach", "Nanuya Levu", "Calas privadas de resort"],
      dining: ["Festines en la playa", "Degustación en resort", "BBQ del día"],
      transport: ["Ferry Yasawa Flyer", "Hidroavión", "Yate privado"],
      culture: ["Visitas a aldeas remotas", "Pesca tradicional", "Veladas de cuentos"],
      weather: "Más seco que el continente. Mejor visibilidad jun–sep.",
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar las islas Yasawa?",
          answer:
            "De mayo a octubre ofrece clima seco y soleado ideal para playas y actividades acuáticas. De noviembre a abril hace más calor con paisajes exuberantes y menos gente en resorts de lujo.",
        },
        {
          question: "¿Cómo llego a las islas Yasawa?",
          answer:
            "Los vuelos internacionales llegan al aeropuerto internacional de Nadi. Traslados privados, hidroaviones y barcos del resort le llevan a destino en pocas horas.",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "Isla jardín y tierra de cascadas",
      overview:
        "Conocida como la Isla Jardín, Taveuni es un paraíso rico en patrimonio UNESCO — selva tropical, cascadas y sitios de buceo de fama mundial, ideal para aventureros y parejas que buscan naturaleza fuera del circuito resort.",
      highlights: ["Parque nacional Bouma", "Buceo Rainbow Reef", "Cascadas Tavoro"],
      thingsToDo: ["Senderismo a cascadas", "Buceo", "Avistamiento de aves", "Kayak"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "Eco-lodges"],
      tours: ["Trek Bouma Falls", "Buceo Rainbow Reef", "Lavena Coastal Walk"],
      beaches: ["Playa Lavena", "Playa Matei", "Calas ocultas"],
      dining: ["Comida estilo plantación", "Productos tropicales frescos", "Menús fusión en resort"],
      transport: ["Vuelo doméstico desde Nadi/Suva", "Traslados al resort", "Charters en barco"],
      culture: ["Aldea Wainibau", "Granjas tradicionales de taro", "Artesanía local"],
      weather: "Región más húmeda — exuberante todo el año. Buceo mejor abr.–oct.",
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar Taveuni?",
          answer:
            "De mayo a octubre ofrece clima seco y soleado ideal para playas y actividades acuáticas. De noviembre a abril hace más calor con paisajes exuberantes y menos gente en resorts de lujo.",
        },
        {
          question: "¿Cómo llego a Taveuni?",
          answer:
            "Los vuelos internacionales llegan al aeropuerto internacional de Nadi. Traslados privados, hidroaviones y barcos del resort le llevan a destino en pocas horas.",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "Capital de la aventura en Fiyi",
      overview:
        "Pacific Harbour es la dirección de adrenalina de Fiyi — buceo con tiburones en la laguna de Beqa, rafting, tirolina y villas de lujo con vistas al Pacífico, todo al alcance de Suva.",
      highlights: ["Buceo con tiburones", "Rafting", "Zip Fiji"],
      thingsToDo: ["Buceo con alimentación de tiburones", "Rafting Upper Navua", "Golf", "Pesca de altura"],
      placesToStay: ["The Pearl South Pacific", "Villas de lujo", "Lodges boutique"],
      tours: ["Encuentro con tiburones Beqa", "Día de rafting", "Charter de pesca"],
      beaches: ["Natadola (cercana)", "Calas ocultas", "Playas de resort"],
      dining: ["Restaurantes de marina", "Gastronomía en resort", "Marisco local"],
      transport: ["2,5 h desde Nadi", "45 min desde Suva", "Helicóptero disponible"],
      culture: ["Caminar sobre el fuego en Beqa", "Espectáculos en aldeas", "Mercados artesanales"],
      weather: "Ligeramente más húmedo que la costa oeste. Deportes de aventura todo el año.",
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar Pacific Harbour?",
          answer:
            "De mayo a octubre ofrece clima seco y soleado ideal para playas y actividades acuáticas. De noviembre a abril hace más calor con paisajes exuberantes y menos gente en resorts de lujo.",
        },
        {
          question: "¿Cómo llego a Pacific Harbour?",
          answer:
            "Los vuelos internacionales llegan al aeropuerto internacional de Nadi. Traslados privados, hidroaviones y barcos del resort le llevan a destino en pocas horas.",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "Capital de cultura y comercio",
      overview:
        "Suva es el corazón palpitante del Fiyi moderno — arquitectura colonial, mercados vibrantes, museos y una escena gastronómica en crecimiento, perfecta para quienes quieren cultura antes que playa.",
      highlights: ["Museo de Fiyi", "Mercado municipal", "Parlamento y Thurston Gardens"],
      thingsToDo: ["Tours de mercados", "Visitas a museos", "Paseos coloniales", "Vida nocturna"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "Hoteles boutique urbanos"],
      tours: ["Paseo patrimonial urbano", "Baño en bosque Colo-i-Suva", "Excursión de un día a tierras altas"],
      beaches: ["Sin playa urbana — excursiones a Pacific Harbour"],
      dining: ["Gastronomía refinada", "Street food indio", "Mercados de marisco"],
      transport: ["Aeropuerto internacional Nausori", "Autobús a Coral Coast", "Vuelos domésticos"],
      culture: ["Herencia fijiana, india y china", "Música en vivo", "Galerías de arte"],
      weather: "Ciudad más húmeda. Lleve impermeable ligero todo el año.",
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar Suva?",
          answer:
            "De mayo a octubre ofrece clima seco y soleado ideal para playas y actividades acuáticas. De noviembre a abril hace más calor con paisajes exuberantes y menos gente en resorts de lujo.",
        },
        {
          question: "¿Cómo llego a Suva?",
          answer:
            "Los vuelos internacionales llegan al aeropuerto internacional de Nadi. Traslados privados, hidroaviones y barcos del resort le llevan a destino en pocas horas.",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "Snorkel en aguas cristalinas",
      category: "Acuático",
      duration: "Medio día",
      ages: "Todas las edades",
      overview:
        "Deslícese sobre jardines de coral arcoíris en las lagunas más claras de Mamanuca con guía privado, equipo premium y picnic con champagne en un banco de arena desierto.",
      highlights: ["Guía privado", "Equipo de snorkel premium", "Picnic con champagne", "Briefing de biólogo marino"],
      included: ["Traslado en barco ida y vuelta", "Equipo de snorkel", "Refrigerios", "Tasas del parque marino"],
      itinerary: ["Salida marina Denarau", "Dos sitios de snorkel", "Picnic en banco de arena", "Regreso crucero al atardecer"],
      faqs: [
        { question: "¿Necesito experiencia?", answer: "No — apto para principiantes con habilidad básica de natación." },
        { question: "¿Qué debo llevar?", answer: "Protector solar seguro para arrecifes, traje de baño y prenda ligera." },
      ],
    },
    "sunset-cruises": {
      title: "Cruceros al atardecer",
      category: "Navegación",
      duration: "2–3 horas",
      ages: "Todas las edades",
      overview:
        "Navegue hacia un atardecer dorado en el Pacífico a bordo de un catamarán de lujo con canapés, bebidas premium y guitarra fijiana en vivo mientras las siluetas Mamanuca se desvanecen en el crepúsculo.",
      highlights: ["Catamarán de lujo", "Canapés y bebidas", "Música en vivo", "Vistas 360° al atardecer"],
      included: ["Bebida de bienvenida", "Selección de canapés", "Opción de traslado de regreso"],
      itinerary: ["Embarque en marina", "Navegación costera", "Brindis al atardecer", "Regreso bajo las estrellas"],
      faqs: [
        {
          question: "¿Depende del clima?",
          answer: "Los cruceros operan en la mayoría de condiciones; reembolso completo si se cancela por seguridad.",
        },
      ],
    },
    "hiking-waterfalls": {
      title: "Senderismo y cascadas",
      category: "Aventura",
      duration: "Día completo",
      ages: "16+",
      overview:
        "Camine por el parque nacional Bouma hasta cascadas ocultas, nade en pozas esmeralda y almuerce con fruta tropical en la selva tropical intacta de la Isla Jardín.",
      highlights: ["Guía local experto", "Tres paradas para nadar en cascadas", "Ecología de la selva", "Almuerzo farm-to-table"],
      included: ["Tasas del parque", "Guía", "Almuerzo", "Traslados desde el resort"],
      itinerary: ["Trek matutino por el bosque", "Baños en cascadas", "Almuerzo en aldea", "Regreso por la tarde"],
      faqs: [
        {
          question: "¿Nivel de forma física?",
          answer: "Moderado — 4–5 horas en senderos irregulares con algunas secciones empinadas.",
        },
      ],
    },
    "village-tours": {
      title: "Tours de aldeas",
      category: "Cultura",
      duration: "Medio día",
      ages: "Todas las edades",
      overview:
        "Viva la hospitalidad fijiana auténtica — ceremonia del kava, danza meke, demostraciones artesanales y festín lovo tradicional preparado por la familia del jefe de la aldea.",
      highlights: ["Ceremonia del kava", "Espectáculo meke", "Festín lovo", "Taller artesanal"],
      included: ["Donación a la aldea", "Participación en ceremonia", "Almuerzo tradicional", "Transporte"],
      itinerary: ["Bienvenida en aldea", "Kava y meke", "Demo artesanal", "Almuerzo lovo"],
      faqs: [
        {
          question: "¿Qué debo vestir?",
          answer: "Ropa modesta que cubra hombros y rodillas. Quítese el sombrero en la aldea.",
        },
      ],
    },
    "island-hopping": {
      title: "Aventura de salto entre islas",
      category: "Varios días",
      duration: "3–7 días",
      ages: "Todas las edades",
      overview:
        "Viaje multi-isla curado en lancha rápida privada o hidroavión — resorts boutique, playas ocultas y experiencias a medida por su conserje.",
      highlights: ["Traslados privados", "Estancias en resorts boutique", "Itinerario flexible", "Conserje dedicado"],
      included: ["Traslados entre islas", "Coordinación de resort", "Desayuno diario", "Soporte de conserjería"],
      itinerary: ["Día 1: llegada Mamanuca", "Días 2–3: exploración Yasawa", "Día 4+: extensiones personalizadas"],
      faqs: [
        {
          question: "¿Puedo personalizar?",
          answer: "Cada salto entre islas es a medida — su conserje diseña la ruta con usted.",
        },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Paquete resort Denarau Island",
      description: "Suite con vista al océano cinco noches con traslados privados al aeropuerto, desayuno diario y acceso a marina.",
      includes: ["Traslado privado", "Suite con vista al océano", "Desayuno diario"],
    },
    "romantic-honeymoon-escape": {
      title: "Escapada romántica de luna de miel",
      description: "Retiro en pareja con cena privada en banco de arena, ritual spa en pareja y navegación al atardecer.",
      includes: ["Cena privada", "Spa en pareja", "Crucero al atardecer"],
    },
    "mamanuca-island-escape": {
      title: "Escapada islas Mamanuca",
      description: "Paquete fly-and-flop — traslados en hidroavión ida y vuelta, almuerzo sobre el agua y equipo de snorkel.",
      includes: ["Traslado en hidroavión", "Crédito en resort", "Alquiler de snorkel"],
    },
    "family-coral-coast-package": {
      title: "Paquete familiar Coral Coast",
      description: "Bures comunicados, acceso al club infantil y actividades en playa Natadola para toda la familia.",
      includes: ["Club infantil", "Bure familiar", "Actividades en playa"],
    },
    "private-island-buyout": {
      title: "Alquiler exclusivo de isla privada",
      description: "Uso exclusivo de una isla Mamanuca — hasta 12 huéspedes, chef, barco y equipo de mayordomos incluidos.",
      includes: ["Isla exclusiva", "Chef privado", "Charter de barco"],
    },
    "stay-and-play-nadi": {
      title: "Paquete Stay & Play Nadi",
      description: "Estancia en resort con excursiones de un día — visita a aldea, piscinas de barro y picnic isleño.",
      includes: ["Estancia en resort", "2 excursiones", "Todos los traslados"],
    },
    "luxury-overwater-bure": {
      title: "Estancia en bure sobre el agua de lujo",
      description: "Duerma sobre aguas cristalinas — terraza privada, servicio de mayordomo y cena en bure.",
      includes: ["Bure sobre el agua", "Servicio de mayordomo", "Cena en bure"],
    },
    "coral-coast-beach-escape": {
      title: "Escapada playa Coral Coast",
      description: "Resort en playa Natadola con crédito spa FJD 200 y cena degustación seleccionada.",
      includes: ["Habitación frente al mar", "Crédito spa", "Cena degustación"],
    },
    "wellness-spa-retreat": {
      title: "Retiro wellness y spa",
      description: "Yoga frente al océano, masaje tradicional Bobo y gastronomía orgánica farm-to-table.",
      includes: ["Yoga diario", "Ritual spa", "Gastronomía wellness"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description: "Los únicos bures sobre el agua de Fiyi — santuario solo adultos con gastronomía todo incluido.",
      includes: ["Bure sobre el agua", "Todo incluido", "Solo adultos"],
    },
    "mamanuca-island-hopping": {
      title: "Salto entre islas Mamanuca",
      description: "Lancha rápida privada, snorkel en arrecife y picnic con champagne en banco de arena desierto.",
      includes: ["Barco privado", "Snorkel", "Picnic con champagne"],
    },
    "yasawa-adventure-package": {
      title: "Paquete aventura Yasawa",
      description: "Senderismo guiado a cascadas ocultas, kayak de mar y ceremonia del kava en aldea.",
      includes: ["Senderismo a cascadas", "Kayak", "Visita a aldea"],
    },
    "beqa-shark-dive": {
      title: "Buceo con tiburones laguna Beqa",
      description: "Encuentro con tiburones de fama mundial con equipo, guía y traslado desde Pacific Harbour.",
      includes: ["Buceo con tiburones", "Equipo", "Traslado"],
    },
    "sunset-cruise-denarau": {
      title: "Crucero privado al atardecer",
      description: "Navegación con champagne desde Port Denarau Marina — canapés, música en vivo y vistas en hora dorada.",
      includes: ["Charter privado", "Canapés", "Champagne"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "El único resort de Fiyi con bures sobre el agua — Likuliku combina intimidad solo adultos, gastronomía de clase mundial y una laguna que brilla al atardecer.",
      amenities: ["Bures sobre el agua", "Solo adultos", "Spa", "Playa privada", "Gastronomía refinada"],
      experiences: ["Snorkel", "Crucero al atardecer", "Rituales spa"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "Una íntima isla de 36 bures donde el lujo descalzo encuentra la calidez fijiana — perfecta para lunas de miel y celebraciones especiales.",
      amenities: ["Bures frente al mar", "Spa", "Centro de buceo", "Cena privada"],
      experiences: ["Buceo", "Picnic en isla", "Visita a aldea"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "El lujo familiar insignia de Denarau — amplias piscinas, golf de campeonato cercano y acceso fluido a marina para aventuras isleñas.",
      amenities: ["Múltiples piscinas", "Club infantil", "Spa", "Acceso a marina", "7 restaurantes"],
      experiences: ["Salto entre islas", "Golf", "Crucero al atardecer"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Lujo pulido a la francesa en la mejor playa de Denarau — desayunos flotantes, acceso al arrecife y filosofía spa signature de Sofitel.",
      amenities: ["Frente al mar", "Spa", "Snorkel en arrecife", "Club infantil"],
      experiences: ["Snorkel en arrecife", "Día spa", "Noche cultural"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "Joyas de la playa Natadola — golf de campeonato, arenas legendarias de Natadola y cultura de aldeas a su puerta.",
      amenities: ["Playa Natadola", "Campo de golf", "Spa", "Club infantil", "Centro cultural"],
      experiences: ["Tour de aldea", "Golf", "Equitación en playa"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "La isla que definió Fiyi para toda una generación — familiar, rodeada de arrecife y auténticamente fijiana.",
      amenities: ["Isla privada", "Centro PADI", "Club infantil", "Múltiples playas"],
      experiences: ["Snorkel", "Kayak", "Visita a aldea"],
    },
  },
};
