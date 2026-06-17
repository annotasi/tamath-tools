import { AI_DISCLOSURE } from "@/lib/prompts";
import { FileText } from "lucide-react";
import { CopyButton } from "./CopyButton";
import { PrintButton } from "./PrintButton";

type OutputPreviewProps = {
  title?: string;
  output?: string;
};

const defaultOutput = [
  "Hasil generate akan muncul di sini.",
  "",
  "Gunakan tombol salin untuk menyalin hasil, atau cetak untuk menyimpan sebagai PDF.",
  "",
  AI_DISCLOSURE,
].join("\n");

export function OutputPreview({
  title = "Pratinjau Output",
  output = defaultOutput,
}: OutputPreviewProps) {
  return (
    <section className="print-area overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-cyan-950/10 backdrop-blur">
      <div className="no-print flex flex-col gap-4 border-b border-slate-200/80 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-teal-100 text-teal-800">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-teal-700">
              Hasil
            </p>
            <h2 className="mt-1 text-lg font-black text-slate-950">{title}</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={output} />
          <PrintButton />
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <pre className="output-content min-h-80 whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-white p-5 font-sans text-sm leading-7 text-slate-800 shadow-inner shadow-slate-100">
          {output}
        </pre>
        <p className="print-brand mt-4 hidden text-xs text-slate-500">
          Dibuat dengan TaMath by Annotasi
        </p>
      </div>
    </section>
  );
}
