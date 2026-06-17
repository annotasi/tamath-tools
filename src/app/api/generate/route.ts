import { NextResponse } from "next/server";
import {
  buildCheckAnswerPlaceholderOutput,
  buildCreateQuestionPlaceholderOutput,
  buildCreateWorksheetPlaceholderOutput,
} from "@/lib/prompts";
import { generateRequestSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = generateRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Input belum valid. Periksa kembali topik, tool, dan catatan tambahan.",
      },
      { status: 400 },
    );
  }

  const output = (() => {
    if (parsed.data.tool === "buat-soal") {
      return buildCreateQuestionPlaceholderOutput(parsed.data.payload);
    }

    if (parsed.data.tool === "buat-lkpd") {
      return buildCreateWorksheetPlaceholderOutput(parsed.data.payload);
    }

    if (parsed.data.tool === "cek-jawaban") {
      return buildCheckAnswerPlaceholderOutput(parsed.data.payload);
    }
  })();

  return NextResponse.json({
    output,
    tool: parsed.data.tool,
    audience: parsed.data.audience,
    note: "Ini masih response placeholder. Integrasi OpenAI belum diaktifkan.",
  });
}
