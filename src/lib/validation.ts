import { z } from "zod";

const createQuestionPayloadSchema = z.object({
  jenjang: z.enum(["SD", "SMP", "SMA"]),
  kelas: z.enum([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  materi: z.string().trim().min(1, "Materi wajib diisi.").max(120),
  jumlahSoal: z.enum(["5", "10", "15", "20"]),
  bentukSoal: z.enum(["Pilihan Ganda", "Isian", "Uraian"]),
  tingkatKesulitan: z.enum(["Mudah", "Sedang", "Sulit"]),
  sertakanPembahasan: z.boolean(),
});

const createWorksheetPayloadSchema = z.object({
  jenjang: z.enum(["SD", "SMP", "SMA"]),
  kelas: z.enum([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  materi: z.string().trim().min(1, "Materi wajib diisi.").max(120),
  durasiPembelajaran: z.enum(["1 JP", "2 JP", "3 JP", "4 JP"]),
  modelPembelajaran: z.enum([
    "Bebas",
    "Problem Based Learning",
    "Discovery Learning",
    "Project Based Learning",
  ]),
  jumlahAktivitas: z.enum(["1", "2", "3", "4"]),
});

const checkAnswerPayloadSchema = z.object({
  jenjang: z.enum(["SD", "SMP", "SMA"]),
  kelas: z.enum([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]),
  soalMatematika: z
    .string()
    .trim()
    .min(1, "Soal matematika wajib diisi.")
    .max(2000),
  langkahJawabanSiswa: z
    .string()
    .trim()
    .min(1, "Langkah jawaban siswa wajib diisi.")
    .max(3000),
  gayaBantuan: z.enum(["Ringkas", "Bertahap", "Beri hint dulu"]),
});

export const generateRequestSchema = z.discriminatedUnion("tool", [
  z.object({
    tool: z.literal("buat-soal"),
    audience: z.literal("guru"),
    payload: createQuestionPayloadSchema,
  }),
  z.object({
    tool: z.literal("buat-lkpd"),
    audience: z.literal("guru"),
    payload: createWorksheetPayloadSchema,
  }),
  z.object({
    tool: z.literal("cek-jawaban"),
    audience: z.literal("siswa"),
    payload: checkAnswerPayloadSchema,
  }),
]);

export type GenerateRequest = z.infer<typeof generateRequestSchema>;
export type CreateQuestionPayload = z.infer<typeof createQuestionPayloadSchema>;
export type CreateWorksheetPayload = z.infer<
  typeof createWorksheetPayloadSchema
>;
export type CheckAnswerPayload = z.infer<typeof checkAnswerPayloadSchema>;
