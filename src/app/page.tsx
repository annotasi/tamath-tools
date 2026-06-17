import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { Bot, CheckCircle2, GraduationCap, Sparkles, UserRoundX } from "lucide-react";

export default function HomePage() {
  const teacherTools = tools.filter((tool) => tool.audience === "guru");
  const studentTools = tools.filter((tool) => tool.audience === "siswa");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 lg:gap-16 lg:py-14">
      <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
        <div>
          <div className="flex flex-wrap gap-2">
            {["MVP v0.1", "No login", "AI-assisted", "by Annotasi"].map(
              (badge) => (
                <span
                  key={badge}
                  className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-sm font-bold text-slate-700 shadow-sm"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
          <h1 className="mt-6 max-w-2xl text-2xl font-black tracking-tight text-slate-950 sm:text-2xl">
            TaMath by Annotasi untuk belajar matematika yang lebih ringan.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Buat soal, susun LKPD, dan cek jawaban matematika dengan bantuan AI.
            Hasil tetap mudah disalin, dicetak, dan diverifikasi sebelum
            digunakan.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#untuk-guru"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition hover:bg-teal-700"
            >
              Mulai untuk guru
            </a>
            <a
              href="#untuk-siswa"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-teal-200 hover:bg-teal-50"
            >
              Cek jawaban siswa
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-2xl shadow-cyan-950/10 backdrop-blur">
          <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-200">
                  Ruang kerja cepat
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Draft bahan ajar tanpa ribet
                </h2>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                {
                  icon: GraduationCap,
                  title: "Guru",
                  text: "Soal dan LKPD siap disalin.",
                },
                {
                  icon: Bot,
                  title: "AI-assisted",
                  text: "Bantu menyusun draft lebih cepat.",
                },
                {
                  icon: UserRoundX,
                  title: "No login",
                  text: "Langsung pakai untuk v0.1.",
                },
                {
                  icon: CheckCircle2,
                  title: "Verifikasi",
                  text: "Disclaimer AI selalu tersedia.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-cyan-200 text-slate-950">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-slate-300">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="untuk-guru" className="grid gap-5 scroll-mt-24">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">
            Untuk Guru
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Siapkan kelas dengan draft yang rapi.
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Tools untuk membuat bahan ajar matematika yang mudah disalin,
            disesuaikan, dan dicetak.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {teacherTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section id="untuk-siswa" className="scroll-mt-24">
        <p className="text-sm font-black uppercase tracking-wide text-rose-700">
          Untuk Siswa
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Pahami langkah jawaban dengan arahan ramah.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Cek proses pengerjaan dan dapatkan umpan balik yang mudah dipahami.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studentTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
