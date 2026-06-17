import Link from "next/link";
import type { Tool } from "@/data/tools";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  const isActive = tool.status === "active";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          Untuk {tool.audience}
        </p>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
          {isActive ? "Aktif" : "Segera hadir"}
        </span>
      </div>
      <h2 className="text-xl font-semibold text-slate-950">{tool.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
      <Link
        href={tool.href}
        aria-disabled={!isActive}
        className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 aria-disabled:pointer-events-none aria-disabled:bg-slate-300"
      >
        {isActive ? "Buka tool" : "Segera hadir"}
      </Link>
    </article>
  );
}
