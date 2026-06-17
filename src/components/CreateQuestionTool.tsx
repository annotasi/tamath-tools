"use client";

import { FormEvent, useState } from "react";
import { OutputPreview } from "@/components/OutputPreview";

type QuestionPayload = {
  jenjang: "SD" | "SMP" | "SMA";
  kelas: string;
  materi: string;
  jumlahSoal: "5" | "10" | "15" | "20";
  bentukSoal: "Pilihan Ganda" | "Isian" | "Uraian";
  tingkatKesulitan: "Mudah" | "Sedang" | "Sulit";
  sertakanPembahasan: boolean;
};

const initialPayload: QuestionPayload = {
  jenjang: "SD",
  kelas: "1",
  materi: "",
  jumlahSoal: "5",
  bentukSoal: "Pilihan Ganda",
  tingkatKesulitan: "Sedang",
  sertakanPembahasan: true,
};

const jenjangOptions = ["SD", "SMP", "SMA"] as const;
const jumlahSoalOptions = ["5", "10", "15", "20"] as const;
const bentukSoalOptions = ["Pilihan Ganda", "Isian", "Uraian"] as const;
const tingkatKesulitanOptions = ["Mudah", "Sedang", "Sulit"] as const;

export function CreateQuestionTool() {
  const [payload, setPayload] = useState<QuestionPayload>(initialPayload);
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
          tool: "buat-soal",
          audience: "guru",
          payload,
        }),
      });

      const data = (await response.json()) as {
        result?: string;
        error?: string;
      };

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Gagal menyusun soal.");
      }

      setOutput(data.result);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Terjadi kesalahan saat menyusun soal.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-teal-700">Tool Guru</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          Buat Soal Matematika
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Isi kebutuhan soal, lalu TaMathTools by Annotasi akan membuat draft
          soal yang bisa disalin atau dicetak.
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
                    jenjang: event.target.value as QuestionPayload["jenjang"],
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
            Materi
            <input
              required
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Contoh: Pecahan, Persamaan Linear, Turunan"
              value={payload.materi}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  materi: event.target.value,
                }))
              }
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Jumlah soal
              <select
                className="rounded-md border border-slate-300 bg-white px-3 py-2"
                value={payload.jumlahSoal}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    jumlahSoal:
                      event.target.value as QuestionPayload["jumlahSoal"],
                  }))
                }
              >
                {jumlahSoalOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Bentuk soal
              <select
                className="rounded-md border border-slate-300 bg-white px-3 py-2"
                value={payload.bentukSoal}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    bentukSoal:
                      event.target.value as QuestionPayload["bentukSoal"],
                  }))
                }
              >
                {bentukSoalOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Tingkat kesulitan
            <select
              className="rounded-md border border-slate-300 bg-white px-3 py-2"
              value={payload.tingkatKesulitan}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  tingkatKesulitan:
                    event.target.value as QuestionPayload["tingkatKesulitan"],
                }))
              }
            >
              {tingkatKesulitanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-start gap-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300"
              checked={payload.sertakanPembahasan}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  sertakanPembahasan: event.target.checked,
                }))
              }
            />
            Sertakan pembahasan
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
            {isLoading ? "Menyusun soal..." : "Buat soal"}
          </button>
        </form>
      </section>

      <div className="grid gap-3">
        {isLoading ? (
          <p className="no-print rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
            TaMathTools by Annotasi sedang menyusun soal...
          </p>
        ) : null}
        <OutputPreview title="Hasil Buat Soal" output={output || undefined} />
      </div>
    </div>
  );
}
