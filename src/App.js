import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCcw, Award, BookOpen, BarChart3, ListChecks, ArrowLeft, AlertCircle,
  Search
 } from 'lucide-react';

// Seluruh data soal Paket 3 (75 Soal)
const quizData = [
  // --- BAHASA INDONESIA (1-10) ---
[
  {
question: "Bacalah ilustrasi di bawah ini!\n\nAndi akan berulang tahun yang ke-11 pada hari Sabtu. Andi akan mengadakan pesta ulang tahun di rumahnya. Andi mengundang teman-temannya untuk menghadiri pesta ulang tahunnya. Andi juga meminta Asep untuk menjadi pembawa acara pada pesta ulang tahunnya.\n\nUndangan ulang tahun yang tepat berdasarkan ilustrasi di atas adalah...",
image: "images/soal_2.jpg",
options: [
  "Teman-teman aku besok ulang tahun. Datang ya ke pesta ulang tahunku.",
  "Halo teman-teman, hari Sabtu depan aku ulang tahun datang ya ke rumahku.",
  "Hai Andi nanti jangan lupa ya datang ke pesta ulang tahunku hari Sabtu depan!",
  "Hai teman, teman kita Andi mengadakan pesta ulang tahun di rumahnya, datang ya."
],
answer: null,
rationale: null
}
]
  


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