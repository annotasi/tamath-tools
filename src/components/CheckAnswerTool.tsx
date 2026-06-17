"use client";

import { FormEvent, useState } from "react";
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
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-teal-700">Tool Siswa</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          Cek Jawaban
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Masukkan soal dan langkah jawabanmu. TaMathTools by Annotasi akan
          membantu meninjau bagian yang sudah benar dan yang perlu diperbaiki.
        </p>

        <form className="no-print mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Jenjang
              <select
                className="rounded-md border border-slate-300 bg-white px-3 py-2"
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

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Kelas
              <select
                className="rounded-md border border-slate-300 bg-white px-3 py-2"
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

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Soal matematika
            <textarea
              required
              className="min-h-32 rounded-md border border-slate-300 px-3 py-2"
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

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Langkah jawaban siswa
            <textarea
              required
              className="min-h-32 rounded-md border border-slate-300 px-3 py-2"
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

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Gaya bantuan
            <select
              className="rounded-md border border-slate-300 bg-white px-3 py-2"
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
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? "Mengecek jawaban..." : "Cek jawaban"}
          </button>
        </form>
      </section>

      <div className="grid gap-3">
        {isLoading ? (
          <p className="no-print rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
            TaMathTools by Annotasi sedang mengecek jawaban...
          </p>
        ) : null}
        <OutputPreview title="Hasil Cek Jawaban" output={output || undefined} />
      </div>
    </div>
  );
}
