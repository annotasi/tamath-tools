import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";

export default function HomePage() {
  const teacherTools = tools.filter((tool) => tool.audience === "guru");
  const studentTools = tools.filter((tool) => tool.audience === "siswa");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:py-14">
      <section className="max-w-4xl">
        <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800">
          MVP v0.1
        </span>
        <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Tools matematika sederhana untuk guru dan siswa.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Buat soal, susun LKPD, dan cek jawaban matematika dengan bantuan AI.
          Tetap guru dan pengguna yang memverifikasi hasil akhirnya.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Tidak perlu login. Tidak perlu database.
        </p>
      </section>

      <section className="grid gap-5">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Untuk Guru</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {teacherTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Untuk Siswa</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studentTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
