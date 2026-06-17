import type { ToolSlug } from "@/data/tools";

export const AI_DISCLOSURE =
  "Hasil dibuat dengan bantuan AI. Mohon verifikasi kembali sebelum digunakan.";

export const promptGuides: Record<ToolSlug, string> = {
  "buat-soal":
    "Buat soal matematika berbahasa Indonesia yang jelas, bertahap, dan sesuai konteks kelas.",
  "buat-lkpd":
    "Buat LKPD matematika berbahasa Indonesia dengan tujuan, kegiatan, pertanyaan, dan refleksi.",
  "cek-jawaban":
    "Cek jawaban siswa secara ramah, jelaskan letak benar/salahnya, dan berikan arahan belajar.",
};

export function buildPlaceholderOutput(tool: ToolSlug, topic: string) {
  const safeTopic = topic.trim() || "topik matematika";

  return [
    `Judul: Draft ${safeTopic}`,
    "",
    promptGuides[tool],
    "",
    "Bagian 1: Tujuan",
    `- Membantu pengguna memahami ${safeTopic} secara bertahap.`,
    "",
    "Bagian 2: Konten Placeholder",
    "- Integrasi OpenAI belum diaktifkan pada tahap struktur dasar ini.",
    "- Respons ini berasal dari API route placeholder.",
    "",
    AI_DISCLOSURE,
  ].join("\n");
}
