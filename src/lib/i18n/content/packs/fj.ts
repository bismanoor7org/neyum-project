import type { LocaleContentPack } from "../types";

export const fjPack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "Vakarautaki",
    Style: "Veivoli na nomu sala",
    Activities: "Wasa & veivoli",
  },
  guides: {
    "first-time-fiji": {
      title: "Na Nomu iMatai ni Veivoli ki Fiji",
      excerpt: "Na veika kece o gadreva me baleta na nomu ikalawa i matai ki Fiji.",
      category: "Vakarautaki",
      overview:
        "Na Fiji e veivoli vinaka sara me baleta na ikalawa i matai — rawarawa na curu, tamata vakacaca, kei na 333 na yanuyanu mo raica. Na lewe ni vulagi e sega ni gadreva na visa me yacova na 4 na vula.",
      sections: [
        {
          title: "Ni bera ni vuka",
          body: "Raica me yaga na nomu pasipoti me yacova na 6 na vula ni oti na veivoli. Vakarautaka na inisua ni veivoli taqomaki kei na ivola ni veika ni vanua me baleta na yanuyanu yawa.",
          items: ["Yaga ni pasipoti", "Inisua ni veivoli", "Ilavo (FJD)", "Veivakasulumi vakamamada me baleta na koro"],
        },
        {
          title: "Yaco mai kei na kerekere",
          body: "Na Vanua ni Vuka i Nadi e vou ka rawarawa. Vakarautaka na veivoli vakaitaukei ni bera mo vuka mo sivita na lisi ka tekivu vakacegu vakatotolo.",
          items: ["Veivoli vakaitaukei", "SIM card ena vanua ni vuka", "Veiqaravi ni veiresort"],
        },
        {
          title: "iTovo ena veiyanu",
          body: "Na kai Fiji era tiko vata kei ira na tamata vakacaca duadua e vuravura. Na 'Bula!' vakacaca e yaga vakalevu. Kauta laivi na iu ni ulu ena koro ka ciqoma na kava ni sa vakarautaki.",
          items: ["Veivakasulumi ena koro", "Soqoni ni kava", "Veivakadonui me tauri iTaba"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na nomu imatai ni veivoli ki Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    "visa-guide": {
      title: "Visa & Veika e Gadrevi ni Veivoli",
      excerpt: "Pasipoti, visa kei na veivakarau ni curu — vakamacalataki ka sega na vosa vakaduidui.",
      category: "Vakarautaki",
      overview:
        "Na lewe ni tamata e sega ni gadreva me vakarautaka na visa ni bera ni vuka ki Fiji. Raica ga me vakadodonu na nomu pasipoti kei na tikiti lesu tale ki na veika e gadreva na immigration.",
      sections: [
        {
          title: "Curu galala",
          body: "Na lewe ni vanua levu e rawa ni rawata na veivakadonui ni vulagi me yacova na 4 na vula.",
          items: ["Pasipoti yaga 6+ na vula", "Tikiti lesu tale", "Vakadinadina ni tiko"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na visa kei na veika e gadrevi ni veivoli?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    "best-time-to-visit": {
      title: "Na Gauna Vinaka me Lako",
      excerpt: "Draki, veigauna, kei na gauna eda na lako kina dina.",
      category: "Vakarautaki",
      overview:
        "Na Fiji e katakata tiko ena veigauna kece. Na gauna dri (Mei–Okotoba) e solia na lomalagi savasava kei na veiresort sinai; na gauna vakavuwa (Noveba–Epareli) e solia na vanua vakabulabula, lailai na lewe ni tamata, kei na isau malua.",
      sections: [
        {
          title: "Gauna dri (Mei–Okotoba)",
          body: "Lailai na draki vakavuwa, vinaka sara me baleta na diving kei na vuka. Dau vakayagataki — vakarautaka vakawawa.",
          items: ["Vinaka me baleta na diving", "Isau levu ena veiresort", "Soqoni kei na veika"],
        },
        {
          title: "Gauna vakavuwa (Noveba–Epareli)",
          body: "Katakata cake kei na uca ena yakavi. Na vanua e lala e vakabulabula, matasawa malua, kei na veivoli vinaka.",
          items: ["Isau lailai", "Wai lulu vakabulabula", "Wai katakata"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na gauna vinaka me lako ki Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    "weather-guide": {
      title: "Draki & iTuvatuva ni Draki",
      excerpt: "Kila na veigauna vakatabakidua ni Fiji.",
      category: "Vakarautaki",
      overview:
        "Na Fiji e tiko ena loma ni cagi trade-wind ni South Pacific — katakata, draki vakavuwa, kei na matanisiga ena veigauna levu.",
      sections: [
        {
          title: "Veiveisau ena veitikina",
          body: "Na yasana i tokatoka (Denarau, Mamanuca) e dri cake mai Suva kei Taveuni. Vakarautaka na veivoli yanuyanu vakamata na veiveisau ni draki.",
          items: ["Yasana i tokatoka e dri", "Suva e vakavuwa", "Gauna ni cagilaba Noveba–Epareli"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na draki kei na iTuvatuva ni draki?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    "luxury-travel": {
      title: "iVolavola ni Veivoli Vakaturaga",
      excerpt: "Veiresort digitaki kei na veika vakataki iko.",
      category: "Veivoli na nomu sala",
      overview:
        "Na veivoli vakaturaga ena Fiji e veibuyatataki kei na veitikina kece e South Pacific — yanuyanu vakaitaukei, bure e loma ni wai, veiqaravi vakaitaukei kei na veivoli helicopter me vaka na iTovo.",
      sections: [
        {
          title: "E vei mo tiko",
          body: "Likuliku Lagoon, Turtle Island, Vomo Island kei Kokomo Private Island e vakatakilakila sara.",
          items: ["Bure e loma ni wai", "Yanuyanu vakaitaukei", "Digidigi all-inclusive"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na veivoli vakaturaga ki Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    honeymoon: {
      title: "iVolavola ni Veivoli Vakawati",
      excerpt: "Veivoli vakacegu vei ira na veiwatini.",
      category: "Veivoli na nomu sala",
      overview:
        "Na Fiji na vanua vakacegu duadua ena South Pacific — kakana vakaitaukei ena matasawa, veiqaravi spa vei ira na veiwatini kei na veivoli ena yanuyanu qase ga.",
      sections: [
        {
          title: "Veika vakacegu vinaka duadua",
          body: "Na vuka ena matai-siga, veivoli vakaitaukei ena yanuyanu kei na kakana e loma ni wai e vakatakilakila na veivoli vakawati ena Fiji.",
          items: ["Tiko ena yanuyanu vakaitaukei", "Spa vei ira na veiwatini", "Vuka ena matai-siga"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na veivoli vakawati ki Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    "family-travel": {
      title: "iVolavola ni Veivoli Vata kei na Matavuvale",
      excerpt: "Na Fiji kei ira na gone — paradaiso sega ni vakacaca.",
      category: "Veivoli na nomu sala",
      overview:
        "Na iTovo Vakafiji e maroroya na gone. Na kids' club, lago malua kei na bure ni matavuvale e vakarautaka na Fiji me vinaka me baleta na veivoli vata kei ira na qase.",
      sections: [
        {
          title: "Veiresort vinaka vei ira na matavuvale",
          body: "Na veiresort e Denarau kei Coral Coast e vinaka sara ena veika vei ira na gone ni tiko na i tuba ena spa.",
          items: ["Kids' club", "Lago malua", "Veimataqali e semati"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na veivoli vata kei na matavuvale ki Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    adventure: {
      title: "iVolavola ni Veivoli Vakacaucau",
      excerpt: "Veivoli vakacaucau kei na veivakatarogi.",
      category: "Veivoli na nomu sala",
      overview:
        "Mai na diving ni shark ena Beqa Lagoon ki na veivoli wai lulu ena Taveuni, na Fiji e solia na veivoli vakaitaukei duadua ka sega ni vakacalai na vakaturaga.",
      sections: [
        {
          title: "Veivoli e dodonu mo cakava",
          body: "Diving ni shark, rafting, zip-lining kei na surf charter e tiko vata kei na vinaka duadua ena Pacific.",
          items: ["Diving ni shark", "Rafting", "Veivoli wai lulu"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na veivoli vakacaucau ena Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    wellness: {
      title: "iVolavola ni Bula Vinaka",
      excerpt: "Vakabulabulataki na yago kei na vakasama ena paradaiso.",
      category: "Veivoli na nomu sala",
      overview:
        "Yoga e matasawa ni wasa, Bobo massage vakavanua kei na veivoli digital-detox e vakarautaka na Fiji me vanua bula vinaka e tubu cake.",
      sections: [
        {
          title: "Veiqaravi bula vinaka",
          body: "Veivakaduataki na spa kei na veivoli ena veivure kei na vakasama me baleta na vakabulabulataki taucoko.",
          items: ["Spa e matasawa ni wasa", "Veivoli yoga", "Veika detox"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na bula vinaka ena Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    culture: {
      title: "iVolavola ni iTovo",
      excerpt: "iTovo dina ni kai Fiji.",
      category: "Veivoli na nomu sala",
      overview:
        "Na iTovo Vakafiji e bula ka lomasoli — veivakatarogi koro, meke kei na soqoni ni kava e solia na veiwekani dina e taudaku ni veiresort.",
      sections: [
        {
          title: "Veika vakavanua",
          body: "Lako vata kei na dauveiqaravi e maroroya na veiwekani kei na koro ka vakadeitaka na veivakayagataki vakamamada.",
          items: ["Veivakatarogi koro", "Meke", "Veivoli cakacaka vakavanua"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na veika vakavanua ena Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    "food-drink": {
      title: "iVolavola ni Kakana & Gunu",
      excerpt: "Na ka mo kania kei na ka mo gunu ena Fiji.",
      category: "Veivoli na nomu sala",
      overview:
        "Na kakana Vakafiji e veivakaduataki na kakana ni veiyanu kei na i vakatakilakila mai Idia kei Jaina — mai na soqoni ni lovo e ruku ni qele ki na kakana vakaturaga ena veiresort.",
      sections: [
        {
          title: "E dodonu mo tovolea",
          body: "Kokoda, lovo, roti wraps, kei na kana balavu ena restorani vinaka ni veiresort.",
          items: ["Soqoni ni lovo", "Kokoda", "Degustation ena veiresort"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na kakana kei na gunu ena Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    transportation: {
      title: "iVolavola ni Veivakarau",
      excerpt: "Vuka, waqa kei na veivoli ena veiyanu.",
      category: "Vakarautaki",
      overview:
        "Na ka vinaka duadua e na sala — seaplane, waqa totolo kei na vuka vakavanua e semati na veiyanu vakatotolo mai na ka o nanuma.",
      sections: [
        {
          title: "Veivoli ena veiyanu",
          body: "Na Denarau Marina e vakayagataka na waqa ki Mamanuca kei Yasawa. Na seaplane e yaco ki na veiresort vakaturaga yawa.",
          items: ["Fiji Airways vakavanua", "Yasawa Flyer", "Veivoli seaplane"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na veivakarau ena Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    "island-hopping": {
      title: "iVolavola ni Veivoli Yanuyanu",
      excerpt: "Na sala mo veivoli ena veiyanu sega ni vakacaca.",
      category: "Vakarautaki",
      overview:
        "Na veivoli yanuyanu na ka vinaka duadua e cakava na Fiji. Eda vakatautauvatataka na sala ena Mamanuca, Yasawa kei na veitikina malua — vakatau ki na nomu siga kei na ilavo.",
      sections: [
        {
          title: "Sala vakarautaki",
          body: "Tolu na siga ena Mamanuca, vica na siga ena Yasawa, se tini na siga e veivakaduataki rau — rawarawa mo veisau.",
          items: ["3 na siga totolo", "7 na siga veivakatarogi", "10 na siga taucoko"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na veivoli yanuyanu ena Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    diving: {
      title: "iVolavola ni Diving",
      excerpt: "Veivure, shark kei na vanua diving vakaitaukei.",
      category: "Wasa & veivoli",
      overview:
        "Rainbow Reef, Beqa Lagoon kei Great White Wall e tiko vata kei na diving vinaka duadua e vuravura.",
      sections: [
        {
          title: "Vanua diving vinaka duadua",
          body: "Diving ni shark ena Beqa, Rainbow Reef kei Namena — e dua na ka me baleta na vei vakatagedegede kece.",
          items: ["Shark ena Beqa", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na diving ena Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    surfing: {
      title: "iVolavola ni Surfing",
      excerpt: "Na nuku era dau tukuna kina.",
      category: "Wasa & veivoli",
      overview:
        "Cloudbreak, Restaurants kei Frigates — nuku vakacaucau, dau yaco mai na waqa mai Denarau se Mamanuca.",
      sections: [
        {
          title: "Nuku vinaka duadua",
          body: "Na Cloudbreak na nuku i mawi kilai levu ena Fiji. Vakatau na waqa mai na veiresort e voleka me baleta na veivoli ena matai-siga.",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na surfing ena Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
    "travel-planning": {
      title: "iTikina ni Vakarautaki ni Veivoli",
      excerpt: "Na nomu vanua e dua me vakarautaka na nomu veivoli vinaka ki Fiji.",
      category: "Vakarautaki",
      overview:
        "Na veika kece o gadreva ena dua na vanua — iVolavola, veivakarau, veiqaravi concierge kei na vakarautaki iTuvatuva vakataki iko me baleta na veivoli vakaturaga ki Fiji.",
      sections: [
        {
          title: "Tekivu eke",
          body: "Tukuna na nomu siga, mataqali kei na ilavo — na noda concierge e vakarautaka na iTuvatuva vakataki iko ena 24 na auwa.",
          items: ["Veidinadinati galala", "iTuvatuva vakataki iko", "Veivakadeitaki ni isau vinaka"],
        },
      ],
      faqs: [
        {
          question: "Na vakarautaki vakacava sivia au gadreva me baleta na nomu veivoli ki Fiji?",
          answer:
            "Na veiresort vakaturaga e sinai vakatotolo ena gauna levu (Juni–Setema). Vakarautaka ena 3–6 na vula ni bera — eda rawa talega ni kunea vanua ena gauna i otiota mai na veivoli vata keitou.",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "Matasawa koula kei na iTovo dina ni kai Fiji",
      overview:
        "Na Coral Coast e tiko vata kei na yasana i tuba ni Viti Levu — matasawa vakai niu, veiresort vakaturaga kei na koro vakavanua e tiko kina na soqoni ni lavelave kei na kava.",
      highlights: ["Sigatoka Sand Dunes", "Soqoni ni koro", "Veiresort vakaturaga ena matasawa"],
      thingsToDo: ["Veivakatarogi koro", "Safari ena uciwai", "Golf ena veikoro", "Veivoli spa"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "Vale vakaitaukei ena matasawa"],
      tours: ["Siga vakavure ni iTovo", "Vuka helicopter ena yasana", "Vuka dhow ena matai-siga"],
      beaches: ["Natadola Beach", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["Kakana vakaturaga e matasawa", "Soqoni ni lovo", "Degustation ena veiresort"],
      transport: ["Vanua ni vuka i Nadi 1 na auwa", "Veivoli vakaitaukei ni veiresort", "Veivoli vakatakilakila ena yasana"],
      culture: ["Meke", "Koro ni cakacaka vakamata", "Makete ni cakacaka vakavanua"],
      weather: "Katakata ena veigauna kece. Gauna dri Mei–Okotoba (26–30°C). Gauna vakavuwa Noveba–Epareli kei na uca ena yakavi.",
      faqs: [
        {
          question: "Na gauna cava vinaka me lako ki Coral Coast?",
          answer:
            "Mei ki Okotoba e solia na draki dri kei na matanisiga vinaka me baleta na matasawa kei na veika ena wai. Noveba ki Epareli e katakata cake ka vakabulabula, ka lailai na lewe ni vulagi ena veiresort vakaturaga.",
        },
        {
          question: "Au na lako vakacava ki Coral Coast?",
          answer:
            "Na vuka vakamatavuvale e yaco ki na Vanua ni Vuka i Nadi. Na veivoli vakaitaukei, seaplane kei na waqa ni veiresort e vakayacora na nomu iotioti ena vica na auwa.",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "Na matamata ni veiyanu ni Fiji",
      overview:
        "Na Nadi na nomu vanua ni yaco ki na paradaiso — vanua bula e semati ira na vulagi vakamatavuvale ki na veiyanu Mamanuca kei Yasawa, Denarau Marina kei na vanua e lala ni Viti Levu.",
      highlights: ["Sri Siva Subramaniya Temple", "Garden of the Sleeping Giant", "Denarau Marina"],
      thingsToDo: ["Veivoli siga ki na veiyanu", "Veivakatarogi vale ni lotu", "Veivakatarogi makete", "Golf"],
      placesToStay: ["Veiresort e Denarau", "Otela boutique e Nadi", "Vale ni veivoli ena vanua ni vuka"],
      tours: ["Vuka siga ki Mamanuca", "Sabeto mud pool & hot springs", "Veivakatarogi koro ena vanua e lala"],
      beaches: ["Denarau Beach", "Wailoaloa Beach"],
      dining: ["Veivakaduataki Indo-Fijian", "Restorani ni veiresort", "Vikavika mai na makete"],
      transport: ["Vanua ni Vuka i Nadi", "Waqa mai Denarau", "Veivoli helicopter"],
      culture: ["iVakatakarakara ni vale ni lotu Hindu", "Makete vakamatavuvale", "Vanua ni cakacaka Vakafiji"],
      weather: "Vakatabakidua ka draki vakavuwa. Raica vinaka me baleta na veivoli yanuyanu Mei–Okotoba.",
      faqs: [
        {
          question: "Na gauna cava vinaka me lako ki Nadi?",
          answer:
            "Mei ki Okotoba e solia na draki dri kei na matanisiga vinaka me baleta na matasawa kei na veika ena wai. Noveba ki Epareli e katakata cake ka vakabulabula, ka lailai na lewe ni vulagi ena veiresort vakaturaga.",
        },
        {
          question: "Au na lako vakacava ki Nadi?",
          answer:
            "Na vuka vakamatavuvale e yaco ki na Vanua ni Vuka i Nadi. Na veivoli vakaitaukei, seaplane kei na waqa ni veiresort e vakayacora na nomu iotioti ena vica na auwa.",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "Marina vakaturaga kei na veiresort vakaitaukei",
      overview:
        "Na Yanuyanu Denarau na vanua vakaturaga duadua ena Fiji — vanua vakaitaukei ni veiresort lima-ni-kata, golf, kakana vinaka kei na vanua ni vuka ki na veivoli Mamanuca kei Yasawa.",
      highlights: ["Port Denarau Marina", "Golf", "Veivoli voli vakaturaga"],
      thingsToDo: ["Vuka ena matai-siga", "Safari jet ski", "Veiqaravi spa", "Veivoli yanuyanu"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "Vale vakaitaukei"],
      tours: ["Vakatau waqa vakaitaukei", "Vuka helicopter ena veiyanu", "Paketi golf kei spa"],
      beaches: ["Denarau Beach", "Lago ni veiresort"],
      dining: ["Ports O' Call", "Nuku restaurant", "Kakana ena beach club"],
      transport: ["10 na miniti mai Nadi", "Waqa mai marina", "Motoka vakaitaukei"],
      culture: ["Bogi meke ena veiresort", "Makete ni cakacaka", "Veivoli kakana Vakafiji"],
      weather: "Yasana i tokatoka e taqomaki — dri cake mai Suva. Vinaka Mei–Okotoba.",
      faqs: [
        {
          question: "Na gauna cava vinaka me lako ki Denarau?",
          answer:
            "Mei ki Okotoba e solia na draki dri kei na matanisiga vinaka me baleta na matasawa kei na veika ena wai. Noveba ki Epareli e katakata cake ka vakabulabula, ka lailai na lewe ni vulagi ena veiresort vakaturaga.",
        },
        {
          question: "Au na lako vakacava ki Denarau?",
          answer:
            "Na vuka vakamatavuvale e yaco ki na Vanua ni Vuka i Nadi. Na veivoli vakaitaukei, seaplane kei na waqa ni veiresort e vakayacora na nomu iotioti ena vica na auwa.",
        },
      ],
    },
    mamanuca: {
      title: "Yanuyanu Mamanuca",
      tagline: "Paradaiso ni veivoli kei na lago savasava",
      overview:
        "Na Mamanuca na veiyanu kilai levu duadua ena Fiji — lago vakatakilakila, vakaturaga malua kei na vanua ni tauri iTaba ni veivoli vakatabakidua, yaco mai na seaplane se waqa totolo mai Denarau.",
      highlights: ["Castaway Island", "Cloud 9 floating bar", "Snorkelling vakaitaukei"],
      thingsToDo: ["Snorkelling", "Surf ena Cloudbreak", "Kayaking", "Veivoli vakaitaukei"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["Safari snorkel", "Vuka ena matai-siga", "Diving vakatavulici"],
      beaches: ["Monuriki Beach", "Modriki Island", "Matasawa vakaitaukei ni veiresort"],
      dining: ["Kakana e loma ni wai", "BBQ ena matasawa", "Veivoli ena bar e loma ni wai"],
      transport: ["Waqa totolo mai Denarau", "Veivoli seaplane", "Waqa vakaitaukei ni veiresort"],
      culture: ["Bogi vakavanua ena veiresort", "Veivakatarogi koro ena veiyanu e voleka"],
      weather: "Vakabatabata na cagi trade-wind. Gauna dri vinaka me baleta na savasava ni wai.",
      faqs: [
        {
          question: "Na gauna cava vinaka me lako ki na Yanuyanu Mamanuca?",
          answer:
            "Mei ki Okotoba e solia na draki dri kei na matanisiga vinaka me baleta na matasawa kei na veika ena wai. Noveba ki Epareli e katakata cake ka vakabulabula, ka lailai na lewe ni vulagi ena veiresort vakaturaga.",
        },
        {
          question: "Au na lako vakacava ki na Yanuyanu Mamanuca?",
          answer:
            "Na vuka vakamatavuvale e yaco ki na Vanua ni Vuka i Nadi. Na veivoli vakaitaukei, seaplane kei na waqa ni veiresort e vakayacora na nomu iotioti ena vica na auwa.",
        },
      ],
    },
    yasawa: {
      title: "Yanuyanu Yasawa",
      tagline: "Yanuyanu yawa kei na totoka sega ni vakacalai",
      overview:
        "Na Yasawa e solia na Fiji ena i vakarau e sega ni vakacalai ka vakacegu — ulu ni vanua vakatabakidua, ana blue hole, matasawa lala kei na veitikina eco-luxury digitaki duadua ena South Pacific.",
      highlights: ["Sawa-i-Lau caves", "Blue Lagoon", "Veitikina vakaturaga yawa"],
      thingsToDo: ["Dauwili ena ana", "Tiko vata kei na koro", "Veivoli e lala", "Diving"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "Veitikina vakaturaga malua"],
      tours: ["Veivoli siga ki Blue Lagoon", "Veivakatarogi ana", "Vuka ena veiyanu levu"],
      beaches: ["Octopus Beach", "Nanuya Levu", "Matasawa vakaitaukei ni veiresort"],
      dining: ["Soqoni ena matasawa", "Degustation ena veiresort", "BBQ ni ika ni siga"],
      transport: ["Waqa Yasawa Flyer", "Seaplane", "Waqa vakaitaukei"],
      culture: ["Veivakatarogi koro yawa", "Qoli vakavanua", "Bogi tukutuku"],
      weather: "Dri cake mai na vanua levu. Raica vinaka Juni–Setema.",
      faqs: [
        {
          question: "Na gauna cava vinaka me lako ki na Yanuyanu Yasawa?",
          answer:
            "Mei ki Okotoba e solia na draki dri kei na matanisiga vinaka me baleta na matasawa kei na veika ena wai. Noveba ki Epareli e katakata cake ka vakabulabula, ka lailai na lewe ni vulagi ena veiresort vakaturaga.",
        },
        {
          question: "Au na lako vakacava ki na Yanuyanu Yasawa?",
          answer:
            "Na vuka vakamatavuvale e yaco ki na Vanua ni Vuka i Nadi. Na veivoli vakaitaukei, seaplane kei na waqa ni veiresort e vakayacora na nomu iotioti ena vica na auwa.",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "Yanuyanu ni Were & vanua ni wai lulu",
      overview:
        "Kilai me Yanuyanu ni Were, na Taveuni na paradaiso vakatabakidua ni veivure, wai lulu kei na vanua diving kilai levu — vinaka vei ira era dau veivoli vakacaucau kei ira na veiwatini era gadreva na natura taudaku ni veiresort.",
      highlights: ["Bouma National Heritage Park", "Diving ena Rainbow Reef", "Tavoro Waterfalls"],
      thingsToDo: ["Veivoli wai lulu", "Diving", "Raica na manumanu vuka", "Kayaking"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "Eco-lodges"],
      tours: ["Veivoli ki Bouma Falls", "Diving ena Rainbow Reef", "Lavena Coastal Walk"],
      beaches: ["Lavena Beach", "Matei Beach", "Matasawa vuni"],
      dining: ["Kakana vaka plantation", "Vikavika vakatabakidua", "Degustation ena veiresort"],
      transport: ["Vuka vakavanua mai Nadi/Suva", "Veivoli ni veiresort", "Vakatau waqa"],
      culture: ["Koro Wainibau", "Were ni dalo vakavanua", "Cakacaka vakavanua"],
      weather: "Vanua vakavuwa duadua — vakabulabula ena veigauna kece. Diving vinaka Epareli–Okotoba.",
      faqs: [
        {
          question: "Na gauna cava vinaka me lako ki Taveuni?",
          answer:
            "Mei ki Okotoba e solia na draki dri kei na matanisiga vinaka me baleta na matasawa kei na veika ena wai. Noveba ki Epareli e katakata cake ka vakabulabula, ka lailai na lewe ni vulagi ena veiresort vakaturaga.",
        },
        {
          question: "Au na lako vakacava ki Taveuni?",
          answer:
            "Na vuka vakamatavuvale e yaco ki na Vanua ni Vuka i Nadi. Na veivoli vakaitaukei, seaplane kei na waqa ni veiresort e vakayacora na nomu iotioti ena vica na auwa.",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "Korolevu ni veivoli vakacaucau ena Fiji",
      overview:
        "Na Pacific Harbour na vanua ni veivoli vakacaucau ena Fiji — diving ni shark ena Beqa Lagoon, rafting, zip-lining kei na vale vakaturaga e matasawa ni Pacific, e voleka ki Suva.",
      highlights: ["Diving ni shark", "Rafting", "Zip Fiji"],
      thingsToDo: ["Diving ni kana ni shark", "Rafting Upper Navua", "Golf", "Qoli ena wasa levu"],
      placesToStay: ["The Pearl South Pacific", "Vale vakaturaga", "Veitikina boutique"],
      tours: ["Veivakatarogi shark ena Beqa", "Siga rafting ena uciwai", "Vakatau qoli"],
      beaches: ["Natadola (voleka)", "Matasawa vuni", "Matasawa ni veiresort"],
      dining: ["Restorani ena marina", "Kakana vakaturaga ena veiresort", "Ika vakavanua"],
      transport: ["2.5 na auwa mai Nadi", "45 na miniti mai Suva", "Helicopter e tiko"],
      culture: ["Lavelave ena Beqa", "Veivakatakilakila ena koro", "Makete ni cakacaka"],
      weather: "Vakavuwa lailai mai na yasana i tokatoka. Veivoli vakacaucau ena veigauna kece.",
      faqs: [
        {
          question: "Na gauna cava vinaka me lako ki Pacific Harbour?",
          answer:
            "Mei ki Okotoba e solia na draki dri kei na matanisiga vinaka me baleta na matasawa kei na veika ena wai. Noveba ki Epareli e katakata cake ka vakabulabula, ka lailai na lewe ni vulagi ena veiresort vakaturaga.",
        },
        {
          question: "Au na lako vakacava ki Pacific Harbour?",
          answer:
            "Na vuka vakamatavuvale e yaco ki na Vanua ni Vuka i Nadi. Na veivoli vakaitaukei, seaplane kei na waqa ni veiresort e vakayacora na nomu iotioti ena vica na auwa.",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "Korolevu ni iTovo kei na veivoli",
      overview:
        "Na Suva na yalo ni Fiji vou — iVakatakarakara vakakoloni, makete bula, museum kei na kakana vinaka e tubu cake, vinaka vei ira era gadreva na iTovo ni bera na matasawa.",
      highlights: ["Fiji Museum", "Municipal Market", "Parliament & Thurston Gardens"],
      thingsToDo: ["Veivakatarogi makete", "Veivakatarogi museum", "Veivoli vakakoloni", "Bogi bula"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "Otela boutique ena koro"],
      tours: ["Veivoli iTukutuku ni koro", "Dauwili ena veivure Colo-i-Suva", "Veivoli siga ki vanua e lala"],
      beaches: ["Sega na matasawa ena koro — veivoli siga ki Pacific Harbour"],
      dining: ["Kakana vakaturaga", "Kakana ena gaunisala mai Idia", "Makete ni ika"],
      transport: ["Vanua ni Vuka i Nausori", "Basi ki Coral Coast", "Vuka vakavanua"],
      culture: ["iTukutuku Vakafiji, Idia kei Jaina", "Vakatagi bula", "Gallery ni cakacaka"],
      weather: "Koro levu vakavuwa duadua. Kauta na veivakasosomitaki uca lailai ena veigauna kece.",
      faqs: [
        {
          question: "Na gauna cava vinaka me lako ki Suva?",
          answer:
            "Mei ki Okotoba e solia na draki dri kei na matanisiga vinaka me baleta na matasawa kei na veika ena wai. Noveba ki Epareli e katakata cake ka vakabulabula, ka lailai na lewe ni vulagi ena veiresort vakaturaga.",
        },
        {
          question: "Au na lako vakacava ki Suva?",
          answer:
            "Na vuka vakamatavuvale e yaco ki na Vanua ni Vuka i Nadi. Na veivoli vakaitaukei, seaplane kei na waqa ni veiresort e vakayacora na nomu iotioti ena vica na auwa.",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "Snorkelling ena Wai Savasava",
      category: "Wai",
      duration: "Vica na auwa ena siga",
      ages: "Yabaki kece",
      overview:
        "Lako ena veivure korala ena lago savasava duadua i Mamanuca kei na dauveiqaravi vakaitaukei, veivakarau vinaka kei na veivoli champagne ena matasawa lala.",
      highlights: ["Dauveiqaravi vakaitaukei", "Veivakarau snorkel vinaka", "Veivoli champagne", "Veivakasama mai na dauvakasama ni waitui"],
      included: ["Veivoli waqa lesu tale", "Veivakarau snorkel", "Gunu", "Isau ni vanua ni waitui"],
      itinerary: ["Vuka mai Denarau marina", "E rua na vanua snorkel", "Veivoli ena matasawa", "Lesu tale ena matai-siga"],
      faqs: [
        { question: "Au gadreva na veivakasama?", answer: "Sega — vinaka vei ira era tekivu kei na kila ni dauwili." },
        { question: "Na cava au na kauta?", answer: "Sunscreen taqomaki veivure, sulu wili kei na veivakasosomitaki malua." },
      ],
    },
    "sunset-cruises": {
      title: "Vuka ena Matai-Siga",
      category: "Vuka",
      duration: "2–3 na auwa",
      ages: "Yabaki kece",
      overview:
        "Vuka ki na matai-siga koula ena Pacific ena catamaran vakaturaga kei na kakana lailai, gunu vinaka kei na gitara Vakafiji bula ni sa yali na Mamanuca ena butobuto.",
      highlights: ["Catamaran vakaturaga", "Kakana lailai kei na gunu", "Vakatagi bula", "Raica na matai-siga 360°"],
      included: ["Gunu ni vakacegu", "Kakana lailai digitaki", "Digidigi ni veivoli lesu tale"],
      itinerary: ["Vuka mai marina", "Vuka ena yasana", "Tavata ena matai-siga", "Lesu tale ena kalokalo"],
      faqs: [
        { question: "E vakadewataki na draki?", answer: "E cakacaka ena veivakarau levu; lesu tale na ilavo kevaka sa bokoci me baleta na taqomaki." },
      ],
    },
    "hiking-waterfalls": {
      title: "Veivoli e Lala & Wai Lulu",
      category: "Veivoli Vakacaucau",
      duration: "Siga taucoko",
      ages: "16+",
      overview:
        "Veivoli ena Bouma National Heritage Park ki na wai lulu vuni, dauwili ena loma ni wai emerald ka kana vikavika vakatabakidua ena veivure savasava ni Yanuyanu ni Were.",
      highlights: ["Dauveiqaravi vakavanua", "E tolu na wai lulu mo dauwili kina", "iTovo ni veivure", "Kana mai na were"],
      included: ["Isau ni vanua", "Dauveiqaravi", "Kana", "Veivoli mai na veiresort"],
      itinerary: ["Veivoli ena veivure ena matai-siga", "Dauwili ena wai lulu", "Kana ena koro", "Lesu tale ena yakavi"],
      faqs: [
        { question: "Na vakatagedegede ni yago?", answer: "Vakamamada — 4–5 na auwa ena sala e sega ni vakatautauvatataki kei na veitikina e domo." },
      ],
    },
    "village-tours": {
      title: "Veivakatarogi Koro",
      category: "iTovo",
      duration: "Vica na auwa ena siga",
      ages: "Yabaki kece",
      overview:
        "Raica na veivakabulabulataki dina ni kai Fiji — soqoni ni kava, meke, vakaraitaki ni cakacaka kei na soqoni ni lovo e vakarautaka na matavuvale ni turaga ni koro.",
      highlights: ["Soqoni ni kava", "Meke", "Soqoni ni lovo", "Veivoli cakacaka"],
      included: ["Solisoli ki na koro", "Veivakayagataki ena soqoni", "Kana vakavanua", "Veivoli"],
      itinerary: ["Veivakacegui ena koro", "Kava kei meke", "Vakaraitaki ni cakacaka", "Kana lovo"],
      faqs: [
        { question: "Na cava au na vakasuluma?", answer: "Veivakasulumi vakamamada e ubia na ibacoco kei na duru. Kauta laivi na iu ni ulu ena koro." },
      ],
    },
    "island-hopping": {
      title: "Veivoli ni Veivoli Yanuyanu",
      category: "Veivoli e sivia na siga",
      duration: "3–7 na siga",
      ages: "Yabaki kece",
      overview:
        "Veivoli digitaki ena veiyanu levu ena waqa totolo vakaitaukei se seaplane — veiresort boutique, matasawa vuni kei na veika vakataki iko e vakarautaka na nomu concierge.",
      highlights: ["Veivoli vakaitaukei", "Tiko ena veiresort boutique", "iTuvatuva veisau rawarawa", "Concierge vakatabakidua"],
      included: ["Veivoli ena veiyanu", "Veivakadeitaki ni veiresort", "Kana ni matai-siga ena veisiga", "Veiqaravi concierge"],
      itinerary: ["Siga 1: yaco ki Mamanuca", "Siga 2–3: veivakatarogi Yasawa", "Siga 4+: veivakatorocaketaki vakataki iko"],
      faqs: [
        { question: "Au rawa ni veisautaka?", answer: "Na veivoli yanuyanu yadua e vakataki iko — na nomu concierge e vakarautaka na sala vata kei iko." },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Paketi Veiresort Yanuyanu Denarau",
      description:
        "E lima na bogi ena suite e matasawa ni wasa kei na veivoli vakaitaukei mai na vanua ni vuka, kana ni matai-siga ena veisiga kei na curu ki marina.",
      includes: ["Veivoli vakaitaukei", "Suite e matasawa ni wasa", "Kana ni matai-siga ena veisiga"],
    },
    "romantic-honeymoon-escape": {
      title: "Veivoli Vakacegu Vakawati",
      description:
        "Veivoli vakacegu vei ira na veiwatini kei na kakana vakaitaukei ena matasawa, veiqaravi spa vei ira na veiwatini kei na vuka ena matai-siga.",
      includes: ["Kakana vakaitaukei", "Spa vei ira na veiwatini", "Vuka ena matai-siga"],
    },
    "mamanuca-island-escape": {
      title: "Veivoli ki na Yanuyanu Mamanuca",
      description:
        "Paketi vakacegu — veivoli seaplane lesu tale, kana e loma ni wai kei na veivakarau snorkel.",
      includes: ["Veivoli seaplane", "Ilavo ni veiresort", "Vakatau snorkel"],
    },
    "family-coral-coast-package": {
      title: "Paketi Matavuvale Coral Coast",
      description:
        "Bure e semati, curu ki kids' club kei na veika ena Natadola Beach me baleta na matavuvale taucoko.",
      includes: ["Kids' club", "Bure ni matavuvale", "Veika ena matasawa"],
    },
    "private-island-buyout": {
      title: "Volivoli Yanuyanu Vakaitaukei",
      description:
        "Vakayagataki duaduaga na yanuyanu e Mamanuca — me yacova na 12 na vulagi, chef, waqa kei na timi butler e okati kina.",
      includes: ["Yanuyanu vakaitaukei", "Chef vakaitaukei", "Vakatau waqa"],
    },
    "stay-and-play-nadi": {
      title: "Paketi Tiko & Veivoli Nadi",
      description:
        "Tiko ena veiresort kei na veivoli siga digitaki — veivakatarogi koro, mud pool kei na veivoli ena yanuyanu.",
      includes: ["Tiko ena veiresort", "2 na veivoli siga", "Veivoli kece"],
    },
    "luxury-overwater-bure": {
      title: "Tiko ena Bure Vakaturaga e Loma ni Wai",
      description:
        "Moce e ruku ni wai savasava — teke vakaitaukei, veiqaravi butler kei na kana ena bure.",
      includes: ["Bure e loma ni wai", "Veiqaravi butler", "Kana ena bure"],
    },
    "coral-coast-beach-escape": {
      title: "Veivoli Matasawa Coral Coast",
      description:
        "Veiresort ena Natadola Beach kei na ilavo ni spa FJD 200 kei na kakana degustation digitaki.",
      includes: ["Veimataqali e matasawa", "Ilavo ni spa", "Kakana degustation"],
    },
    "wellness-spa-retreat": {
      title: "Veivoli Bula Vinaka & Spa",
      description:
        "Yoga e matasawa ni wasa, Bobo massage vakavanua kei na kakana organic mai na were.",
      includes: ["Yoga ena veisiga", "Veiqaravi spa", "Kakana bula vinaka"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description:
        "Na bure e loma ni wai duadua ena Fiji — vanua vakacegu qase ga kei na kakana all-inclusive.",
      includes: ["Bure e loma ni wai", "All-inclusive", "Qase ga"],
    },
    "mamanuca-island-hopping": {
      title: "Veivoli Yanuyanu Mamanuca",
      description:
        "Waqa totolo vakaitaukei, snorkel ena veivure kei na veivoli champagne ena matasawa lala.",
      includes: ["Waqa vakaitaukei", "Snorkelling", "Veivoli champagne"],
    },
    "yasawa-adventure-package": {
      title: "Paketi Veivoli Yasawa",
      description:
        "Veivoli vakaduavata ki na wai lulu vuni, kayaking kei na soqoni ni kava ena koro.",
      includes: ["Veivoli wai lulu", "Kayaking", "Veivakatarogi koro"],
    },
    "beqa-shark-dive": {
      title: "Diving ni Shark ena Beqa Lagoon",
      description:
        "Veivakatarogi shark kilai levu kei na veivakarau, dauveiqaravi kei na veivoli ni veiresort mai Pacific Harbour.",
      includes: ["Diving ni shark", "Veivakarau", "Veivoli"],
    },
    "sunset-cruise-denarau": {
      title: "Vuka Vakaitaukei ena Matai-Siga",
      description:
        "Vuka kei na champagne mai Denarau Marina — kakana lailai, vakatagi bula kei na raica ena gauna koula.",
      includes: ["Vakatau vakaitaukei", "Kakana lailai", "Champagne"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "Na veiresort duadua ena Fiji kei na bure e loma ni wai, na Likuliku e veivakaduataki na veivoli vakacegu qase ga kei na kakana vakaitaukei kei na lago e serau ena matai-siga.",
      amenities: ["Bure e loma ni wai", "Qase ga", "Spa", "Matasawa vakaitaukei", "Kakana vakaturaga"],
      experiences: ["Snorkelling", "Vuka ena matai-siga", "Veiqaravi spa"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "Yanuyanu vakacegu kei na 36 na bure e veivakaduataki na vakaturaga malua kei na veivakabulabulataki Vakafiji — vinaka me baleta na veivoli vakawati kei na soqoni bibi.",
      amenities: ["Bure e matasawa", "Spa", "Vanua ni diving", "Kakana vakaitaukei"],
      experiences: ["Diving", "Veivoli ena yanuyanu", "Veivakatarogi koro"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "Na vakaturaga ni matavuvale duadua e Denarau — lago levu, golf e voleka kei na curu rawarawa ki marina me baleta na veivoli yanuyanu.",
      amenities: ["Lago levu", "Kids' club", "Spa", "Curu ki marina", "7 na restorani"],
      experiences: ["Veivoli yanuyanu", "Golf", "Vuka ena matai-siga"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Vakaturaga vaka-Farani ena matasawa vinaka duadua e Denarau — kana ni matai-siga e loma ni wai, curu ki veivure kei na veivakasama spa ni Sofitel.",
      amenities: ["E matasawa", "Spa", "Snorkel ena veivure", "Kids' club"],
      experiences: ["Snorkel ena veivure", "Siga spa", "Bogi vakavanua"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "Na veika talei duadua ena Natadola Beach — golf, qele kilai levu ni Natadola kei na iTovo ni koro e matamata ni nomu matamata.",
      amenities: ["Natadola Beach", "Vanua ni golf", "Spa", "Kids' club", "Vanua vakavanua"],
      experiences: ["Veivakatarogi koro", "Golf", "Vodo ose ena matasawa"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "Na yanuyanu e vakatakilakilataka na Fiji me baleta na tabatamata — vinaka vei ira na matavuvale, veivure e vakavolivolita ka dina.",
      amenities: ["Yanuyanu vakaitaukei", "Vanua PADI", "Kids' club", "Matasawa levu"],
      experiences: ["Snorkelling", "Kayaking", "Veivakatarogi koro"],
    },
  },
};
