import "server-only";
import { ApiError, GoogleGenAI } from "@google/genai";

const DEFAULT_MODEL = "gemini-3.1-flash-lite";
const FALLBACK_MODELS = ["gemini-3.5-flash"];

export class GeminiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
  }
}

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey || apiKey === "replace_with_your_gemini_api_key") {
    throw new GeminiError("GEMINI_API_KEY is missing. Add a real key to .env.local or Vercel Environment Variables.", 500);
  }

  return new GoogleGenAI({ apiKey });
}

function normalizeGeminiError(error: unknown) {
  if (error instanceof GeminiError) return error;

  if (error instanceof ApiError) {
    return new GeminiError(getReadableGeminiMessage(error.message), error.status);
  }

  if (error instanceof Error) {
    return new GeminiError(error.message);
  }

  return new GeminiError("Gemini request failed.");
}

function getReadableGeminiMessage(message: string) {
  try {
    const parsed = JSON.parse(message) as { error?: { message?: string } };
    return parsed.error?.message || message;
  } catch {
    return message;
  }
}

export async function generateGeminiText({
  prompt,
  systemInstruction,
  temperature = 0.45,
  maxOutputTokens = 1400,
  responseMimeType
}: {
  prompt: string;
  systemInstruction: string;
  temperature?: number;
  maxOutputTokens?: number;
  responseMimeType?: "application/json" | "text/plain";
}) {
  const preferredModel = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  const models = [preferredModel, ...FALLBACK_MODELS.filter((model) => model !== preferredModel)];
  const ai = getGeminiClient();
  let lastError: GeminiError | null = null;

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          temperature,
          maxOutputTokens,
          ...(responseMimeType ? { responseMimeType } : {})
        }
      });

      const text = response.text?.trim();

      if (!text) {
        throw new GeminiError(`Gemini returned an empty response from ${model}.`);
      }

      return text;
    } catch (error) {
      const normalized = normalizeGeminiError(error);
      lastError = normalized;

      if (!shouldTryFallback(normalized)) {
        throw normalized;
      }
    }
  }

  throw lastError || new GeminiError("Gemini request failed.");
}

function shouldTryFallback(error: GeminiError) {
  const message = error.message.toLowerCase();
  return (
    error.status === 404 ||
    error.status === 503 ||
    message.includes("high demand") ||
    message.includes("no longer available") ||
    message.includes("not found")
  );
}

export function parseGeminiJson<T>(text: string): T {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned) as T;
}
