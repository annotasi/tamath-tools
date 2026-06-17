import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-teal-700">Tentang</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          TaMathTools by Annotasi
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          TaMathTools by Annotasi adalah website mini tools matematika untuk
          membantu guru dan siswa Indonesia membuat, meninjau, dan merapikan
          kebutuhan belajar matematika dengan bantuan AI.
        </p>
      </section>

      <div className="mt-8 grid gap-5">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Fokus MVP v0.1
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Fokus awal TaMathTools by Annotasi adalah tiga kebutuhan sederhana:
            membuat soal matematika, menyusun LKPD, dan membantu siswa mengecek
            jawaban. Semua hasil dirancang agar mudah dicopy dan dicetak.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Untuk Siapa Tools Ini
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Tools ini dibuat untuk guru yang ingin menyiapkan bahan ajar lebih
            cepat dan siswa yang ingin memahami proses jawaban matematika dengan
            arahan yang ramah.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Prinsip</h2>
          <ol className="mt-4 grid gap-3 text-slate-700">
            <li>1. No login untuk v0.1.</li>
            <li>2. No database untuk v0.1.</li>
            <li>3. Hasil AI harus diverifikasi.</li>
            <li>4. Dibuat untuk membantu, bukan menggantikan guru.</li>
          </ol>
        </section>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Kembali ke homepage
        </Link>
      </div>
    </div>
  );
}
