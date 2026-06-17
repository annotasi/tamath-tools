import Link from "next/link";
import { Sparkles } from "lucide-react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/tools/guru/buat-soal", label: "Buat Soal" },
  { href: "/tools/guru/buat-lkpd", label: "Buat LKPD" },
  { href: "/tools/siswa/cek-jawaban", label: "Cek Jawaban" },
  { href: "/tentang", label: "Tentang" },
];

export function AppHeader() {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-black tracking-tight text-slate-950"
        >
          <span className="grid size-9 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-cyan-500/20">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span>TaMath by Annotasi</span>
        </Link>
        <nav className="flex flex-wrap gap-1 rounded-2xl border border-slate-200/80 bg-white/70 p-1 text-sm font-semibold text-slate-600 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 transition hover:bg-slate-950 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
