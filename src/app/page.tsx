import { OutputPreview } from "@/components/OutputPreview";
import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-teal-700">MVP v0.1</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          TaMathTools by Annotasi
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Website sederhana berisi mini tools matematika untuk membantu guru
          membuat soal, membuat LKPD, dan membantu siswa mengecek jawaban.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </section>

      <OutputPreview title="Contoh format hasil" />
    </div>
  );
}
