export type ToolAudience = "guru" | "siswa";

export type ToolSlug = "buat-soal" | "buat-lkpd" | "cek-jawaban";

export type Tool = {
  slug: ToolSlug;
  title: string;
  description: string;
  audience: ToolAudience;
  href: string;
  cta: string;
};

export const tools: Tool[] = [
  {
    slug: "buat-soal",
    title: "Buat Soal Matematika",
    description:
      "Susun draf soal matematika berdasarkan jenjang, kelas, topik, dan tingkat kesulitan.",
    audience: "guru",
    href: "/tools/guru/buat-soal",
    cta: "Buka tool soal",
  },
  {
    slug: "buat-lkpd",
    title: "Buat LKPD",
    description:
      "Buat kerangka LKPD matematika yang siap disalin dan dirapikan untuk kelas.",
    audience: "guru",
    href: "/tools/guru/buat-lkpd",
    cta: "Buka tool LKPD",
  },
  {
    slug: "cek-jawaban",
    title: "Cek Jawaban",
    description:
      "Bantu siswa meninjau jawaban matematika dengan umpan balik yang mudah dipahami.",
    audience: "siswa",
    href: "/tools/siswa/cek-jawaban",
    cta: "Buka cek jawaban",
  },
];

export function getToolBySlug(slug: ToolSlug) {
  return tools.find((tool) => tool.slug === slug);
}
