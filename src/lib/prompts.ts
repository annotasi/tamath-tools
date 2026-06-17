import type {
  CheckAnswerPayload,
  CreateQuestionPayload,
  CreateWorksheetPayload,
} from "@/lib/validation";

export const AI_DISCLOSURE =
  "Hasil dibuat dengan bantuan AI. Mohon verifikasi kembali sebelum digunakan.";

export type GenerateTool = "buat-soal" | "buat-lkpd" | "cek-jawaban";

function formatPayload(payload: unknown) {
  try {
    return JSON.stringify(payload, null, 2);
  } catch {
    return String(payload);
  }
}

function buildBaseInstruction(audience: string) {
  const audienceInstruction =
    audience === "guru"
      ? "Untuk guru, hasil harus siap diedit dan digunakan di kelas."
      : "Untuk siswa, bantu memahami konsep, jangan hanya memberi jawaban akhir.";

  return [
    "Kamu adalah asisten pendidikan matematika dari TaMathTools by Annotasi.",
    "Gunakan bahasa Indonesia yang jelas, ramah, dan sesuai konteks pendidikan Indonesia.",
    audienceInstruction,
    "Jangan mengklaim hasil pasti sempurna.",
    `Selalu akhiri output dengan catatan persis berikut: "${AI_DISCLOSURE}"`,
  ].join("\n");
}

export function buildPrompt(
  tool: string,
  audience: string,
  payload: unknown,
): string {
  const formattedPayload = formatPayload(payload);
  const baseInstruction = buildBaseInstruction(audience);

  if (tool === "buat-soal") {
    return [
      baseInstruction,
      "",
      "Tugas: Buat paket soal matematika berdasarkan payload berikut.",
      "",
      "Payload:",
      formattedPayload,
      "",
      "Format output wajib:",
      "1. Judul",
      "2. Informasi soal",
      "3. Daftar soal",
      "4. Kunci jawaban",
      "5. Pembahasan jika diminta",
      "6. Catatan untuk guru",
      "",
      "Instruksi khusus:",
      "- Sesuaikan jumlah soal, jenjang, kelas, materi, bentuk soal, dan tingkat kesulitan dengan payload.",
      "- Jika bentuk soal Pilihan Ganda, sertakan opsi jawaban yang wajar.",
      "- Jika pembahasan tidak diminta, tetap berikan kunci jawaban tanpa pembahasan panjang.",
      "- Buat output mudah dicopy dan siap dicetak.",
    ].join("\n");
  }

  if (tool === "buat-lkpd") {
    return [
      baseInstruction,
      "",
      "Tugas: Buat LKPD matematika berdasarkan payload berikut.",
      "",
      "Payload:",
      formattedPayload,
      "",
      "Format output wajib:",
      "1. Judul LKPD",
      "2. Identitas",
      "3. Tujuan pembelajaran",
      "4. Petunjuk pengerjaan",
      "5. Aktivitas siswa",
      "6. Pertanyaan pemantik",
      "7. Latihan",
      "8. Refleksi",
      "9. Panduan singkat untuk guru",
      "",
      "Instruksi khusus:",
      "- Sesuaikan aktivitas dengan jenjang, kelas, materi, durasi pembelajaran, model pembelajaran, dan jumlah aktivitas.",
      "- Gunakan instruksi yang praktis untuk kelas Indonesia.",
      "- Buat LKPD siap diedit guru dan mudah dicetak.",
    ].join("\n");
  }

  if (tool === "cek-jawaban") {
    return [
      baseInstruction,
      "",
      "Tugas: Tinjau jawaban matematika siswa berdasarkan payload berikut.",
      "",
      "Payload:",
      formattedPayload,
      "",
      "Format output wajib:",
      "1. Ringkasan",
      "2. Bagian yang sudah benar",
      "3. Bagian yang perlu diperbaiki",
      "4. Petunjuk/hint",
      "5. Pembahasan singkat jika diperlukan",
      "",
      "Instruksi khusus:",
      "- Jangan menghakimi siswa.",
      "- Jelaskan bagian yang sudah benar terlebih dahulu.",
      "- Tunjukkan bagian yang perlu diperbaiki dengan bahasa suportif.",
      "- Sesuaikan petunjuk atau pembahasan dengan gaya bantuan pada payload.",
      "- Jika gaya bantuan adalah 'Beri hint dulu', prioritaskan hint dan jangan langsung membuka seluruh jawaban kecuali diperlukan.",
      "- Bantu siswa memahami konsep, bukan sekadar memberi jawaban akhir.",
    ].join("\n");
  }

  return [
    baseInstruction,
    "",
    "Tugas: Bantu pengguna berdasarkan payload berikut.",
    "",
    "Payload:",
    formattedPayload,
    "",
    "Buat output yang rapi, mudah dicopy, dan sesuai konteks matematika.",
  ].join("\n");
}

export const promptGuides: Record<GenerateTool, string> = {
  "buat-soal":
    "Buat soal matematika berbahasa Indonesia yang jelas, bertahap, dan sesuai konteks kelas.",
  "buat-lkpd":
    "Buat LKPD matematika berbahasa Indonesia dengan tujuan, kegiatan, pertanyaan, dan refleksi.",
  "cek-jawaban":
    "Cek jawaban siswa secara ramah, jelaskan letak benar/salahnya, dan berikan arahan belajar.",
};

