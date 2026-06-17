import { NextResponse } from "next/server";
import { buildPlaceholderOutput } from "@/lib/prompts";
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

  const output = buildPlaceholderOutput(parsed.data.tool, parsed.data.topic);

  return NextResponse.json({
    output,
    note: "Ini masih response placeholder. Integrasi OpenAI belum diaktifkan.",
  });
}
