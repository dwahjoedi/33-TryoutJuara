import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCcw, Award, BookOpen, BarChart3, ListChecks, ArrowLeft, AlertCircle,
  Search
 } from 'lucide-react';

// Seluruh data soal Paket 3 (75 Soal)
const quizData = [
  // --- BAHASA INDONESIA (1-10) ---
  {
    //No.1
    question: "Berdasarkan teks tentang Kebun Raya Bogor, apa yang menjadi identitas bangsa dan memberikan kontribusi pada pembangunan ekonomi global?",
    image: "images/p3_soal_01.jpg", // Path ke file gambar Anda
    options: ["Variasi jenis tanamannya saja", "Sejarah Kebun Raya Bogor", "Pusat penelitian biologi tropis", "Penemuan ilmiah bidang botani"],
    answer: 1,
    rationale: "Berdasarkan paragraf kedua, sejarah Kebun Raya Bogor menjadi identitas bangsa serta memberikan kontribusi pembangunan ekonomi global."
  },
  {
    //No. 2
    question: "Ide pokok paragraf ketiga pada teks tersebut adalah ....",
    options: ["Penelitian tanaman domestik berbagai tanaman ekspor", "Kontribusi penemuan ilmiah Kebun Raya Bogor bagi kesejahteraan manusia", "Inovasi dalam bidang ekonomi pemerintah Belanda", "Agroindustri spesies eksotis kopi dan teh"],
    answer: 1,
    rationale: "Paragraf ketiga menjelaskan bahwa penemuan ilmiah di Kebun Raya Bogor memberikan kontribusi nyata bagi kesejahteraan umat manusia."
  },
  {
    //No. 3
    question: "Apa fungsi awal Kebun Raya Bogor menurut catatan sejarah dari laman kebunraya?",
    image: "images/p3_soal_01.jpg", // Path ke file gambar Anda
    options: ["Pusat penelitian biologi tropis kelas dunia", "Kebun percobaan tanaman perkebunan", "Tempat rekreasi keluarga kerajaan Belanda", "Warisan nilai-nilai universal UNESCO"],
    answer: 1,
    rationale: "Teks menyebutkan bahwa pada mulanya kebun ini hanya digunakan sebagai kebun percobaan bagi tanaman perkebunan yang akan diperkenalkan di Hindia Belanda."
  },
  {
    //No.4 
    question: "Pernyataan yang TIDAK sesuai dengan teks Kebun Raya Bogor adalah ....",
    image: "images/p3_soal_01.jpg", // Path ke file gambar Anda
    options: ["Kebun Raya Bogor memiliki luas mencapai 87 hektar.", "Terdapat 15.000 jenis koleksi pohon dan tumbuhan.", "Kebun Raya Bogor hanya melestarikan jenis tanaman eksotis saja.", "Inovasi botani berkontribusi pada peningkatan kekayaan agroindustri Belanda."],
    answer: 2,
    rationale: "Pernyataan C salah karena teks menyebutkan kekayaan warisan mencakup variasi jenis tanaman, bentang lahan, bangunan, artefak, dan ilmu botani secara umum, tidak hanya tanaman eksotis."
  },
 {
    //No.5
    question: "Apa yang menjadi ciri fisik paling unik dari ikan Blue Parrotfish yang membuatnya disebut mirip burung?",
    image: "images/p3_soal_05.jpg", // Path ke file gambar Anda
    options: [
      "Memiliki warna kulit yang bisa berubah sesuai suhu air",
      "Memiliki moncong berupa rahang dengan gigi yang menyatu",
      "Mampu bermigrasi antar samudra dalam waktu singkat",
      "Memiliki sirip dada yang lebar seperti sayap burung"
    ],
    answer: 1,
    rationale: "Ciri paling khas dari Blue Parrotfish adalah susunan giginya yang menyatu pada rahang, membentuk struktur kuat menyerupai paruh burung kakaktua (parrot) yang digunakan untuk mengikis alga dari karang."
  },
  { 
    //No. 6
    question: "Bagaimana cara ikan Blue Parrotfish melindungi diri dari predator pada malam hari?", 
    image: "images/p3_soal_05.jpg", // Path ke file gambar Anda
    options: [ "Bersembunyi di wilayah Samudera Atlantik Barat", "Mengeluarkan lendir yang menutupi bau dan memiliki rasa pahit", "Mencari makan di karang mati yang dilapisi alga", "Bergerak dalam kelompok besar yang dipimpin oleh jantan" ], 
    answer: 1, 
    rationale: "Berdasarkan data pada tabel, Blue Parrotfish memiliki mekanisme perlindungan diri yang unik di malam hari dengan cara mengeluarkan lendir. Lendir ini berfungsi untuk menyamarkan bau mereka dari penciuman predator serta memberikan rasa pahit jika dimakan." 
  },
  { 
    //No.7
    question: "Apa ide pokok yang disampaikan pada teks tersebut?", 
    image: "images/p3_soal_05.jpg", // Path ke file gambar Anda
    options: [ "Blue Parrotfish adalah ikan yang hidup di terumbu karang", "Blue Parrotfish memiliki kemampuan unik berganti jenis kelamin", "Blue Parrotfish memiliki gigi kuat untuk menghancurkan karang", "Blue Parrotfish merupakan ikan biru dari Samudera Atlantik" ], 
    answer: 0, 
    rationale: "Ide pokok adalah gagasan utama yang menggambarkan subjek secara umum. Pilihan A merupakan pernyataan paling umum yang mencakup identitas dan habitat Blue Parrotfish." 
  },
  { 
    //No.8
    question: "Apa kesimpulan yang dapat diambil dari teks tentang Blue Parrotfish?", 
    image: "images/p3_soal_05.jpg", // Path ke file gambar Anda
    options: [ "Blue Parrotfish unik karena kemampuan mengganti jenis kelamin", "Blue Parrotfish hidup di terumbu karang dengan moncong rahang unik", "Blue Parrotfish merupakan hewan yang berperan penting dalam pembentukan pantai berpasir", "Blue Parrotfish merupakan spesies ikan yang langka" ], 
    answer: 2, 
    rationale: "Kesimpulan menekankan pada dampak atau peran penting subjek. Peran mereka dalam pembentukan pantai berpasir adalah poin ekologis utama dari eksistensi mereka." 
  },
  { 
    //No.9
    question: "Pernyataan manakah yang paling sesuai mengenai jenis Teks 1 dan Teks 2?", 
    image: "images/p3_soal_09.jpg", // Path ke file gambar Anda
    options: [
      "Teks 1 adalah sebuah pantun, sementara Teks 2 adalah sebuah puisi naratif.", 
      "Teks 1 adalah sebuah puisi naratif, sementara Teks 2 adalah sebuah pantun.", 
      "Kedua teks tersebut merupakan puisi naratif.", 
      "Kedua teks tersebut merupakan pantun."] ,
      answer: 3 ,
      rationale: "Kedua teks merupakan pantun karena memiliki pola struktur yang sama, yaitu terdiri dari empat baris dengan rima tertentu (seperti rima a-b-a-b pada teks 1 dan teks 2) dalam setiap baitnya." 
  },
  { 
    //No.10
    question: "Di mana letak sampiran pada Teks 1 dan Teks 2 berdasarkan struktur pantun?", 
    options: ["Baris 1 dan 2", "Baris 2 dan 3", "Baris 3 dan 4", "Baris 1 dan 4"],
    answer: 0, 
    rationale: "Berdasarkan informasi pada poin pertama di tabel, struktur pantun yang benar memiliki sampiran pada baris 1 dan 2." 
  },
  { 
    //No.11
    question: "Kapan PNI dibubarkan oleh Belanda setelah pembelaan Sukarno dalam Indonesia Menggugat?", 
    image: "images/p3_soal_11.jpg", // Path ke file gambar Anda
    options: [
      "Januari 1930", 
      "Juni 1930", 
      "Agustus 1930", "Desember 1930"], 
      answer: 1, 
      rationale: "Poin pertama pada tabel menyatakan bahwa PNI dibubarkan oleh Belanda pada Juni 1930 setelah pembelaan Sukarno dalam Indonesia Menggugat."
   },
   { 
    //No. 12
    question: "Mengapa Sukarno masuk penjara di Sukamiskin, Bandung, pada 29 Desember 1929?", 
    options: [
      "Karena ia melakukan tindakan kriminal murni", 
      "Karena ia membela kebijakan pemerintah Belanda", 
      "Karena ia mendirikan Partai Komunis Indonesia", 
      "Karena aktivitas politiknya untuk mewujudkan Indonesia Merdeka"], 
      answer: 3, 
      rationale: "Sukarno dipenjarakan oleh pemerintah kolonial Belanda karena perjuangan politiknya melalui PNI yang dianggap membahayakan kekuasaan Belanda."        
  },
 { 
  //No. 13
  question: "Peristiwa apa yang mengubah Bujang Sembilan menjadi ikan menurut legenda tersebut?", 
  image: "images/p3_soal_13.jpg", // Path ke file gambar Anda
  options: [
    "Kutukan dari Datuk Limbatang", 
    "Adu silat dengan Giran", 
    "Letusan Gunung Tinian", 
    "Hukuman karena perbuatan mereka"], 
    answer: 2, 
    rationale: "Berdasarkan informasi poin nomor 4 pada tabel pernyataan, letusan Gunung Tinian adalah peristiwa yang mengubah Bujang Sembilan menjadi ikan." 
  },
  { 
    //No. 14
    question: "Hal yang terjadi setelah Giran dan Sani melompat ke dalam kawah gunung adalah...", 
    options: [
      "Gunung tersebut meletus dan menghancurkan segalanya.", 
      "Mereka berhasil melarikan diri dan kembali ke perkampungan.", 
      "Bujang Sembilan menjadi ikan.", 
      "Mereka diberi pengampunan oleh penduduk kampung."], 
    answer: 0, 
    rationale: "Berdasarkan alur legenda tersebut, tindakan Giran dan Sani melompat ke kawah memicu letusan Gunung Tinian yang dahsyat. Peristiwa letusan inilah yang kemudian mengubah Bujang Sembilan menjadi ikan sesuai dengan informasi pada poin pernyataan di soal sebelumnya. "
  },
 { 
  //No.15
  question: "Akibat dari letusan Gunung Tinjau menurut legenda tersebut adalah...", 
  options: [
    "Bujang Sembilan menjadi pemenang dalam adu silat.", 
    "Kawah gunung berubah menjadi danau yang diberi nama Danau Maninjau.", 
    "Sani dan Giran dipenjara karena perbuatan terlarang.", 
    "Kukuban menikahi Sani setelah kejadian tersebut."], 
    answer: 1, 
    rationale: "Berdasarkan alur cerita legenda, letusan dahsyat Gunung Tinjau mengakibatkan kawah gunung tersebut berubah menjadi danau besar yang kemudian dikenal dengan nama Danau Maninjau. "
 },
  // --- BAHASA INGGRIS (11-20) ---
  { 
    //No. 16
    question: "Why did the writer paint her room pink?", 
    image: "images/p3_soal_16.jpg", // Path ke file gambar Anda
    options: [
      "Pink makes her comfortable", 
      "She likes natural scenery", 
      "Her mother likes it", 
      "She likes pink"],
      answer: 3, 
      rationale: "Di dalam teks'My Room', penulis menyatakan: 'I painted it pink because it's my favorite color,' yang berarti dia menyukai warna pink. "
  },
{ 
  //No.17
  question: "When does the writer use the encyclopedias?", 
  image: "images/p3_soal_16.jpg", 
  options: [ 
    "In the morning", 
    "In her spare time", 
    "When she studies", 
    "When she wakes up" ], 
  answer: 2, 
  rationale: "Berdasarkan teks 'My Room', penulis secara spesifik menyebutkan bahwa ensiklopedia membantunya saat ia sedang belajar ('the encyclopedias help me when I study')."
 },
{ 
  //No. 18
  question: "What is the purpose of the text?", 
  image: "images/p3_soal_16.jpg", 
  options: [ 
    "To ask the reader to paint their room pink", 
    "To tell the reader how to decorate a room", "To tell about the writer’s hobby", "To describe the writer’s room" ], 
  answer: 3, 
  rationale: "Teks tersebut bertujuan untuk mendeskripsikan kamar penulis (descriptive text), terlihat dari detail mengenai warna ruangan, letak meja, dan benda-benda di dalamnya." 
},
{ 
  //No.19
  question: "From the text we know that there are... in the writer’s room.", 
  image: "images/p3_soal_16.jpg", 
  options: [ "Two alarm clock", "Three windows", "Some pictures", "Two pillows" ], 
  answer: 2, rationale: "Dalam teks tertulis 'I put pictures of natural scenery on the wall', yang mengonfirmasi adanya beberapa gambar di dinding kamar tersebut."
 },
  { 
    //No.20
    question: "It is monkey. He is clever animal and funny. What does he likes to eat?", 
    image: "images/p3_soal_20.jpg", 
    options: [ "He likes eat vegetable", "He likes eat meat", "He likes eat fish", "He likes eat fruit" ], 
    answer: 3, rationale: "Monyet dikenal sebagai hewan pemakan buah-buahan (frugivora), dan gambar ilustrasi menunjukkan monyet sedang memegang pisang." 
  },
{ 
  //No.21
  question: "Mrs. Rossy : <u>Good afternoon</u>, students. Students : <u>Good afternoon</u>, Ma'am. The underlined utterance is an expression of ...", 
  //image: "images/p3_soal_21.jpg", 
  options: [ "Greeting", "Leave-taking", "Introduction", "Prohibition" ], 
  answer: 0, rationale: "Ungkapan 'Good afternoon' merupakan bentuk salam atau sapaan (greeting) yang digunakan pada waktu siang atau sore hari." 
},
{ 
  //No.22
  question: "This thing is usually found in the bedroom. It is a long narrow pillow or cushion filled with cotton, down or fibre. It is called ...", 
  //image: "images/p3_soal_22.jpg", 
  options: [ "Pillow", "Bolster", "Blanket", "Jug" ], 
  answer: 1, rationale: "Bantal yang berbentuk panjang dan sempit seperti yang dideskripsikan disebut dengan guling (bolster)." 
},
{ 
  //No.23
  question: "It is a kitchen utensil. It is a type of pot, typically metal, specialized for boiling water, with a lid, spout and handle. What is it?", 
  //image: "images/p3_soal_23.jpg", 
  options: [ "Jug", "Kettle", "Sink", "Grater" ], 
  answer: 1, rationale: "Alat dapur berbahan logam yang memiliki tutup, corong, dan pegangan khusus untuk merebus air disebut ketel (kettle)." 
},
  { 
    //No.24
    question: "She ... me a birthday cake today.", 
    //image: "images/p3_soal_24.jpg", 
    options: [ "make", "makes", "made", "had made" ], 
    answer: 2, rationale: "Kalimat ini menunjukkan aksi yang sudah selesai dilakukan pada hari ini (kue sudah dibuat), sehingga menggunakan bentuk Simple Past Tense yaitu 'made'." 
  },
{ 
  //No.25
  question: "How do you call your grandparents' daughter?", 
  //image: "images/p3_soal_25.jpg", 
  options: [ "Sister", "Aunt", "Cousin", "Niece" ], 
  answer: 1, rationale: "Anak perempuan dari kakek dan nenek (grandparents) adalah saudara perempuan dari orang tua kita, yang dalam bahasa Inggris disebut sebagai 'Aunt' (Bibi)." 
},
{ 
  //No.26
  question: "Sinonim dari kata Bonanza adalah ....", 
  image: "images/p3_soal_26.jpg", 
  options: [ "Perayaan", "Peternakan", "Daerah subur", "Sumber kesenangan" ], 
  answer: 3, rationale: "Menurut KBBI, Bonanza berarti sumber keuntungan atau kebahagiaan yang besar, sehingga pilihan 'Sumber kesenangan' adalah sinonim yang paling mendekati." 
},
{ 
  //No.27
  question: "Sinonim dari kata Zenit adalah ....", 
  //image: "images/p3_soal_27.jpg", 
  options: [ 
    "Langit", "Bintang", "Puncak", "Jenis batu" ], 
  answer: 2, rationale: "Zenit adalah titik di langit yang berada tepat di atas kepala pengamat, yang secara istilah berarti titik puncak atau posisi tertinggi." 
},
{ 
  //No.28
  question: "Sinonim dari kata Ekskavasi adalah ....", 
  //image: "images/p3_soal_28.jpg", 
  options: [ "Penggalian", "Tangga elevator", "Pertolongan", "Pengerukan" ], answer: 0, rationale: "Ekskavasi merupakan istilah teknis yang merujuk pada proses penggalian, khususnya dalam bidang arkeologi untuk menemukan benda bersejarah." 
},
{ 
  //No.29
  question: "Antonim dari kata Disabilitas adalah ....", 
  //image: "images/p3_soal_29.jpg", 
  options: [ "Tuli", "Buta", "Tuna", "Normal" ], answer: 3, rationale: "Disabilitas merujuk pada keterbatasan fisik atau mental, sehingga lawan kata (antonim) yang paling tepat dalam konteks ini adalah 'Normal'." },

{ 
  //NO.30
  question: "Antonim dari kata Baru adalah ....", 
  //image: "images/p3_soal_30.jpg", 
  options: [ "Lama", "Anyar", "Usang", "Basi" ], answer: 0, rationale: "Lawan kata atau antonim yang paling umum dan tepat untuk kata 'Baru' adalah 'Lama'." },

{ 
  //No.31
  question: "Antonim dari kata Muai adalah ....", 
  //image: "images/p3_soal_31.jpg", 
  options: [ "Panas", "Besar", "Panjang", "Susut" ], answer: 3, rationale: "Memuai berarti bertambah besar atau panjang karena panas, sedangkan lawan katanya adalah 'Susut' yang berarti berkurang atau mengecil." 
},
{ 
  //No.32
  question: "PRESIDEN : NEGARA =", 
  //image: "images/p3_soal_32.jpg", 
  options: [ "Rumah : atap", "Kepala : rambut", "Menteri : instruksi", "Ayah : keluarga" ], answer: 3, rationale: "Presiden adalah pemimpin atau kepala dari sebuah Negara, sebagaimana Ayah adalah pemimpin atau kepala dalam sebuah Keluarga." },

{ 
  //No.33
  question: "KUPU-KUPU : KATAK =", 
  //image: "images/p3_soal_33.jpg", 
  options: [ "Sapi : kerbau", "Ayam : sapi", "Kambing : burung", "Pesawat : kapal" ], answer: 0, rationale: "Kupu-kupu dan Katak memiliki kesamaan kategori sebagai hewan yang mengalami metamorfosis. Pasangan Sapi dan Kerbau dipilih karena keduanya memiliki kesamaan kategori yang sangat dekat, yaitu sesama hewan mamalia/ruminansia." },

{ 
  //No.34
  question: "OTONOMI : MANDIRI =", 
  //image: "images/p3_soal_34.jpg", 
  options: [ "Cerdas : banyak akal", "Bensin : mesin", "Sabun : mandi", "Masyarakat : rakyat" ], answer: 0, rationale: "Otonomi memiliki hubungan sinonim dengan Mandiri. Hubungan yang sama terdapat pada kata Cerdas yang bersinonim dengan Banyak akal." },

{ 
  //No.35
  question: "HEWAN : ... = MAKANAN : LONTONG", 
  //image: "images/p3_soal_35.jpg", 
  options: [ "Air", "Sarapan", "Kenyang", "Sapi" ], answer: 3, rationale: "Lontong adalah salah satu jenis dari Makanan. Dengan pola yang sama, Sapi adalah salah satu jenis dari Hewan." 
},
{ 
  //No.36
  question: "What is the synonym of produce?", 
  //image: "images/p3_soal_36.jpg", 
  options: [ "buy", "make", "sell", "find" ], answer: 1, rationale: "Kata 'produce' berarti menghasilkan atau membuat sesuatu, sehingga sinonim yang paling tepat adalah 'make'." },

{ 
  //No.37
  question: "What is the synonym of quit?", 
  //image: "images/p3_soal_37.jpg", 
  options: [ "fire", "accept", "stop", "hire" ], answer: 2, rationale: "Kata 'quit' berarti berhenti atau meninggalkan suatu aktivitas, yang memiliki arti yang sama dengan 'stop'." },

{ 
  //No.38
  question: "What is the synonym of increase?", 
  //image: "images/p3_soal_38.jpg", 
  options: [ "subtract", "remove", "decrease", "Grow" ], answer: 3, rationale: "Kata 'increase' berarti bertambah besar atau banyak, sehingga sinonim yang tepat adalah 'Grow'." },

{ 
  //No.39
  question: "What is the antonym of trust?", 
  //image: "images/p3_soal_39.jpg", 
  options: [ "think", "doubt", "understand", "believe" ], answer: 1, rationale: "Antonim atau lawan kata dari 'trust' (percaya) adalah 'doubt' (ragu atau sangsi)." },

{ 
  //No.40
  question: "What is the antonym of build?", 
  //image: "images/p3_soal_40.jpg", 
  options: [ "make", "destroy", "start", "create" ], answer: 1, rationale: "Kata 'build' berarti membangun, sehingga lawan kata (antonim) yang paling tepat adalah 'destroy' (menghancurkan)." },

{ 
  //NO.41
  question: "What is the antonym of let?", 
  //image: "images/p3_soal_41.jpg", 
  options: [ "clap", "deny", "laugh", "Allow" ], answer: 1, rationale: "Kata 'let' berarti membiarkan atau mengizinkan. Lawan kata yang tepat adalah 'deny' (menolak atau tidak mengizinkan)." },

{ 
  //NO.42
  question: "MOUNTAIN : HIGH", 
  //image: "images/p3_soal_42.jpg", 
  options: [ "river : ugly", "valley : low", "forest : lonely", "desert : wet" ], answer: 1, rationale: "Analogi ini menggunakan hubungan karakteristik: Gunung (mountain) bersifat tinggi (high). Maka, lembah (valley) bersifat rendah (low)." 
},
{ question: "TEACHER : EDUCATE =", 
  //image: "images/p3_soal_43.jpg", 
  options: [ "senator : represent", "lawyer : instruct", "coach : condemn", "priest : annoy"], answer: 0, rationale: "Hubungan analogi ini didasarkan pada profesi dan fungsi utamanya. Seorang Guru (Teacher) bertugas untuk Mendidik (Educate), sebagaimana seorang Senator bertugas untuk Mewakili (Represent)." },

{ question: "GOLD : EXPENSIVE =", 
  //image: "images/p3_soal_44.jpg", 
  options: [ "jewelry : dull", "cotton : beautiful", "silver : outrageous", "velvet : soft"], answer: 3, rationale: "Analogi ini menggunakan hubungan benda dan karakteristik khasnya. Emas (Gold) memiliki sifat Mahal (Expensive), sebagaimana Beludru (Velvet) memiliki sifat Lembut (Soft)." },

{ question: "MOTHER : FEMALE =", 
  //image: "images/p3_soal_45.jpg", 
  options: [ "vegetable : green", "snake : dangerous", "rock : hard", "tree : old"], answer: 2, rationale: "Analogi ini menunjukkan sifat atau kategori mutlak yang melekat pada subjek. Seorang Ibu (Mother) pastilah Perempuan (Female), sedangkan sebuah Batu (Rock) pastilah Keras (Hard)." 
},

  // --- MATEMATIKA (21-35) ---
  { 
    //No.46
    question: "Kemungkinan buku yang dibeli adalah ...", 
    //image: "images/p3_soal_46.jpg", 
    options: [ "Pulang dan Si Anak Kuat", "Berjuta Rasanya dan Pulang", "Rindu dan Pergi", "Pulang dan Pergi" ], 
    answer: 3, rationale: "Berdasarkan batasan harga pada teks referensi (yang biasanya menyertai soal AKM ini), kombinasi buku 'Pulang' dan 'Pergi' memiliki total harga yang sesuai dengan anggaran yang dimiliki pembeli." },

{ 
  //No.47
  question: "Jeni masih punya beberapa tabungan. Ia ingin membeli dengan judul yang berbeda. Judul buku yang mungkin dibeli oleh Jeni yaitu ...", 
  //image: "images/p3_soal_47.jpg", 
  options: [ "Si Anak Kuat dan Berjuta Rasanya", "Pulang dan Rindu", "Rindu dan Pergi", "Si Anak Kuat dan Pergi" ], answer: 0, rationale: "Pilihan A (Si Anak Kuat dan Berjuta Rasanya) merupakan kombinasi dua judul yang sesuai dengan sisa tabungan Jeni menurut daftar harga yang tersedia." 
},
{ question: "Nana, kakak Jeni, ingin membeli novel karya Tere Liye yang berjudul Pulang. Nana bisa membayar dengan sejumlah uang sebagai berikut:", 
  image: "images/p3_soal_48.jpg", 
  options: [ 
    "1 dan 2", "2 dan 3", "3 dan 4", "2 dan 4"] ,//Lembar uang Rp50.000, Rp20.000, dan Rp2.000 (Total Rp72.000)", 
    //"Lembar uang Rp50.000, Rp20.000, dan Rp5.000 (Total Rp75.000)", 
    //"Lembar uang Rp50.000, Rp10.000, dan Rp10.000 (Total Rp70.000)", 
    //"Satu lembar uang kertas khusus Rp75.000 (Total Rp75.000)" ], 
    answer: 3, 
    rationale: "Berdasarkan teks literasi mengenai daftar harga buku, novel 'Pulang' karya Tere Liye memiliki harga Rp75.000. Oleh karena itu, pilihan yang benar adalah kombinasi uang yang berjumlah tepat Rp75.000, yaitu pilihan kedua (Rp50.000 + Rp20.000 + Rp5.000) dan pilihan keempat (lembar uang Rp75.000)." }  ,
{
  question: "Seminggu kemudian Jeni membeli novel Tere Liye lagi dan mendapat diskon 20% setiap buku. Ia membeli tiga judul buku, yaitu Si Anak Kuat, Rindu, dan Pergi. Jeni membayar dengan uang dua lembar seratus ribuan. Berapa kembalian yang diterima Jeni?",
  //image: "images/p3_soal_49.jpg",
options: [
"Rp28.000",
"Rp32.000",
"Rp35.000",
"Rp40.000"
],
answer: 1,
rationale: "Berdasarkan harga wacana, harga buku Si Anak Kuat adalah Rp60.000, Rindu Rp75.000, dan Pergi Rp75.000. Total harga sebelum diskon adalah $60.000 + 75.000 + 75.000 = 210.000$. Setelah diskon 20%, harga menjadi $210.000 \times 0,8 = 168.000$. Dengan uang Rp200.000 (dua lembar seratus ribuan), kembaliannya adalah $200.000 - 168.000 = 32.000$."
},

{ 
  //No.50
  question: "Berdasarkan data berat buah (1 apel = 150 gram, 2 pisang = 180 gram, 5 rambutan = 125 gram, dan 3 jeruk = 360 gram), berapakah total berat dari kombinasi buah (1 jeruk, 1 apel, dan 4 buah rambutan)?", 
  //image: "images/p3_soal_50_full.jpg", 
  options: [ "430 gram", "370 gram", "450 gram", "480 gram" ], 
  answer: 1, rationale: "Berdasarkan data: berat 1 apel adalah 150 gram. Berat 1 jeruk adalah 120 gram (360 gram / 3). Berat 4 buah rambutan adalah 100 gram (karena 5 buah adalah 125 gram, maka 1 buah = 25 gram). Total perhitungan: 120 + 150 + 100 = 370 gram." 
},
{ question: "Angka yang menempati tempat puluhan adalah ...", 
  image: "images/p3_soal_51.jpg", 
  options: [ "Angka 8 pada kalium", "Angka 2 pada kalsium", "Angka 6 pada beta karoten", "Angka 8 pada vitamin A" ], 
  answer: 0, rationale: "Berdasarkan data nutrisi pepaya, angka puluhan pada kalium adalah 8 (karena Kalium = 182 mg); oleh karena itu jawaban yang paling tepat adalah pilihan pertama." 
},
{ question: "Berdasarkan wacana nutrisi buah pepaya, manakah pernyataan berikut yang benar?", 
  //image: "images/p3_soal_52.jpg", 
  options: [ "Buah pepaya memiliki kandungan nutrisi vitamin A lebih besar dari pada beta karoten.", "Kandungan nutrisi vitamin C pada buah pepaya sebesar 60-120 miligram.", "Kalium dan kalsium pada buah pepaya memiliki jumlah yang sama.", "Kandungan vitamin A pada buah pepaya sebesar 18,7-74,0 mikrogram." ], answer: 1, rationale: "Pilihan kedua benar karena teks menyebutkan kandungan Vitamin C pada pepaya sebesar 60-120 mg." 
},

{
question: "Anis memiliki rumah dengan denah yang terdiri atas 3 bagian, yaitu bagian A (5,5m x 4m), bagian B (4,5m x 3m), dan bagian C (2m x 3,5m). Ayah Ani ingin membeli keramik A (ukuran 25cm x 20cm) yang rencananya akan dipasang pada bagian C. Jika harga setiap keramik A adalah Rp8.700,-, berapa rupiah yang harus dibayar Ayah Ani untuk membeli keramik A tersebut?",
image: "images/p3_soal_53.jpg",
options: [
"Rp1.217.280,-",
"Rp1.217.500,-",
"Rp1.218.000,-",
"Rp1.220.000,-"],
answer: 2,
rationale: "Langkah pertama adalah menghitung luas bagian C yaitu $2\text{ m} \times 3,5\text{ m} = 7\text{ m}^2$ atau $70.000\text{ cm}^2$. Langkah kedua, hitung luas satu keramik A yaitu $25\text{ cm} \times 20\text{ cm} = 500\text{ cm}^2$. Jumlah keramik yang dibutuhkan adalah $70.000 / 500 = 140$ buah. Total biaya yang harus dibayar adalah $140 \times \text{Rp8.700} = \text{Rp1.218.000}$."
},
{
  //No.54
  question: "Berdasarkan denah rumah Anis, pasangkanlah luas bagian denah dengan jumlah keramik yang dibutuhkan secara tepat. Manakah pernyataan berikut yang benar?",
  //image: "images/p3_soal_54.jpg",
  options: ["Luas denah bagian A (22 m²) membutuhkan 1,4 keramik A","Luas denah bagian B (13,5 m²) membutuhkan 1,5 keramik B","Luas denah bagian C (7 m²) membutuhkan 4,4 keramik A","Luas dengan bagian A dan B (35,5 m²) membutuhkan 1,5 keramik B"],answer: 1,rationale: "Perhitungannya adalah: Untuk bagian B ($13,5\text{ m}^2$), jika menggunakan keramik B ($30\text{ cm} \times 30\text{ cm} = 0,09\text{ m}^2$), maka $13,5 / 0,09 = 150$ buah (tertulis 1,5 dalam ratusan). Untuk bagian A ($22\text{ m}^2$) dengan keramik A ($0,05\text{ m}^2$), butuh $22 / 0,05 = 440$ (seharusnya pasangannya 4,4). Untuk bagian C ($7\text{ m}^2$) dengan keramik A, butuh $7 / 0,05 = 140$ (seharusnya pasangannya 1,4)."
},
  {question: "Ibu Ani ingin memasang pagar bambu di sekeliling rumahnya dengan jarak setiap pagar 5 cm. Berdasarkan denah rumah Anis (Bagian A: 5,5m x 4m; Bagian B: 4,5m x 3m; Bagian C: 2m x 3,5m), berapa jumlah bambu yang harus dipersiapkan?",
    //image: "images/p3_soal_55.jpg",
    options: ["700 buah","701 buah","350 buah","750 buah"],answer: 0,rationale: "Keliling luar denah dihitung sebagai berikut: Sisi utara ($5,5 + 4,5 = 10\text{m}$), sisi timur ($3\text{m}$), bawah bagian B ($4,5\text{m}$), selisih tinggi A & B ($1\text{m}$), bawah bagian A ($3,5\text{m}$), sisi tegak C ($3,5\text{m} \times 2 = 7\text{m}$), bawah C ($2\text{m}$), dan sisi barat A ($4\text{m}$). Total keliling = $10 + 3 + 4,5 + 1 + 3,5 + 7 + 2 + 4 = 35\text{ meter}$ atau $3.500\text{ cm}$. Jumlah bambu = $3.500 / 5 = 700$ buah."
  },
  {question: "Pada bagian samping rumah yaitu pada bagian B (panjang 4,5m dan lebar 3m), Ibu Ani ingin meletakkan beberapa pot bunga dengan jarak 50 cm untuk setiap potnya. Berapa jumlah pot bunga yang harus disiapkan oleh Ibu Ani?",
    //image: "images/p3_soal_56.jpg",
    options: ["14 buah","15 buah","16 buah","20 buah"],answer: 1,rationale: "Bagian samping luar dari denah B terdiri dari sisi sepanjang 4,5 meter dan 3 meter. Total panjang sisi luar B adalah $4,5 + 3 = 7,5\text{ meter}$ atau $750\text{ cm}$. Dengan jarak antar pot 50 cm, maka jumlah pot yang dibutuhkan adalah $750 / 50 = 15$ buah."
  },
{question: "Jika diketahui persamaan akar pangkat tiga sebagai berikut: $\sqrt[3]{64} + \sqrt[3]{343} - \sqrt[3]{729} = n$ dan $\sqrt[3]{1728} : \sqrt[3]{64} = m$. Berapakah nilai hasil dari $m + n$?",
  image: "images/p3_soal_57.jpg",
  options: ["05","10","15","20"],answer: 0,rationale: "Pertama, cari nilai $n$: $\sqrt[3]{64}=4$, $\sqrt[3]{343}=7$, dan $\sqrt[3]{729}=9$. Maka $n = 4 + 7 - 9 = 2$. Kedua, cari nilai $m$: $\sqrt[3]{1728}=12$. Maka $m = 12 : 4 = 3$. Hasil dari $m + n$ adalah $3 + 2 = 5$."
},{
  question: "Banyaknya sisi dan rusuk pada bangun ruang kubus berturut-turut adalah...",
  //image: "images/p3_soal_58.jpg",
  options: ["8 dan 12","12 dan 6","6 dan 4","6 dan 12"],answer: 3,rationale: "Bangun ruang kubus memiliki karakteristik fisik yang terdiri dari 6 sisi berbentuk persegi yang kongruen dan 12 rusuk yang sama panjang."
},
{
  question: "Setiap naik 80 meter, suhu udara di luar pesawat akan turun 0,50 derajat Celsius. Jika ketinggian pesawat naik 2.400 meter, berapakah suhu udara di luar pesawat (asumsi titik awal 0°C)?",
  //image: "images/p3_soal_59.jpg",
  options: ["-15 °C","-19 °C","-30 °C","-49 °C"],answer: 0,rationale: "Hitung berapa kali kenaikan 80 meter terjadi: $2.400 / 80 = 30$ kali kenaikan. Total penurunan suhu adalah $30 \times 0,50 = 15$ derajat Celsius. Karena suhu turun, maka hasilnya adalah -15 °C."
},
{question: "Diberikan informasi pemegang kartu bilangan sebagai berikut: Budi (61%), Dinda (0,7), Ade (0,68), dan Yuda (5/9). Jika mereka diminta berdiri berurutan mulai dari yang memegang angka terkecil, maka urutannya adalah...",
  //image: "images/p3_soal_60.jpg",
  options: ["Yuda, Budi, Ade, Dinda","Dinda, Yuda, Budi, Ade","Budi, Dinda, Ade, Yuda","Yuda, Ade, Dinda, Budi"],answer: 0,rationale: "Konversi semua bilangan ke desimal: Yuda ($5/9 \approx 0,55$), Budi ($61\\% = 0,61$), Ade (0,68), dan Dinda ($0,7 = 0,70$). Urutan dari terkecil adalah 0,55 (Yuda), 0,61 (Budi), 0,68 (Ade), dan 0,70 (Dinda)."
},
  

  // --- IPA (36-55) ---
  { question: "Perhatikan daftar perubahan zat berikut:\n(1) Air menguap\n(2) Lilin meleleh\n(3) Rasa susu menjadi asam\n(4) Bom meledak\n(5) Nasi menjadi bubur\n(6) Besi berkarat\n(7) Kapur barus menguap\n(8) Kertas menjadi arang\n\nBerdasarkan daftar di atas, perubahan zat yang merupakan perubahan fisika dan perubahan kimia berturut-turut adalah nomor ....", 
    //image: "images/p3_soal_61.jpg", 
    options: [ "(1) dan (5)", "(2) dan (6)", "(3) dan (7)", "(4) dan (8)" ], 
    answer: 1, rationale: "Perubahan fisika ditunjukkan oleh nomor (2) lilin meleleh karena hanya terjadi perubahan wujud tanpa menghasilkan zat baru. Perubahan kimia ditunjukkan oleh nomor (6) besi berkarat karena terjadi reaksi oksidasi yang menghasilkan zat baru. Pilihan lain seperti (3), (4), dan (8) merupakan perubahan kimia, sedangkan (1), (5), dan (7) adalah perubahan fisika." 
  },

  { question: "Perhatikan gambar-gambar yang menunjukkan fenomena cahaya berikut:\n1. Terbentuknya pelangi di langit\n2. Pensil yang tampak patah saat dimasukkan ke dalam gelas berisi air\n3. Pembentukan bayangan tangan di dinding menggunakan cahaya senter\n\nSifat cahaya yang terdapat pada gambar di atas berturut-turut adalah ....", 
    image: "images/p3_soal_62.jpg", options: [ "dapat dibelokkan, dapat dipantulkan, dan dapat diserap", "merambat cepat, menembus benda bening, dan memiliki energi", "diuraikan, dapat dibiaskan, dan merambat lurus", "dapat dilihat, dapat dipolarisasikan, dan dapat diinterferensikan" ], answer: 2, rationale: "Berdasarkan prinsip optika: (1) Pelangi adalah contoh cahaya yang diuraikan (dispersi). (2) Pensil yang tampak patah terjadi karena pembiasan cahaya (refraksi) saat melewati dua medium berbeda (udara dan air). (3) Bayangan terbentuk karena cahaya merambat lurus sehingga terhalang oleh benda tidak tembus cahaya." 

  },

  { question: "Berdasarkan gambar tersebut, perubahan bentuk energi yang terjadi pada dinamo jika sepeda dikayuh adalah ....", 
    image: "images/p3_soal_63.jpg", options: [ "energi gerak → energi listrik → energi cahaya", "energi magnet → energi gerak → energi cahaya", "energi kimia → energi magnet → energi cahaya", "energi listrik → energi kimia → energi cahaya" ], answer: 0, rationale: "Proses perubahan energi pada sistem tersebut dimulai dari kayuhan sepeda yang menghasilkan energi gerak (kinetik). Dinamo kemudian mengubah energi gerak tersebut menjadi energi listrik, yang akhirnya diubah menjadi energi cahaya oleh lampu sepeda." 

  },
  { question: "Perhatikan tabel berikut!\n\n| No | Jenis batuan | Fungsi |\n| :--- | :--- | :--- |\n| 1 | Apung | Bahan baku kapur tulis |\n| 2 | Obsidian | Bahan perekat |\n| 3 | Kuarsa | Bahan baku kaca |\n| 4 | Granit | Bahan baku marmer |\n\nPernyataan pada tabel di atas yang tidak sesuai antara jenis batuan dengan fungsinya adalah nomor ....", 
    image: "images/p3_soal_64.jpg", options: [ "1", "2", "3", "4" ], answer: 2, rationale: "Berdasarkan ilmu geologi dasar: (1) Batu Apung digunakan untuk mengamplas/menghaluskan kayu. (2) Batu Obsidian digunakan untuk alat pemotong atau perhiasan. (3) Batu Kuarsa adalah bahan baku pembuatan kaca (Pernyataan ini Sesuai). (4) Batu Granit digunakan untuk bahan bangunan/lantai, bukan bahan baku marmer. Mengingat pilihan jawaban hanya tersedia satu nomor, kemungkinan terdapat kesalahan redaksi pada soal yang seharusnya menanyakan pernyataan yang 'Sesuai' (Nomor 3)." 

  },
  { question: "Adaptasi tumbuhan di atas terhadap lingkungan air adalah ....", 
    image: "images/p3_soal_65.jpg", options: [ "berdaun lebar, tipis, dan banyak stomata", "berdaun kecil, tipis, dan banyak stomata", "berdaun kecil, tebal, dan sedikit stomata", "berdaun lebar, akar lebat, dan kokoh" ], answer: 0, rationale: "Tumbuhan pada gambar adalah teratai, yang merupakan tumbuhan hidrofit (hidup di air). Adaptasi utama teratai terhadap lingkungan air meliputi daun yang lebar dan tipis untuk memudahkan penguapan air dan meningkatkan daya apung, serta memiliki banyak stomata di permukaan atas daunnya untuk memperlancar proses transpirasi di lingkungan lembap." 

  },
  { question: "Usaha yang paling tepat untuk memperbaiki fungsi hutan sebagai daerah resapan air yang telah rusak berdasarkan ilustrasi tersebut adalah ....", image: "images/p30_soal_66.jpg", options: [ "Penanaman berbagai jenis tumbuhan di hutan tersebut", "Menjadikan hutan sebagai daerah pemukiman warga", "Pemanfaatan tanaman kecil untuk bahan kerajinan", "Memanfaatkan hutan sebagai sumber kayu untuk industri kertas" ], answer: 0, rationale: "Ilustrasi menjelaskan hilangnya fungsi hutan sebagai daerah resapan air akibat pemanfaatan yang salah. Upaya perbaikan yang paling efektif adalah reboisasi atau penanaman kembali berbagai jenis tumbuhan (pilihan A) agar akar-akar pohon dapat kembali menyerap dan menahan air di dalam tanah." },

{ question: "Pernyataan berikut ini yang menunjukkan bukan merupakan tujuan dari perilaku hibernasi pada hewan adalah ....", 
  //image: "images/p3_soal_67.jpg", 
  options: [ "Menghemat energi karena ketersediaan makanan yang terbatas", "Menghindari pengaruh cuaca yang sangat dingin", "Menunggu datangnya musim kawin", "Mengurangi tingkat aktivitas selama musim tertentu" ], answer: 2, rationale: "Hibernasi adalah mekanisme adaptasi hewan untuk bertahan hidup di kondisi lingkungan ekstrem dengan cara menghemat energi, menghindari suhu dingin, dan meminimalisir aktivitas (pilihan A, B, dan D). Hibernasi tidak dilakukan dengan tujuan utama untuk menunggu datangnya musim kawin (pilihan C)." 
},
{
  question: "Perhatikan beberapa jenis penyakit berikut!\n1. Leukemia\n2. Anoreksia\n3. Pneumonia\n4. Thalasemia\n5. Hemophilia\n\nBerdasarkan daftar tersebut, penyakit yang berkaitan dengan sistem peredaran darah ditunjukkan oleh nomor ....",
  options: [
    "1, 2, dan 3",
    "1, 4, dan 5",
    "2, 3, dan 4",
    "3, 4, dan 5"
  ],
  answer: 1,
  rationale: "Penyakit yang menyerang sistem peredaran darah adalah Leukemia (kanker darah), Thalasemia (kelainan hemoglobin), dan Hemophilia (darah sulit membeku). Sedangkan Anoreksia adalah gangguan makan dan Pneumonia adalah infeksi pada paru-paru (sistem pernapasan)."
},
{ question: "Berikut ini adalah upaya-upaya manusia untuk mendukung pelestarian hutan, kecuali ....", 
  //image: "images/p3_soal_69.jpg", 
  options: [ "menggunakan kertas secara hemat", "membuang sampah pada tempatnya", "melaksanakan kegiatan reboisasi", "melakukan kegiatan tebang pilih" ], answer: 1, rationale: "Menghemat kertas, reboisasi, dan tebang pilih adalah upaya spesifik yang berhubungan langsung dengan pelestarian hutan dan keberadaan pohon. Membuang sampah pada tempatnya adalah perilaku terpuji untuk menjaga kebersihan lingkungan secara umum, namun bukan merupakan upaya spesifik pelestarian hutan dibandingkan pilihan lainnya." 

},

  // --- IPS (56-75) ---
  { question: "Contoh usaha yang bergerak di bidang distribusi adalah ....", 
    //image: "images/p3_soal_70.jpg", 
    options: [ "perusahaan asuransi, perusahaan penerbangan, dan pegadaian", "perusahaan tekstil, industri pembuat sepatu, dan penjahit pakaian", "toko buku, warung internet, dan pasar swalayan", "usaha pariwisata, restoran tradisional, dan perusahaan pembuat batik" ], answer: 2, rationale: "Distribusi adalah kegiatan menyalurkan barang atau jasa dari produsen ke konsumen. Toko buku dan pasar swalayan adalah contoh nyata unit usaha yang berfungsi menyalurkan barang jadi kepada pembeli/konsumen akhir." 
  },

{ question: "Kegiatan ekonomi yang merupakan kegiatan produksi ditunjukkan oleh nomor .... \n (1) Mengadakan pameran komputer \n (2) Mengekspor minyak \n (3) Menjual makanan di pasar \n (4) Membuat olahan kayu bekas menjadi mainan", 
  //image: "images/p3_soal_71.jpg", 
  options: [ "A. (1)", "B. (2)", "C. (3)", "D. (4)" ], answer: 3, rationale: "Produksi adalah kegiatan menghasilkan barang atau meningkatkan nilai guna suatu benda. Membuat olahan kayu bekas menjadi mainan (nomor 4) adalah aktivitas menciptakan barang baru yang memiliki nilai guna lebih tinggi." },

{ question: "Seseorang akan menanamkan modal dalam sebuah badan usaha yang berbentuk perseroan terbatas (PT). Orang tersebut harus membeli ....", 
  //image: "images/p3_soal_72.jpg", 
  options: [ "obligasi", "retribusi", "kuitansi", "saham" ], answer: 3, rationale: "Perseroan Terbatas (PT) adalah badan usaha yang modalnya terbagi atas saham-saham. Oleh karena itu, bukti kepemilikan atau penyertaan modal dalam PT dilakukan dengan cara membeli saham." 
},
{ question: "Daerah yang termasuk waktu Indonesia bagian tengah (WITA) adalah ....", 
  //image: "images/p3_soal_73.jpg", 
  options: [ "Kalimantan Timur, Bali, dan Lombok", "Kalimantan Barat, Sumatera, dan Jawa", "Sulawesi, Maluku, dan Irian Jaya", "Kalimantan Selatan, Nusa Tenggara, dan Irian Jaya" ], 
  answer: 0, 
  rationale: "Waktu Indonesia Tengah (WITA) mencakup wilayah Sulawesi, Bali, Nusa Tenggara (termasuk Lombok), serta Kalimantan Selatan, Timur, dan Utara. Pilihan B termasuk WIB (Sumatera, Jawa), sedangkan pilihan C dan D mencakup WIT (Maluku, Irian Jaya)." },

{ question: "Negara tetangga yang mempunyai batas landas kontinen dengan Indonesia adalah ....", 
  //image: "images/p3_soal_74.jpg", 
  options: [ "Kamboja, Australia, dan Philipina", "Brunei Darussalam, Malaysia, dan Singapura", "Philipina, Singapura, dan Malaysia", "Brunei Darussalam, Australia, dan Papua Nugini" ], 
  answer: 3, 
  rationale: "Indonesia memiliki perjanjian batas landas kontinen dengan India, Thailand, Malaysia, Vietnam, Papua Nugini, dan Australia. Berdasarkan pilihan yang tersedia, opsi D adalah yang paling mendekati karena mencantumkan Australia dan Papua Nugini sebagai negara yang berbatasan landas kontinen secara resmi dengan Indonesia." 
},

{ question: "Pemimpin perlawanan rakyat Makasar terhadap VOC yang dibantu oleh Karaeng Tallo adalah ....", 
  //image: "images/p3_soal_75.jpg", 
  options: [ "Sultan Salahuddin", "Sultan Hasanuddin", "Sultan Khairun", "Sultan Mughayat Syah" ], 
  answer: 1, 
  rationale: "Sultan Hasanuddin adalah Raja Gowa ke-16 yang memimpin perlawanan rakyat Makassar melawan VOC. Dalam perjuangannya, ia dibantu oleh Karaeng Tallo yang juga merupakan Mangkubumi Kerajaan Gowa-Tallo." 
},
  { question: "Bu Amirah memberikan tugas membuat karya dari bahan barang bekas kepada siswa kelas 6. Tugas tersebut diselesaikan secara kelompok. Setiap kelompok terdiri 5 anak yang telah ditentukan berdasarkan jarak rumah mereka. Hari Minggu Budi, Doni, dan Rian mengerjakan tugas kelompok dari bu Amirah di rumah Siti sejak pagi. Kelima anak tersebut beragama Islam. Mereka membuat vas bunga dari handuk bekas. Tak terasa waktu menunjukkan pukul 11 lebih 30 menit dan adzan Dhuhur berkumandang. Rumah Siti berdekatan dengan masjid. Tindakan yang seharusnya dilakukan oleh kelima anak tersebut adalah ....", 
    //image: "images/p3_soal_76.jpg", 
    options: [ "melanjutkan membuat vas bunga sampai selesai tanpa mempedulikan adzan Dhuhur.", "menghentikan membuat vas bunga dan menuju ke masjid untuk melaksanakan shalat Dhuhur.", "menghentikan membuat vas bunga dan pamit pulang ke rumah masing-masing untuk shalat Dhuhur." ], answer: 1, rationale: "Berdasarkan nilai religius dan sikap disiplin dalam beribadah, tindakan yang paling tepat bagi seorang Muslim saat mendengar adzan adalah segera menunaikan shalat. Mengingat posisi rumah Siti yang berdekatan dengan masjid, pilihan untuk shalat berjamaah di masjid merupakan tindakan yang paling utama sebelum melanjutkan tugas kelompok." 

  },
  {
    question: "Edo sering membuat masalah dengan memanggil teman-temannya menggunakan nama orang tua mereka. Suatu hari, Rani menangis karena perbuatan Edo. Ibu Dewi kemudian menasihati Edo dan memintanya meminta maaf kepada Rani. Tindakan yang tepat dilakukan Edo adalah ....",
    options: [
      "Edo meminta maaf kepada Rani dan berjanji untuk memanggil Rani sesuai dengan namanya.",
      "Edo meminta maaf kepada Rani dan berjanji untuk tidak memanggil nama Rani lagi.",
      "Rani tidak memaafkan Edo jika Edo terus memanggilnya dengan sebutan nama orang tua.",
      "Edo dan Rani saling meminta maaf karena sama-sama bersalah dan Edo memanggil Rani sesuai dengan namanya."
    ],
    answer: 0,
    rationale: "Sebagai pihak yang melakukan kesalahan (bullying), tindakan yang benar adalah mengakui kesalahan dengan meminta maaf secara tulus dan berjanji untuk memperbaiki perilaku tersebut dengan memanggil teman menggunakan nama yang semestinya."
  },
  {
    question: "Bu Intan sedang memimpin diskusi kelas untuk persiapan pameran karya siswa. Ira sebenarnya memiliki banyak karya lukisan di rumah, namun ia belum menyampaikan pendapatnya saat diskusi. Ketika Bu Intan bertanya siapa lagi yang memiliki ide atau pendapat, tindakan yang tepat dilakukan Ira adalah ....",
    options: [
      "diam saja dan bersikap masa bodoh karena tidak disebut namanya oleh Bu Intan.",
      "mengangkat tangan dan pura-pura menyampaikan ide untuk waktu pelaksanaannya.",
      "berbisik dengan teman sebangku dengan mengatakan kalau dirinya mempunyai karya berupa lukisan.",
      "Mengangkat tangan dan menyampaikan idenya kalau dia memiliki karya berupa lukisan."
    ],
    answer: 3,
    rationale: "Dalam sebuah diskusi, setiap anggota diharapkan berpartisipasi aktif. Karena Ira memiliki karya yang relevan untuk dipamerkan, tindakan yang paling tepat dan komunikatif adalah mengangkat tangan untuk berbicara dan menyampaikan kontribusi karyanya kepada forum."
  },
  {
    question: "Arga dan Fitri berniat bekerja sama saat ujian bahasa Indonesia. Lia menegur dan menasihati bahwa kerja sama hanya boleh dilakukan di luar ujian. Tindakan yang sebaiknya dilakukan Arga adalah ....",
    options: [
      "Menolak ajakan Lia karena berpegang teguh pada pendirian",
      "Mengikuti saran Lia untuk tidak bekerja sama diluar ujian",
      "Tetap bekerja sama dengan Lia atau teman sekelas lainnya",
      "Mengikuti saran Lia untuk tidak bekerja sama dengan Fitri"
    ],
    answer: 3,
    rationale: "Kejujuran adalah nilai utama dalam ujian. Arga sebaiknya mengikuti saran Lia untuk tidak bekerja sama atau menyontek agar nilai yang diperoleh merupakan hasil kerja keras sendiri."
  },
  {
    question: "Pada hari Selasa, kamu datang ke sekolah paling awal dan mendapati kelas kotor, padahal kamu bukan petugas piket hari itu. Tindakanmu yang tepat adalah ....",
    image: "images/p3_soal_80.jpg", 
    options: [
      "1 dan 2", //Memilih menunggu teman piket datang dan enggan membersihkan karena bukan jadwal piket",
      "2 dan 3", //Segera menghubungi teman yang bertugas piket di hari itu",
      "2 dan 4", //Membersihkan kelas sembari menunggu teman yang bertugas piket datang",
      "1 dan 5" //Meminta bantuan petugas kebersihan atau orang lain yang sudah hadir untuk membersihkan kelas"
    ],
    answer: 2,
    rationale: "Menunjukkan sikap inisiatif dan tanggung jawab terhadap kebersihan lingkungan sekolah. Membersihkan kelas tanpa menunggu petugas piket adalah tindakan yang proaktif sehingga pilihan '2 dan 4' paling tepat."
  },
  {
    question: "Fajar tidak masuk sekolah karena terlambat bangun akibat menonton konser musik. Sebagai teman sekolahnya, tindakan yang tepat dilakukan adalah ....",
    image: "images/p3_soal_81.jpg",
    options: [
      "1, 2, dan 3", //Menjenguk dan menasihatinya bahwa pendidikan lebih penting",
      "1, 2, dan 4", //Menjenguknya untuk mengetahui alasan tidak masuk sekolah",
      "1 dan 4", //Tidak menjenguknya karena sudah mengetahui bahwa dia anak tidak disiplin",
      "4"//Memberi tahu guru apabila sudah mengetahui alasan dia tidak masuk sekolah"
    ],
    answer: 0,
    rationale: "Sebagai teman, tindakan yang tepat adalah menjenguk, menasihati secara membangun, dan membantu memberikan keterangan yang jujur kepada guru (pilihan '1, 2, dan 3')."
  },
  {
    question: "Suatu sekolah memiliki aturan larangan rambut panjang bagi siswa laki-laki. Fandi ditegur guru untuk segera memotong rambutnya, padahal ia sangat menyukai model rambutnya yang mirip idolanya. Tindakan yang sebaiknya dilakukan Fandi adalah ....",
    options: [
      "Segera memotong rambutnya sepulang sekolah",
      "Menunggu sampai ditegur kembali, baru kemudian memotong rambutnya",
      "Mempertahankan gaya rambutnya yang panjang saat ini",
      "Membuat alasan agar dapat dimaklumi oleh guru"
    ],
    answer: 0,
    rationale: "Mematuhi tata tertib sekolah dan mengikuti arahan guru merupakan wujud kedisiplinan siswa, meskipun harus mengesampingkan keinginan pribadi terkait gaya rambut."
  },
  {
    question: "Terdapat bencana banjir di Kabupaten X yang melanda wilayah luas. Teman-teman mengajakmu membantu, namun akses jalan menuju lokasi terdampak sangat sulit. Tindakan yang tepat dilakukan adalah ....",
    image: "images/p3_soal_83.jpg",
    options: [
      "2 dan 3", //Meminta teman-teman menunda bantuan",
      "1 dan 2", //Mengirim bantuan melalui badan bantuan bencana",
      "2 dan 4", //Menjadi relawan dengan menyalurkan bantuan ke lokasi",
      "1 dan 3"//Mengikuti penggalangan dana dan menunda datang ke lokasi"
    ],
    answer: 3,
    rationale: "Ketika akses fisik sulit, menyalurkan bantuan melalui lembaga resmi atau berfokus pada penggalangan dana adalah cara yang paling efektif dan aman agar bantuan tetap sampai kepada yang membutuhkan (pilihan '1 dan 3')."
  },
  {
    question: "Ken mengajak Rino bermain game online saat mereka sedang mengerjakan tugas sekolah di internet, padahal ibu Rino sudah berpesan agar ia tidak bermain game. Tindakan yang harus dilakukan oleh Rino adalah ....",
    image: "images/p3_soal_84.jpg",
    options: [
      "1 dan 2", //Mengikuti ajakan Ken, karena game tersebut edisi terbaru",
      "3 dan 4", //Bermain sebentar untuk menghilangkan rasa bosan",
      "1 dan 4", //Menolak bermain game dan menyelesaikan tugasnya agar cepat selesai",
      "2 dan 4" //Memprioritaskan mengerjakan tugas setelah itu dapat bermain atas izin ibunya"
    ],
    answer: 1,
    rationale: "Sikap tanggung jawab terhadap tugas dan kepatuhan terhadap perintah orang tua harus diutamakan. Menolak bermain game dan menyelesaikan tugas adalah tindakan yang paling tepat (pilihan '1 dan 4')."
  },
  {
  question: "Murid-murid SDN Sidomulyo I sudah terbiasa untuk hidup bersih dan disiplin sehingga sekolah mereka tampak bersih dan indah. Ketika jam istirahat berbunyi, anak-anak dengan antusiasnya ke kantin untuk membeli makanan. Setelah makan, mereka tidak lupa membuang bungkus makanan ke tempat sampah yang ada di sekitar mereka. Kemudian saat jam istirahat usai, mereka masuk ke kelas dengan tertib dan siap untuk mengikuti pembelajaran dari guru dengan penuh semangat. Menurut kalian hal positif yang patut ditiru dari kebiasaan yang dilakukan murid di SDN Sidomulyo adalah....",
  image: "images/p3_soal_85.jpg",
  options: [
    "1, 2, 4",//Masuk ke dalam kelas dengan budaya antre",
    "1, 2, 3", //Semangat dalam belajar di sekolah",
    "1, 3, 4", //Membiarkan bungkus makanan berserakan",
    "4" //Membuang bungkus makanan ke tempat sampah"
  ],
  answer: 0,
  rationale: "Berdasarkan teks, terdapat beberapa perilaku positif yang ditunjukkan oleh murid-murid tersebut: menjaga kebersihan dengan membuang sampah pada tempatnya, bersikap disiplin dengan masuk kelas secara tertib, serta memiliki antusiasme dan semangat yang tinggi dalam mengikuti pembelajaran."
}
  ];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState(new Set());
  const [zoomedImage, setZoomedImage] = useState(null);

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
  <div className="mb-6 flex justify-center">
    <div 
      className="relative group cursor-zoom-in inline-block rounded-xl overflow-hidden border border-slate-100 bg-white p-2"
      onClick={() => setZoomedImage(q.image)}
    >
      <img 
        src={q.image} 
        alt="Visualisasi soal" 
        className="max-w-full h-auto max-h-[200px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105" 
      />
    </div>
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
  <div className="mb-8 flex justify-center">
    <div 
      className="relative group cursor-zoom-in inline-block rounded-2xl overflow-hidden border border-slate-200 bg-slate-100"
      onClick={() => setZoomedImage(q.image)}
    >
      <img 
        src={q.image} 
        alt={`Visualisasi Soal ${currentIdx + 1}`} 
        className="max-w-full h-auto object-contain max-h-[300px] transition-transform duration-300 group-hover:scale-105" 
      />
      {/* Overlay Ikon Kaca Pembesar saat Hover */}
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 flex items-center justify-center">
          <Search className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={32} />
      </div>
    </div>
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
      </div> {/* Ini adalah penutup div "max-w-3xl mx-auto" */}

      {/* --- TAMBAHKAN KOMPONEN MODAL ZOOM DI SINI (DI LUAR CONTAINER UTAMA) --- */}
      {zoomedImage && (
        // Overlay hitam transparan (fixed inset-0 bg-black/90 z-50)
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setZoomedImage(null)} // Klik di mana saja untuk menutup
        >
          {/* Container gambar agar tetap rapi */}
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
             <img 
               src={zoomedImage} 
               alt="Zoomed view" 
               className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
             />
             <p className="absolute bottom-4 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full">Klik di mana saja untuk menutup</p>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------------------- */}
    </div>
  );
}