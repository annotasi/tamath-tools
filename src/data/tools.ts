export type ToolAudience = "guru" | "siswa";

export type ToolId = "buat-soal-matematika" | "buat-lkpd" | "cek-jawaban";

export type ToolStatus = "active" | "soon";

export type Tool = {
  id: ToolId;
  title: string;
  href: string;
  audience: ToolAudience;
  description: string;
  status: ToolStatus;
};

export const tools: Tool[] = [
  {
    id: "buat-soal-matematika",
    title: "Buat Soal Matematika",
    href: "/tools/guru/buat-soal",
    audience: "guru",
    description:
      "Susun draf soal matematika berdasarkan jenjang, kelas, topik, dan tingkat kesulitan.",
    status: "active",
  },
  {
    id: "buat-lkpd",
    title: "Buat LKPD",
    href: "/tools/guru/buat-lkpd",
    audience: "guru",
    description:
      "Buat kerangka LKPD matematika yang siap disalin dan dirapikan untuk kelas.",
    status: "active",
  },
  {
    id: "cek-jawaban",
    title: "Cek Jawaban",
    href: "/tools/siswa/cek-jawaban",
    audience: "siswa",
    description:
      "Bantu siswa meninjau jawaban matematika dengan umpan balik yang mudah dipahami.",
    status: "active",
  },
];

export function getToolById(id: ToolId) {
  return tools.find((tool) => tool.id === id);
}
