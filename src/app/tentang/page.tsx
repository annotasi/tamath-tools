import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-14">
      <section className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur sm:p-8">
        <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-black text-teal-700">
          Tentang
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          TaMath by Annotasi
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          TaMath by Annotasi adalah website mini tools matematika untuk
          membantu guru dan siswa Indonesia membuat, meninjau, dan merapikan
          kebutuhan belajar matematika dengan bantuan AI.
        </p>
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
          <span className="grid size-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-800">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-black text-slate-950">
            Fokus MVP v0.1
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Fokus awal TaMath by Annotasi adalah tiga kebutuhan sederhana:
            membuat soal matematika, menyusun LKPD, dan membantu siswa mengecek
            jawaban. Semua hasil dirancang agar mudah dicopy dan dicetak.
          </p>
        </section>

        <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
          <span className="grid size-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-black text-slate-950">
            Untuk Siapa Tools Ini
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Tools ini dibuat untuk guru yang ingin menyiapkan bahan ajar lebih
            cepat dan siswa yang ingin memahami proses jawaban matematika dengan
            arahan yang ramah.
          </p>
        </section>

        <section className="rounded-3xl border border-white/80 bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/10">
          <h2 className="text-xl font-black">Prinsip</h2>
          <ol className="mt-4 grid gap-3 text-sm text-slate-200">
            {[
              "No login untuk v0.1.",
              "No database untuk v0.1.",
              "Hasil AI harus diverifikasi.",
              "Dibuat untuk membantu, bukan menggantikan guru.",
            ].map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-black text-cyan-100">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-xl shadow-slate-900/15 transition hover:bg-teal-700"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke homepage
        </Link>
      </div>
    </div>
  );
}
