"use client";

import { FormEvent, useState } from "react";
import { OutputPreview } from "@/components/OutputPreview";

type WorksheetPayload = {
  jenjang: "SD" | "SMP" | "SMA";
  kelas: string;
  materi: string;
  durasiPembelajaran: "1 JP" | "2 JP" | "3 JP" | "4 JP";
  modelPembelajaran:
    | "Bebas"
    | "Problem Based Learning"
    | "Discovery Learning"
    | "Project Based Learning";
  jumlahAktivitas: "1" | "2" | "3" | "4";
};

const initialPayload: WorksheetPayload = {
  jenjang: "SD",
  kelas: "1",
  materi: "",
  durasiPembelajaran: "2 JP",
  modelPembelajaran: "Bebas",
  jumlahAktivitas: "2",
};

const jenjangOptions = ["SD", "SMP", "SMA"] as const;
const durasiOptions = ["1 JP", "2 JP", "3 JP", "4 JP"] as const;
const modelOptions = [
  "Bebas",
  "Problem Based Learning",
  "Discovery Learning",
  "Project Based Learning",
] as const;
const jumlahAktivitasOptions = ["1", "2", "3", "4"] as const;

export function CreateWorksheetTool() {
  const [payload, setPayload] = useState<WorksheetPayload>(initialPayload);
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
          tool: "buat-lkpd",
          audience: "guru",
          payload,
        }),
      });

      const data = (await response.json()) as {
        result?: string;
        error?: string;
      };

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Gagal menyusun LKPD.");
      }

      setOutput(data.result);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Terjadi kesalahan saat menyusun LKPD.",
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
          Buat LKPD
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Susun draft LKPD matematika dari materi, durasi, model pembelajaran,
          dan jumlah aktivitas yang dibutuhkan.
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
                    jenjang: event.target.value as WorksheetPayload["jenjang"],
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
              placeholder="Contoh: Bangun datar, Perbandingan, Integral"
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
              Durasi pembelajaran
              <select
                className="rounded-md border border-slate-300 bg-white px-3 py-2"
                value={payload.durasiPembelajaran}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    durasiPembelajaran:
                      event.target
                        .value as WorksheetPayload["durasiPembelajaran"],
                  }))
                }
              >
                {durasiOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Jumlah aktivitas
              <select
                className="rounded-md border border-slate-300 bg-white px-3 py-2"
                value={payload.jumlahAktivitas}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    jumlahAktivitas:
                      event.target.value as WorksheetPayload["jumlahAktivitas"],
                  }))
                }
              >
                {jumlahAktivitasOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Model pembelajaran
            <select
              className="rounded-md border border-slate-300 bg-white px-3 py-2"
              value={payload.modelPembelajaran}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  modelPembelajaran:
                    event.target.value as WorksheetPayload["modelPembelajaran"],
                }))
              }
            >
              {modelOptions.map((option) => (
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
            {isLoading ? "Menyusun LKPD..." : "Buat LKPD"}
          </button>
        </form>
      </section>

      <div className="grid gap-3">
        {isLoading ? (
          <p className="no-print rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
            TaMathTools by Annotasi sedang menyusun LKPD...
          </p>
        ) : null}
        <OutputPreview title="Hasil Buat LKPD" output={output || undefined} />
      </div>
    </div>
  );
}
