import { z } from "zod";

export const generateRequestSchema = z.object({
  tool: z.enum(["buat-soal", "buat-lkpd", "cek-jawaban"]),
  topic: z.string().trim().min(1, "Topik wajib diisi.").max(120),
  grade: z.string().trim().max(80).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export type GenerateRequest = z.infer<typeof generateRequestSchema>;
