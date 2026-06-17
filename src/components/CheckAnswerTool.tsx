"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, ClipboardCheck, Loader2 } from "lucide-react";
import { OutputPreview } from "@/components/OutputPreview";

type CheckAnswerPayload = {
  jenjang: "SD" | "SMP" | "SMA";
  kelas: string;
  soalMatematika: string;
  langkahJawabanSiswa: string;
  gayaBantuan: "Ringkas" | "Bertahap" | "Beri hint dulu";
};

const initialPayload: CheckAnswerPayload = {
  jenjang: "SD",
  kelas: "1",
  soalMatematika: "",
  langkahJawabanSiswa: "",
  gayaBantuan: "Bertahap",
};

const jenjangOptions = ["SD", "SMP", "SMA"] as const;
const gayaBantuanOptions = ["Ringkas", "Bertahap", "Beri hint dulu"] as const;
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";
const fieldClass =
  "min-h-12 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100";
const textareaClass = `${fieldClass} min-h-36 resize-y leading-6`;
const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-xl shadow-slate-900/15 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none";

export function CheckAnswerTool() {
  const [payload, setPayload] = useState<CheckAnswerPayload>(initialPayload);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: "cek-jawaban",
          audience: "siswa",
          payload,
        }),
      });

      const data = (await response.json()) as {
        result?: string;
        error?: string;
      };

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Gagal mengecek jawaban.");
      }

      setOutput(data.result);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Terjadi kesalahan saat mengecek jawaban.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:py-12">
      <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-2xl shadow-cyan-950/10 backdrop-blur sm:p-7">
        <p className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-sm font-black text-rose-700">
          Tool Siswa
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
          Cek Jawaban
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Masukkan soal dan langkah jawabanmu. TaMath by Annotasi akan
          membantu meninjau bagian yang sudah benar dan yang perlu diperbaiki.
        </p>

        <form className="no-print mt-7 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Jenjang
              <select
                className={fieldClass}
                value={payload.jenjang}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    jenjang:
                      event.target.value as CheckAnswerPayload["jenjang"],
                  }))
                }
              >
                {jenjangOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={labelClass}>
              Kelas
              <select
                className={fieldClass}
                value={payload.kelas}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    kelas: event.target.value,
                  }))
                }
              >
                {Array.from({ length: 12 }, (_, index) => `${index + 1}`).map(
                  (kelas) => (
                    <option key={kelas} value={kelas}>
                      {kelas}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>

          <label className={labelClass}>
            Soal matematika
            <textarea
              required
              className={textareaClass}
              placeholder="Tulis soal matematika di sini."
              value={payload.soalMatematika}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  soalMatematika: event.target.value,
                }))
              }
            />
          </label>

          <label className={labelClass}>
            Langkah jawaban siswa
            <textarea
              required
              className={textareaClass}
              placeholder="Tulis langkah jawaban yang ingin dicek."
              value={payload.langkahJawabanSiswa}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  langkahJawabanSiswa: event.target.value,
                }))
              }
            />
          </label>

          <label className={labelClass}>
            Gaya bantuan
            <select
              className={fieldClass}
              value={payload.gayaBantuan}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  gayaBantuan:
                    event.target.value as CheckAnswerPayload["gayaBantuan"],
                }))
              }
            >
              {gayaBantuanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {error ? (
            <div className="flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p>
                {error} Coba periksa soal dan langkah jawaban, lalu kirim ulang.
              </p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className={primaryButtonClass}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Lagi mengecek jawaban...
              </>
            ) : (
              <>
                <ClipboardCheck className="size-4" aria-hidden="true" />
                Cek jawaban
              </>
            )}
          </button>
        </form>
      </section>

      <div className="grid gap-3">
        {isLoading ? (
          <div className="no-print flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800 shadow-sm">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            TaMath by Annotasi sedang membaca langkah jawaban...
          </div>
        ) : null}
        <OutputPreview title="Hasil Cek Jawaban" output={output || undefined} />
      </div>
    </div>
  );
}
