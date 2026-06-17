import { AI_DISCLOSURE } from "@/lib/prompts";
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
    <section className="print-area rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="no-print flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Hasil
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={output} />
          <PrintButton />
        </div>
      </div>
      <div className="p-5">
        <pre className="output-content whitespace-pre-wrap break-words rounded-md bg-slate-50 p-4 font-sans text-sm leading-6 text-slate-800">
          {output}
        </pre>
        <p className="print-brand mt-4 hidden text-xs text-slate-500">
          Dibuat dengan TaMathTools by Annotasi
        </p>
      </div>
    </section>
  );
}
