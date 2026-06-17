import { OutputPreview } from "@/components/OutputPreview";
import { buildPlaceholderOutput } from "@/lib/prompts";

export default function CheckAnswerPage() {
  const output = buildPlaceholderOutput("cek-jawaban", "Persamaan Linear");

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-teal-700">Tool Siswa</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          Cek Jawaban
        </h1>
        <form className="no-print mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Soal
            <textarea
              className="min-h-28 rounded-md border border-slate-300 px-3 py-2"
              placeholder="Tulis soal matematika di sini."
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Jawaban siswa
            <textarea
              className="min-h-28 rounded-md border border-slate-300 px-3 py-2"
              placeholder="Tulis jawaban yang ingin dicek."
            />
          </label>
          <button
            type="button"
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
          >
            Cek placeholder
          </button>
        </form>
      </section>
      <OutputPreview title="Hasil Cek Jawaban" output={output} />
    </div>
  );
}
