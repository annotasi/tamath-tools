export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-teal-700">Tentang</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-950">
        TaMathTools by Annotasi
      </h1>
      <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
        <p>
          TaMathTools by Annotasi adalah website no-login dan no-database untuk
          membantu guru dan siswa Indonesia menggunakan mini tools matematika
          secara ringan dan praktis.
        </p>
        <p>
          Fokus MVP v0.1 adalah Buat Soal Matematika, Buat LKPD, dan Cek
          Jawaban. Hasil dari tools dirancang agar mudah disalin dan dicetak
          melalui fitur print browser.
        </p>
      </div>
    </div>
  );
}
