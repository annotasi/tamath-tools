<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes -- APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Coding Guide

## Product

- Product name: **TaMath by Annotasi**.
- All visible branding must use the exact text **TaMath by Annotasi**.
- MVP v0.1 is a no-login and no-database web app for Indonesian math teachers and students.
- All pages, labels, copy, validation messages, and generated UI text must be in Indonesian.

## Tech Stack

- Use Next.js App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use server-side API routes for backend calls.

## OpenAI API Rules

- `OPENAI_API_KEY` may only be used server-side.
- OpenAI API calls must go through a server-side API route.
- Never expose the OpenAI API key to client/browser code.
- Do not use `NEXT_PUBLIC_OPENAI_API_KEY`.

## MVP v0.1 Active Tools

Only build and maintain these tools for v0.1:

1. Buat Soal Matematika
2. Buat LKPD
3. Cek Jawaban

## Generated Output Rules

- Every generated result must be easy to copy.
- Every generated result must be printable/saveable as PDF through browser print.
- Every generated result must include this note:

  "Hasil dibuat dengan bantuan AI. Mohon verifikasi kembali sebelum digunakan."

## Prohibited For v0.1

Do not add:

- Login or authentication.
- Database.
- Supabase.
- Prisma.
- Firebase.
- Any ORM.
- Payment.
- Analytics.
- Tracking.
