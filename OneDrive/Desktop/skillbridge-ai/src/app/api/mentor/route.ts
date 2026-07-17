import { NextResponse } from "next/server";
import { generateGeminiText, GeminiError } from "@/lib/gemini";
import type { ChatMessage, StudentProfile } from "@/lib/types";

const systemInstruction = `You are SkillBridge AI Mentor, a supportive career mentor for students building sustainable and social-impact careers.
Use the student's profile, skills, budget, interests, constraints, and career goals.
Give specific next steps, ask one useful follow-up question when needed, and keep advice low-cost and realistic.
Do not invent admissions guarantees, scholarships, job openings, people, or organizations.
If information is missing, explain the assumption briefly.`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: string;
      profile?: StudentProfile;
      history?: ChatMessage[];
    };
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "A mentor message is required." }, { status: 400 });
    }

    const prompt = `Student profile:
${JSON.stringify(body.profile || {}, null, 2)}

Recent chat history:
${JSON.stringify((body.history || []).slice(-8), null, 2)}

Student's latest message:
${message}

Respond as a practical mentor in 2-5 short paragraphs. Include concrete actions that fit the student's budget and constraints.`;

    const reply = await generateGeminiText({
      prompt,
      systemInstruction,
      temperature: 0.65,
      maxOutputTokens: 900
    });

    return NextResponse.json({
      ok: true,
      reply
    });
  } catch (error) {
    const status = error instanceof GeminiError ? error.status || 502 : 400;
    const message =
      error instanceof GeminiError
        ? error.message
        : "Could not parse mentor request.";

    return NextResponse.json(
      {
        ok: false,
        error: message,
        fallback: `I could not generate a mentor response because Gemini returned this error: ${message}`
      },
      { status }
    );
  }
}
