import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCcw, Award, BookOpen, BarChart3, ListChecks, ArrowLeft, AlertCircle } from 'lucide-react';

const quizData = [
  {
    question: "Berdasarkan teks tentang Kebun Raya Bogor, apa yang menjadi identitas bangsa dan memberikan kontribusi pada pembangunan ekonomi global?",
    options: ["Variasi jenis tanamannya saja", "Sejarah Kebun Raya Bogor", "Pusat penelitian biologi tropis", "Penemuan ilmiah bidang botani"],
    answer: 1,
    rationale: "Teks menyatakan bahwa sejarah Kebun Raya Bogor menjadi identitas bangsa dan memberikan kontribusi pembangunan ekonomi global."
  },
  {
    question: "Ide pokok paragraf ketiga pada teks tersebut adalah ....",
    options: ["Penelitian tanaman domestik berbagai tanaman ekspor", "Kontribusi penemuan ilmiah Kebun Raya Bogor bagi kesejahteraan manusia", "Inovasi dalam bidang ekonomi pemerintah Belanda", "Agroindustri spesies eksotis kopi dan teh"],
    answer: 1,
    rationale: "Kalimat utama paragraf ketiga secara eksplisit membahas bagaimana penemuan ilmiah di Kebun Raya Bogor bermanfaat bagi kesejahteraan manusia."
  },
  {
    question: "Apa fungsi awal Kebun Raya Bogor menurut catatan sejarah dari laman kebunraya?",
    options: ["Pusat penelitian biologi tropis kelas dunia", "Kebun percobaan tanaman perkebunan", "Tempat rekreasi keluarga kerajaan Belanda", "Warisan nilai-nilai universal UNESCO"],
    answer: 1,
    rationale: "Dalam catatan sejarah, pada mulanya kebun ini hanya digunakan sebagai kebun percobaan tanaman perkebunan."
  },
  {
    question: "Pernyataan yang TIDAK sesuai dengan teks Kebun Raya Bogor adalah ....",
    options: ["Kebun Raya Bogor memiliki luas mencapai 87 hektar.", "Terdapat 15.000 jenis koleksi pohon dan tumbuhan.", "Kebun Raya Bogor hanya melestarikan jenis tanaman eksotis saja.", "Inovasi botani berkontribusi pada peningkatan kekayaan agroindustri Belanda."],
    answer: 2,
    rationale: "Teks menyebutkan pelestarian mencakup berbagai aspek alam dan botani secara luas, bukan hanya spesies eksotis saja."
  },
  {
    question: "Antonim dari kata 'domestik' pada kalimat 'penelitian tanaman domestik berbagai tanaman ekspor' adalah ....",
    options: ["Lokal", "Mancanegara", "Pedalaman", "Terpencil"],
    answer: 1,
    rationale: "Domestik berarti dalam negeri, sehingga lawan katanya adalah mancanegara atau luar negeri."
  },
  {
    question: "Sebuah foto berukuran 3 cm x 4 cm akan diperbesar 5 kali. Perbandingan luas foto sebelum dan sesudah diperbesar adalah ....",
    options: ["1 : 5", "1 : 25", "1 : 10", "25 : 1"],
    answer: 1,
    rationale: "Perbandingan luas sebanding dengan kuadrat faktor skala panjang. Jika sisi diperbesar 5 kali, maka luas diperbesar 5² = 25 kali. Perbandingannya 1 : 25."
  },
  {
    question: "Perbandingan banyaknya kelereng Joko dan Zaki adalah 4 : 6. Bila jumlah kelereng mereka adalah 80, maka banyaknya kelereng Zaki adalah ....",
    options: ["32 buah", "48 buah", "60 buah", "24 buah"],
    answer: 1,
    rationale: "Jumlah bagian = 4 + 6 = 10. Kelereng Zaki = (6 / 10) * 80 = 48 buah."
  },
  {
    question: "Sumpah Palapa yang diucapkan oleh Patih Gajah Mada bertujuan untuk ....",
    options: ["Membangun candi terbesar di dunia", "Menyatukan seluruh Nusantara di bawah Majapahit", "Mengusir penjajah Belanda dari tanah Jawa", "Menyebarkan agama Islam ke berbagai pulau"],
    answer: 1,
    rationale: "Gajah Mada bersumpah tidak akan menikmati kesenangan dunia sebelum berhasil menyatukan wilayah Nusantara."
  },
  {
    question: "UNESCO menetapkan Wayang Kulit sebagai karya agung warisan budaya dunia pada tahun ....",
    options: ["2001", "2003", "2005", "2009"],
    answer: 1,
    rationale: "UNESCO memberikan pengakuan resmi kepada Wayang Kulit Indonesia pada 7 November 2003."
  },
  {
    question: "Jenis sendi yang memungkinkan gerakan berputar pada bagian leher adalah ....",
    options: ["Sendi engsel", "Sendi putar", "Sendi peluru", "Sendi pelana"],
    answer: 1,
    rationale: "Sendi putar memungkinkan satu tulang melakukan rotasi terhadap tulang lainnya, seperti yang terjadi pada tulang leher."
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

  // UI untuk Review Jawaban Salah
  if (showResult && showReview) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => setShowReview(false)}
            className="mb-6 flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} /> Kembali ke Skor
          </button>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <BookOpen className="text-blue-600" /> Review Materi Penting
            </h1>
            <p className="text-slate-500 mt-2">Pelajari kembali soal-soal yang belum tepat atau terlewatkan.</p>
          </div>

          <div className="space-y-6">
            {finalStats.wrongIndices.map((idx) => {
              const q = quizData[idx];
              const isSkipped = userAnswers[idx] === undefined;
              
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                      Soal #{idx + 1}
                    </span>
                    {isSkipped ? (
                        <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg flex items-center gap-1">
                            <AlertCircle size={12} /> Tidak Diisi
                        </span>
                    ) : (
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg flex items-center gap-1">
                            <XCircle size={12} /> Salah
                        </span>
                    )}
                  </div>
                  
                  <p className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">
                    {q.question}
                  </p>
                  
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
                          <span className="flex gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-[10px] font-black border ${isCorrect ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-300 border-slate-200'}`}>
                                {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                          </span>
                          {isCorrect && <CheckCircle size={18} />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Penjelasan Ahli</p>
                    <p className="text-sm text-slate-700 leading-relaxed italic">{q.rationale}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            onClick={resetQuiz}
            className="mt-10 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl"
          >
            <RotateCcw size={20} /> Mulai Ulang Simulasi
          </button>
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
            <div className="text-6xl font-black text-blue-600">
              {Math.round((finalStats.correct / quizData.length) * 100)}
            </div>
            <div className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest text-[10px]">Nilai Akhir</div>
          </div>
          
          <div className="flex flex-col gap-3">
            {finalStats.wrongIndices.length > 0 && (
                <button 
                onClick={() => setShowReview(true)}
                className="w-full bg-blue-100 text-blue-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-200 transition-all"
                >
                <BookOpen size={20} /> Review Jawaban Salah
                </button>
            )}
            
            <button 
                onClick={resetQuiz}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg"
            >
                <RotateCcw size={20} /> Coba Lagi
            </button>
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
        {/* Header */}
        <div className="flex justify-between items-start mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">Paket Latihan 3</h2>
            <h1 className="text-lg font-bold">Ujian Seleksi SMP</h1>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Soal Ke</p>
              <p className="text-sm font-black text-slate-700">{currentIdx + 1} / {quizData.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-blue-100 flex items-center justify-center">
                <span className="text-[10px] font-bold text-blue-600">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className="p-6 md:p-10">
            <p className="text-xl font-semibold leading-relaxed mb-10 text-slate-800">
              {q.question}
            </p>

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
                  btnClass += isSelected 
                    ? "border-blue-600 bg-blue-50 text-blue-800 font-bold shadow-md transform scale-[1.02]" 
                    : "border-slate-100 hover:border-blue-200 hover:bg-slate-50";
                }

                return (
                  <button key={i} onClick={() => handleAnswer(i)} className={btnClass} disabled={isChecked}>
                    <span className="flex gap-4 items-center">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black border-2 transition-colors ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-100 group-hover:border-blue-200'}`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </span>
                    {isChecked && isCorrect && <CheckCircle className="text-green-600" size={24} />}
                    {isChecked && isSelected && !isCorrect && <XCircle className="text-red-600" size={24} />}
                  </button>
                );
              })}
            </div>

            {isChecked && (
              <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2 text-slate-500 mb-3 font-black uppercase text-[10px] tracking-widest">
                  <BarChart3 size={14} /> Analisis Jawaban
                </div>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">
                  {q.rationale}
                </p>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex justify-between items-center">
            <button 
              disabled={currentIdx === 0}
              onClick={() => navigateTo(currentIdx - 1)}
              className="px-5 py-3 text-slate-500 hover:text-slate-800 disabled:opacity-20 flex items-center gap-2 font-bold transition-all"
            >
              <ChevronLeft size={20} /> <span className="hidden sm:inline">Kembali</span>
            </button>

            <div className="flex gap-3">
                {!isChecked && userAnswers[currentIdx] !== undefined && (
                <button 
                    onClick={toggleCheck}
                    className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2"
                >
                    <ListChecks size={18} /> Cek
                </button>
                )}

                <button 
                onClick={() => {
                    if (currentIdx < quizData.length - 1) {
                        navigateTo(currentIdx + 1);
                    } else {
                        setShowResult(true);
                    }
                }}
                className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-200"
                >
                {currentIdx < quizData.length - 1 ? 'Lanjut' : 'Selesai'} <ChevronRight size={20} />
                </button>
            </div>
          </div>
        </div>
        
        {/* Status indicator for all questions */}
        <div className="flex flex-wrap gap-2 justify-center mt-4">
            {quizData.map((_, idx) => (
                <div 
                    key={idx}
                    onClick={() => navigateTo(idx)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black cursor-pointer transition-all border-2
                        ${currentIdx === idx ? 'border-blue-600 scale-110 shadow-sm' : 'border-transparent'}
                        ${userAnswers[idx] !== undefined ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'}
                    `}
                >
                    {idx + 1}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}