export function buildPlaceholderOutput(tool: GenerateTool, topic: string) {
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

export function buildCreateQuestionPlaceholderOutput(
  payload: CreateQuestionPayload,
) {
  const pembahasan = payload.sertakanPembahasan
    ? "Disertai pembahasan singkat."
    : "Tanpa pembahasan.";

  return [
    `Judul: Soal ${payload.materi} Kelas ${payload.kelas} ${payload.jenjang}`,
    "",
    `Jenjang: ${payload.jenjang}`,
    `Kelas: ${payload.kelas}`,
    `Materi: ${payload.materi}`,
    `Jumlah soal: ${payload.jumlahSoal}`,
    `Bentuk soal: ${payload.bentukSoal}`,
    `Tingkat kesulitan: ${payload.tingkatKesulitan}`,
    `Pembahasan: ${pembahasan}`,
    "",
    "Contoh output placeholder:",
    `1. (${payload.bentukSoal}) Contoh soal ${payload.materi} dengan tingkat ${payload.tingkatKesulitan.toLowerCase()}.`,
    payload.sertakanPembahasan
      ? "Pembahasan: Tuliskan langkah penyelesaian secara runtut dan mudah dipahami siswa."
      : "",
    "",
    "Integrasi OpenAI belum diaktifkan. Struktur request dan response API sudah memakai format final.",
    "",
    AI_DISCLOSURE,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildCreateWorksheetPlaceholderOutput(
  payload: CreateWorksheetPayload,
) {
  const activities = Array.from(
    { length: Number(payload.jumlahAktivitas) },
    (_, index) =>
      `${index + 1}. Aktivitas ${index + 1}: Eksplorasi ${payload.materi} melalui pertanyaan, diskusi, dan latihan singkat.`,
  );

  return [
    `Judul: LKPD ${payload.materi} Kelas ${payload.kelas} ${payload.jenjang}`,
    "",
    `Jenjang: ${payload.jenjang}`,
    `Kelas: ${payload.kelas}`,
    `Materi: ${payload.materi}`,
    `Durasi pembelajaran: ${payload.durasiPembelajaran}`,
    `Model pembelajaran: ${payload.modelPembelajaran}`,
    `Jumlah aktivitas: ${payload.jumlahAktivitas}`,
    "",
    "A. Tujuan Pembelajaran",
    `Siswa dapat memahami konsep ${payload.materi} melalui aktivitas terarah sesuai jenjang dan kelas.`,
    "",
    "B. Aktivitas LKPD Placeholder",
    ...activities,
    "",
    "C. Refleksi",
    "- Apa bagian yang paling mudah dipahami?",
    "- Bagian mana yang masih perlu ditanyakan kepada guru?",
    "",
    "Integrasi OpenAI belum diaktifkan. Struktur request dan response API sudah memakai format final.",
    "",
    AI_DISCLOSURE,
  ].join("\n");
}

export function buildCheckAnswerPlaceholderOutput(payload: CheckAnswerPayload) {
  const helpSection =
    payload.gayaBantuan === "Beri hint dulu"
      ? [
          "D. Hint",
          "- Coba periksa kembali hubungan antara informasi pada soal dan operasi matematika yang kamu pilih.",
          "- Setelah itu, cocokkan setiap langkah dengan tujuan akhir soal.",
        ]
      : payload.gayaBantuan === "Ringkas"
        ? [
            "D. Pembahasan Ringkas",
            "- Perbaiki langkah yang belum sesuai, lalu hitung ulang dengan teliti.",
          ]
        : [
            "D. Pembahasan Bertahap",
            "1. Identifikasi apa yang ditanyakan soal.",
            "2. Tuliskan informasi yang diketahui.",
            "3. Cocokkan operasi yang digunakan dengan informasi pada soal.",
            "4. Hitung ulang dan cek apakah satuan atau bentuk jawaban sudah sesuai.",
          ];

  return [
    `Judul: Cek Jawaban Matematika Kelas ${payload.kelas} ${payload.jenjang}`,
    "",
    `Jenjang: ${payload.jenjang}`,
    `Kelas: ${payload.kelas}`,
    `Gaya bantuan: ${payload.gayaBantuan}`,
    "",
    "A. Soal",
    payload.soalMatematika,
    "",
    "B. Bagian yang Sudah Benar",
    "- Terima kasih sudah menuliskan langkah jawaban. Bagian yang sudah benar perlu dipertahankan, terutama jika kamu sudah mencoba menuliskan informasi dari soal dan proses perhitungannya.",
    "",
    "C. Bagian yang Perlu Diperbaiki",
    "- Periksa kembali apakah setiap langkah sudah mengikuti pertanyaan pada soal.",
    "- Pastikan operasi, tanda, angka, dan satuan tidak berubah dari langkah ke langkah.",
    "",
    ...helpSection,
    "",
    "E. Catatan",
    "- Ini belum menentukan benar/salah secara final karena integrasi OpenAI belum diaktifkan.",
    "- Gunakan hasil ini sebagai bantuan belajar, lalu cocokkan lagi dengan guru, pembahasan resmi, atau sumber belajar yang tepercaya.",
    "",
    AI_DISCLOSURE,
  ].join("\n");
}
