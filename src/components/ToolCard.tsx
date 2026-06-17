import Link from "next/link";
import type { Tool } from "@/data/tools";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-teal-700">
        Untuk {tool.audience}
      </p>
      <h2 className="text-xl font-semibold text-slate-950">{tool.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
      <Link
        href={tool.href}
        className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        {tool.cta}
      </Link>
    </article>
  );
}
