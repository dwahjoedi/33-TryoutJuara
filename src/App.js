import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCcw, Award, BookOpen, BarChart3, ListChecks, ArrowLeft, AlertCircle } from 'lucide-react';

// Seluruh data soal Paket 3 (75 Soal)
const quizData = [
  // --- BAHASA INDONESIA (1-10) ---
  {
    question: "Berdasarkan teks tentang Kebun Raya Bogor, apa yang menjadi identitas bangsa dan memberikan kontribusi pada pembangunan ekonomi global?",
    image: "/images/p3_soal_01.jpg", // Path ke file gambar Anda
    options: ["Variasi jenis tanamannya saja", "Sejarah Kebun Raya Bogor", "Pusat penelitian biologi tropis", "Penemuan ilmiah bidang botani"],
    answer: 1,
    rationale: "Berdasarkan paragraf kedua, sejarah Kebun Raya Bogor menjadi identitas bangsa serta memberikan kontribusi pembangunan ekonomi global."
  },
  {
    question: "Ide pokok paragraf ketiga pada teks tersebut adalah ....",
    options: ["Penelitian tanaman domestik berbagai tanaman ekspor", "Kontribusi penemuan ilmiah Kebun Raya Bogor bagi kesejahteraan manusia", "Inovasi dalam bidang ekonomi pemerintah Belanda", "Agroindustri spesies eksotis kopi dan teh"],
    answer: 1,
    rationale: "Paragraf ketiga menjelaskan bahwa penemuan ilmiah di Kebun Raya Bogor memberikan kontribusi nyata bagi kesejahteraan umat manusia."
  },
  {
    question: "Apa fungsi awal Kebun Raya Bogor menurut catatan sejarah dari laman kebunraya?",
    options: ["Pusat penelitian biologi tropis kelas dunia", "Kebun percobaan tanaman perkebunan", "Tempat rekreasi keluarga kerajaan Belanda", "Warisan nilai-nilai universal UNESCO"],
    answer: 1,
    rationale: "Teks menyebutkan bahwa pada mulanya kebun ini hanya digunakan sebagai kebun percobaan bagi tanaman perkebunan yang akan diperkenalkan di Hindia Belanda."
  },
  {
    question: "Pernyataan yang TIDAK sesuai dengan teks Kebun Raya Bogor adalah ....",
    options: ["Kebun Raya Bogor memiliki luas mencapai 87 hektar.", "Terdapat 15.000 jenis koleksi pohon dan tumbuhan.", "Kebun Raya Bogor hanya melestarikan jenis tanaman eksotis saja.", "Inovasi botani berkontribusi pada peningkatan kekayaan agroindustri Belanda."],
    answer: 2,
    rationale: "Pernyataan C salah karena teks menyebutkan kekayaan warisan mencakup variasi jenis tanaman, bentang lahan, bangunan, artefak, dan ilmu botani secara umum, tidak hanya tanaman eksotis."
  },
  {
    question: "Antonim dari kata 'domestik' pada kalimat 'penelitian tanaman domestik berbagai tanaman ekspor' adalah ....",
    options: ["Lokal", "Mancanegara", "Pedalaman", "Terpencil"],
    answer: 1,
    rationale: "Domestik berarti dalam negeri atau lokal, sehingga lawan kata yang paling tepat adalah mancanegara atau luar negeri."
  },
  {
    question: "Makna kata 'inovasi' dalam teks tersebut adalah ....",
    options: ["Penemuan baru yang berbeda dari sebelumnya", "Kegiatan mengumpulkan barang antik", "Proses meniru hasil karya orang lain", "Cara tradisional dalam bertani"],
    answer: 0,
    rationale: "Inovasi merujuk pada pemasukan atau pengenalan hal-hal baru; penemuan baru yang berbeda dari yang sudah ada atau yang sudah dikenal sebelumnya."
  },
  {
    question: "Kata serapan dari bahasa asing yang terdapat pada teks tersebut adalah ....",
    options: ["Botani", "Negara", "Pohon", "Warisan"],
    answer: 0,
    rationale: "Kata 'Botani' merupakan kata serapan dari bahasa Belanda 'botanie' atau bahasa Inggris 'botany'."
  },
  {
    question: "Kalimat yang menggunakan kata depan dengan tepat adalah ....",
    options: ["Penelitian dilakukan di Kebun Raya Bogor.", "Dia pergi keluar negeri untuk belajar.", "Buku itu disimpan didalam tas.", "Sampah dibuang ke tempatnya."],
    answer: 0,
    rationale: "Kata depan 'di' yang menunjukkan tempat harus ditulis terpisah dari kata yang mengikutinya. Pilihan B dan C salah dalam penulisan (seharusnya 'ke luar' dan 'di dalam')."
  },
  {
    question: "Tanda baca koma yang tepat pada teks tersebut digunakan untuk ....",
    options: ["Memisahkan anak kalimat yang mendahului induk kalimat", "Pemerincian unsur-unsur dalam suatu kalimat", "Mengapit tambahan keterangan", "Memisahkan kutipan langsung"],
    answer: 1,
    rationale: "Tanda koma digunakan di antara unsur-unsur dalam suatu pemerincian atau pembilangan (contoh: kopi, teh, kina, ...)."
  },
  {
    question: "Fungsi kata 'Sebut saja' pada awal kalimat di paragraf ketiga adalah ....",
    options: ["Menjelaskan definisi baru", "Memberikan contoh konkret", "Menyimpulkan isi paragraf", "Menghubungkan dua paragraf berbeda"],
    answer: 1,
    rationale: "Frasa 'sebut saja' digunakan untuk memperkenalkan contoh konkret dari pernyataan sebelumnya mengenai penelitian tanaman."
  },

  // --- BAHASA INGGRIS (11-20) ---
  {
    question: "Read the following notice: 'NO SWIMMING IN THIS AREA'. Where would you likely find this notice?",
    options: ["In a library", "Near a river or beach", "At a parking lot", "Inside a classroom"],
    answer: 1,
    rationale: "Warning notices about swimming are placed near bodies of water like rivers or beaches for public safety."
  },
  {
    question: "Complete the sentence: 'I usually ... breakfast at 6 o'clock in the morning.'",
    options: ["Eat", "Eating", "Eaten", "Ate"],
    answer: 0,
    rationale: "The sentence uses 'usually' which indicates a habit, thus requiring the Simple Present Tense ('eat')."
  },
  {
    question: "What is the synonym of the word 'ANCIENT'?",
    options: ["Modern", "Old", "New", "Quick"],
    answer: 1,
    rationale: "Ancient means belonging to the very distant past and no longer in existence, which is a synonym for 'old'."
  },
  {
    question: "Choose the correct preposition: 'The book is ... the table.'",
    options: ["In", "On", "Under", "At"],
    answer: 1,
    rationale: "The preposition 'on' is used to indicate that something is resting on the surface of something else."
  },
  {
    question: "Rearrange these words into a good sentence: 'goes - to - she - everyday - school'",
    options: ["She everyday goes to school", "She goes to school everyday", "Everyday school to goes she", "To school she goes everyday"],
    answer: 1,
    rationale: "The correct sentence structure in English is Subject (She) + Verb (goes) + Place (to school) + Time (everyday)."
  },
  {
    question: "What is the opposite of 'CLEAN'?",
    options: ["Empty", "Dirty", "Messy", "Rough"],
    answer: 1,
    rationale: "The direct antonym or opposite of clean is dirty."
  },
  {
    question: "In an invitation, 'R.S.V.P.' means ....",
    options: ["Please reply", "See you there", "Dress code required", "Bring your own food"],
    answer: 0,
    rationale: "R.S.V.P. stands for the French phrase 'Répondez s'il vous plaît', which means 'Please respond'."
  },
  {
    question: "Which sentence is correct?",
    options: ["They is playing football.", "They are playing football.", "They am playing football.", "They plays football."],
    answer: 1,
    rationale: "In Present Continuous, plural subjects like 'They' must be followed by the auxiliary verb 'are'."
  },
  {
    question: "A person who teaches students at school is a ....",
    options: ["Doctor", "Teacher", "Driver", "Chef"],
    answer: 1,
    rationale: "The definition of a teacher is someone whose job is to teach in a school."
  },
  {
    question: "The plural form of 'MOUSE' is ....",
    options: ["Mouses", "Mice", "Mice s", "Meese"],
    answer: 1,
    rationale: "The word 'mouse' is an irregular noun; its plural form is 'mice'."
  },

  // --- MATEMATIKA (21-35) ---
  {
    question: "Sebuah foto berukuran 3 cm x 4 cm akan diperbesar 5 kali. Perbandingan luas foto sebelum dan sesudah diperbesar adalah ....",
    options: ["1 : 5", "1 : 25", "1 : 10", "25 : 1"],
    answer: 1,
    rationale: "Perbandingan luas adalah kuadrat dari faktor skala perbesaran sisi. $5^2 = 25$. Maka perbandingannya 1 : 25."
  },
  {
    question: "Perbandingan banyaknya kelereng Joko dan Zaki adalah 4 : 6. Bila jumlah kelereng mereka adalah 80, maka banyaknya kelereng Zaki adalah ....",
    options: ["32 buah", "48 buah", "60 buah", "24 buah"],
    answer: 1,
    rationale: "Jumlah kelereng Zaki = $(6 / (4+6)) \\times 80 = (6 / 10) \\times 80 = 48$ buah."
  },
  {
    question: "Perbandingan uang Adi dan Tuti adalah 3 : 5. Jika jumlah uang mereka Rp300.000,00, maka selisih uang mereka adalah ....",
    options: ["Rp75.000,00", "Rp112.500,00", "Rp187.500,00", "Rp150.000,00"],
    answer: 0,
    rationale: "Selisih uang = $((5-3) / (3+5)) \\times 300.000 = (2 / 8) \\times 300.000 = 75.000$."
  },
  {
    question: "Umur Adi 1/2 dari umur Bondan, sedangkan umur Citra 5/4 dari umur Bondan. Jika umur Citra 20 tahun, maka jumlah umur Adi dan Bondan adalah ....",
    options: ["24 tahun", "26 tahun", "30 tahun", "35 tahun"],
    answer: 0,
    rationale: "Umur Bondan = $(4/5) \\times 20 = 16$. Umur Adi = $(1/2) \\times 16 = 8$. Jumlah = $16 + 8 = 24$ tahun."
  },
  {
    question: "Sebuah tongkat sepanjang 70 cm dipotong menjadi 3 bagian. Rasio potongan 1 : 2 = 2 : 3 dan rasio potongan 2 : 3 = 4 : 5. Ukuran tongkat terpanjang adalah ....",
    options: ["16 cm", "24 cm", "30 cm", "36 cm"],
    answer: 2,
    rationale: "Rasio gabungan A:B:C = 8:12:15. Total rasio 35. Bagian terpanjang = $(15/35) \\times 70 = 30$ cm."
  },
  {
    question: "Hasil dari $5^2 + \\sqrt{64} + 20^2 + \\sqrt{900}$ adalah ....",
    options: ["580", "375", "463", "158"],
    answer: 2,
    rationale: "$25 + 8 + 400 + 30 = 463$."
  },
  {
    question: "Azka menabung Rp25.000 di bank. Setelah satu tahun, tabungannya menjadi Rp28.000. Bunga tabungan per bulan adalah ....",
    options: ["1,0%", "1,2%", "1,4%", "1,5%"],
    answer: 0,
    rationale: "Bunga setahun = $3.000 / 25.000 = 12\\%$. Bunga sebulan = $12\\% / 12 = 1\\%$."
  },
  {
    question: "Persegi panjang EFGH memiliki luas 10 satuan. Jika koordinat E(1,1) dan F(3,1), maka koordinat G dan H adalah ....",
    options: ["(3,6) dan (6,6)", "(3,6) dan (1,6)", "(6,3) dan (6,1)", "(6,6) dan (1,6)"],
    answer: 1,
    rationale: "Panjang EF = 2. Luas 10 = $2 \\times$ Lebar. Lebar = 5. Titik y bergeser ke $1+5=6$."
  },
  {
    question: "Banyaknya rusuk dan sisi pada bangun ruang tabung berturut-turut adalah ....",
    options: ["4 dan 3", "3 dan 3", "2 dan 3", "0 dan 3"],
    answer: 2,
    rationale: "Tabung memiliki 2 rusuk (lingkaran atas dan bawah) serta 3 sisi (tutup, alas, dan selimut)."
  },
  {
    question: "Sebuah bak mandi berisi air penuh dengan debit 120 liter/jam selama 1 1/4 jam. Jika bak yang sama diisi dengan debit 100 liter/jam, waktu yang dibutuhkan adalah ....",
    options: ["1 jam 45 menit", "1 jam 30 menit", "1 jam 40 menit", "1 jam 25 menit"],
    answer: 1,
    rationale: "Volume = $120 \\times 1,25 = 150$ liter. Waktu = $150 / 100 = 1,5$ jam = 1 jam 30 menit."
  },
  {
    question: "Seseorang memiliki kartu angka 2, 1, dan 6. Bilangan tiga angka terkecil yang bisa dibentuk adalah ....",
    options: ["216", "126", "162", "261"],
    answer: 1,
    rationale: "Urutkan angka dari yang terkecil sebagai ratusan, puluhan, dan satuan: 1, 2, 6."
  },
  {
    question: "Berapa porsi 'Mie Ayam Komplit' (Rp15.000) yang dibeli jika total belanja beserta es teh (Rp3.000) adalah Rp72.000? (Uang Rp100.000, kembalian Rp28.000)",
    options: ["3 porsi", "4 porsi", "5 porsi", "6 porsi"],
    answer: 1,
    rationale: "Total belanja = $72.000$. Harga per paket = $15.000 + 3.000 = 18.000$. $72.000 / 18.000 = 4$ porsi."
  },
  {
    question: "Besar sudut terkecil yang terbentuk antara jarum panjang dan jarum pendek pada pukul 16.40 adalah ....",
    options: ["120 derajat", "110 derajat", "100 derajat", "105 derajat"],
    answer: 2,
    rationale: "Posisi jarum jam: $4 \\times 30 + (40/60) \\times 30 = 140^\\circ$. Posisi jarum menit: $40 \\times 6 = 240^\\circ$. Selisih = $240 - 140 = 100^\\circ$."
  },
  {
    question: "Jika luas daerah trapesium BCDE adalah 42 cm2 (terdiri dari 2 segitiga identik), maka luas daerah trapesium ABCD (terdiri dari 3 segitiga identik) adalah ....",
    options: ["60 cm2", "63 cm2", "66 cm2", "68 cm2"],
    answer: 1,
    rationale: "Luas 1 segitiga = $42 / 2 = 21$. Luas 3 segitiga = $3 \\times 21 = 63$."
  },
  {
    question: "Dadu bersisi 1 cm akan dimasukkan ke kotak balok berukuran 5 cm x 4 cm x 3 cm. Banyak dadu maksimal yang muat adalah ....",
    options: ["80 buah", "60 buah", "40 buah", "120 buah"],
    answer: 1,
    rationale: "Volume Balok = $5 \\times 4 \\times 3 = 60~cm^3$. Volume dadu = $1 \\times 1 \\times 1 = 1~cm^3$. Muat 60 buah."
  },

  // --- IPA (36-55) ---
  {
    question: "Ketika sebuah cakram warna yang berisi spektrum pelangi diputar dengan sangat cepat, warna yang akan terlihat adalah ....",
    options: ["Warna hitam", "Warna putih", "Tidak berwarna", "Warna merah dominan"],
    answer: 1,
    rationale: "Ini adalah fenomena dispersi terbalik di mana gabungan spektrum warna pelangi yang diputar cepat akan dipersepsikan oleh mata sebagai warna putih."
  },
  {
    question: "Mengapa gerhana matahari total hanya dapat dilihat dari lokasi tertentu di Bumi?",
    options: ["Bayangan Bulan sangat kecil dibanding luas Bumi.", "Matahari memancarkan cahaya lebih kuat di area lain.", "Bumi terlalu besar untuk tertutup bayangan.", "Bayangan Bumi menutupi Bulan sepenuhnya."],
    answer: 0,
    rationale: "Gerhana matahari total hanya terjadi di area yang terkena bayangan inti (Umbra) Bulan, yang ukurannya relatif kecil di permukaan bumi."
  },
  {
    question: "Tahap awal sosialisasi seorang bayi untuk belajar berbicara terjadi di lingkungan ....",
    options: ["Sekolah", "Masyarakat", "Keluarga", "Teman sebaya"],
    answer: 2,
    rationale: "Keluarga adalah unit terkecil masyarakat dan merupakan agen sosialisasi primer di mana proses belajar pertama terjadi."
  },
  {
    question: "Jenis sendi yang memungkinkan gerakan berputar pada leher adalah ....",
    options: ["Sendi Peluru", "Sendi Putar", "Sendi Engsel", "Sendi Pelana"],
    answer: 1,
    rationale: "Sendi putar memungkinkan rotasi satu tulang di atas tulang lainnya, seperti yang terjadi pada persambungan tulang leher."
  },
  {
    question: "Pengubahan protein menjadi molekul yang lebih sederhana oleh enzim pepsin terjadi di dalam organ ....",
    options: ["Mulut", "Lambung", "Usus Halus", "Kerongkongan"],
    answer: 1,
    rationale: "Lambung memproduksi asam klorida dan enzim pepsin untuk memecah protein menjadi pepton."
  },
  {
    question: "Planet yang dijuluki sebagai 'Bintang Fajar' atau 'Bintang Kejora' karena kecerahannya adalah ....",
    options: ["Merkurius", "Venus", "Mars", "Jupiter"],
    answer: 1,
    rationale: "Venus tampak paling cerah di langit Bumi setelah Matahari dan Bulan, sering terlihat sebelum fajar atau sesudah matahari terbenam."
  },
  {
    question: "Perubahan wujud benda dari gas menjadi padat (seperti terbentuknya embun beku) disebut ....",
    options: ["Menyublim", "Mengkristal", "Menguap", "Mengembun"],
    answer: 1,
    rationale: "Mengkristal atau deposisi adalah perubahan wujud zat dari fasa gas langsung ke fasa padat."
  },
  {
    question: "Sifat cahaya yang memungkinkan terbentuknya pelangi di langit setelah hujan adalah ....",
    options: ["Dapat dipantulkan", "Dapat merambat lurus", "Dapat diuraikan (dispersi)", "Dapat menembus benda bening"],
    answer: 2,
    rationale: "Butiran air hujan berfungsi sebagai prisma yang menguraikan cahaya matahari menjadi spektrum warna pelangi."
  },
  {
    question: "Bagian bunga yang berfungsi sebagai alat kelamin jantan adalah ....",
    options: ["Putik", "Mahkota bunga", "Benang sari", "Kelopak bunga"],
    answer: 2,
    rationale: "Benang sari menghasilkan serbuk sari yang merupakan sel kelamin jantan pada tumbuhan."
  },
  {
    question: "Hubungan antara kerbau dan burung jalak merupakan contoh simbiosis ....",
    options: ["Mutualisme", "Parasitisme", "Komensalisme", "Amensalisme"],
    answer: 0,
    rationale: "Simbiosis mutualisme adalah hubungan yang menguntungkan kedua pihak; kerbau bersih dari kutu, burung jalak mendapat makanan."
  },
  {
    question: "Zat yang memiliki bentuk tidak tetap namun volumenya tetap adalah ....",
    options: ["Zat Padat", "Zat Cair", "Zat Gas", "Zat Antara"],
    answer: 1,
    rationale: "Zat cair memiliki volume yang tetap meskipun bentuknya berubah mengikuti wadah yang ditempatinya."
  },
  {
    question: "Benda langit yang memiliki ekor panjang dan arah ekornya selalu menjauhi matahari disebut ....",
    options: ["Asteroid", "Meteorid", "Komet", "Satelit"],
    answer: 2,
    rationale: "Komet terdiri dari es dan debu yang menguap saat mendekati matahari, menghasilkan ekor yang ditiup angin matahari menjauhi pusat tata surya."
  },
  {
    question: "Kelainan darah yang menyebabkan penderita mengalami darah sukar membeku saat luka adalah ....",
    options: ["Anemia", "Hemofilia", "Leukemia", "Thalassemia"],
    answer: 1,
    rationale: "Hemofilia adalah penyakit keturunan yang mengganggu mekanisme pembekuan darah secara normal."
  },
  {
    question: "Penyebab terjadinya 4 musim di negara beriklim subtropis adalah ....",
    options: ["Rotasi Bumi", "Rotasi Bulan", "Revolusi Bumi", "Revolusi Bulan"],
    answer: 2,
    rationale: "Kemiringan poros Bumi saat melakukan revolusi (mengelilingi Matahari) mengakibatkan perbedaan intensitas penyinaran di berbagai belahan Bumi."
  },
  {
    question: "Urutan jenis gaya yang bekerja pada: (1) Magnet menarik paku, (2) Kelapa jatuh, (3) Kipas angin berputar, adalah ....",
    options: ["Magnet, Pegas, Listrik.", "Magnet, Gravitasi, Gerak.", "Gesek, Magnet, Otot.", "Listrik, Gravitasi, Magnet."],
    answer: 1,
    rationale: "(1) Gaya magnet, (2) Gaya gravitasi menarik benda ke bawah, (3) Gaya dari energi listrik menghasilkan gerak kipas."
  },
  {
    question: "Alat elektronik yang mengubah energi listrik menjadi energi gerak adalah ....",
    options: ["Setrika dan Solder", "Kipas angin dan Mixer", "Radio dan Televisi", "Lampu dan Senter"],
    answer: 1,
    rationale: "Motor listrik di dalam kipas angin dan mixer menggunakan arus listrik untuk menciptakan putaran atau gerak mekanik."
  },
  {
    question: "Bagian mata yang berfungsi mengatur jumlah cahaya yang masuk adalah ....",
    options: ["Retina", "Pupil", "Lensa Mata", "Kornea"],
    answer: 1,
    rationale: "Pupil akan mengecil saat cahaya terang untuk melindungi mata dan membesar saat cahaya redup."
  },
  {
    question: "Perubahan energi pada kincir angin pembangkit listrik adalah ....",
    options: ["Energi Kimia ke Listrik", "Energi Gerak ke Listrik", "Energi Listrik ke Gerak", "Energi Panas ke Gerak"],
    answer: 1,
    rationale: "Generator pada kincir angin mengubah energi kinetik/gerak dari putaran baling-baling menjadi energi listrik."
  },
  {
    question: "Cara yang tepat untuk mengembangbiakkan tanaman pisang adalah ....",
    options: ["Mencangkok batang", "Menanam tunasnya", "Menanam bijinya", "Melalui umbi lapis"],
    answer: 1,
    rationale: "Pisang berkembang biak secara vegetatif alami melalui pertumbuhan tunas dari pangkal induknya."
  },
  {
    question: "Bagian termos yang berfungsi menghambat perpindahan panas secara radiasi adalah ....",
    options: ["Tutup gabus/plastik", "Ruang hampa udara (vakum)", "Lapisan mengkilap perak di dinding dalam", "Dinding kaca tebal"],
    answer: 2,
    rationale: "Permukaan yang mengkilap berfungsi sebagai pemantul radiasi panas agar energi panas tetap tertahan di dalam air."
  },

  // --- IPS (56-75) ---
  {
    question: "Kerajaan Samudera Pasai berkembang pesat karena lokasinya di jalur strategis ....",
    options: ["Tepi Sungai Mahakam", "Selat Malaka", "Pantai Utara Jawa", "Selat Sunda"],
    answer: 1,
    rationale: "Selat Malaka adalah urat nadi perdagangan maritim dunia yang menghubungkan India dan Timur Tengah dengan Tiongkok."
  },
  {
    question: "Patih Majapahit yang sangat berjasa menyatukan wilayah Nusantara adalah ....",
    options: ["Ken Arok", "Gajah Mada", "Raden Wijaya", "Mulawarman"],
    answer: 1,
    rationale: "Mahapatih Gajah Mada mengikrarkan Sumpah Palapa untuk menyatukan kepulauan Nusantara di bawah payung Majapahit."
  },
  {
    question: "Perjanjian Bongaya (1667) ditandatangani oleh Belanda (VOC) dengan ....",
    options: ["Kesultanan Banten", "Kesultanan Ternate", "Kesultanan Gowa (Makassar)", "Kerajaan Mataram Islam"],
    answer: 2,
    rationale: "Sultan Hasanuddin menandatangani perjanjian ini setelah kalah dalam perang Makassar melawan aliansi VOC dan Aru Palaka."
  },
  {
    question: "Salah satu hasil keputusan sidang PPKI pada tanggal 18 Agustus 1945 adalah ....",
    options: ["Membentuk Tentara Keamanan Rakyat (TKR).", "Mengesahkan UUD 1945 dan memilih Presiden/Wakil Presiden.", "Menetapkan wilayah Indonesia menjadi 8 provinsi.", "Membentuk Partai Nasional Indonesia."],
    answer: 1,
    rationale: "Keputusan mendasar berdirinya Republik Indonesia diambil pada sidang pertama PPKI sehari setelah proklamasi."
  },
  {
    question: "Arsitektur Menara Masjid Kudus yang menyerupai candi merupakan contoh akulturasi budaya ....",
    options: ["Hindu dan Islam", "Islam dan Kristen", "Budha dan Konghucu", "Hindu dan Yunani"],
    answer: 0,
    rationale: "Menara Masjid Kudus menggunakan struktur batu bata merah berundak khas candi Hindu Jawa sebagai menara adzan."
  },
  {
    question: "UNESCO menetapkan Wayang Kulit sebagai mahakarya dunia pada tahun ....",
    options: ["2001", "2003", "2005", "2009"],
    answer: 1,
    rationale: "Wayang Kulit secara resmi diakui sebagai Warisan Budaya Takbenda Dunia oleh UNESCO pada 7 November 2003."
  },
  {
    question: "Provinsi Bangka Belitung merupakan hasil pemekaran dari provinsi ....",
    options: ["Sumatera Barat", "Riau", "Sumatera Selatan", "Jambi"],
    answer: 2,
    rationale: "Kepulauan Bangka Belitung resmi menjadi provinsi sendiri memisahkan diri dari provinsi Sumatera Selatan."
  },
  {
    question: "Faktor utama yang mendorong seseorang melakukan tindakan ekonomi disebut ....",
    options: ["Prinsip ekonomi", "Motif ekonomi", "Hukum ekonomi", "Sistem ekonomi"],
    answer: 1,
    rationale: "Motif ekonomi adalah alasan, keinginan, atau dorongan yang membuat manusia melakukan tindakan ekonomi."
  },
  {
    question: "Jika Kota B berpenduduk 1.200.000 jiwa dengan luas wilayah 800 km2, maka kepadatan penduduknya adalah ....",
    options: ["1.000 jiwa/km2", "1.200 jiwa/km2", "1.500 jiwa/km2", "1.750 jiwa/km2"],
    answer: 2,
    rationale: "Kepadatan penduduk = Jumlah Penduduk / Luas Wilayah = $1.200.000 / 800 = 1.500$ jiwa/km²."
  },
  {
    question: "Perusahaan asing yang berdiri di Indonesia memberikan dampak negatif yaitu ....",
    options: ["Tersedianya lapangan pekerjaan.", "Meningkatkan devisa negara.", "Sebagian keuntungan dibawa ke negara asal.", "Pekerja Indonesia meningkat keterampilannya."],
    answer: 2,
    rationale: "Pelarian modal ke luar negeri (capital flight) merupakan kerugian bagi sirkulasi uang di dalam negeri."
  },
  {
    question: "Upaya meningkatkan ekonomi kreatif oleh pemerintah dengan identifikasi kompetensi inti industri adalah bagian dari ....",
    options: ["Pembuatan Road Map Industry.", "Menyiapkan insentif pajak.", "Membentuk Indonesia Creative Council.", "Memberikan perlindungan hukum."],
    answer: 0,
    rationale: "Peta Jalan Industri (Road Map) memuat perencanaan jangka panjang termasuk identifikasi kompetensi dan fasilitas."
  },
  {
    question: "Suku bangsa yang berasal dari Pulau Sumatera adalah ....",
    options: ["Minangkabau, Batak, Nias.", "Asmat, Dani, Gayo.", "Dayak, Banjar, Bugis.", "Toraja, Minahasa, Madura."],
    answer: 0,
    rationale: "Ketiga suku tersebut adalah penduduk asli di wilayah pulau Sumatera."
  },
  {
    question: "Kerajaan Sriwijaya mengalami kemunduran salah satunya disebabkan oleh ....",
    options: ["Serangan dari Kerajaan Majapahit dan Colamandala.", "Ditemukannya benua baru oleh penjelajah.", "Masuknya agama Kristen.", "Tenggelamnya pulau Sumatera."],
    answer: 0,
    rationale: "Tekanan militer eksternal melemahkan dominasi maritim Sriwijaya di kawasan Asia Tenggara."
  },
  {
    question: "Keputusan Sidang I PPKI pada 18 Agustus 1945 mengangkat Presiden dan Wakil Presiden yaitu ....",
    options: ["Ir. Soekarno dan Drs. Moh. Hatta.", "Soeharto dan Adam Malik.", "Radjiman Wedyodiningrat dan Sjahrir.", "Achmad Soebardjo dan Sayuti Melik."],
    answer: 0,
    rationale: "Soekarno dan Hatta terpilih secara aklamasi dalam sidang pertama PPKI."
  },
  {
    question: "Badan usaha yang modalnya berasal dari simpanan anggota dengan asas kekeluargaan adalah ....",
    options: ["PT (Perseroan Terbatas)", "BUMN", "Koperasi", "Firma"],
    answer: 2,
    rationale: "Koperasi berazaskan kekeluargaan dan dikelola dari, oleh, dan untuk anggotanya."
  },
  {
    question: "Komoditas hasil perkebunan Indonesia yang menjadi unggulan ekspor non-migas adalah ....",
    options: ["Kelapa sawit, Karet, Cokelat.", "Minyak bumi dan Batubara.", "Bauksit dan Nikel.", "Pasir kuarsa dan Garam."],
    answer: 0,
    rationale: "Produk perkebunan tersebut merupakan andalan ekspor komoditas pertanian Indonesia."
  },
  {
    question: "Usaha menanggulangi abrasi pantai secara alami adalah dengan ....",
    options: ["Membangun tanggul beton.", "Menanam hutan mangrove (bakau).", "Melakukan pengerukan pasir.", "Membuat sengkedan."],
    answer: 1,
    rationale: "Akar pohon bakau yang kuat menahan deburan ombak dan mengikat tanah di pesisir pantai."
  },
  {
    question: "Konsep yang merujuk pada perbedaan horizontal di masyarakat tanpa tingkatan kasta disebut ....",
    options: ["Stratifikasi sosial", "Diferensiasi sosial", "Mobilitas sosial", "Konflik sosial"],
    answer: 1,
    rationale: "Diferensiasi sosial adalah pengelompokan masyarakat berdasarkan suku, agama, ras tanpa hierarki."
  },
  {
    question: "Perubahan relief permukaan bumi yang disebabkan oleh tenaga dari dalam bumi disebut tenaga ....",
    options: ["Eksogen", "Endogen", "Mekanik", "Gravitasi"],
    answer: 1,
    rationale: "Tenaga endogen (tektonisme, vulkanisme) adalah tenaga yang berasal dari dalam perut bumi."
  },
  {
    question: "Pemimpin perlawanan rakyat Makassar terhadap VOC yang dijuluki Ayam Jantan dari Timur adalah ....",
    options: ["Sultan Hasanuddin", "Pangeran Diponegoro", "Sultan Baabullah", "Pattimura"],
    answer: 0,
    rationale: "Julukan tersebut diberikan oleh Belanda kepada Sultan Hasanuddin karena kegigihannya melawan VOC."
  }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState(new Set());

  const handleAnswer = (optionIdx) => {
    if (checkedQuestions.has(currentIdx)) return;
    setUserAnswers({ ...userAnswers, [currentIdx]: optionIdx });
  };

  const toggleCheck = () => {
    if (userAnswers[currentIdx] === undefined) return;
    const newChecked = new Set(checkedQuestions);
    newChecked.add(currentIdx);
    setCheckedQuestions(newChecked);
  };

  const navigateTo = (newIdx) => {
    if (newIdx >= 0 && newIdx < quizData.length) {
      setCurrentIdx(newIdx);
      window.scrollTo(0, 0);
    }
  };

  const finalStats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    const wrongIndices = [];

    quizData.forEach((q, idx) => {
      if (userAnswers[idx] === undefined) {
        skipped++;
        wrongIndices.push(idx);
      } else if (userAnswers[idx] === q.answer) {
        correct++;
      } else {
        incorrect++;
        wrongIndices.push(idx);
      }
    });

    return { correct, incorrect, skipped, wrongIndices };
  }, [userAnswers, showResult]);

  const resetQuiz = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setCheckedQuestions(new Set());
    setShowResult(false);
    setShowReview(false);
  };

  if (showResult && showReview) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setShowReview(false)} className="mb-6 flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
            <ArrowLeft size={20} /> Kembali ke Skor
          </button>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><BookOpen className="text-blue-600" /> Review Jawaban & Pembahasan</h1>
          </div>
          <div className="space-y-6">
            {finalStats.wrongIndices.map((idx) => {
              const q = quizData[idx];
              const isSkipped = userAnswers[idx] === undefined;
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Soal #{idx + 1}</span>
                    {isSkipped ? <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">Tidak Diisi</span> : <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">Salah</span>}
                  </div>
                  <p className="text-lg font-bold text-slate-800 mb-4 leading-relaxed">{q.question}</p>

{/* Gambar di halaman review */}
{q.image && (
  <div className="mb-4 rounded-xl overflow-hidden border border-slate-100 bg-white flex justify-center p-2">
    <img 
      src={q.image} 
      alt="Visualisasi soal" 
      className="max-w-full h-auto max-h-[200px] object-contain" 
    />
  </div>
)}
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {q.options.map((opt, i) => {
                      const isCorrect = q.answer === i;
                      const isUserChoice = userAnswers[idx] === i;
                      let optClass = "p-4 rounded-2xl border-2 flex items-center justify-between ";
                      if (isCorrect) optClass += "border-green-500 bg-green-50 text-green-700 font-bold";
                      else if (isUserChoice) optClass += "border-red-200 bg-red-50 text-red-600";
                      else optClass += "border-slate-50 text-slate-400 opacity-60";
                      return (
                        <div key={i} className={optClass}>
                          <span className="flex gap-3"><span className={`w-6 h-6 flex items-center justify-center rounded-lg text-[10px] font-black border ${isCorrect ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-300 border-slate-200'}`}>{String.fromCharCode(65 + i)}</span>{opt}</span>
                          {isCorrect && <CheckCircle size={18} />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Penjelasan</p>
                    <p className="text-sm text-slate-700 leading-relaxed italic">{q.rationale}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={resetQuiz} className="mt-10 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl"><RotateCcw size={20} /> Mulai Ulang Simulasi</button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 flex flex-col items-center justify-center font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-200">
          <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800">Laporan Hasil Ujian</h1>
          <p className="text-slate-500 mb-6 italic">Simulasi Paket 3 - Labschool</p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
              <div className="text-xl font-bold text-green-600">{finalStats.correct}</div>
              <div className="text-[10px] font-bold text-green-700 uppercase tracking-tighter">Benar</div>
            </div>
            <div className="p-3 bg-red-50 rounded-2xl border border-red-100">
              <div className="text-xl font-bold text-red-600">{finalStats.incorrect}</div>
              <div className="text-[10px] font-bold text-red-700 uppercase tracking-tighter">Salah</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-xl font-bold text-slate-600">{finalStats.skipped}</div>
              <div className="text-[10px] font-bold text-slate-700 uppercase tracking-tighter">Kosong</div>
            </div>
          </div>
          <div className="mb-8 p-6 bg-slate-50 rounded-3xl">
            <div className="text-6xl font-black text-blue-600">{Math.round((finalStats.correct / quizData.length) * 100)}</div>
            <div className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest text-[10px]">Nilai Akhir</div>
          </div>
          <div className="flex flex-col gap-3">
            {finalStats.wrongIndices.length > 0 && (
                <button onClick={() => setShowReview(true)} className="w-full bg-blue-100 text-blue-700 py-4 rounded-2xl font-bold hover:bg-blue-200 transition-all"><BookOpen size={20} /> Review Jawaban & Pembahasan</button>
            )}
            <button onClick={resetQuiz} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg"><RotateCcw size={20} /> Coba Lagi</button>
          </div>
        </div>
      </div>
    );
  }

  const q = quizData[currentIdx];
  const progress = ((currentIdx + 1) / quizData.length) * 100;
  const isChecked = checkedQuestions.has(currentIdx);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-start mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">Paket Latihan 3</h2>
            <h1 className="text-lg font-bold">Ujian Seleksi SMP</h1>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Soal</p>
              <p className="text-sm font-black text-slate-700">{currentIdx + 1}/{quizData.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-blue-100 flex items-center justify-center">
                <span className="text-[10px] font-bold text-blue-600">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
        <div className="h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className="p-6 md:p-10">
            <p className="text-xl font-semibold leading-relaxed mb-6 text-slate-800">{q.question}</p>

{/* Logika Penambahan Gambar */}
{q.image && (
  <div className="mb-8 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex justify-center">
    <img 
      src={q.image} 
      alt={`Visualisasi Soal ${currentIdx + 1}`} 
      className="max-w-full h-auto object-contain max-h-[300px]" 
    />
  </div>
)}
            <div className="grid grid-cols-1 gap-4">
              {q.options.map((opt, i) => {
                const isSelected = userAnswers[currentIdx] === i;
                const isCorrect = q.answer === i;
                let btnClass = "w-full p-5 rounded-2xl border-2 text-left transition-all flex justify-between items-center group ";
                if (isChecked) {
                  if (isCorrect) btnClass += "border-green-500 bg-green-50 text-green-700 shadow-sm";
                  else if (isSelected) btnClass += "border-red-500 bg-red-50 text-red-700";
                  else btnClass += "border-slate-100 text-slate-300 opacity-50";
                } else {
                  btnClass += isSelected ? "border-blue-600 bg-blue-50 text-blue-800 font-bold shadow-md transform scale-[1.02]" : "border-slate-100 hover:border-blue-200 hover:bg-slate-50";
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} className={btnClass} disabled={isChecked}>
                    <span className="flex gap-4 items-center"><span className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black border-2 transition-colors ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-100'}`}>{String.fromCharCode(65 + i)}</span>{opt}</span>
                    {isChecked && isCorrect && <CheckCircle className="text-green-600" size={24} />}
                    {isChecked && isSelected && !isCorrect && <XCircle className="text-red-600" size={24} />}
                  </button>
                );
              })}
            </div>
            {isChecked && (
              <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-center gap-2 text-slate-500 mb-3 font-black uppercase text-[10px] tracking-widest"><BarChart3 size={14} /> Analisis Jawaban</div>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">{q.rationale}</p>
              </div>
            )}
          </div>
          <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex justify-between items-center">
            <button disabled={currentIdx === 0} onClick={() => navigateTo(currentIdx - 1)} className="px-5 py-3 text-slate-500 hover:text-slate-800 disabled:opacity-20 flex items-center gap-2 font-bold transition-all"><ChevronLeft size={20} /> <span className="hidden sm:inline">Kembali</span></button>
            <div className="flex gap-3">
                {!isChecked && userAnswers[currentIdx] !== undefined && <button onClick={toggleCheck} className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2"><ListChecks size={18} /> Cek</button>}
                <button onClick={() => { if (currentIdx < quizData.length - 1) navigateTo(currentIdx + 1); else setShowResult(true); }} className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl">{currentIdx < quizData.length - 1 ? 'Lanjut' : 'Selesai'} <ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-4 mb-10">
            {quizData.map((_, idx) => (
                <div key={idx} onClick={() => navigateTo(idx)} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black cursor-pointer transition-all border-2 ${currentIdx === idx ? 'border-blue-600 scale-110 shadow-sm' : 'border-transparent'} ${userAnswers[idx] !== undefined ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'}`}>{idx + 1}</div>
            ))}
        </div>
      </div>
    </div>
  );
}