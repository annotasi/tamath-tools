import "server-only";

import OpenAI from "openai";

const DEFAULT_MODEL = "gpt-5-mini";

export class MissingOpenAIKeyError extends Error {
  constructor() {
    super("OPENAI_API_KEY belum tersedia.");
    this.name = "MissingOpenAIKeyError";
  }
}

export function getOpenAIModel() {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
}

export function createOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    throw new MissingOpenAIKeyError();
  }

  return new OpenAI({
    apiKey,
  });
}
