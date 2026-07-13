import type { LocaleContentPack } from "../types";

export const idPack: Partial<LocaleContentPack> = {
  guideCategories: {
    Planning: "Perencanaan",
    Style: "Gaya",
    Activities: "Aktivitas",
  },
  guides: {
    "first-time-fiji": {
      title: "Pertama Kali ke Fiji",
      excerpt: "Semua yang Anda butuhkan untuk perjalanan pertama ke Fiji.",
      category: "Perencanaan",
      overview:
        "Fiji adalah perjalanan pertama yang brilian — masuk mudah, orangnya hangat, dan 333 pulau untuk dijelajahi. Sebagian besar pengunjung tidak memerlukan visa hingga empat bulan.",
      sections: [
        {
          title: "Sebelum terbang",
          body: "Pastikan paspor berlaku enam bulan setelah tanggal perjalanan. Atur asuransi perjalanan komprehensif dan unduh peta offline untuk pulau terpencil.",
          items: ["Masa berlaku paspor", "Asuransi perjalanan", "Mata uang (FJD)", "Pakaian sopan untuk desa"],
        },
        {
          title: "Kedatangan & bea cukai",
          body: "Bandara Internasional Nadi modern dan efisien. Atur transfer pribadi sebelumnya untuk melewati antrean dan langsung bersantai.",
          items: ["Transfer pribadi", "Kartu SIM di bandara", "Penyambutan resor"],
        },
        {
          title: "Etika di pulau",
          body: "Orang Fiji termasuk yang paling ramah di dunia. 'Bula!' yang tulus sangat membantu. Lepas topi di desa dan terima kava saat ditawarkan.",
          items: ["Kode berpakaian desa", "Upacara kava", "Izin fotografi"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan perjalanan pertama ke Fiji?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    "visa-guide": {
      title: "Visa & Persyaratan Perjalanan",
      excerpt: "Paspor, visa, dan aturan masuk — disederhanakan.",
      category: "Perencanaan",
      overview:
        "Kebanyakan orang tidak perlu mengatur visa sebelum terbang ke Fiji. Pastikan paspor dan tiket pulang memenuhi persyaratan imigrasi.",
      sections: [
        {
          title: "Masuk tanpa visa",
          body: "Warga negara sebagian besar negara mendapat izin kunjungan hingga empat bulan.",
          items: ["Paspor valid 6+ bulan", "Tiket pulang", "Bukti akomodasi"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan visa & persyaratan perjalanan?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    "best-time-to-visit": {
      title: "Waktu Terbaik Mengunjungi Fiji",
      excerpt: "Cuaca, musim, dan kapan kami benar-benar pergi.",
      category: "Perencanaan",
      overview:
        "Fiji hangat sepanjang tahun. Musim kering (Mei–Okt) berarti langit cerah dan resor ramai; musim hujan (Nov–Apr) menghadirkan pemandangan subur, lebih sepi, dan harga lebih lunak.",
      sections: [
        {
          title: "Musim kering (Mei–Okt)",
          body: "Kelembapan lebih rendah, menyelam dan berlayar luar biasa. Populer — pesan lebih awal.",
          items: ["Terbaik untuk menyelam", "Tarif resor puncak", "Festival & acara"],
        },
        {
          title: "Musim hujan (Nov–Apr)",
          body: "Lebih hangat dengan hujan sore. Interior hijau, pantai lebih tenang, penawaran bagus.",
          items: ["Tarif lebih rendah", "Air terjun subur", "Air hangat"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan waktu terbaik mengunjungi Fiji?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    "weather-guide": {
      title: "Cuaca & Iklim",
      excerpt: "Memahami musim tropis Fiji.",
      category: "Perencanaan",
      overview:
        "Fiji berada di sabuk angin dagang Pasifik Selatan — hangat, lembap, dan diberkati sinar matahari sebagian besar tahun.",
      sections: [
        {
          title: "Perbedaan regional",
          body: "Barat (Denarau, Mamanuca) lebih kering daripada Suva dan Taveuni. Rencanakan island hopping sesuai iklim mikro.",
          items: ["Pantai barat lebih kering", "Suva lebih basah", "Musim siklon Nov–Apr"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan cuaca & iklim?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    "luxury-travel": {
      title: "Panduan Perjalanan Mewah",
      excerpt: "Resor eksklusif dan pengalaman terkurasi.",
      category: "Gaya",
      overview:
        "Tingkat kemewahan Fiji menyaingi mana pun di Pasifik Selatan — pulau pribadi, bure di atas air, pelayan pribadi, dan transfer helikopter sebagai standar.",
      sections: [
        {
          title: "Tempat menginap",
          body: "Likuliku Lagoon, Turtle Island, Vomo Island, dan Kokomo Private Island mewakili puncak kemewahan.",
          items: ["Bure di atas air", "Pulau pribadi", "Opsi all-inclusive"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan perjalanan mewah?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    honeymoon: {
      title: "Panduan Bulan Madu",
      excerpt: "Pelarian romantis untuk pasangan.",
      category: "Gaya",
      overview:
        "Fiji adalah alamat paling romantis di Pasifik Selatan — makan malam pribadi di pulau pasir, ritual spa pasangan, dan retret pulau khusus dewasa.",
      sections: [
        {
          title: "Pengalaman romantis terbaik",
          body: "Berlayar saat matahari terbenam, piknik pulau pribadi, dan makan malam di atas air mendefinisikan bulan madu Fiji.",
          items: ["Menginap di pulau pribadi", "Spa pasangan", "Pelayaran matahari terbenam"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan bulan madu?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    "family-travel": {
      title: "Panduan Perjalanan Keluarga",
      excerpt: "Fiji dengan anak — surga tanpa stres.",
      category: "Gaya",
      overview:
        "Budaya Fiji merayakan anak. Klub anak, laguna dangkal, dan vila bure keluarga membuat Fiji ideal untuk perjalanan multi-generasi.",
      sections: [
        {
          title: "Resor ramah keluarga",
          body: "Resor Denarau dan Coral Coast unggul dalam program anak sementara orang tua menikmati waktu spa.",
          items: ["Klub anak", "Laguna dangkal", "Kamar terhubung"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan perjalanan keluarga?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    adventure: {
      title: "Panduan Petualangan",
      excerpt: "Adrenalin dan eksplorasi.",
      category: "Gaya",
      overview:
        "Dari menyelam dengan hiu di Beqa Lagoon hingga trekking air terjun di Taveuni, Fiji menghadirkan petualangan kelas dunia tanpa mengorbankan kemewahan.",
      sections: [
        {
          title: "Petualangan wajib",
          body: "Menyelam dengan hiu, rafting, zip-lining, dan sewa kapal surf termasuk yang terbaik di Pasifik.",
          items: ["Selam hiu", "Rafting", "Trekking air terjun"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan petualangan?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    wellness: {
      title: "Panduan Wellness",
      excerpt: "Pulihkan tubuh dan pikiran di surga.",
      category: "Gaya",
      overview:
        "Yoga tepi laut, pijat Bobo tradisional, dan retret digital detox menjadikan Fiji destinasi wellness yang berkembang.",
      sections: [
        {
          title: "Ritual wellness",
          body: "Gabungkan perawatan spa dengan forest bathing dan meditasi di terumbu karang untuk pembaruan holistik.",
          items: ["Spa tepi laut", "Retret yoga", "Program detox"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan wellness?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    culture: {
      title: "Panduan Budaya",
      excerpt: "Tradisi Fijian autentik.",
      category: "Gaya",
      overview:
        "Budaya Fiji hidup dan murah hati — kunjungan desa, tari meke, dan upacara kava menawarkan koneksi nyata di luar dinding resor.",
      sections: [
        {
          title: "Pengalaman budaya",
          body: "Selalu kunjungi dengan pemandu yang menjaga hubungan desa dan memastikan partisipasi yang hormat.",
          items: ["Tur desa", "Pertunjukan meke", "Workshop kerajinan"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan pengalaman budaya?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    "food-drink": {
      title: "Panduan Makanan & Minuman",
      excerpt: "Apa yang dimakan dan diminum di Fiji.",
      category: "Gaya",
      overview:
        "Makanan Fiji memadukan masakan pulau dengan rasa India dan Tiongkok — dari pesta lovo yang dimasak di tanah hingga menu degustasi resor serius.",
      sections: [
        {
          title: "Wajib dicoba",
          body: "Kokoda, lovo, roti wrap, dan makan siang panjang di restoran resor yang bagus.",
          items: ["Pesta lovo", "Kokoda", "Degustasi resor"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan makanan & minuman?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    transportation: {
      title: "Panduan Transportasi",
      excerpt: "Penerbangan, feri, dan perjalanan antar pulau.",
      category: "Perencanaan",
      overview:
        "Setengah keseruannya adalah perjalanan — pesawat amfibi, speedboat, dan penerbangan domestik menghubungkan pulau lebih cepat dari yang Anda kira.",
      sections: [
        {
          title: "Perjalanan antar pulau",
          body: "Marina Denarau mengoperasikan feri ke Mamanuca dan Yasawa. Pesawat amfibi mencapai tempat mewah terpencil.",
          items: ["Fiji Airways domestik", "Yasawa Flyer", "Transfer pesawat amfibi"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan transportasi?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    "island-hopping": {
      title: "Panduan Island Hopping",
      excerpt: "Cara berpindah pulau tanpa pusing.",
      category: "Perencanaan",
      overview:
        "Island hopping adalah yang terbaik dari Fiji. Kami memetakan rute melalui Mamanuca, Yasawa, dan perhentian tenang — disesuaikan dengan tanggal dan anggaran Anda.",
      sections: [
        {
          title: "Rute contoh",
          body: "Tiga hari di Mamanuca, seminggu di Yasawa, atau sepuluh hari menggabungkan keduanya — semua mudah disesuaikan.",
          items: ["Ekspres 3 hari", "Penjelajah 7 hari", "Ultimate 10 hari"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan island hopping?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    diving: {
      title: "Panduan Menyelam",
      excerpt: "Terumbu karang, hiu, dan situs selam kelas dunia.",
      category: "Aktivitas",
      overview:
        "Rainbow Reef, Beqa Lagoon, dan Great White Wall termasuk menyelam terbaik di planet ini.",
      sections: [
        {
          title: "Situs selam terbaik",
          body: "Selam hiu Beqa, Rainbow Reef, dan Namena — sesuatu untuk setiap level.",
          items: ["Hiu Beqa", "Rainbow Reef", "Great White Wall"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan menyelam?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    surfing: {
      title: "Panduan Surfing",
      excerpt: "Gelombang yang dibicarakan semua orang.",
      category: "Aktivitas",
      overview:
        "Cloudbreak, Restaurants, dan Frigates — ombak serius, biasanya dijangkau perahu dari Denarau atau Mamanuca.",
      sections: [
        {
          title: "Break terbaik",
          body: "Cloudbreak adalah left terkenal Fiji. Sewa perahu dari resor terdekat untuk sesi fajar.",
          items: ["Cloudbreak", "Restaurants", "Frigates"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan surfing?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
    "travel-planning": {
      title: "Pusat Perencanaan Perjalanan",
      excerpt: "Hub pusat Anda untuk merencanakan pelarian Fiji sempurna.",
      category: "Perencanaan",
      overview:
        "Semua yang Anda butuhkan di satu tempat — panduan, alat, dukungan concierge, dan pembuatan itinerary bespoke untuk perjalanan mewah Fiji.",
      sections: [
        {
          title: "Mulai di sini",
          body: "Ceritakan tanggal, gaya, dan anggaran Anda — concierge kami membangun itinerary bespoke dalam 24 jam.",
          items: ["Konsultasi gratis", "Itinerary bespoke", "Jaminan harga terbaik"],
        },
      ],
      faqs: [
        {
          question: "Seberapa jauh sebelumnya saya harus merencanakan perjalanan?",
          answer:
            "Resor mewah cepat penuh di musim puncak (Juni–September). Pesan 3–6 bulan sebelumnya jika memungkinkan — kami sering masih menemukan kamar di mitra pada menit terakhir.",
        },
      ],
    },
  },
  destinations: {
    "coral-coast": {
      title: "Coral Coast",
      tagline: "Pantai keemasan & budaya Fijian autentik",
      overview:
        "Coral Coast membentang di sepanjang pantai selatan Viti Levu — pita pantai berpohon palem, resor mewah, dan desa tradisional di mana upacara berjalan di atas api dan ritual kava masih membentuk kehidupan sehari-hari.",
      highlights: ["Bukit Pasir Sigatoka", "Upacara desa", "Resor pantai mewah"],
      thingsToDo: ["Tur desa", "Safari sungai", "Golf di lapangan championship", "Retret spa"],
      placesToStay: ["InterContinental Fiji", "Outrigger Fiji Beach Resort", "Vila pantai pribadi"],
      tours: ["Hari imersi budaya", "Penerbangan helikopter pesisir", "Pelayaran dhow matahari terbenam"],
      beaches: ["Natadola Beach", "Hideaway Beach", "Kula Wild Adventure Beach"],
      dining: ["Fine dining tepi pantai", "Pesta lovo", "Menu degustasi resor"],
      transport: ["Bandara Nadi 1 jam", "Transfer resor pribadi", "Berkendara pesisir indah"],
      culture: ["Pertunjukan meke", "Desa gerabah", "Pasar kerajinan tradisional"],
      weather: "Hangat sepanjang tahun. Musim kering Mei–Okt (26–30°C). Musim hujan Nov–Apr dengan hujan sore.",
      faqs: [
        {
          question: "Kapan waktu terbaik mengunjungi Coral Coast?",
          answer:
            "Mei hingga Oktober menawarkan cuaca kering dan cerah ideal untuk pantai dan aktivitas air. November hingga April lebih hangat dengan lanskap subur dan lebih sepi di resor mewah.",
        },
        {
          question: "Bagaimana cara ke Coral Coast?",
          answer:
            "Penerbangan internasional tiba di Bandara Internasional Nadi. Transfer pribadi, pesawat amfibi, dan perahu resor menghubungkan Anda ke tujuan akhir dalam beberapa jam.",
        },
      ],
    },
    nadi: {
      title: "Nadi",
      tagline: "Gerbang menuju Kepulauan Fiji",
      overview:
        "Nadi adalah titik kedatangan Anda ke surga — pusat dinamis yang menghubungkan wisatawan internasional ke pulau Mamanuca dan Yasawa, Marina Denarau, dan pedalaman Fiji.",
      highlights: ["Kuil Sri Siva Subramaniya", "Garden of the Sleeping Giant", "Marina Denarau"],
      thingsToDo: ["Perjalanan pulau sehari", "Kunjungan kuil", "Tur pasar", "Golf"],
      placesToStay: ["Resor Denarau", "Hotel butik Nadi", "Penginapan transit bandara"],
      tours: ["Pelayaran harian Mamanuca", "Kolam lumpur & mata air Sabeto", "Tur desa pedalaman"],
      beaches: ["Denarau Beach", "Wailoaloa Beach"],
      dining: ["Fusi India-Fijian", "Restoran resor", "Produk pasar lokal"],
      transport: ["Bandara Internasional Nadi", "Terminal feri Denarau", "Transfer helikopter"],
      culture: ["Arsitektur kuil Hindu", "Pasar multikultural", "Pusat kerajinan Fijian"],
      weather: "Tropis dan lembap. Visibilitas terbaik untuk island hopping Mei–Okt.",
      faqs: [
        {
          question: "Kapan waktu terbaik mengunjungi Nadi?",
          answer:
            "Mei hingga Oktober menawarkan cuaca kering dan cerah ideal untuk pantai dan aktivitas air. November hingga April lebih hangat dengan lanskap subur dan lebih sepi di resor mewah.",
        },
        {
          question: "Bagaimana cara ke Nadi?",
          answer:
            "Penerbangan internasional tiba di Bandara Internasional Nadi. Transfer pribadi, pesawat amfibi, dan perahu resor menghubungkan Anda ke tujuan akhir dalam beberapa jam.",
        },
      ],
    },
    denarau: {
      title: "Denarau",
      tagline: "Marina mewah & resor kelas dunia",
      overview:
        "Pulau Denarau adalah alamat mewah utama Fiji — enklave berpagar resor bintang lima, golf championship, fine dining, dan titik keberangkatan utama untuk pelayaran pulau Mamanuca dan Yasawa.",
      highlights: ["Port Denarau Marina", "Golf championship", "Belanja mewah"],
      thingsToDo: ["Pelayaran matahari terbenam", "Safari jet ski", "Ritual spa", "Island hopping"],
      placesToStay: ["Hilton Fiji", "Sofitel Fiji", "Radisson Blu", "Residensi pribadi"],
      tours: ["Sewa yacht pribadi", "Tur pulau helikopter", "Paket golf & spa"],
      beaches: ["Denarau Beach", "Kolam laguna resor"],
      dining: ["Ports O' Call", "Restoran Nuku", "Dining beach club"],
      transport: ["10 menit dari bandara Nadi", "Feri marina", "Layanan mobil pribadi"],
      culture: ["Malam meke resor", "Pasar kerajinan", "Kelas memasak Fijian"],
      weather: "Pantai barat terlindung — lebih kering dari Suva. Ideal Mei–Oktober.",
      faqs: [
        {
          question: "Kapan waktu terbaik mengunjungi Denarau?",
          answer:
            "Mei hingga Oktober menawarkan cuaca kering dan cerah ideal untuk pantai dan aktivitas air. November hingga April lebih hangat dengan lanskap subur dan lebih sepi di resor mewah.",
        },
        {
          question: "Bagaimana cara ke Denarau?",
          answer:
            "Penerbangan internasional tiba di Bandara Internasional Nadi. Transfer pribadi, pesawat amfibi, dan perahu resor menghubungkan Anda ke tujuan akhir dalam beberapa jam.",
        },
      ],
    },
    mamanuca: {
      title: "Kepulauan Mamanuca",
      tagline: "Surga castaway & laguna kristal",
      overview:
        "Grup Mamanuca adalah rangkaian pulau paling ikonik Fiji — laguna turquoise, kemewahan tanpa alas kaki, dan lokasi syuting mimpi tropis, dijangkau pesawat amfibi atau speedboat dari Denarau.",
      highlights: ["Castaway Island", "Bar mengapung Cloud 9", "Snorkeling kelas dunia"],
      thingsToDo: ["Snorkeling", "Surf Cloudbreak", "Kayaking", "Piknik pribadi"],
      placesToStay: ["Likuliku Lagoon Resort", "Tokoriki Island Resort", "Castaway Island"],
      tours: ["Safari snorkeling", "Berlayar matahari terbenam", "Penyelaman discovery"],
      beaches: ["Monuriki Beach", "Modriki Island", "Pantai pribadi resor"],
      dining: ["Makan malam di atas air", "BBQ pantai", "Pengalaman bar mengapung"],
      transport: ["Speedboat dari Denarau", "Transfer pesawat amfibi", "Perahu pribadi resor"],
      culture: ["Malam budaya resor", "Kunjungan desa di pulau terdekat"],
      weather: "Disejukkan angin dagang. Musim kering sempurna untuk kejernihan air.",
      faqs: [
        {
          question: "Kapan waktu terbaik mengunjungi Kepulauan Mamanuca?",
          answer:
            "Mei hingga Oktober menawarkan cuaca kering dan cerah ideal untuk pantai dan aktivitas air. November hingga April lebih hangat dengan lanskap subur dan lebih sepi di resor mewah.",
        },
        {
          question: "Bagaimana cara ke Kepulauan Mamanuca?",
          answer:
            "Penerbangan internasional tiba di Bandara Internasional Nadi. Transfer pribadi, pesawat amfibi, dan perahu resor menghubungkan Anda ke tujuan akhir dalam beberapa jam.",
        },
      ],
    },
    yasawa: {
      title: "Kepulauan Yasawa",
      tagline: "Pulau terpencil & keindahan tak tersentuh",
      overview:
        "Kepulauan Yasawa menawarkan Fiji paling mentah dan romantis — puncak vulkanik dramatis, gua blue-hole, pantai sepi, dan segelintir retret eco-luxury paling eksklusif di Pasifik Selatan.",
      highlights: ["Gua Sawa-i-Lau", "Blue Lagoon", "Lodge mewah terpencil"],
      thingsToDo: ["Berenang di gua", "Homestay desa", "Hiking", "Menyelam"],
      placesToStay: ["Yasawa Island Resort", "Turtle Island", "Lodge mewah tanpa alas kaki"],
      tours: ["Perjalanan harian Blue Lagoon", "Ekspedisi gua", "Berlayar multi-pulau"],
      beaches: ["Octopus Beach", "Nanuya Levu", "Teluk pribadi resor"],
      dining: ["Pesta pantai", "Degustasi resor", "BBQ hasil tangkapan hari itu"],
      transport: ["Feri Yasawa Flyer", "Pesawat amfibi", "Yacht pribadi"],
      culture: ["Kunjungan desa terpencil", "Penangkapan ikan tradisional", "Malam bercerita"],
      weather: "Lebih kering dari daratan. Visibilitas terbaik Jun–Sep.",
      faqs: [
        {
          question: "Kapan waktu terbaik mengunjungi Kepulauan Yasawa?",
          answer:
            "Mei hingga Oktober menawarkan cuaca kering dan cerah ideal untuk pantai dan aktivitas air. November hingga April lebih hangat dengan lanskap subur dan lebih sepi di resor mewah.",
        },
        {
          question: "Bagaimana cara ke Kepulauan Yasawa?",
          answer:
            "Penerbangan internasional tiba di Bandara Internasional Nadi. Transfer pribadi, pesawat amfibi, dan perahu resor menghubungkan Anda ke tujuan akhir dalam beberapa jam.",
        },
      ],
    },
    taveuni: {
      title: "Taveuni",
      tagline: "Pulau Taman & negeri air terjun",
      overview:
        "Dikenal sebagai Pulau Taman, Taveuni adalah surga kaya UNESCO hutan hujan, air terjun, dan situs selam terkenal dunia — ideal untuk petualang dan pasangan yang mencari alam di luar sirkuit resor.",
      highlights: ["Taman Warisan Nasional Bouma", "Menyelam Rainbow Reef", "Air terjun Tavoro"],
      thingsToDo: ["Trekking air terjun", "Scuba diving", "Birdwatching", "Kayaking"],
      placesToStay: ["Taveuni Island Resort", "Garden Island Resort", "Eco-lodge"],
      tours: ["Trek Bouma Falls", "Selam Rainbow Reef", "Lavena Coastal Walk"],
      beaches: ["Lavena Beach", "Matei Beach", "Teluk tersembunyi"],
      dining: ["Dining gaya perkebunan", "Produk tropis segar", "Menu fusi resor"],
      transport: ["Penerbangan domestik dari Nadi/Suva", "Transfer resor", "Sewa perahu"],
      culture: ["Desa Wainibau", "Kebun taro tradisional", "Kerajinan lokal"],
      weather: "Wilayah paling basah — subur sepanjang tahun. Menyelam terbaik Apr–Okt.",
      faqs: [
        {
          question: "Kapan waktu terbaik mengunjungi Taveuni?",
          answer:
            "Mei hingga Oktober menawarkan cuaca kering dan cerah ideal untuk pantai dan aktivitas air. November hingga April lebih hangat dengan lanskap subur dan lebih sepi di resor mewah.",
        },
        {
          question: "Bagaimana cara ke Taveuni?",
          answer:
            "Penerbangan internasional tiba di Bandara Internasional Nadi. Transfer pribadi, pesawat amfibi, dan perahu resor menghubungkan Anda ke tujuan akhir dalam beberapa jam.",
        },
      ],
    },
    "pacific-harbour": {
      title: "Pacific Harbour",
      tagline: "Ibu kota petualangan Fiji",
      overview:
        "Pacific Harbour adalah alamat adrenalin Fiji — menyelam dengan hiu di Beqa Lagoon, rafting, zip-lining, dan vila mewah menghadap Pasifik, semuanya dalam jangkauan Suva.",
      highlights: ["Menyelam dengan hiu", "Rafting jeram", "Zip Fiji"],
      thingsToDo: ["Selam feeding hiu", "Rafting Upper Navua", "Golf", "Memancing laut dalam"],
      placesToStay: ["The Pearl South Pacific", "Vila mewah", "Lodge butik"],
      tours: ["Pertemuan hiu Beqa", "Hari rafting sungai", "Sewa memancing"],
      beaches: ["Natadola (dekat)", "Teluk tersembunyi", "Pantai resor"],
      dining: ["Restoran marina", "Fine dining resor", "Seafood lokal"],
      transport: ["2,5 jam dari Nadi", "45 menit dari Suva", "Helikopter tersedia"],
      culture: ["Berjalan di atas api Beqa", "Pertunjukan desa", "Pasar artisan"],
      weather: "Sedikit lebih basah dari pantai barat. Olahraga petualangan sepanjang tahun.",
      faqs: [
        {
          question: "Kapan waktu terbaik mengunjungi Pacific Harbour?",
          answer:
            "Mei hingga Oktober menawarkan cuaca kering dan cerah ideal untuk pantai dan aktivitas air. November hingga April lebih hangat dengan lanskap subur dan lebih sepi di resor mewah.",
        },
        {
          question: "Bagaimana cara ke Pacific Harbour?",
          answer:
            "Penerbangan internasional tiba di Bandara Internasional Nadi. Transfer pribadi, pesawat amfibi, dan perahu resor menghubungkan Anda ke tujuan akhir dalam beberapa jam.",
        },
      ],
    },
    suva: {
      title: "Suva",
      tagline: "Ibu kota budaya & perdagangan",
      overview:
        "Suva adalah jantung Fiji modern — arsitektur kolonial, pasar hidup, museum, dan scene fine dining yang berkembang, sempurna bagi pelancong yang menginginkan budaya sebelum pantai.",
      highlights: ["Museum Fiji", "Pasar Kota", "Parlemen & Thurston Gardens"],
      thingsToDo: ["Tur pasar", "Kunjungan museum", "Jalan-jalan kolonial", "Kehidupan malam"],
      placesToStay: ["Grand Pacific Hotel", "Holiday Inn Suva", "Hotel kota butik"],
      tours: ["Jalan warisan kota", "Berenang hutan Colo-i-Suva", "Perjalanan harian pedalaman"],
      beaches: ["Tidak ada pantai kota — perjalanan harian ke Pacific Harbour"],
      dining: ["Fine dining", "Makanan jalanan India", "Pasar seafood"],
      transport: ["Bandara Internasional Nausori", "Bus ke Coral Coast", "Penerbangan domestik"],
      culture: ["Warisan Fijian, India & Tiongkok", "Musik live", "Galeri seni"],
      weather: "Kota besar paling basah. Bawa jas hujan ringan sepanjang tahun.",
      faqs: [
        {
          question: "Kapan waktu terbaik mengunjungi Suva?",
          answer:
            "Mei hingga Oktober menawarkan cuaca kering dan cerah ideal untuk pantai dan aktivitas air. November hingga April lebih hangat dengan lanskap subur dan lebih sepi di resor mewah.",
        },
        {
          question: "Bagaimana cara ke Suva?",
          answer:
            "Penerbangan internasional tiba di Bandara Internasional Nadi. Transfer pribadi, pesawat amfibi, dan perahu resor menghubungkan Anda ke tujuan akhir dalam beberapa jam.",
        },
      ],
    },
  },
  experiences: {
    "snorkelling-crystal-waters": {
      title: "Snorkeling di Perairan Kristal",
      category: "Air",
      duration: "Setengah Hari",
      ages: "Semua usia",
      overview:
        "Meluncur di atas taman karang pelangi di laguna terjernih Mamanuca dengan pemandu pribadi, peralatan premium, dan piknik sampanye di pulau pasir sepi.",
      highlights: ["Pemandu pribadi", "Peralatan snorkeling premium", "Piknik sampanye", "Briefing ahli biologi laut"],
      included: ["Transfer perahu pulang-pergi", "Peralatan snorkeling", "Refreshment", "Biaya taman laut"],
      itinerary: ["Keberangkatan marina Denarau", "Dua situs snorkeling", "Piknik pulau pasir", "Kembali saat matahari terbenam"],
      faqs: [
        { question: "Apakah saya perlu pengalaman?", answer: "Tidak — cocok untuk pemula dengan kemampuan berenang dasar." },
        { question: "Apa yang harus dibawa?", answer: "Sunscreen ramah terumbu, pakaian renang, dan penutup ringan." },
      ],
    },
    "sunset-cruises": {
      title: "Pelayaran Matahari Terbenam",
      category: "Berlayar",
      duration: "2–3 Jam",
      ages: "Semua usia",
      overview:
        "Berlayar ke matahari terbenam Pasifik keemasan di atas katamaran mewah dengan canapé, minuman premium, dan gitar Fijian live saat siluet Mamanuca memudar ke senja.",
      highlights: ["Katamaran mewah", "Canapé & minuman", "Musik live", "Pemandangan matahari terbenam 360°"],
      included: ["Minuman selamat datang", "Pilihan canapé", "Opsi transfer pulang"],
      itinerary: ["Naik di marina", "Berlayar pesisir", "Toast matahari terbenam", "Kembali di bawah bintang"],
      faqs: [
        { question: "Apakah tergantung cuaca?", answer: "Pelayaran beroperasi dalam sebagian besar kondisi; pengembalian penuh jika dibatalkan demi keselamatan." },
      ],
    },
    "hiking-waterfalls": {
      title: "Hiking & Air Terjun",
      category: "Petualangan",
      duration: "Sehari Penuh",
      ages: "16+",
      overview:
        "Trek melalui Taman Warisan Nasional Bouma ke air terjun tersembunyi, berenang di kolam zamrud, dan makan siang buah tropis di hutan hujan murni Pulau Taman.",
      highlights: ["Pemandu lokal ahli", "Tiga perhentian berenang air terjun", "Ekologi hutan hujan", "Makan siang farm-to-table"],
      included: ["Biaya taman", "Pemandu", "Makan siang", "Transfer dari resor"],
      itinerary: ["Trek hutan pagi", "Berenang air terjun", "Makan siang desa", "Kembali sore"],
      faqs: [
        { question: "Tingkat kebugaran?", answer: "Sedang — 4–5 jam di jalur tidak rata dengan beberapa bagian curam." },
      ],
    },
    "village-tours": {
      title: "Tur Desa",
      category: "Budaya",
      duration: "Setengah Hari",
      ages: "Semua usia",
      overview:
        "Rasakan keramahan Fijian autentik — upacara kava, tari meke, demonstrasi kerajinan, dan pesta lovo tradisional yang disiapkan keluarga kepala desa.",
      highlights: ["Upacara kava", "Pertunjukan meke", "Pesta lovo", "Workshop kerajinan"],
      included: ["Donasi desa", "Partisipasi upacara", "Makan siang tradisional", "Transport"],
      itinerary: ["Sambutan desa", "Kava & meke", "Demo kerajinan", "Makan siang lovo"],
      faqs: [
        { question: "Apa yang harus dikenakan?", answer: "Pakaian sopan menutupi bahu dan lutut. Lepas topi di desa." },
      ],
    },
    "island-hopping": {
      title: "Petualangan Island Hopping",
      category: "Multi-hari",
      duration: "3–7 Hari",
      ages: "Semua usia",
      overview:
        "Perjalanan multi-pulau terkurasi dengan speedboat pribadi atau pesawat amfibi — resor butik, pantai tersembunyi, dan pengalaman bespoke yang dirancang concierge Anda.",
      highlights: ["Transfer pribadi", "Menginap resor butik", "Itinerary fleksibel", "Concierge khusus"],
      included: ["Transfer antar pulau", "Koordinasi resor", "Sarapan harian", "Dukungan concierge"],
      itinerary: ["Hari 1: Tiba di Mamanuca", "Hari 2–3: Eksplorasi Yasawa", "Hari 4+: Perpanjangan kustom"],
      faqs: [
        { question: "Bisakah disesuaikan?", answer: "Setiap island hop bersifat bespoke — concierge merancang rute bersama Anda." },
      ],
    },
  },
  deals: {
    "denarau-resort-package": {
      title: "Paket Resor Pulau Denarau",
      description: "Suite pemandangan laut lima malam dengan transfer bandara pribadi, sarapan harian, dan akses marina.",
      includes: ["Transfer pribadi", "Suite pemandangan laut", "Sarapan harian"],
    },
    "romantic-honeymoon-escape": {
      title: "Pelarian Bulan Madu Romantis",
      description: "Retret pasangan dengan makan malam pulau pasir pribadi, ritual spa pasangan, dan berlayar matahari terbenam.",
      includes: ["Makan malam pribadi", "Spa pasangan", "Pelayaran matahari terbenam"],
    },
    "mamanuca-island-escape": {
      title: "Pelarian Pulau Mamanuca",
      description: "Paket fly-and-flop — transfer pesawat amfibi pulang-pergi, makan siang di atas air, dan peralatan snorkeling.",
      includes: ["Transfer pesawat amfibi", "Kredit resor", "Sewa snorkeling"],
    },
    "family-coral-coast-package": {
      title: "Paket Keluarga Coral Coast",
      description: "Bure terhubung, akses klub anak, dan aktivitas Natadola Beach untuk seluruh keluarga.",
      includes: ["Klub anak", "Bure keluarga", "Aktivitas pantai"],
    },
    "private-island-buyout": {
      title: "Sewa Pulau Pribadi Penuh",
      description: "Penggunaan eksklusif pulau Mamanuca — hingga 12 tamu, chef, perahu, dan tim pelayan termasuk.",
      includes: ["Pulau eksklusif", "Chef pribadi", "Sewa perahu"],
    },
    "stay-and-play-nadi": {
      title: "Paket Stay & Play Nadi",
      description: "Menginap resor dengan perjalanan harian terkurasi — kunjungan desa, kolam lumpur, dan piknik pulau.",
      includes: ["Menginap resor", "2 perjalanan harian", "Semua transfer"],
    },
    "luxury-overwater-bure": {
      title: "Menginap Bure Mewah di Atas Air",
      description: "Tidur di atas perairan kristal — dek pribadi, layanan pelayan, dan makan malam di bure.",
      includes: ["Bure di atas air", "Layanan pelayan", "Makan malam di bure"],
    },
    "coral-coast-beach-escape": {
      title: "Pelarian Pantai Coral Coast",
      description: "Resor Natadola Beach dengan kredit spa FJD 200 dan makan malam degustasi terkurasi.",
      includes: ["Kamar tepi pantai", "Kredit spa", "Makan malam degustasi"],
    },
    "wellness-spa-retreat": {
      title: "Retret Wellness & Spa",
      description: "Yoga tepi laut, pijat Bobo tradisional, dan dining organik farm-to-table.",
      includes: ["Yoga harian", "Ritual spa", "Dining wellness"],
    },
    "likuliku-lagoon-stay": {
      title: "Likuliku Lagoon Resort",
      description: "Satu-satunya bure di atas air di Fiji — surga khusus dewasa dengan dining all-inclusive.",
      includes: ["Bure di atas air", "All-inclusive", "Khusus dewasa"],
    },
    "mamanuca-island-hopping": {
      title: "Island Hopping Mamanuca",
      description: "Speedboat pribadi, snorkeling terumbu, dan piknik sampanye di pulau pasir sepi.",
      includes: ["Perahu pribadi", "Snorkeling", "Piknik sampanye"],
    },
    "yasawa-adventure-package": {
      title: "Paket Petualangan Yasawa",
      description: "Hiking terpandu ke air terjun tersembunyi, kayaking laut, dan upacara kava desa.",
      includes: ["Trek air terjun", "Kayaking", "Kunjungan desa"],
    },
    "beqa-shark-dive": {
      title: "Selam Hiu Beqa Lagoon",
      description: "Pertemuan hiu terkenal dunia dengan peralatan, pemandu, dan transfer resor dari Pacific Harbour.",
      includes: ["Selam hiu", "Peralatan", "Transfer"],
    },
    "sunset-cruise-denarau": {
      title: "Pelayaran Matahari Terbenam Pribadi",
      description: "Berlayar sampanye dari Marina Denarau — canapé, musik live, dan pemandangan golden hour.",
      includes: ["Sewa pribadi", "Canapé", "Sampanye"],
    },
  },
  resorts: {
    "likuliku-lagoon": {
      title: "Likuliku Lagoon Resort",
      overview:
        "Satu-satunya resor Fiji dengan bure di atas air, Likuliku memadukan keintiman khusus dewasa dengan dining kelas dunia dan laguna yang bersinar saat matahari terbenam.",
      amenities: ["Bure di atas air", "Khusus dewasa", "Spa", "Pantai pribadi", "Fine dining"],
      experiences: ["Snorkeling", "Pelayaran matahari terbenam", "Ritual spa"],
    },
    "tokoriki-island": {
      title: "Tokoriki Island Resort",
      overview:
        "Pulau intim 36 bure di mana kemewahan tanpa alas kaki bertemu kehangatan Fijian — sempurna untuk bulan madu dan perayaan penting.",
      amenities: ["Bure tepi pantai", "Spa", "Pusat menyelam", "Makan malam pribadi"],
      experiences: ["Menyelam", "Piknik pulau", "Kunjungan desa"],
    },
    "hilton-fiji": {
      title: "Hilton Fiji Beach Resort & Spa",
      overview:
        "Kemewahan ramah keluarga utama Denarau — kolam luas, dekat championship golf, dan akses marina mulus untuk petualangan pulau.",
      amenities: ["Beberapa kolam", "Klub anak", "Spa", "Akses marina", "7 restoran"],
      experiences: ["Island hopping", "Golf", "Pelayaran matahari terbenam"],
    },
    "sofitel-fiji": {
      title: "Sofitel Fiji Resort & Spa",
      overview:
        "Kemewahan polesan Prancis di pantai terbaik Denarau — sarapan mengapung, akses terumbu, dan filosofi spa Sofitel.",
      amenities: ["Tepi pantai", "Spa", "Snorkeling terumbu", "Klub anak"],
      experiences: ["Snorkel terumbu", "Hari spa", "Malam budaya"],
    },
    "intercontinental-coral-coast": {
      title: "InterContinental Fiji Golf Resort & Spa",
      overview:
        "Permata mahkota Natadola Beach — golf championship, pasir legendaris, dan budaya desa di depan pintu Anda.",
      amenities: ["Natadola Beach", "Lapangan golf", "Spa", "Klub anak", "Pusat budaya"],
      experiences: ["Tur desa", "Golf", "Berkuda di pantai"],
    },
    "castaway-island": {
      title: "Castaway Island, Fiji",
      overview:
        "Pulau yang mendefinisikan Fiji bagi satu generasi — ramah keluarga, dikelilingi terumbu, dan autentik tanpa usaha.",
      amenities: ["Pulau pribadi", "Pusat PADI", "Klub anak", "Beberapa pantai"],
      experiences: ["Snorkeling", "Kayaking", "Kunjungan desa"],
    },
  },
};
