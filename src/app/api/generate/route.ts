import { NextResponse } from "next/server";
import { createOpenAIClient, getOpenAIModel, MissingOpenAIKeyError } from "@/lib/openai";
import { buildPrompt } from "@/lib/prompts";
import { generateRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";

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

  try {
    const client = createOpenAIClient();
    const prompt = buildPrompt(
      parsed.data.tool,
      parsed.data.audience,
      parsed.data.payload,
    );

    const response = await client.responses.create({
      model: getOpenAIModel(),
      input: prompt,
    });

    const result = response.output_text?.trim();

    if (!result) {
      return NextResponse.json(
        {
          error:
            "TaMathTools by Annotasi belum menerima hasil dari AI. Silakan coba lagi.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    if (error instanceof MissingOpenAIKeyError) {
      return NextResponse.json(
        {
          error:
            "Konfigurasi OpenAI belum tersedia. Pastikan OPENAI_API_KEY sudah diatur di server.",
        },
        { status: 500 },
      );
    }

    console.error("OpenAI generate error", error);

    return NextResponse.json(
      {
        error:
          "TaMathTools by Annotasi belum bisa menghubungi layanan AI. Silakan coba beberapa saat lagi.",
      },
      { status: 502 },
    );
  }
}
