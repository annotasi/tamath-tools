"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, FileText, Loader2 } from "lucide-react";
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
const labelClass = "grid gap-2 text-sm font-bold text-slate-700";
const fieldClass =
  "min-h-12 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100";
const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-xl shadow-slate-900/15 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none";

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
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:py-12">
      <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-2xl shadow-cyan-950/10 backdrop-blur sm:p-7">
        <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-black text-teal-700">
          Tool Guru
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
          Buat LKPD
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Susun draft LKPD matematika dari materi, durasi, model pembelajaran,
          dan jumlah aktivitas yang dibutuhkan.
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
            Materi
            <input
              required
              className={fieldClass}
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
            <label className={labelClass}>
              Durasi pembelajaran
              <select
                className={fieldClass}
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

            <label className={labelClass}>
              Jumlah aktivitas
              <select
                className={fieldClass}
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

          <label className={labelClass}>
            Model pembelajaran
            <select
              className={fieldClass}
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
            <div className="flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p>
                {error} Coba periksa input, lalu kirim ulang.
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
                Lagi menyusun LKPD...
              </>
            ) : (
              <>
                <FileText className="size-4" aria-hidden="true" />
                Buat LKPD
              </>
            )}
          </button>
        </form>
      </section>

      <div className="grid gap-3">
        {isLoading ? (
          <div className="no-print flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800 shadow-sm">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            TaMath by Annotasi sedang menyusun struktur LKPD...
          </div>
        ) : null}
        <OutputPreview title="Hasil Buat LKPD" output={output || undefined} />
      </div>
    </div>
  );
}
