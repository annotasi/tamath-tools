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
    <section className="print-area rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="no-print mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={output} />
          <PrintButton />
        </div>
      </div>
      <pre className="whitespace-pre-wrap break-words rounded-md bg-slate-50 p-4 font-sans text-sm leading-6 text-slate-800">
        {output}
      </pre>
    </section>
  );
}
