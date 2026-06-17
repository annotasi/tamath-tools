import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  LucideIcon,
  PenLine,
} from "lucide-react";
import type { Tool } from "@/data/tools";

type ToolCardProps = {
  tool: Tool;
};

const toolIcons: Record<Tool["id"], LucideIcon> = {
  "buat-soal-matematika": PenLine,
  "buat-lkpd": FileText,
  "cek-jawaban": ClipboardCheck,
};

const toolAccent: Record<Tool["audience"], string> = {
  guru: "from-emerald-400 to-cyan-400 shadow-emerald-500/20",
  siswa: "from-amber-300 to-rose-300 shadow-amber-500/20",
};

export function ToolCard({ tool }: ToolCardProps) {
  const isActive = tool.status === "active";
  const Icon = toolIcons[tool.id];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-5 shadow-sm shadow-slate-200/80 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-900/10">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${toolAccent[tool.audience]} text-slate-950 shadow-lg`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
          {isActive ? "Aktif" : "Segera hadir"}
        </span>
      </div>
      <p className="mt-5 text-xs font-black uppercase tracking-wide text-teal-700">
        Untuk {tool.audience}
      </p>
      <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
        {tool.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {tool.description}
      </p>
      <Link
        href={tool.href}
        aria-disabled={!isActive}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:bg-teal-700 aria-disabled:pointer-events-none aria-disabled:bg-slate-300"
      >
        {isActive ? "Buka tool" : "Segera hadir"}
        {isActive ? (
          <ArrowRight
            className="size-4 transition group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        ) : null}
      </Link>
    </article>
  );
}
