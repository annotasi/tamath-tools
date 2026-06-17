import Link from "next/link";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/tools/guru/buat-soal", label: "Buat Soal" },
  { href: "/tools/guru/buat-lkpd", label: "Buat LKPD" },
  { href: "/tools/siswa/cek-jawaban", label: "Cek Jawaban" },
  { href: "/tentang", label: "Tentang" },
];

export function AppHeader() {
  return (
    <header className="no-print border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-950">
          TaMathTools by Annotasi
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm text-slate-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
